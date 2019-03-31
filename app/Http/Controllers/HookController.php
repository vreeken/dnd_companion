<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hook;
use App\HookVote;
use App\Traits\PostBaseMethods;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'hook');
defined('POST_TABLE') || define('POST_TABLE', POST_TYPE.'s');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Plot Hook');

class HookController extends Controller {
	public $model = Hook::class;

	use PostBaseMethods;

	public function submitPost(Request $request) {
		if (!$request->has(POST_TYPE.'_title') || !$request->has(POST_TYPE.'_body')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$post = new Hook;
		$postVote = new HookVote;

		$post->title = $request->input(POST_TYPE.'_title');
        $post->description = $request->input(POST_TYPE.'_body');

		return $this->_submitPost($post, $postVote, $request);
	}
}