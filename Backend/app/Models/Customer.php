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
        'DNI',
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
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->hasMany(Account::class);
    }
}
