<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Riddle;
use App\RiddleVote;
use DB;
use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class D100Controller extends Controller {
	public function getD100Page(Request $request) {
		$data['user']='he';
		return view('sections.d100', ['data'=>$data]);
	}

	public function getListNames(Request $request) {
		
	}

	public function getList(Request $request, $id) {
		return response()->json($output);
	}
}
