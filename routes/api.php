<?php

use Illuminate\Http\Request;

Route::get('release-notes',					'MainController@getReleaseNotes');
Route::get('get-mobile-news',				'MainController@getMobileNews');


Route::post('hooks', 						'HookController@getPosts');
Route::get('hooks/{id}', 					'HookController@getPostDetails');

Route::post('riddles', 						'RiddleController@getPosts');
Route::get('riddles/{id}', 					'RiddleController@getRiddleDetails');

Route::post('items', 						'ItemController@getPosts');
Route::get('items/{id}', 					'ItemController@getPostDetails');

Route::post('puzzles', 						'PuzzleController@getPosts');
Route::get('puzzles/{id}', 					'PuzzleController@getPostDetails');

Route::post('dungeons', 					'DungeonController@getPosts');
Route::get('dungeons/{id}', 				'DungeonController@getPostDetails');

Route::post('maps', 						'MapController@getPosts');
Route::get('maps/get-environments', 		'MapController@getEnvironments');

Route::get('maps/{id}', 					'MapController@getPostDetails');

Route::post('npcs/public/get',				'NPCController@getPublicNPCs');

Route::post('poll-vote',					'MainController@pollVote');

Route::post('login', 						'JWTAuthController@login');
Route::post('register', 					'JWTAuthController@register');
Route::post('register2', 					'JWTAuthController@register2');
Route::get('confirm-email', 				'JWTAuthController@confirm');
Route::post('resend-email', 				'JWTAuthController@resendEmail');
Route::post('create-password-reset', 		'JWTAuthController@createPasswordReset');
Route::get('reset-password', 				'JWTAuthController@showResetPassword');
Route::post('reset-password', 				'JWTAuthController@resetPassword');

Route::post('comments/get',					'MainController@getComments');

Route::post('report',						'MainController@report');

Route::group(['middleware' => 'jwt.auth'], function () {
	
	Route::get('admin/check-token', 		'AdminController@jwtCheck');

	Route::post('hooks/new', 				'HookController@submitPost');
	Route::post('riddles/new', 				'RiddleController@submitPost');
	Route::post('items/new', 				'ItemController@submitPost');
	Route::post('puzzles/new', 				'PuzzleController@submitPost');
	Route::post('maps/new',					'MapController@submitPost');
	Route::post('dungeons/new', 			'DungeonController@submitPost');

    Route::post('npcs/new', 		    	'NPCController@createNPC');
    Route::post('npcs/update', 		    	'NPCController@updateNPC');

	Route::post('vote',						'MainController@vote');
	
	Route::post('bookmark',					'MainController@bookmark');

	Route::post('comments/new', 			'MainController@postComment');
	Route::post('comments/update', 			'MainController@updateComment');

	Route::post('admin/update-post',		'MainController@updatePost');
	Route::post('admin/delete-post',		'MainController@deletePost');

	Route::get('admin/account',				'JWTAuthController@getAccountInfo');

	Route::post('save-options', 			'AdminController@updateUserOptions');
});
