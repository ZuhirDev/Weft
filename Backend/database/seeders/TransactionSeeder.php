<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        Account::all()->each(function($account) use ($faker){
            $destinationAccount = Account::where('IBAN', '!=', $account->IBAN)->inRandomOrder()->first();

            Transaction::create([
                'origin_account_id' => $account->IBAN,
                'destination_account_id' => $destinationAccount->IBAN, 
                'card_id' => null,
                'transaction_id' => Str::uuid()->toString(),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'status' => $faker->randomElement(['completed', 'pending', 'failed']),
                'concept' => $faker->sentence(),
                ]);        
        });
    }
}
