<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->safeEmail,
            'status' => 'active',
            'google2fa_secret' => null,
            'google2fa_enabled' => false,
            'password' => Hash::make('password'), 
            'type' => $this->faker->randomElement(['customer', 'employee']),
        ];
    }
}
