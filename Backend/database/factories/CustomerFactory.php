<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'date_of_birth' => $this->faker->date('Y-m-d', '2005-01-01'),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'DNI' => strtoupper($this->faker->unique()->bothify('########?')),
            'phone' => $this->faker->e164PhoneNumber,
            'address' => $this->faker->address,
            'occupation' => $this->faker->jobTitle,
            'avatar' => null,            
        ];
    }
}
