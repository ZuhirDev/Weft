<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserService{

    public function createUser(array $data)
    {
        return User::create([
            "email" => $data['email'],
            "password" => Hash::make($data['password']),
        ]);
    }   
}