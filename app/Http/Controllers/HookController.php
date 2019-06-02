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
		if (!$request->has($this->model->POST_TYPE.'_title') && !$request->has('title')) {
			return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing title param'], 400);
		}
		if (!$request->has($this->model->POST_TYPE.'_body') && !$request->has('body')) {
			return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing body param'], 400);
		}

		$post = new Hook;
		$postVote = new HookVote;

		$post->title = $request->has($this->model->POST_TYPE.'_title') ? $request->input($this->model->POST_TYPE.'_title') : $request->input('title');
        $post->description = $request->has($this->model->POST_TYPE.'_body') ? $request->input($this->model->POST_TYPE.'_body') : $request->input('body');

		return $this->_submitPost($post, $postVote, $request);
	}
}
