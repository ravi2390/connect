<?php

// Original Author: Arron Woods https://github.com/ChartBlocks/php-ssrs

namespace Aft\SSRS\NTLM;

class ServerException extends \Exception
{
    public $faultcode;

    public $faultstring;

    public $faultactor;

    public static function fromResponse($string): self
    {
        $xml = new \SimpleXMLElement($string);
        $ns = $xml->getNamespaces(true);

        $soap = $xml->children($ns['soap']);
        $body = $soap->Body->children($ns['soap']);
        if (isset($body->Fault)) {
            $fault = $body->Fault->children();

            $exception = new ServerException((string) $fault->faultstring);
            $exception->faultcode = (string) $fault->faultcode;
            $exception->faultstring = (string) $fault->faultstring;
            $exception->faultactor = (string) $fault->faultactor;
        } else {
            throw new \Exception('Invalid server response');
        }

        return $exception;
    }
}
