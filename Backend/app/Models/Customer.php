<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'last_name',
        'date_of_birth',
        'gender',
        'dni',
        'phone',
        'address',
        'occupation',
        'avatar',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function accounts()
    {
        return $this->belongsToMany(Account::class, 'account_customer')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    public function getFullName()
    {
        return "{$this->name} {$this->last_name}";
    }
}
