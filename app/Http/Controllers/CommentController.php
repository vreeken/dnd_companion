<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Hook;
use DB;

class CommentController extends Controller {

	public function postComment(Request $request) {

		if (!$request->has("id") || !$request->has("type") || !$request->has("comment")) {
			return response()->json(["error"=>"Invalid data sent"]);
		}
		$type = $request->input("type");
		if ($type != "hook" && $type != "puzzle" && $hook != "encounter") {
			return response()->json(["error"=>"Invalid data sent"]);
		}

		$id = intval($request->input("id"));
		if ($request->input("id") != $id) {
			return response()->json(["error"=>"Invalid data sent"]);
		}
	
		if (DB::table($type . '_comments')->insert([$type.'_id' => $id, 'user_id' => 1, "comment" => $request->input("comment")])) {
			return response()->json(["msg"=>"Comment saved"]);
		}
		else {
			return response()->json(["error"=>"Unable to save comment. Please try again."]);
		}
	}

	public function getHookDetails(Request $request, $id) {
		
	}
}
