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

    'card_number.required' => 'The card number is required.',
    'card_number.string' => 'The card number must be a string.',
    'card_number.size' => 'The card number must be exactly 16 digits.',
    'card_number.regex' => 'The card number must contain only digits.',

    'amount.required' => 'The amount is required.',
    'amount.numeric' => 'The amount must be a valid number.',
    'amount.min' => 'The amount must be greater than 0.',

    'concept.string' => 'The concept must be a string.',
    'concept.max' => 'The concept may not be greater than 255 characters.',

    'iban.required' => 'The IBAN field is required.',
    'iban.string' => 'The IBAN must be a string.',
    'iban.exists' => 'The provided IBAN does not exist in our accounts.',

    'destination_iban.string' => 'The destination IBAN must be a string.',
    'destination_iban.different' => 'The destination IBAN must be different from the origin IBAN.',
    'destination_iban.exists' => 'The destination IBAN does not exist in our accounts.',

    'external_iban.string' => 'The external IBAN must be a string.',
    'external_iban.different' => 'The external IBAN must be different from the origin IBAN.',

    'type.required' => 'The transaction type is required.',
    'type.in' => 'The transaction type must be one of the following: deposit, withdraw, or transfer.',



];