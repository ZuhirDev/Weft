<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Broadcasting\BroadcastController;

Route::get('/', function(){
    return response()->json(["message" => "Estas en la ruta '/' de api.php"]);
})->name('login');

Route::get('languages', function(){
    return response()->json(config('languages'));
});

Route::post('/broadcasting/auth', [BroadcastController::class, 'authenticate'])->middleware('auth:api');



require __DIR__ . '/auth.php';
require __DIR__ . '/account.php';
require __DIR__ . '/card.php';
require __DIR__ . '/customer.php';
