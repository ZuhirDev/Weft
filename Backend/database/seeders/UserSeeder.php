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
            'password'=> Hash::make('11111111'),
            'type'=> 'employee',
        ]);

        User::create([
            'email'=> 'carlos@carlos.es',
            'status'=> 'active',
            'google2fa_secret'=> null,
            'google2fa_enabled'=> false,
            'password'=> Hash::make('11111111'),
            'type'=> 'customer',
        ]);

        User::create([
            'email'=> 'laura@laura.es',
            'status'=> 'active',
            'google2fa_secret'=> null,
            'google2fa_enabled'=> false,
            'password'=> Hash::make('11111111'),
            'type'=> 'customer',
        ]);
    }
}
