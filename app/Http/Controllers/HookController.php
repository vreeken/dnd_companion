<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hook;
use App\HookVote;

class HookController extends ParentPostController {
	public $model;

	function __construct() {
		$this->model = new Hook();
	}

	public function submitPost(Request $request) {
		if (!$request->has($this->model->POST_TYPE.'_title') || !$request->has($this->model->POST_TYPE.'_body')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Hook;
		$postVote = new HookVote;

		$post->title = $request->input($this->model->POST_TYPE.'_title');
        $post->description = $request->input($this->model->POST_TYPE.'_body');

		return $this->_submitPost($post, $postVote, $request);
	}
}
