<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AdminController extends Controller {

	public function accountInfo(Request $request) {
		$currentUser = JWTAuth::parseToken()->authenticate();

		return response()->json(['status'=>'success', 'username'=>$currentUser->username]);
	}

	public function updateAccount(Request $request) {
		$currentUser = JWTAuth::parseToken()->authenticate();
	}

	public function jwtCheck(Request $request) {
		try {
			if (! $user = JWTAuth::parseToken()->authenticate()) {
				return response()->json(['error'=>'token_invalid'], 400);
			}
		}
		catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
			return response()->json(['error'=>'token_expired'], $e->getStatusCode());
		}
		catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			return response()->json(['error'=>'token_invalid'], $e->getStatusCode());
		}
		catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
			return response()->json(['error'=>'token_absent'], $e->getStatusCode());
		}

		//Get Token
		$token = JWTAuth::getToken();

		//Make sure $user isn't null - probably unnecessary
		if (is_null($user)) {
			return response()->json(['fail'=>'invalid_token']);
		}

		//Token is valid, might as well give them a new one
		return response()->json(['success'=>'success', 'jwt'=>JWTAuth::refresh($token), 'id'=>$user->id, 'username'=>$user->username, 'email'=>$user->email, 'account_status'=>$user->account_status]);
	}


}
