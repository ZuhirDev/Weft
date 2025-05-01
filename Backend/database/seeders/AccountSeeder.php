<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        Customer::all()->each(function ($customer) use ( $faker){
            Account::create([
                'customer_id' => $customer->id, 
                'IBAN' => $faker->iban('ES'),
                'swift' => $faker->swiftBicNumber(),
                'status' => 'active',
            ]);
        });
    }
}
