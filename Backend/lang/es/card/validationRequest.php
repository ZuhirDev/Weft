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
    'card_number.regex' => 'El número de tarjeta debe contener solo números.',

    'new_pin.required' => 'El nuevo PIN es obligatorio.',
    'new_pin.digits' => 'El nuevo PIN debe tener exactamente 4 dígitos.',

    'alias.string' => 'El alias debe ser una cadena de texto.',
    'alias.max' => 'El alias no debe tener más de 100 caracteres.',
    'alias.nullable' => 'El campo alias puede ser nulo.',

    'status.in' => 'El estado debe ser uno de los siguientes: activo, bloqueado, expirado.',

    'iban.required' => 'El campo IBAN es obligatorio.',
    'iban.string' => 'El IBAN debe ser una cadena de texto.',
    'iban.exists' => 'El IBAN proporcionado no existe en nuestros registros.',

    'type.required' => 'El tipo de tarjeta es obligatorio.',
    'type.in' => 'El tipo de tarjeta debe ser débito o crédito.',
];
