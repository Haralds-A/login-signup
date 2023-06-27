<?php

use App\Http\Controllers\Api\AuthControler;
use App\Http\Controllers\Api\UserControler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserControler::class);
});

Route::post('/signup', [AuthControler::class,'signup']);
Route::post('/login', [AuthControler::class,'login']);
Route::post('/logout', [AuthControler::class, 'logout'])->middleware('auth:sanctum');