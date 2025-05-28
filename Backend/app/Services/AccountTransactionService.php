<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Card;
use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AccountTransactionService{

    public function depositFunds(Account $account, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => null,
            'destination_account_id' => $account->id,
            'reference' => Str::random(8),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'deposit',
            'concept' => $data['concept'] ?? null,
        ]);

        $account->increment('balance', $data['amount']);

        return $transaction;
    }

    public function withdrawalFunds(Account $account, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $account->id,
            'reference' => Str::random(8),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'withdrawal',
            'concept' => $data['concept'] ?? null,
        ]);

        $account->decrement('balance', $data['amount']);

        return $transaction;
    }

    public function transferFunds(Account $origin, Account $destination, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $origin->id,
            'destination_account_id' => $destination->id,
            'reference' => Str::random(8),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'transfer',
            'concept' => $data['concept'] ?? null,
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
            'reference' => Str::random(8),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'transfer',
            'concept' => $data['concept'] ?? null,
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

    public function latestTransactions(int $customerId)
    {
        $customer = Customer::with('accounts.cards')->findOrFail($customerId);

        $accountIds = $customer->accounts->pluck('id');
        $cardIds = $customer->accounts->flatMap(function ($account) {
            return $account->cards->pluck('id');
        });

        $transactions = Transaction::where(function ($query) use ($accountIds, $cardIds) {
            $query->whereIn('origin_account_id', $accountIds)
                  ->orWhereIn('destination_account_id', $accountIds)
                  ->orWhereIn('card_id', $cardIds);
        })
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();

        return $transactions;
    }

    public function latestTransactionsByAccount(int $accountId)
    {
        $cardIds = Card::where('account_id', $accountId)->pluck('id');

        $transactions = Transaction::where(function ($query) use ($accountId, $cardIds) {
            $query->where('origin_account_id', $accountId)
                  ->orWhere('destination_account_id', $accountId)
                  ->orWhereIn('card_id', $cardIds);
        })
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();

        return $transactions;    
    }

public function transactionMessage(Account $account, Transaction $transaction)
{
    $amount = number_format($transaction->amount, 2);

    switch ($transaction->type) {
        case 'deposit':
            return __('transaction/messages.deposit_received', ['amount' => $amount]);

        case 'withdrawal':
            return __('transaction/messages.withdrawal_made', ['amount' => $amount]);

        case 'transfer':
            if (isset($transaction->external_destination_iban)) {
                if ($transaction->origin_account_id === $account->id) {
                    return __('transaction/messages.external_transfer_made', [
                        'amount' => $amount,
                        'iban' => $transaction->external_destination_iban,
                    ]);
                }
            } else {
                if ($transaction->origin_account_id === $account->id) {
                    return __('transaction/messages.transfer_sent', ['amount' => $amount]);
                } elseif ($transaction->destination_account_id === $account->id) {
                    return __('transaction/messages.transfer_received', ['amount' => $amount]);
                }
            }
            break;

        case 'card_payment':
            if ($transaction->origin_account_id === $account->id) {
                $concept = $transaction->concept ? ' (' . $transaction->concept . ')' : '';
                return __('transaction/messages.card_payment_done', [
                    'amount' => $amount,
                    'concept' => $concept,
                ]);
            }
            break;

        default:
            return __('transaction/messages.default_message', ['amount' => $amount]);
    }
}


    public function hasEnoughBalance(Account $account, float $amount): bool
    {
        return $account->balance >= $amount;
    }
    
    public function formatTransactions(Collection $transactions): array
    {
        return $transactions->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'amount' => (float) $transaction->amount,
                'type' => $transaction->type,
                'status' => $transaction->status,
                'reference' => $transaction->reference,
                'concept' => $transaction->concept,
                'date' => $transaction->created_at,
            ];
        })->toArray();
}
}