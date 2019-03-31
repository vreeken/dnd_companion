<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dungeon;
use App\DungeonVote;
use App\Traits\PostBaseMethods;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'dungeon');
defined('POST_TABLE') || define('POST_TABLE', POST_TYPE.'s');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Dungeon');

class DungeonController extends Controller {
    public $model = Dungeon::class;

    use PostBaseMethods;

    public function submitPost(Request $request) {
		if (!$request->has(POST_TYPE.'_title') || !$request->has(POST_TYPE.'_body')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Dungeon;
		$postVote = new DungeonVote;

		$post->title = $request->input(POST_TYPE.'_title');
		$post->description = $request->input(POST_TYPE.'_body');

		$post->external_link = (!$request->has('external_link') || $request->input('external_link') === null) ? '' : $request->input('external_link');
		$post->image_link = (!$request->has('image_link') || $request->input('image_link') === null) ? '' : $request->input('image_link');

		return $this->_submitPost($post, $postVote, $request);
	}
}
