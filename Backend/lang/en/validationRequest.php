<?php

/*
|--------------------------------------------------------------------------
| Validation Language Lines
|--------------------------------------------------------------------------
|
| The following language lines are used during validation for various
| attributes. Some of these rules have multiple versions such as
| the "size" rules. Feel free to modify these language lines according
| to your application's requirements.
|
*/

return [
    'email.required' => 'The email field is required.',
    'email.email' => 'Please enter a valid email address.',
    'email.exists' => 'This email is not registered in our system.',
    'password.required' => 'Password is required.',
    'password.string' => 'The password must be a valid string.',
    'password.min' => 'The password must be at least 8 characters long.',
    'password.confirmed' => 'The password confirmation does not match.',
    'password.different' => 'The new password cannot be the same as the current password. mamañema',
    'token.required' => 'The token is required.',
    'token.string' => 'The token must be a valid string.',
    'name.required' => 'The name field is required.',
    'name.string' => 'The name must be a valid string.',
    'name.max' => 'The name may not be greater than 100 characters.',
];
