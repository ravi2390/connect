<?php

// This list will come from any tables referenced in the spreadsheets' SQL
// queries, or tables referenced by those tables via foreign key constraints.
// It is keyed by the name of the table to be copied/sanitized. The value is a
// list of string columns which do not need to be sanitized.
return [
    'Audit_By' => [],
    'Audit_ByAFT' => [],
    'Audit_Detail' => [],
    'Audit_Messages' => [
        'AuditMessage',
        'AuditMsgCode',
        'AuditReqCode',
        'AuditSqlType',
        'AuditTab',
        'AuditType',
        'AuditValidation',
        'AuditValidParam',
    ],
    'Audit_Messages_Send' => [
        'AuditReqCode',
        'MsgCode',
    ],
    'Audit_Opinion' => [
        'Audit_CPAOpinionTXT',
    ],
    'Audit_Status' => [
        'AuditStatusDesc',
    ],
    'Audit_Type' => [
        'AuditTypeDesc',
    ],
    'Audit_UnaccpReason' => [
        'AuditUnaccpReason',
    ],
    'Audit_Year' => [],
];
