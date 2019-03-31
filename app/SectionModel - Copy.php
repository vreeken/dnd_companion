<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use DB;

use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

defined('VOTES_TABLE') || define('VOTES_TABLE', POST_TYPE.'_votes');
defined('COMMENTS_TABLE') || define('COMMENTS_TABLE', POST_TYPE.'_comments');
defined('COMMENT_VOTES_TABLE') || define('COMMENT_VOTES_TABLE', POST_TYPE.'_comment_votes');
defined('BOOKMARKS_TABLE') || define('BOOKMARKS_TABLE', POST_TYPE.'_bookmarks');

class SectionModel extends Model {
	public static function getUser() {
		$user=null;
		try { $user = JWTAuth::toUser(JWTAuth::getToken()); }
		catch(JWTException $e) { $user = Auth::user(); }
		return $user;
	}

	public static function getUserOptions($user='') {
		//If we didn't get the $user passed in to us, attempt to get it
		if ($user=='') { $user = self::getUser(); }

		//If we have an authenticated user, store in the db
		if ($user) {
			$options = $user->options;
			if (is_null($options) || !$options || $options == 'null') {
				$options = USER::DEFAULT_OPTIONS;
			}
		}
		//otherwise use the session to store user options
		else {
			//Check if there are user options in the session, if not, initialize them with default values
			if (!session()->has('user_options')) {
				session(['user_options' => USER::DEFAULT_OPTIONS]);
			}
			$options = session('user_options', USER::DEFAULT_OPTIONS);
		}
	
		return json_decode($options);
	}

	public static function setUserOption($user='', $key, $val) {
		if ($user=='') { $user = self::getUser(); }

		$options = self::getUserOptions();

		//Make sure option key is valid
		if (array_search($key, USER_OPTION_KEYS) === false) {
			return false;
		}
		$options->$key = $val;

		//if user is logged in then save to db
		if ($user) {
			$user->options = json_encode($options);
			if ($user->save()) {
				return true;
			}
		}
		else {
			//otherwise store option data in session
			session(['user_options' => json_encode($options)]);
		}
		return true;
	}

	/**
	 * saveOptions
	 * AJAX call that saves user options to either an authenticated user's db, or to the session
	 * 
	 * @param Request $request
	 * @return json response success/error
	 */
	public static function saveOptions(Request $request) {
		if (!$request->has('option') || !$request->has('value')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		if (self::setUserOption(self::getUser(), $request->input('option'), $request->input('value'))) {
			return response()->json(['success'=>'option_saved']);
		}
		else {
			return response()->json(['error'=>'invalid_option'], 400);
		}
	}










	public static function getPosts($request) {
		//TODO
		//	Dealing with large table random queries
		//		Consider creating a temp table each night with a list of continuous ids mapped to valid (not deleted) post ids
		//		Then creating a list of random ids, client side, and grab from there
		//		Another option is to just grab random ids, but if they are deleted, then we just return 9 instead of 10 entries
		//		Another option is to live with the slow order by RAND(), but to pre-fetch everything so that it doesn't seem slow to the user

		$user=self::getUser();
				
		//Predefined output object
		$output['posts']=[];
		$output['success']=false;
		$output['msg']='constants_not_defined';

		//Make sure some certain values are pre-defined from our child Model, otherwise return our erroneous output
		if (!defined('POST_TABLE') || !defined('VOTES_TABLE') || !defined('POST_TYPE') || !defined('BOOKMARKS_TABLE') || !defined('POST_SELECT_QUERY')) {
			return $output;
		}
		
		//Clear error msg
		$output['msg']='';

		//Get values or use defaults
		$qty=10;
		$filter = $request->has("filter") ? intval($request->input("filter")) : false;
		$page = $request->has('page') ? intval($request->input('page')) : 0;
		$method = $request->has('method') ? $request->input('method') : 'r';
		$seed = $request->has('seed') ? intval($request->input('seed')) : 0;

		switch ($method) {
			case 'r':
				//Random
				$ORDER_BY_QUERY = 'RAND('.$seed.')';
				break;
			case 'uv':
				//Upvotes, Descending (Upvotes)			
				$ORDER_BY_QUERY = '(upvotes - downvotes) DESC';
				break;
			case 'dv':
				//Upvotes, Ascending (Downvotes)
				$ORDER_BY_QUERY = '(upvotes - downvotes) ASC';
				break;
			case 'dd':
				//Date, Descending (Newest)
				$ORDER_BY_QUERY = POST_TABLE.'.id DESC';
				break;
			case 'da':
				//Date, Ascending (Oldest)
				$ORDER_BY_QUERY = POST_TABLE.'.id ASC';
				break;

			default:
				$output['error']="invalid_method";
				return $output;
				break;
		}

		if ($user) {
			$RAW_VOTED_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TYPE.'s.id AND '.VOTES_TABLE.'.vote=0 AND '.VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TYPE.'s.id AND '.VOTES_TABLE.'.vote=1 AND '.VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 1 '.
				'ELSE -1 END) AS voted'.
				', (SELECT count(*) FROM '.BOOKMARKS_TABLE.' WHERE '.BOOKMARKS_TABLE.'.'.POST_TYPE.'_id='.POST_TYPE.'s.id AND '.BOOKMARKS_TABLE.'.user_id='.intval($user->id).') AS saved';
		}
		else {
			$RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
		}



		switch ($filter) {
			case 1:
				//Just Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(POST_TABLE)
						->join('users', POST_TABLE.'.user_id', '=', 'users.id')
						->select(
							DB::raw(POST_SELECT_QUERY), 
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1) as upvotes'),
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0) as downvotes'),
							DB::raw('(SELECT count(*) FROM '.POST_TYPE.'_comments WHERE '.POST_TYPE.'_comments.'.POST_TYPE.'_id='.POST_TABLE.'.id) as commentcount'),
							DB::raw($RAW_VOTED_QUERY))
						->where(POST_TABLE.'.user_id', $user->id)
						->whereNull(POST_TABLE.'.deleted_at')
						->take($qty)
						->orderByRaw($ORDER_BY_QUERY)
						->skip($page * $qty)
						->get();
				break;
			case 2:
				//Not Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(POST_TABLE)
						->join('users', POST_TABLE.'.user_id', '=', 'users.id')
						->select(
							DB::raw(POST_SELECT_QUERY), 
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1) as upvotes'),
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0) as downvotes'),
							DB::raw('(SELECT count(*) FROM '.POST_TYPE.'_comments WHERE '.POST_TYPE.'_comments.'.POST_TYPE.'_id='.POST_TABLE.'.id) as commentcount'),
							DB::raw($RAW_VOTED_QUERY))
						->where(POST_TABLE.'.user_id', "<>", $user->id)
						->whereNull(POST_TABLE.'.deleted_at')
						->take($qty)
						->orderByRaw($ORDER_BY_QUERY)
						->skip($page * $qty)
						->get();
				break;
			case 3:
				//Saved
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(POST_TABLE)
						->join('users', POST_TABLE.'.user_id', '=', 'users.id')
						->join(POST_TYPE.'_bookmarks', POST_TYPE.'_bookmarks.'.POST_TYPE.'_id', '=', POST_TABLE.'.id') //
						->select(
							DB::raw(POST_SELECT_QUERY), 
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1) as upvotes'),
							DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0) as downvotes'),
							DB::raw('(SELECT count(*) FROM '.POST_TYPE.'_comments WHERE '.POST_TYPE.'_comments.'.POST_TYPE.'_id='.POST_TABLE.'.id) as commentcount'),
							DB::raw($RAW_VOTED_QUERY))
						->where(POST_TYPE.'_bookmarks.user_id', $user->id)
						->whereNull(POST_TABLE.'.deleted_at')
						->take($qty)
						->orderByRaw($ORDER_BY_QUERY)
						->skip($page * $qty)
						->get();
				break;
			default:
				//case 0 and default
				//ALL Posts
				$posts = DB::table(POST_TABLE)
					->join('users', POST_TABLE.'.user_id', '=', 'users.id')
					->select(
						DB::raw(POST_SELECT_QUERY), 
						DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1) as upvotes'),
						DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0) as downvotes'),
						DB::raw('(SELECT count(*) FROM '.POST_TYPE.'_comments WHERE '.POST_TYPE.'_comments.'.POST_TYPE.'_id='.POST_TABLE.'.id) as commentcount'),
						DB::raw($RAW_VOTED_QUERY))
					->whereNull(POST_TABLE.'.deleted_at')
					->take($qty)
					->orderByRaw($ORDER_BY_QUERY)
					->skip($page * $qty)
					->get();
				break;
		}

		$output['success']=true;
		$output['posts']=$posts;

		return $output;
	}

	public static function getPostsPage($model, $id, Request $request) {
		//Make sure things are defined from the child model
		/*
		//Honestly, this should never happen
		defined('POST_TABLE') || define('POST_TABLE', $model::$POST_TABLE);
		defined('VOTES_TABLE') || define('VOTES_TABLE', $model::$VOTES_TABLE);
		defined('POST_TYPE') || define('POST_TYPE', $model::$POST_TYPE);
		defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', $model::$POST_TYPE_PRETTY);
		defined('BOOKMARKS_TABLE') || define('BOOKMARKS_TABLE', $model::$BOOKMARKS_TABLE);
		defined('POST_SELECT_QUERY') || define('POST_SELECT_QUERY', $model::$POST_SELECT_QUERY);
		defined('COMMENT_VOTES_TABLE') || define('COMMENT_VOTES_TABLE', $model::$COMMENT_VOTES_TABLE);
		defined('COMMENTS_TABLE') || define('COMMENTS_TABLE', $model::$COMMENTS_TABLE);
		*/
			
		$user=self::getUser();
		$options=self::getUserOptions($user);

		//Check if a post id was given to us
		if (!is_null($id)) {
			//We got a post id so retrieve the post and comments
			$post = self::getPostById($id, $user);
			if ($post) {
				//Check if post has comments, if so retrieve them, otherwise return empty array
				$comments = intval($post->commentcount) > 0 ? self::getCommentsByPostId($id, $user) : [];

				//Return the view with the post and comments
				$data['post']=$post;
				$data['comments']=$comments;
			}
		}

		$data['post_type']=POST_TYPE;
		$data['post_type_pretty']=POST_TYPE_PRETTY;

		// BEWARE $options->showExternalImages will return a boolean which doesn't pass to views as a string
		$data['show_external_images']=$options && $options->showExternalImages ? 'true' : 'false';
		
		
		return view('sections.main', ['data'=>$data]);
	}

	public static function getPostById($id, $user=null) {
		$id = intval($id);
		if ($id>0) {
			if ($user) {
				$RAW_VOTED_POST_QUERY = '(CASE '.
					'WHEN (SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0 AND '.VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 0 '.
					'WHEN (SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1 AND '.VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 1 '.
					'ELSE -1 END) AS voted'.
					', (SELECT count(*) FROM '.BOOKMARKS_TABLE.' WHERE '.BOOKMARKS_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.BOOKMARKS_TABLE.'.user_id='.intval($user->id).') AS saved';
			}
			else {
				$RAW_VOTED_POST_QUERY = '-1 AS voted, 0 AS saved';
			}

			$post = DB::table(POST_TABLE)
				->join('users', POST_TABLE.'.user_id', '=', 'users.id')
				->select(
					DB::raw(POST_SELECT_QUERY), 
					DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.VOTES_TABLE.' WHERE '.VOTES_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id AND '.VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw('(SELECT count(*) FROM '.COMMENTS_TABLE.' WHERE '.COMMENTS_TABLE.'.'.POST_TYPE.'_id='.POST_TABLE.'.id) as commentcount'),
					DB::raw($RAW_VOTED_POST_QUERY))
				->where(POST_TABLE.'.id', $id)
				->first();

			if ($post) {
				return $post;
			}
		}
		
		return null;
	}

	
	public static function getCommentsByPostId($id, $user=null) {
		if ($user) {
			$RAW_VOTED_COMMENT_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.COMMENT_VOTES_TABLE.' WHERE '.COMMENT_VOTES_TABLE.'.comment_id='.COMMENTS_TABLE.'.id AND '.COMMENT_VOTES_TABLE.'.vote=0 AND '.COMMENT_VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.COMMENT_VOTES_TABLE.' WHERE '.COMMENT_VOTES_TABLE.'.comment_id='.COMMENTS_TABLE.'.id AND '.COMMENT_VOTES_TABLE.'.vote=1 AND '.COMMENT_VOTES_TABLE.'.user_id='.intval($user->id).')>0 THEN 1 '.
				'ELSE -1 END) AS voted';
		}
		else {
			$RAW_VOTED_COMMENT_QUERY = '-1 AS voted';
		}

		$comments = DB::table(COMMENTS_TABLE)
			->leftJoin('users', COMMENTS_TABLE.'.user_id', '=', 'users.id')
			->select(COMMENTS_TABLE.'.id', COMMENTS_TABLE.'.comment', COMMENTS_TABLE.'.parent_id', COMMENTS_TABLE.'.created_at', COMMENTS_TABLE.'.updated_at', 'users.username', 
					DB::raw('(SELECT count(*) FROM '.COMMENT_VOTES_TABLE.' WHERE '.COMMENT_VOTES_TABLE.'.comment_id='.COMMENTS_TABLE.'.id AND '.COMMENT_VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.COMMENT_VOTES_TABLE.' WHERE '.COMMENT_VOTES_TABLE.'.comment_id='.COMMENTS_TABLE.'.id AND '.COMMENT_VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw($RAW_VOTED_COMMENT_QUERY))
			->where(COMMENTS_TABLE.'.'.POST_TYPE.'_id', $id)
			->whereNull(COMMENTS_TABLE.'.deleted_at')
			->get();

		return $comments ? $comments : [];
	}

	public static function submitPost($post, $postVote, Request $request) {
		$user=self::getUser();

		$post->user_id=$user->id;

		if ($post->save()) {
			$postVote->user_id=$user->id;
			$postVote[POST_TYPE.'_id']=$post->id;
			$postVote->vote=1;
			$postVote->save();

			return response()->json(['success'=>POST_TYPE.'_created', 'id'=>$post->id]);
		}
		return response()->json(['error'=>'db_error'], 500);
	}
}
