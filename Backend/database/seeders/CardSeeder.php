<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        Account::all()->each(function ($account) use ($faker) {
            Card::create([
                'account_id' => $account->id,
                'card_number' => $faker->creditCardNumber(),
                'cvv' => $faker->numberBetween(100, 999),
                'expiration_date' => $faker->creditCardExpirationDateString(),
                'status' => 'active',
                'type' => $faker->randomElement(['debit', 'credit']),
            ]);
        });
    }
}
