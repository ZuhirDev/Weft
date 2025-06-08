<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Líneas de Lenguaje de Validación
    |--------------------------------------------------------------------------
    |
    | Las siguientes líneas de lenguaje se utilizan durante la validación para 
    | varios atributos. Algunas reglas tienen múltiples versiones, como las 
    | reglas de "tamaño". Siéntete libre de modificar estas líneas según los 
    | requisitos de tu aplicación.
    |
    */

    
    'email.required' => 'El campo correo electrónico es obligatorio.',
    'email.email' => 'Por favor ingresa una dirección de correo electrónico válida.',
    'email.exists' => 'Este correo electrónico no está registrado en nuestro sistema.',
    'password.required' => 'La contraseña es obligatoria.',
    'password.string' => 'La contraseña debe ser una cadena válida.',
    'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
    'password.confirmed' => 'La confirmación de la contraseña no coincide.',
    'password.different' => 'La nueva contraseña no puede ser igual a la contraseña actual.',
    'token.required' => 'El token es obligatorio.',
    'token.string' => 'El token debe ser una cadena válida.',
    'name.required' => 'El campo nombre es obligatorio.',
    'name.string' => 'El nombre debe ser una cadena válida.',
    'name.max' => 'El nombre no debe tener más de 100 caracteres.',
];
