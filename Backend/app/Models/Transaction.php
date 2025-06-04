<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'origin_account_id',
        'destination_account_id',
        'external_destination_iban',
        'card_id',
        'reference',
        'amount',
        'status',
        'type',
        'concept'
    ];


    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function originAccount()
    {
        return $this->belongsTo(Account::class, 'origin_account_id');
    }
    
    public function destinationAccount()
    {
        return $this->belongsTo(Account::class, 'destination_account_id');
    }

    public function card()
    {
        return $this->belongsTo(Card::class);
    }

    public function scopeAllCustomerTransactions($query, Customer $customer)
    {
        $accountIds = $customer->accounts()->pluck('accounts.id');
        $cardIds = Card::whereIn('account_id', $accountIds)->pluck('id');

        // return $query->where(function ($q) use ($accountIds, $cardIds) {
        //     $q->whereIn('origin_account_id', $accountIds)
        //     ->orWhereIn('destination_account_id', $accountIds)
        //     ->orWhereIn('card_id', $cardIds);
        // });

    return $query->select('transactions.*', 
            'origin_accounts.alias as origin_account_alias',
            'destination_accounts.iban as destination_account_alias',
            'cards.alias as card_alias'
        )
        ->leftJoin('accounts as origin_accounts', 'transactions.origin_account_id', '=', 'origin_accounts.id')
        ->leftJoin('accounts as destination_accounts', 'transactions.destination_account_id', '=', 'destination_accounts.id')
        ->leftJoin('cards', 'transactions.card_id', '=', 'cards.id')
        ->where(function ($q) use ($accountIds, $cardIds) {
            $q->whereIn('origin_account_id', $accountIds)
              ->orWhereIn('destination_account_id', $accountIds)
              ->orWhereIn('card_id', $cardIds);
        });    }
}
