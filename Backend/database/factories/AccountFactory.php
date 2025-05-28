<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'alias' => $this->faker->optional()->word(),
            'iban' => $this->faker->unique()->iban('ES'),
            'balance' => $this->faker->randomFloat(2, 0, 10000),
            'swift' => strtoupper($this->faker->bothify('????ESMMXXX')),
            'status' => $this->faker->randomElement(['active', 'blocked', 'closed']),
            'type' => $this->faker->randomElement(['checking', 'savings', 'investment']),
            'open_date' => $this->faker->date()
        ];
    }
}
