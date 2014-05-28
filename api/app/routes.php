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
Route::get('get-games/{title}', 'GiantBombController@getGames');
Route::get('get-game/{id}', 'GiantBombController@getGame');
Route::get('get-users/{email}/{title}/{month}/{day}/{year}/{game_id}/{selected_date}', 'UserController@getUser');
Route::get('confirm-user/{email}/{userId}', 'UserController@confirmUser');
Route::get('unconfirm-user/{email}/{userId}', 'UserController@unconfirmUser');
Route::get('send-notification/', 'NotificationController@sendNotification');
Route::get('update-games/', 'UpdateController@updateGames');