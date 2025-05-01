<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'email'=> 'admin@admin.es',
            'status'=> 'active',
            'google2fa_secret'=> null,
            'google2fa_enabled'=> false,
            'password'=> Hash::make('659735061'),
            'type'=> 'employee',
        ]);

        User::create([
            'email'=> 'john@cena.es',
            'status'=> 'active',
            'google2fa_secret'=> null,
            'google2fa_enabled'=> false,
            'password'=> Hash::make('659735061'),
            'type'=> 'customer',
        ]);

        User::create([
            'email'=> 'randy@orton.es',
            'status'=> 'active',
            'google2fa_secret'=> null,
            'google2fa_enabled'=> false,
            'password'=> Hash::make('659735061'),
            'type'=> 'customer',
        ]);
    }
}
