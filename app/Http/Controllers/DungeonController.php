<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dungeon;
use App\DungeonVote;

class DungeonController extends ParentPostController {
    public $model;

	function __construct() {
		$this->model = new Dungeon();
	}

    public function submitPost(Request $request) {
		if (!$request->has($this->model->POST_TYPE.'_title') || !$request->has($this->model->POST_TYPE.'_body')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Dungeon;
		$postVote = new DungeonVote;

		$post->title = $request->input($this->model->POST_TYPE.'_title');
		$post->description = $request->input($this->model->POST_TYPE.'_body');

		$post->external_link = (!$request->has('external_link') || $request->input('external_link') === null) ? '' : $request->input('external_link');
		$post->image_link = (!$request->has('image_link') || $request->input('image_link') === null) ? '' : $request->input('image_link');

		return $this->_submitPost($post, $postVote, $request);
	}
}
