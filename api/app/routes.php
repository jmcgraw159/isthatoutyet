<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('get-recent/{date}', 'GiantBombController@getRecent');
Route::get('get-games/{title}', 'GiantBombController@getGame');
Route::get('get-confirmed/{email}/{title}/{id}/{month}/{day}/{year}', 'MandrillController@getConfirmed');
Route::get('get-unconfirmed/{email}/{title}/{id}/{month}/{day}/{year}', 'MandrillController@getUnconfirmed');
Route::get('get-notification/{url}', 'MandrillController@getNotification');
Route::get('get-users/{email}', 'UserController@getUser');