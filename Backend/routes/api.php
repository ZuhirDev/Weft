<?php

use App\Events\NotifyEvent;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return response()->json(["message" => "Estas en la ruta '/' de api.php"]);
})->name('login');

Route::get('languages', function(){
    return response()->json(config('languages'));
});

Broadcast::routes(['middleware' => ['auth:api']]);


Route::get('notify',function(){
    event(new NotifyEvent('Alguien ha pulsado el boton'));

    return response()->json(['status' => 'Notification sent']); 
} );




require __DIR__ . '/auth.php';
require __DIR__ . '/account.php';
require __DIR__ . '/card.php';
require __DIR__ . '/customer.php';
