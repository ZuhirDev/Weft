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
    
    'failed' => 'Invalid credentials.',
    'password' => 'Incorrect password.',
    'throttle' => 'Too many attempts. Try again in :seconds seconds.',
    'registration_successful' => 'Registration successful, :name!',
    'invalid_credentials' => 'Incorrect email or password.',
    'two_factor_required' => 'Two-factor authentication required.',
    'login_successful' => 'Logged in successfully, :name!',
    'logout_successful' => 'Logged out successfully.',
    'user_info_retrieved' => 'Account info loaded.',

    'verification' => [
        'email_already_verified' => 'Email already verified.',
        'verification_link_sent' => 'Verification link sent.',
        'email_successfully_verified' => 'Email verified successfully.',
    ],

    'passwords' => [
        'current_password_incorrect' => 'Current password incorrect.',
        'new_password_same_as_current' => 'New password cannot be the same as the current one.',
        'password_updated_successfully' => 'Password updated.',
        'reset_link_sent' => 'Reset link sent.',
        'error_sending_reset_link' => 'Error sending reset link.',
        'password_reset_successfully' => 'Password reset successfully.',
        'password_reset_failed' => 'Password reset failed.',
    ],

    '2fa' => [
        'already_enabled' => '2FA is already enabled.',
        'not_enabled' => '2FA is not enabled.',
        'invalid_code' => 'Invalid 2FA code.',
        'enabled_successfully' => '2FA enabled.',
        'already_disabled' => '2FA is already disabled.',
        'disabled_successfully' => '2FA disabled.',
        'auth.2fa.two_factor_authentication_required' => '2FA is required for this action.',
    ],

];
