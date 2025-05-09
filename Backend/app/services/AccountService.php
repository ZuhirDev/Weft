<?php

namespace App\Services;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AccountService
{
    public function getAccountsByCustomerId(int $customerId): Collection
    {
        return Account::where('customer_id', $customerId)->get();
    }

    public function formatAccounts(Collection $accounts, string $email): array
    {
        return $accounts->map(function ($account) use ($email) {
            return [
                'id' => $account->id,
                'titulares' => $email,
                'alias' => $account->alias,
                'iban' => $account->iban,
                'balance' => (float) $account->balance,
                'swift' => $account->swift,
                'status' => $account->status,
                'type' => $account->type,
                'open_date' => $account->open_date,
            ];
        })->toArray();
    }
    
    
}