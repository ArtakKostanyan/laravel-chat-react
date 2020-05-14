<?php

use App\Events\MyEvent;
use App\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::group(['middleware' => ['auth']], function () {
    Route::get('/', function () {

        return view('welcome');
    });
});

Route::get('/delete', function () {

    $message=Message::where('from', Auth::user()->id)->first();
     $now= Carbon::now();
    $befor=Carbon::parse($message->created_at);
    $minute=Carbon::createFromTimestamp($now->getTimestamp()- $befor->getTimestamp())->minute;
    $hour=Carbon::createFromTimestamp($now->getTimestamp()- $befor->getTimestamp())->hour;

    if ($minute===15 && $hour===9){
        Message::where('from', Auth::user()->id)->delete();
    }else{
        return Redirect::back()->withErrors(['Not Time For Delete Messages', 'The Message']);
    }

});


