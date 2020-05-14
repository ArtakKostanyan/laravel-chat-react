<?php

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/users', function ( Request $request) {


    return response()->json( ['users'=>User::all()]);
});

Route::post('/message','Api\MessageController@index');
Route::post('/send-message','Api\MessageController@sendMessage');
