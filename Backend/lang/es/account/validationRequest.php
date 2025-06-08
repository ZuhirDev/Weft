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

    'iban.required' => 'El campo IBAN es obligatorio.',
    'iban.string' => 'El IBAN debe ser una cadena de texto.',
    'iban.max' => 'El IBAN no debe tener más de 34 caracteres.',
    'iban.exists' => 'El IBAN proporcionado no existe en nuestra base de datos.',
    'iban.regex' => 'El formato del IBAN es inválido.',

    'alias.string' => 'El alias debe ser una cadena de texto.',
    'alias.max' => 'El alias no debe tener más de 255 caracteres.',

    'status.in' => 'El estado debe ser uno de los siguientes: activo, bloqueado, cerrado.',

    'type.required' => 'El tipo de cuenta es obligatorio.',
    'type.in' => 'El tipo de cuenta debe ser uno de los siguientes: corriente, ahorros, inversión.',
];
