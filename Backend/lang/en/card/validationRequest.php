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
    'card_number.regex' => 'The card number must contain only numbers.',

    'new_pin.required' => 'The new PIN is required.',
    'new_pin.digits' => 'The new PIN must be exactly 4 digits.',

    'alias.string' => 'The alias must be a string.',
    'alias.max' => 'The alias may not be greater than 100 characters.',
    'alias.nullable' => 'The alias field may be null.',

    'status.in' => 'The status must be one of the following: active, blocked, expired.',

    'iban.required' => 'The IBAN field is required.',
    'iban.string' => 'The IBAN must be a string.',
    'iban.exists' => 'The provided IBAN does not exist in our records.',

    'type.required' => 'The card type is required.',
    'type.in' => 'The card type must be either debit or credit.',

];