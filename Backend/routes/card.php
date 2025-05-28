<?php

use App\Http\Controllers\Card\CardTransactionController;
use App\Http\Controllers\Card\CardController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:api', '2fa'])->group(function(){

    Route::post('card', [CardController::class, 'getCardsByAccount']);
    Route::get('card/all', [CardController::class, 'getAllCustomerCards']);
    Route::post('card/store', [CardController::class, 'store']);
    Route::post('card/pin', [CardController::class, 'showPin']);
    Route::put('card/pin', [CardController::class, 'updatePin']);
    Route::put('card/update', [CardController::class, 'update']);
    Route::get('card/types', [CardController::class, 'cardTypes']);


    
    Route::post('card/transaction/payment', [CardTransactionController::class, 'payment']);
    Route::post('card/transaction/all', [CardTransactionController::class, 'getAllTransactions']);
});