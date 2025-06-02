<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\User;

class CustomerService{


    public function getCustomer(int $customerId)
    {
        return Customer::find($customerId);
    }

    public function createCustomer(int $userId, array $data): Customer
    {
        return Customer::create([
            'user_id' => $userId,
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
            'dni' => $data['dni'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'occupation' => $data['occupation'],
            'avatar' => $data['avatar'] ?? null,
        ]);
    }

    public function updateCustomer(Customer $customer, array $data): Customer
    {
        return Customer::create([
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
            'dni' => $data['dni'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'occupation' => $data['occupation'],
            'avatar' => $data['avatar'] ?? null,
        ]);
    }


    
    public function formatUserCustomer(User $user, Customer $customer): array
    {
        return [
            'email' => $user->email,
            'name' => $customer->name,
            'last_name' => $customer->last_name,
            'date_of_birth' => $customer->date_of_birth,
            'gender' => $customer->gender,
            'dni' => $customer->dni,
            'phone' => $customer->phone,
            'address' => $customer->address,
            'occupation' => $customer->occupation,
            'avatar' => $customer->avatar,
        ];
    }
}