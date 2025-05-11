<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class CardSeeder extends Seeder
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
            Card::create([
                'account_id' => $carlosAccount->id,
                'alias' => $faker->word(),
                'card_number' => $faker->numerify('################'),
                'cvv' => $faker->numberBetween(100, 999),
                'expiration_date' => now()->addYears(5),
                'status' => 'active',
                'type' => 'debit',
                'pin' => Crypt::encryptString($faker->numberBetween(1000, 9999)),  
            ]);
        }

        if($lauraAccount){
            Card::create([
                'account_id' => $lauraAccount->id,
                'card_number' => $faker->creditCardNumber(),
                'cvv' => $faker->numberBetween(100, 999),
                'expiration_date' => now()->addYears(5),
                'status' => 'active',
                'type' => 'debit',
                'pin' => Crypt::encryptString($faker->numberBetween(1000, 9999)),  
            ]);
        }
    }
}
