<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Customer;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        $carlos = Customer::where('dni', '12345678A')->first();
        $laura = Customer::where('dni', '87654321B')->first();

        if($carlos){
            $account = Account::create([
                'alias' => 'Cuenta de Carlos',
                'iban' => $faker->iban('ES'),
                'balance' => $faker->randomFloat(2, 1000, 5000),
                'swift' => 'WEFTESMMXXX',
                'status' => 'active',
            ]);

            $account->customers()->attach($carlos->id, ['role' => 'primary']);
        }

        if($laura){
            $account = Account::create([
                'alias' => 'Cuenta de Laura',
                'iban' => $faker->iban('ES'),
                'balance' => $faker->randomFloat(2, 1000, 5000),
                'swift' => 'WEFTESMMXXX',
                'status' => 'active',
            ]);

            $account->customers()->attach($laura->id, ['role' => 'primary']);
            $account->customers()->attach($carlos->id, ['role' => 'secondary']);
        }
    }
}
