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
		if (!$request->has('riddle') || !$request->has('answer')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Riddle;
		$postVote = new RiddleVote;

		$post->riddle = $request->input('riddle');
        $post->answer = $request->input('answer');

		return $this->_submitPost($post, $postVote, $request);
	}
}
