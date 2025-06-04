<?php

namespace App\Models;

use App\Notifications\Auth\ResetPasswordNotification;
use App\Notifications\Auth\VerifyEmailNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,  SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'status',
        'google2fa_secret',
        'google2fa_enabled',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'google2fa_enabled' => 'boolean',
            'google2fa_secret' => 'string',
        ];
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification($this));
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            
        ];
    }

    public function is2FAEnabled()
    {
        return $this->google2fa_enabled;
    }

    public function employee():HasOne
    {
        return $this->hasOne(Employee::class);
    }

    public function customer():HasOne
    {
        return $this->hasOne(Customer::class, 'user_id', 'id');
    }
    
    public function scopeUserInfo($query)
    {
        return $query->select(
            'users.id',
            'users.email',
            'users.email_verified_at',
            'users.status',
            'users.password',
            'users.google2fa_secret',
            'users.google2fa_enabled',
            'users.remember_token',
            'users.type',
            'users.created_at',
            'users.updated_at',
            'users.deleted_at',
            'customers.id as customer_id',
            'customers.name',
            'customers.last_name',
            'customers.dni',
            'customers.date_of_birth',
            'customers.gender',
            'customers.phone',
            'customers.address',
            'customers.occupation',
            'customers.avatar'
        )->join('customers', 'customers.user_id', '=', 'users.id');
    }

}
