<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'iban.required' => 'The IBAN field is required.',
    'iban.string' => 'The IBAN must be a string.',
    'iban.max' => 'The IBAN may not be greater than 34 characters.',
    'iban.exists' => 'The provided IBAN does not exist in our database.',
    'iban.regex' => 'The IBAN format is invalid.',

    'alias.string' => 'The alias must be a string.',
    'alias.max' => 'The alias may not be greater than 255 characters.',

    'status.in' => 'The status must be one of the following: active, blocked, closed.',

    'type.required' => 'The account type is required.',
    'type.in' => 'The account type must be one of the following: checking, savings, investment.',

];