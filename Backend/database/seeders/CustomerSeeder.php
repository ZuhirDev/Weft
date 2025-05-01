<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // User::where('type', 'customer')->get()->each(function ($user){
        //     Customer::create([
        //         'user_id'=> $user->id,
        //         'name'=> 'John',
        //         'last_name'=> 'Cena',
        //         'date_of_birth'=> '1977-04-23',
        //         'gender'=> 'male',
        //         'DNI'=> '49019442W',
        //         'phone'=> '+12812363495',
        //         'address'=> '123 Main St',
        //         'occupation'=> 'actor',
        //         'avatar'=> null,
        //     ]);
        //     // Customer::factory()->create([
        //     //     'user_id'=> $user->id,               
        //     // ]);
        // });

        $john = User::where('email', 'john@cena.es')->first();

        if ($john) {
            Customer::create([
                'user_id' => $john->id,
                'name' => 'John',
                'last_name' => 'Cena',
                'date_of_birth' => '1977-04-23',
                'gender' => 'male',
                'DNI' => '49019442W',
                'phone' => '+12812363495',
                'address' => '123 Main St',
                'occupation' => 'actor',
                'avatar' => null,
            ]);
        }

        
        $randy = User::where('email', 'randy@orton.es')->first();

        if ($randy) {
            Customer::create([
                'user_id' => $randy->id,
                'name' => 'Randy',
                'last_name' => 'Orton',
                'date_of_birth' => '1980-04-01',
                'gender' => 'male',
                'DNI' => '44556677Y',
                'phone' => '+34611223344',
                'address' => 'Calle Wrestling 8',
                'occupation' => 'wrestler',
                'avatar' => null,
            ]);
        }
    }
}
