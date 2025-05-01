<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'customer_id', 
        'IBAN',
        'balance',
        'swift',
        'status',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function card()
    {
        return $this->hasMany(Card::class);
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
