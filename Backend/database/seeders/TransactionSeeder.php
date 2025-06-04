<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;


class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $carlosAccount = Account::whereHas('customers', function ($query) {
            $query->where('dni', '12345678A');
        })->first();

        $lauraAccount = Account::whereHas('customers', function ($query) {
            $query->where('dni', '87654321B');
        })->first();

        if($carlosAccount){
            for ($i = 0; $i < 30; $i++) {
    for ($i = 0; $i < 30; $i++) {
        $date = Carbon::now()->subDays($i);

        Transaction::create([
            'origin_account_id' => $carlosAccount->id,
            'destination_account_id' => $lauraAccount ? $lauraAccount->id : null,
            'card_id' => null,
            'reference' => Str::random(8),
            'amount' => $faker->randomFloat(2, 10, 1000),
            'status' => 'completed',
            'concept' => $faker->sentence(),
            'created_at' => $date,
            'updated_at' => $date,
        ]);
    }
            }

            $card = $carlosAccount->cards()->first();

            Transaction::create([
                'origin_account_id' => null,
                'destination_account_id' => null, 
                'card_id' => $card->id,
                'reference' => Str::random(8),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'status' => 'completed',
                'concept' => $faker->sentence(),
            ]);
        }

        if($lauraAccount){
            Transaction::create([
                'origin_account_id' => $lauraAccount->id,
                'external_destination_iban' => $faker->iban('ES'), 
                'card_id' => null,
                'reference' => Str::random(8),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'status' => 'completed',
                'concept' => $faker->sentence(),
            ]);

            $card = $lauraAccount->cards()->first();

            Transaction::create([
                'origin_account_id' => null,
                'destination_account_id' => null, 
                'card_id' => $card->id,
                'reference' => Str::random(8),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'status' => 'completed',
                'concept' => $faker->sentence(),
            ]);
        }
    }
}
