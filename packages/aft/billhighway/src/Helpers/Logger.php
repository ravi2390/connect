<?php


namespace Aft\BillHighway\Helpers;

use Aft\MemberForms\Models\EDuesError;

class Logger
{
    public static function LogRequestException(
        $uri,
        $method,
        $payload,
        $errorCode,
        $errorDescription,
        $extraParams
    ): void {
        if (strtoupper((string) $method) !== 'GET' && isset($extraParams->EDuesEnrollmentId)) {
            $eDuesErrorModel = new EDuesError();
            $eDuesErrorModel->RequestEndpoint = $uri;
            $eDuesErrorModel->RequestPayload = $payload;
            $eDuesErrorModel->ErrorCode = $errorCode;
            $eDuesErrorModel->ErrorDescription = $errorDescription;
            $eDuesErrorModel->ErrorTriggeredFrom = $extraParams->ErrorTriggeredFrom ?? null;
            $eDuesErrorModel->EDuesEnrollmentId = $extraParams->EDuesEnrollmentId;
            $eDuesErrorModel->CreatedBy = $eDuesErrorModel->UpdatedBy = $extraParams->UserId;
            $eDuesErrorModel->CreatedAt = $eDuesErrorModel->UpdatedAt = now();
            $eDuesErrorModel->save();
        }
    }
}
