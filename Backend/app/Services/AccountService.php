<?php

namespace App\Services;

use App\Models\Account;
use Illuminate\Support\Collection;
use Faker\Factory as Faker;

class AccountService
{

    public static function getSwiftCode(): string
    {
        return 'WEFTESMMXXX'; 
    }

    public static function generateIban(string $countryCode = 'ES'): string
    {
        $faker = Faker::create();
        return $faker->iban($countryCode);
    }

    public function getAccountByCustomerId(int $customerId, string $iban): ?Account
    {
        return Account::whereHas('customers', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })
        ->where('iban', $iban)
        ->first();
    }

    public function getAccountById(int $customerId, string $accountId): ?Account
    {
        return Account::whereHas('customers', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })
        ->where('id', $accountId)
        ->first();
    }

    public function getAccountsByCustomerId(int $customerId): Collection
    {
        return Account::whereHas('customers', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })->get();
    }

    public function getAccountWithTrashed(int $customerId, string $iban): ?Account
    {
        return Account::where('customer_id', $customerId)
                        ->where('iban', $iban)
                        ->withTrashed()
                        ->first();
    }
    
    public function getFormattedHolders(Account $account): array
    {
        return $account->customers->map(function ($customer) {
            return [
                'name' => $customer->getFullName(),
                'role' => $customer->pivot->role,
            ];
        })->toArray();
    }


    public function formatSingleAccount(Account $account, string $email): array
    {
        return [
            'id' => $account->id,
            'holders' => $this->getFormattedHolders($account),
            'alias' => $account->alias,
            'iban' => $account->iban,
            'balance' => (float) $account->balance,
            'swift' => $account->swift,
            'status' => $account->status,
            'type' => $account->type,
            'open_date' => $account->open_date,
        ];
    }


    public function formatAccounts(Collection $accounts, string $email): array
    {
        return $accounts->map(fn($account) => $this->formatSingleAccount($account, $email))->toArray();
    }

    public function createAccount(int $customerId, array $data)
    {
        $iban = self::generateIban();
        $swift = self::getSwiftCode();

        $account = Account::create([
            'alias' => $data['alias'] ?? null, 
            'iban' => $iban,
            'swift' => $swift,
            'status' => 'active',
            'type' => $data['type'] ?? 'checking',
        ]);

        $account->customers()->attach($customerId, ['role', 'primary']);

        return $account;
    }

    public function addHolder(Account $account, int $customerId)
    {
        $account->customers()->attach($customerId, ['role' => 'secondary']);

        return $account;
    }

    public function deleteAccount(Account $account): bool
    {
        if ($account->deleted_at !== null) return false;
        
        $account->delete();
        return true;
    }

    public function updateAccount(Account $account, array $data)
    {
        $updated = $account->update([
            'alias' => $data['alias'] ?? $account->alias,
            'status' => $data['status'] ?? $account->status,
            'type' => $data['type'] ?? $account->type,           
        ]);

        return $updated ? $account->getChanges() : null;
    }
}