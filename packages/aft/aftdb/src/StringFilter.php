<?php

namespace Aft\AFTDB;

use Exception;

class StringFilter
{
    const IGNORE_CASE = '__IGNORE_CASE__';

    const ERROR_STR = '__ERROR__';

    public function ensureRegexAny(string $string, bool $ignoreCase = false): string
    {
        if ($string[0] !== '/') {
            $string = '/'.preg_quote($string).'/'.($ignoreCase ? 'i' : '');
        }

        return $string;
    }

    public function ensureRegexExact(string $string, bool $ignoreCase = false): string
    {
        if ($string[0] !== '/') {
            $string = '/^'.preg_quote($string).'$/'.($ignoreCase ? 'i' : '');
        }

        return $string;
    }

    /**
     * @return string
     */
    public function strToUpper(string $string, bool $enabled): string
    {
        $output = $enabled ? strtoupper($string) : $string;
        if (config('datamodel.debug')) {
            echo 'strToUpper: "'.$string.'" = "'.$output.'"'.PHP_EOL;
        }

        return $output;
    }

    /**
     * @return string
     */
    public function strToLower(string $string, bool $enabled): string
    {
        $output = $enabled ? strtolower($string) : $string;
        if (config('datamodel.debug')) {
            echo 'strToLower: "'.$string.'" = "'.$output.'"'.PHP_EOL;
        }

        return $output;
    }

    /**
     * @return string|null
     */
    public function emptyStrToNull(string $string, bool $enabled): ?string
    {
        if (config('datamodel.debug')) {
            echo 'emptyStrToNull: "'.$string.'" = '.($string === '' ? 'NULL' : '"'.$string.'"').PHP_EOL;
        }
        if ($enabled && $string === '') {
            $string = null;
        }

        return $string;
    }

    /**
     * @return string
     *
     * @throws Exception
     */
    public function map(string $string, array $rules)
    {
        $ignoreCase = false;
        foreach ($rules as $pattern => $replacement) {
            if ($pattern == self::IGNORE_CASE) {
                $ignoreCase = true;

                continue;
            }
            if ($pattern == self::ERROR_STR) {
                throw new Exception(str_replace('%1', '"'.$string.'"', $replacement));
            }
            $pattern = $this->ensureRegexExact($pattern, $ignoreCase);
            if (preg_match($pattern, $string, $matches) === 1) {
                if (config('datamodel.debug')) {
                    echo 'map: "'.$string.'" = "'.$replacement.'"'.PHP_EOL;
                }
                $string = $replacement;
                break;
            }
        }

        return $string;
    }

    public function replace(string $string, array $rules): string|array|null
    {
        foreach ($rules as $rule) {
            $pattern = array_key_first($rule);
            $replacement = $rule[$pattern];
            if ($pattern == self::ERROR_STR) {
                throw new Exception(str_replace('%1', '"'.$string.'"', $replacement));
            }
            $pattern = $this->ensureRegexAny($pattern, false);
            $result = preg_replace($pattern, (string) $replacement, $string, -1, $count);
            if ($count != 0) {
                if (config('datamodel.debug')) {
                    echo 'replace: "'.$string.'" = "'.$result.'"'.PHP_EOL;
                }
                $string = $result;
                break;
            }
        }

        return $string;
    }

    /**
     * @return string
     *
     * @throws Exception
     */
    public function filter(string $string, array $ruleList)
    {
        foreach ($ruleList as $rule) {
            if (! is_array($rule)) {
                throw new Exception('Rule is not an array:'.PHP_EOL.print_r($rule, true));
            }
            $ruleName = array_key_first($rule);
            if (! is_string($ruleName)) {
                throw new Exception('Rule name expected:'.PHP_EOL.print_r($rule[0], true));
            }
            $string = $this->$ruleName($string, $rule[$ruleName]);
        }

        return $string;
    }

    /**
     * @return string
     *
     * @throws Exception
     */
    public function __invoke(string $string, array $rules)
    {
        return $this->filter($string, $rules);
    }
}
