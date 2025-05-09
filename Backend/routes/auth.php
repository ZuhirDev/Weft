<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountTransactions;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\TwoFactorAuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\TransactionController;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [PasswordResetController::class, 'sendResetLink']);  
Route::post('password-reset', [PasswordResetController::class, 'resetPassword'])->name('password.reset'); 

Route::get('prueba', function(Request $request){
    return response()->json(['message' => __('welcome.uknow')], 200);
});


Route::middleware(['auth:api', '2fa'])->group(function(){

    Route::middleware(['verified'])->group(function(){
        Route::get('only-verified', function(){
            return response()->json(["message" => "You are verified"]);
        });
    });

    Route::post('validate-password', [AuthController::class, 'validatePassword']);
    Route::post('update-password', [PasswordResetController::class, 'updatePassword']);
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('send-verify-email', [EmailVerificationController::class, 'sendVerificationEmail']);
    Route::get('verify-email', [EmailVerificationController::class, 'verifyEmail'])->middleware('signed')->name('verification.verify');

    Route::post('/2fa/enable', [TwoFactorAuthController::class, 'enable2FA']);
    Route::post('/2fa/verify', [TwoFactorAuthController::class, 'verify2FA'])->withoutMiddleware(['2fa'])->name('2fa.verify');
    Route::post('/2fa/disable', [TwoFactorAuthController::class, 'disable2FA']);





    Route::get('account', [AccountController::class, 'show']);
    Route::post('account/create', [AccountController::class, 'store']);
    Route::delete('account/destroy', [AccountController::class, 'destroy']); 
    Route::put('account/update', [AccountController::class, 'update']); 
    Route::get('account/search', [AccountController::class, 'searchByIban']);
    Route::post('account/status', [AccountController::class, 'changeStatus']);

    Route::post('account/transaction/deposit', [AccountTransactions::class, 'deposit']);
    Route::post('account/transaction/withdraw', [AccountTransactions::class, 'withdraw']);
    Route::post('account/transaction/transfer', [AccountTransactions::class, 'transfer']);
    Route::post('account/transaction/external-transfer', [AccountTransactions::class, 'externalTransfer']);
    Route::post('account/transaction/all-transactions', [AccountTransactions::class, 'accountTransactions']);


    
    Route::post('card', [CardController::class, 'getCardByAccount']);
    Route::post('card/store', [CardController::class, 'store']);
    Route::get('card/pin', [CardController::class, 'showPin']);
    Route::put('card/pin', [CardController::class, 'updatePin']);
    Route::put('card/status', [CardController::class, 'changeStatus']);

    Route::post('card/transaction/payment', [CardTransactionController::class, 'payment']);
    Route::post('card/transaction/all', [CardTransactionController::class, 'getAllTransactions']);

});