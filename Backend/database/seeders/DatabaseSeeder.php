<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CleanDatabaseSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            EmployeeSeeder::class,
            AccountSeeder::class,
            CardSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
