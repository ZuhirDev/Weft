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

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    'registration_successful' => 'Registration successful, :name! Welcome to our platform.',
    'invalid_credentials' => 'The credentials you entered are incorrect. Please check your email and password and try again.',
    'two_factor_required' => 'Two-factor authentication is required. Please complete the verification to continue.',
    'login_successful' => 'You have successfully logged in! Welcome back, :name.',
    'logout_successful' => 'You have successfully logged out. We hope to see you again soon.',
    'user_info_retrieved' => 'Your information has been successfully retrieved. Here are your account details.',
    'verification' => [
        'email_already_verified' => 'Your email address has already been verified. You can now log in with your account.',
        'verification_link_sent' => 'A new email verification link has been sent to your email address. Please check your inbox and follow the instructions.',
        'email_successfully_verified' => 'Your email address has been successfully verified. You can now access your account.',
    ],
    'passwords' => [
        'current_password_incorrect' => 'The current password you provided is incorrect. Please check and try again.',
        'new_password_same_as_current' => 'The new password cannot be the same as the current password. Please choose a different one.',
        'password_updated_successfully' => 'Your password has been updated successfully. You can now use your new password to log in.',
        'reset_link_sent' => 'A password reset link has been sent to your email address. Please check your inbox to continue.',
        'error_sending_reset_link' => 'There was an issue sending the password reset link. Please ensure your email is correct and try again.',
        'password_reset_successfully' => 'Your password has been successfully reset. You can now log in with your new password.',
        'password_reset_failed' => 'We couldn\'t reset your password. Please make sure the reset link is valid and try again.',
    ],
    '2fa' => [
        'already_enabled' => 'Two-factor authentication is already enabled on your account.',
        'not_enabled' => 'Two-factor authentication is not enabled on your account. Please enable it to enhance your account security.',
        'invalid_code' => 'The code you entered is invalid. Please verify the code and try again.',
        'enabled_successfully' => 'Two-factor authentication has been successfully enabled for your account. Your account is now more secure.',
        'already_disabled' => 'Two-factor authentication is already disabled on your account.',
        'disabled_successfully' => 'Two-factor authentication has been successfully disabled for your account. Your account is no longer secured with 2FA.',
        'auth.2fa.two_factor_authentication_required' => 'Two-factor authentication is required for this action. Please varify it to proceed.',
    ],

];
