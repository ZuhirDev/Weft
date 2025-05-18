<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => Account::factory(),
            'card_number' => $this->faker->creditCardNumber,
            'pin' => strval($this->faker->numberBetween(1000, 9999)),
            'cvv' => $this->faker->numerify('###'),
            'expiration_date' => $this->faker->dateTimeBetween('+1 year', '+5 years')->format('Y-m-d'),
            'status' => 'active',
            'type' => $this->faker->randomElement(['debit', 'credit']),
        ];
    }
}
