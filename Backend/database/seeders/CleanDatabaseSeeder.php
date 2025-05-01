<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Card;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class CleanDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        Transaction::truncate();
        Card::truncate();
        Account::truncate();
        Customer::truncate();
        Employee::truncate();
        User::truncate();

        Schema::enableForeignKeyConstraints();
    }
}
