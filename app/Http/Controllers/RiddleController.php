<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Riddle;
use App\RiddleVote;
use App\Traits\PostBaseMethods;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'riddle');
defined('POST_TABLE') || define('POST_TABLE', POST_TYPE.'s');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Riddle');

class RiddleController extends Controller {
    public $model = Riddle::class;

    use PostBaseMethods;

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
