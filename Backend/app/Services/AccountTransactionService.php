<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Str;

class AccountTransactionService{

    public function depositFunds(Account $account, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => null,
            'destination_account_id' => $account->id,
            'reference' => Str::uuid()->toString(),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'deposit',
            'concept' => $data['concept'],
        ]);

        $account->increment('balance', $data['amount']);

        return $transaction;
    }

    public function withdrawalFunds(Account $account, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $account->id,
            'reference' => Str::uuid()->toString(),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'withdrawal',
            'concept' => $data['concept'],
        ]);

        $account->decrement('balance', $data['amount']);

        return $transaction;
    }

    public function transferFunds(Account $origin, Account $destination, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $origin->id,
            'destination_account_id' => $destination->id,
            'reference' => Str::uuid()->toString(),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'transfer',
            'concept' => $data['concept'],
        ]);

        $origin->decrement('balance', $data['amount']);
        $destination->increment('balance', $data['amount']);

        return $transaction;
    }

    public function transferExternalFunds(Account $account, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $account->id,
            'external_destination_iban' => $data['external_iban'],
            'reference' => Str::uuid()->toString(),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'transfer',
            'concept' => $data['concept'],
        ]);

        $account->decrement('balance', $data['amount']);

        return $transaction;
    }

    public function getAccountTransactions(Account $account)
    {
        return Transaction::where(function ($query) use ($account) {
                                $query->where('origin_account_id', $account->id)
                                    ->orWhere('destination_account_id', $account->id);
                            })
                            ->orderBy('created_at', 'desc')
                            ->get();
    }

    public function hasEnoughBalance(Account $account, float $amount): bool
    {
        return $account->balance >= $amount;
    }    
}