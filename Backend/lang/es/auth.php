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

    'failed' => 'Credenciales incorrectas.',
    'password' => 'Contraseña incorrecta.',
    'throttle' => 'Demasiados intentos. Intenta en :seconds segundos.',
    'registration_successful' => '¡Registro exitoso, :name!',
    'invalid_credentials' => 'Email o contraseña incorrectos.',
    'two_factor_required' => 'Se requiere autenticación de dos factores.',
    'login_successful' => '¡Has iniciado sesión, :name!',
    'logout_successful' => 'Has cerrado sesión.',
    'user_info_retrieved' => 'Información de cuenta cargada.',

    'verification' => [
        'email_already_verified' => 'Email ya verificado.',
        'verification_link_sent' => 'Enlace de verificación enviado.',
        'email_successfully_verified' => 'Email verificado correctamente.',
    ],

    'passwords' => [
        'current_password_incorrect' => 'Contraseña actual incorrecta.',
        'new_password_same_as_current' => 'La nueva contraseña no puede ser igual a la actual.',
        'password_updated_successfully' => 'Contraseña actualizada.',
        'reset_link_sent' => 'Enlace de restablecimiento enviado.',
        'error_sending_reset_link' => 'Error enviando el enlace de restablecimiento.',
        'password_reset_successfully' => 'Contraseña restablecida.',
        'password_reset_failed' => 'No se pudo restablecer la contraseña.',
    ],

    '2fa' => [
        'already_enabled' => '2FA ya está activado.',
        'not_enabled' => '2FA no está activado.',
        'invalid_code' => 'Código 2FA inválido.',
        'enabled_successfully' => '2FA activado.',
        'already_disabled' => '2FA ya está desactivado.',
        'disabled_successfully' => '2FA desactivado.',
        'auth.2fa.two_factor_authentication_required' => 'Se requiere 2FA para esta acción.',
    ],

];
