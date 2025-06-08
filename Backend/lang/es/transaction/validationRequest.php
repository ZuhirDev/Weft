<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Líneas de Lenguaje de Autenticación
    |--------------------------------------------------------------------------
    |
    | Las siguientes líneas de lenguaje se utilizan durante la autenticación 
    | para varios mensajes que necesitamos mostrar al usuario. Puedes modificarlas 
    | libremente según los requisitos de tu aplicación.
    |
    */

    'card_number.required' => 'El número de tarjeta es obligatorio.',
    'card_number.string' => 'El número de tarjeta debe ser una cadena de texto.',
    'card_number.size' => 'El número de tarjeta debe tener exactamente 16 dígitos.',
    'card_number.regex' => 'El número de tarjeta debe contener solo dígitos.',

    'amount.required' => 'El monto es obligatorio.',
    'amount.numeric' => 'El monto debe ser un número válido.',
    'amount.min' => 'El monto debe ser mayor que 0.',

    'concept.string' => 'El concepto debe ser una cadena de texto.',
    'concept.max' => 'El concepto no debe tener más de 255 caracteres.',

    'iban.required' => 'El campo IBAN es obligatorio.',
    'iban.string' => 'El IBAN debe ser una cadena de texto.',
    'iban.exists' => 'El IBAN proporcionado no existe en nuestras cuentas.',

    'destination_iban.string' => 'El IBAN destino debe ser una cadena de texto.',
    'destination_iban.different' => 'El IBAN destino debe ser diferente del IBAN origen.',
    'destination_iban.exists' => 'El IBAN destino no existe en nuestras cuentas.',

    'external_iban.string' => 'El IBAN externo debe ser una cadena de texto.',
    'external_iban.different' => 'El IBAN externo debe ser diferente del IBAN origen.',

    'type.required' => 'El tipo de transacción es obligatorio.',
    'type.in' => 'El tipo de transacción debe ser uno de los siguientes: depósito, retiro o transferencia.',

];
