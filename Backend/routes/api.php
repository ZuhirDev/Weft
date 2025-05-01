<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return response()->json(["message" => "Estas en la ruta '/' de api.php"]);
})->name('login');

Route::get('languages', function(){
    return response()->json(config('languages'));
});


require __DIR__ . '/auth.php';
