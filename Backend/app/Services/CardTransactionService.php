<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Card;
use App\Models\Transaction;
use Illuminate\Support\Str;

class CardTransactionService{

    public function getCardByNumber(string $cardNumber, int $customerId): ?Card
    {
        return Card::where('card_number', $cardNumber)
            ->whereHas('account.customers', function ($query) use ($customerId) {
                $query->where('customers.id', $customerId);
            })
            ->first();
    }

    public function createCardTransaction(Account $account, int $cardId, array $data)
    {
        $transaction = Transaction::create([
            'origin_account_id' => $account->id,
            'card_id' => $cardId,
            'reference' => Str::uuid(),
            'amount' => $data['amount'],
            'status' => 'completed',
            'type' => 'card_payment',
            'concept' => $data['concept'],
        ]);

        $account->decrement('balance', $data['amount']);

        return $transaction;
    }

    public function hasEnoughBalance(Account $account, float $amount): bool
    {
        return $account->balance >= $amount;
    }

    public function getCardTransaction(Card $card)
    {
        return $card->transactions()
                             ->orderBy('created_at', 'desc')
                             ->get();
    }
}