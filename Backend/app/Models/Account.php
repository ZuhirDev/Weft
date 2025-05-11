<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
<<<<<<< HEAD
        'customer_id', 
        'iban',
        'balance',
        'swift',
        'status', // evitar operaciones si no esta activada
=======
        'alias',
        'iban',
        'balance',
        'swift',
        'status',
>>>>>>> b43b5b3 (Temporales)
        'type',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'account_customer')
                    ->withPivot('role')
                    ->withTimestamps();
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
<<<<<<< HEAD
    

    public static function getSwiftCode()
    {
        return 'WEFTESMMXXX';
    } 
=======
>>>>>>> b43b5b3 (Temporales)

    public function scopeTable($query)
    {
        return $query;
    }

    public function isActive()
    {
        return $this->status === 'active';
    }
}
