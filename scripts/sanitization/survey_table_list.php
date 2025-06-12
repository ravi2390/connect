<?php

// This list will come from any tables referenced in the spreadsheets' SQL
// queries, or tables referenced by those tables via foreign key constraints.
// It is keyed by the name of the table to be copied/sanitized. The value is a
// list of string columns which do not need to be sanitized.
return [
    'Answer' => [],
    'AnswerReason' => [],
    'Survey' => [],
    'SurveyComments' => [],
    'SurveyIndividual' => [
        'LocalUnionNbr',
    ],
    'SurveyIndividualAnswer' => [],
    'SurveyQuestions' => [],
];
