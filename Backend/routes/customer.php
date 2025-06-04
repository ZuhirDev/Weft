<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;



Route::post('customer/create', [CustomerController::class, 'storeUserAndCustomer']);


Route::middleware(['auth:api', '2fa'])->group(function(){

    // Route::post('customer/create', [CustomerController::class, 'storeCustomer']);
    Route::put('customer/update', [CustomerController::class, 'updateUserAndCustomer']);
    Route::get('customer', [CustomerController::class, 'getCustomer']);
});