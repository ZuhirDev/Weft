<?php

use App\Models\Customer;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('account.{accountId}', function ($user, $accountId) {

    $customer = Customer::where('user_id', $user->id)->first();
    
    return $customer->accounts()->where('accounts.id', $accountId)->exists();
});

