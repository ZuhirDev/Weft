<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountTransactions;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', '2fa'])->group(function(){

    Route::get('account', [AccountController::class, 'show']);
    Route::post('account', [AccountController::class, 'showAccountDetails']);
    Route::post('account/create', [AccountController::class, 'store']);
    Route::post('account/add-holder', [AccountController::class, 'addHolder']);
    Route::delete('account/destroy', [AccountController::class, 'destroy']); 
    Route::put('account/update', [AccountController::class, 'update']); 
    Route::get('account/search', [AccountController::class, 'searchByIban']);
    Route::post('account/status', [AccountController::class, 'changeStatus']);



    Route::post('account/transaction/deposit', [AccountTransactions::class, 'deposit']);
    Route::post('account/transaction/withdraw', [AccountTransactions::class, 'withdraw']);
    Route::post('account/transaction/transfer', [AccountTransactions::class, 'transfer']);
    Route::post('account/transaction/external-transfer', [AccountTransactions::class, 'externalTransfer']);
    Route::post('account/transaction/all-transactions', [AccountTransactions::class, 'accountTransactions']);
});