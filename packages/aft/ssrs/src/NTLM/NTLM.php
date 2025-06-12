<?php

// Original Author: Arron Woods https://github.com/ChartBlocks/php-ssrs

namespace Aft\SSRS\NTLM;

use RuntimeException;

class NTLM extends \SoapClient
{
    protected $_uri;

    protected $_username;

    protected $_passwd;

    protected $_cachePath;

    protected $_cacheExpiry;

    protected $_lastRequest;

    protected $_lastResponse;

    protected $_curlOptions = [];

    public function __construct($wsdl, $options = [])
    {
        if (empty($options['cache_wsdl_expiry'])) {
            $options['cache_wsdl_expiry'] = 86400;
        }

        if (array_key_exists('username', $options)) {
            $this->setUsername($options['username']);
        }

        if (array_key_exists('password', $options)) {
            $this->setPassword($options['password']);
        }

        $cacheBasePath = rtrim(empty($options['cache_wsdl_path']) ? sys_get_temp_dir() : $options['cache_wsdl_path'], DIRECTORY_SEPARATOR);
        $cacheFilePath = $cacheBasePath.DIRECTORY_SEPARATOR.md5((string) $wsdl).'.wsdl';

        $this->setUri($wsdl);
        $this->setCachePath($cacheFilePath);
        $this->setCacheExpiry($options['cache_wsdl_expiry']);
        $this->setCurlOptions($options['curl_options']);
    }

    public function init(): static
    {
        $this->fetchWSDL();

        $options['cache_wsdl'] = WSDL_CACHE_MEMORY;
        $options['login'] = $this->_username;
        $options['password'] = $this->_passwd;

        parent::__construct($this->_cachePath, $options);

        return $this;
    }

    public function setUri($uri): static
    {
        $this->_uri = $uri;

        return $this;
    }

    public function getUri()
    {
        return $this->_uri;
    }

    public function setCacheExpiry($cacheExpiry = 86400): static
    {
        $this->_cacheExpiry = $cacheExpiry;

        return $this;
    }

    public function getCacheExpiry()
    {
        return $this->_cacheExpiry;
    }

    public function isCacheValid(): bool
    {
        $checkTime = time() - $this->getCacheExpiry();

        return file_exists($this->getCachePath()) && filemtime($this->getCachePath()) > $checkTime;
    }

    public function setUsername($username): static
    {
        $this->_username = (string) $username;

        return $this;
    }

    public function setPassword($password): static
    {
        $this->_passwd = (string) $password;

        return $this;
    }

    public function setCachePath($file): static
    {
        $folder = dirname((string) $file);

        if (file_exists($file) && is_writable($file) === false) {
            throw new RuntimeException('WSDL cache file not writeable');
        } elseif (is_dir($folder) === false) {
            throw new RuntimeException('WSDL cache parent folder does not exist');
        } elseif (is_writable($folder) === false) {
            throw new RuntimeException('WSDL cache parent folder not writeable');
        }

        $this->_cachePath = $file;

        return $this;
    }

    public function getCachePath()
    {
        return $this->_cachePath;
    }

    public function cacheWSDL($fileContents): void
    {
        $result = file_put_contents($this->_cachePath, $fileContents);
        if ($result) {
            $this->setCacheWSDLPermission();
        }
    }

    public function setCacheWSDLPermission($oct = 0666): void
    {
        @chmod($this->_cachePath, 0666);
    }

    public function getCacheWSDL(): string|false
    {
        return file_get_contents($this->getCachePath());
    }

    public function fetchWSDL(): void
    {
        if ($this->isCacheValid() === false) {
            $wsdlContent = $this->callCurl($this->_uri);
            $this->cacheWSDL($wsdlContent);
        }
    }

    public function setCurlOptions(array $curl_options): void
    {
        $this->_curlOptions = $curl_options;
    }

    public function getCurlOptions()
    {
        return $this->_curlOptions;
    }

    public function __doRequest($request, $location, $action, $version = 1, $one_way = null): string|null
    {
        $this->_lastRequest = (string) $request;
        $this->_lastResponse = $this->callCurl($location, $request, $action);

        return $this->_lastResponse;
    }

    public function callCurl($url, $data = null, $action = null): string|true
    {
        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_FAILONERROR, false);
        curl_setopt($handle, CURLOPT_USERAGENT, 'PHP SOAP-NTLM Client');
        curl_setopt($handle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_USERPWD, $this->_username.':'.$this->_passwd);
        curl_setopt($handle, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($handle, CURLOPT_HTTPAUTH, CURLAUTH_NTLM);

        //set additional curl options
        foreach ($this->getCurlOptions() as $key => $value) {
            curl_setopt($handle, $key, $value);
        }

        $headers = $this->generateHeaders($url, $data, $action);
        curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);

        if ($data !== null) {
            curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
        }

        $response = curl_exec($handle);
        if ($response === false) {
            throw new Exception('CURL error: '.curl_error($handle), curl_errno($handle));
        }

        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        if ($httpCode !== 200) {
            if ($response !== '' && $httpCode >= 300 && $httpCode <= 600) {
                throw ServerException::fromResponse($response);
            } else {
                throw new Exception('HTTP error: '.$httpCode.' '.$response, $httpCode, $response);
            }
        }
        curl_close($handle);

        $this->_lastResponse = (string) $response;

        return $response;
    }

    public function getLastRequest()
    {
        return $this->_lastRequest;
    }

    public function getLastResponse()
    {
        return $this->_lastResponse;
    }

    /**
     * @param  string  $url
     * @param  mixed  $data
     * @param  string  $action
     * @return array
     */
    public function generateHeaders($url, $data = null, $action = null): array
    {
        $headers = [
            'Method: '.(($data === null) ? 'GET' : 'POST'),
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
        ];

        if ($data !== null) {
            $headers[] = 'Content-Type: text/xml; charset=utf-8';
        }

        if ($action !== null) {
            $headers[] = 'SOAPAction: "'.$action.'"';
        }

        return $headers;
    }
}
