<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::where('type', 'employee')->get()->each(function($user){
            Employee::create([
                'user_id' => $user->id,
                'name' => 'Administrador',
                'last_name'=> 'Administrador',
                'date_of_birth' => '2003-07-18',
                'gender' => 'male',
                'dni' => '77968397H',
                'phone' => '+34612293875',
                'address' => 'Calle Botera 7',
                'avatar' => null,
            ]);
        });
    }
}
