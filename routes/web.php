<?php

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

Route::get('tos', function() { return view('tos'); });
Route::get('privacy', function() { return view('privacy'); });

Route::get('/', function() { return view('home'); });
//Route::get('/', function () { return redirect()->away('https://play.google.com/store/apps/details?id=com.mpvreeken.rpgcompanion'); });


Route::get('auth/login', 'JWTAuthController@getWebLogin');
Route::post('auth/login', 'JWTAuthController@postWebLogin');
Route::get('auth/logout', 'JWTAuthController@getWebLogout');
Route::post('auth/logout', 'JWTAuthController@postWebLogout');
Route::post('auth/register', 'JWTAuthController@register');
Route::get('auth/register', 'JWTAuthController@showRegister');

Route::get('auth/reset-password', 'JWTAuthController@showResetPassword');
Route::get('auth/forgot-password', 'JWTAuthController@showForgotPassword');


//Route::get('/npcs/public/{id?}', 'NPCController@getPublicNPCsPage');
Route::get('/npcs', 'NPCController@getNPCsPage');
Route::get('/npcs/{id?}', 'NPCController@getNPCsPageWithID');



Route::get('/names', 'NPCController@getNamesPage');
Route::get('/hooks/{id?}', 'HookController@getPostsPage');
Route::get('/dungeons/{id?}', 'DungeonController@getPostsPage');
Route::get('/items/{id?}', 'ItemController@getPostsPage');
Route::get('/riddles/{id?}', 'RiddleController@getPostsPage');
Route::get('/puzzles/{id?}', 'PuzzleController@getPostsPage');
Route::get('/maps/{id?}', 'MapController@getPostsPage');
Route::get('/encounters', 'MiscController@getEncountersPage');
Route::get('/enemies', 'MiscController@getEnemiesPage');
Route::get('/dice', 'MiscController@getDicePage');
Route::get('/loot', 'MiscController@getLootPage');
Route::get('/resources', 'MiscController@getResourcesPage');
Route::get('/adventures', 'MiscController@getAdventuresPage');
Route::get('/d100', 'D100Controller@getD100Page');
