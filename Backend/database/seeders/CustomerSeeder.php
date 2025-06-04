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

        $carlos = User::where('email', 'carlos@carlos.es')->first();
        $laura = User::where('email', 'laura@laura.es')->first();

        if ($carlos) {
            Customer::create([
                'user_id' => $carlos->id,
                'name' => 'Carlos',
                'last_name' => 'Sánchez',
                'date_of_birth' => '1990-05-15',
                'gender' => 'male',
                'dni' => '12345678A',
                'phone' => '612345678',
                'address' => 'Calle Falsa 123, Madrid',
                'occupation' => 'Ingeniero',
                'avatar' => null,
            ]);
        }

        if ($laura) {
            Customer::create([
                'user_id' => $laura->id,
                'name' => 'Laura',
                'last_name' => 'Martínez',
                'date_of_birth' => '1992-03-22',
                'gender' => 'female',
                'dni' => '87654321B',
                'phone' => '634567890',
                'address' => 'Avenida de la Paz 45, Valencia',
                'occupation' => 'Diseñadora gráfica',
                'avatar' => null,
            ]);
        }
    }
}
