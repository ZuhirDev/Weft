<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Card;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'origin_account_id' => null,
            'destination_account_id' => null,
            'external_destination_iban' => $this->faker->iban('ES'),
            'card_id' => Card::factory(),
            'reference' => Str::uuid()->toString(),
            'amount' => $this->faker->randomFloat(2, 1, 1000),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'concept' => $this->faker->sentence(),
        ];
    }
}
