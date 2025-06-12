<?php

namespace Aft\SSRS\NTLM;

class Exception extends \Exception
{
    public function __construct($message, public $httpCode = null, public $response = null)
    {
        parent::__construct($message, $this->httpCode);
    }
}
