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
        'iban',
        'balance',
        'swift',
        'status', // evitar operaciones si no esta activada
        'type',
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

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function incomingTransactions()
    {
        return $this->hasMany(Transaction::class, 'destination_account_id');
    }
    
    public function outgoingTransactions()
    {
        return $this->hasMany(Transaction::class, 'origin_account_id');
    }
    

    public static function getSwiftCode()
    {
        return 'WEFTESMMXXX';
    } 

    public function scopeTable($query)
    {
        return $query;
    }

    public function isActive()
    {
        return $this->status === 'active';
    }
}
