<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Card extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'account_id',
        'card_number',
        'cvv',
        'expiration_date',
        'status',
        'type',
    ];

    protected $casts = [
        'expiration_date' => 'date',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
