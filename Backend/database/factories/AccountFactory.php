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
            'IBAN' => $this->faker->unique()->iban('ES'),
            'swift' => strtoupper($this->faker->bothify('????ESMMXXX')),
            'balance' => $this->faker->randomFloat(2, 0, 10000),
            'status' => 'active',
        ];
    }
}
