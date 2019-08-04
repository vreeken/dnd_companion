<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Riddle;
use App\RiddleVote;

class RiddleController extends ParentPostController {
    public $model;

	function __construct() {
		$this->model = new Riddle();
	}

    public function submitPost(Request $request) {
		if (!$request->has('riddle') && !$request->has('riddle_body')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}
		if (!$request->has('answer') && !$request->has('riddle_answer')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Riddle;
		$postVote = new RiddleVote;

		$post->riddle = $request->has('riddle') ? $request->input('riddle') : $request->has('riddle_body');
        $post->answer = $request->has('answer') ? $request->input('answer') : $request->input('riddle_answer');

		return $this->_submitPost($post, $postVote, $request);
	}
}
