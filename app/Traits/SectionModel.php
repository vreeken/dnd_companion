<?php

namespace App\Traits;

use Illuminate\Http\Request;

use DB;

use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Traits\UserAndOptionsUtils;

trait SectionModel {
	public static $POSTS_URL = POST_URL;
	public static $POST_TABLE = POST_TABLE;
	public static $POST_TYPE = POST_TYPE;
	public static $POST_TYPE_PRETTY = POST_TYPE_PRETTY;
	public static $VOTES_TABLE = POST_TYPE.'_votes';
	public static $COMMENTS_TABLE = POST_TYPE.'_comments';
	public static $COMMENT_VOTES_TABLE = POST_TYPE.'_comment_votes';
	public static $BOOKMARKS_TABLE = POST_TYPE.'_bookmarks';

	use UserAndOptionsUtils;

	public static function getSinglePostById($id) {
        $user=self::getUser();

        if ($user) {
            $RAW_VOTED_QUERY = '(CASE '.
                'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$VOTES_TABLE.'.vote=0 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
                'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$VOTES_TABLE.'.vote=1 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
                'ELSE -1 END) AS voted'.
                ', (SELECT count(*) FROM '.self::$BOOKMARKS_TABLE.' WHERE '.self::$BOOKMARKS_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
        }
        else {
            $RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
        }

        $post = DB::table(self::$POST_TABLE)
            ->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
            ->select(
                DB::raw(self::$POST_SELECT_QUERY),
                DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=1) as upvotes'),
                DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=0) as downvotes'),
                DB::raw('(SELECT count(*) FROM '.self::$POST_TYPE.'_comments WHERE '.self::$POST_TYPE.'_comments.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id) as commentcount'),
                DB::raw($RAW_VOTED_QUERY))
            ->where(self::$POST_TABLE.'.id', $id)
            ->whereNull(self::$POST_TABLE.'.deleted_at')
            ->first();

        $output['success']=true;
        $output['post']=$post;

        return $output;
    }
	public static function getPosts($request): array {
		//TODO
		//	Dealing with large table random queries
		//		Consider creating a temp table each night with a list of continuous ids mapped to valid (not deleted) post ids
		//		Then creating a list of random ids, client side, and grab from there
		//		Another option is to just grab random ids, but if they are deleted, then we just return 9 instead of 10 entries
		//		Another option is to live with the slow order by RAND(), but to pre-fetch everything so that it doesn't seem slow to the user

		

        if ($request->has('id')) {
            return self::getSinglePostById($request->input('id'));
        }

		$user=self::getUser();

		//Get values or use defaults
		$qty=10;
		$filter = $request->has('filter') ? (int)$request->input('filter') : false;
		$page = $request->has('page') ? (int)$request->input('page') : 0;
		$method = $request->has('method') ? $request->input('method') : 'r';
		$seed = $request->has('seed') ? (int)$request->input('seed') : 0;

		switch ($method) {
			case 'r':
				//Random
				//$ORDER_BY_QUERY = 'RAND('.$seed.')';
				$ORDER_BY_QUERY = null;
				$WHERE_RAW = self::$POST_TABLE . '.id IN (SELECT `id` FROM (SELECT `id` FROM `' . self::$POST_TABLE . '` ORDER BY RAND(' . $seed . ') LIMIT ' . $qty . ' OFFSET ' . ($page * $qty) . ') t)';
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
				$ORDER_BY_QUERY = self::$POST_TABLE.'.id DESC';
				break;
			case 'da':
				//Date, Ascending (Oldest)
				$ORDER_BY_QUERY = self::$POST_TABLE.'.id ASC';
				break;

			default:
				$output['error']= 'invalid_sort_method';
				return $output;
				break;
		}

		if ($user) {
			$RAW_VOTED_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$VOTES_TABLE.'.vote=0 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$VOTES_TABLE.'.vote=1 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
				'ELSE -1 END) AS voted'.
				', (SELECT count(*) FROM '.self::$BOOKMARKS_TABLE.' WHERE '.self::$BOOKMARKS_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TYPE.'s.id AND '.self::$BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
		}
		else {
			$RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
		}

		$SELECTS = [
			DB::raw(self::$POST_SELECT_QUERY), 
			DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=1) as upvotes'),
			DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=0) as downvotes'),
			DB::raw('(SELECT count(*) FROM '.self::$POST_TYPE.'_comments WHERE '.self::$POST_TYPE.'_comments.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id) as commentcount'),
			DB::raw($RAW_VOTED_QUERY)
		];

		switch ($filter) {
			case 1:
				//Just Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(self::$POST_TABLE)
					->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS)
					->where(self::$POST_TABLE.'.user_id', $user->id);
				break;
			case 2:
				//Not Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(self::$POST_TABLE)
					->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS)
					->where(self::$POST_TABLE.'.user_id', '<>', $user->id);
				break;
			case 3:
				//Saved
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table(self::$POST_TABLE)
					->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
					->join(self::$POST_TYPE.'_bookmarks', self::$POST_TYPE.'_bookmarks.'.self::$POST_TYPE.'_id', '=', self::$POST_TABLE.'.id') //
					->select($SELECTS)
					->where(self::$POST_TYPE.'_bookmarks.user_id', $user->id);
				break;
			default:
				//case 0 and default
				//ALL Posts
				$posts = DB::table(self::$POST_TABLE)
					->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS);
				break;
		}

		$posts->whereNull(self::$POST_TABLE.'.deleted_at');
					
		//The Random query uses a where in statement to order, while all others use a order by, so choose appropriately
		if ($method === 'r') {
			$posts->whereRaw($WHERE_RAW);
		}
		else {
			$posts->orderByRaw($ORDER_BY_QUERY)
			->take($qty)
			->skip($page * $qty);
		}

		$output['success'] = true;
		$output['posts'] = $posts->get();

		return $output;
	}

	public static function getPostsPage($model, $id, Request $request) {
		$user=self::getUser();
		$options=self::getUserOptions($user);

		//Check if a post id was given to us
		if ($id !== null) {
			//We got a post id so retrieve the post and comments
			$post = self::getPostById($id, $user);
			if ($post) {
				//Check if post has comments, if so retrieve them, otherwise return empty array
				$comments = (int)$post->commentcount > 0 ? self::getCommentsByPostId($id, $user) : [];

				//Return the view with the post and comments
				$data['post']=$post;
				$data['comments']=$comments;
			}
		}

		$data['post_type']=POST_TYPE;
		$data['post_type_pretty']=POST_TYPE_PRETTY;

		// BEWARE $options->showExternalImages will return a boolean which doesn't pass to views as a string
		$data['show_external_images']=$options && isset($options->showExternalImages) ? 'true' : 'false';
		
		
		return view('sections.main', ['data'=>$data]);
	}

	public static function getPostById($id, $user=null) {
		$id = (int)$id;
		if ($id>0) {
			if ($user) {
				$RAW_VOTED_POST_QUERY = '(CASE '.
					'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=0 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
					'WHEN (SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=1 AND '.self::$VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
					'ELSE -1 END) AS voted'.
					', (SELECT count(*) FROM '.self::$BOOKMARKS_TABLE.' WHERE '.self::$BOOKMARKS_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
			}
			else {
				$RAW_VOTED_POST_QUERY = '-1 AS voted, 0 AS saved';
			}

			$post = DB::table(self::$POST_TABLE)
				->join('users', self::$POST_TABLE.'.user_id', '=', 'users.id')
				->select(
					DB::raw(self::$POST_SELECT_QUERY), 
					DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.self::$VOTES_TABLE.' WHERE '.self::$VOTES_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id AND '.self::$VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw('(SELECT count(*) FROM '.self::$COMMENTS_TABLE.' WHERE '.self::$COMMENTS_TABLE.'.'.self::$POST_TYPE.'_id='.self::$POST_TABLE.'.id) as commentcount'),
					DB::raw($RAW_VOTED_POST_QUERY))
				->where(self::$POST_TABLE.'.id', $id)
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
				'WHEN (SELECT count(*) FROM '.self::$COMMENT_VOTES_TABLE.' WHERE '.self::$COMMENT_VOTES_TABLE.'.comment_id='.self::$COMMENTS_TABLE.'.id AND '.self::$COMMENT_VOTES_TABLE.'.vote=0 AND '.self::$COMMENT_VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.self::$COMMENT_VOTES_TABLE.' WHERE '.self::$COMMENT_VOTES_TABLE.'.comment_id='.self::$COMMENTS_TABLE.'.id AND '.self::$COMMENT_VOTES_TABLE.'.vote=1 AND '.self::$COMMENT_VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
				'ELSE -1 END) AS voted';
		}
		else {
			$RAW_VOTED_COMMENT_QUERY = '-1 AS voted';
		}

		$comments = DB::table(self::$COMMENTS_TABLE)
			->leftJoin('users', self::$COMMENTS_TABLE.'.user_id', '=', 'users.id')
			->select(self::$COMMENTS_TABLE.'.id', self::$COMMENTS_TABLE.'.comment', self::$COMMENTS_TABLE.'.parent_id', self::$COMMENTS_TABLE.'.created_at', self::$COMMENTS_TABLE.'.updated_at', 'users.username', 
					DB::raw('(SELECT count(*) FROM '.self::$COMMENT_VOTES_TABLE.' WHERE '.self::$COMMENT_VOTES_TABLE.'.comment_id='.self::$COMMENTS_TABLE.'.id AND '.self::$COMMENT_VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.self::$COMMENT_VOTES_TABLE.' WHERE '.self::$COMMENT_VOTES_TABLE.'.comment_id='.self::$COMMENTS_TABLE.'.id AND '.self::$COMMENT_VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw($RAW_VOTED_COMMENT_QUERY))
			->where(self::$COMMENTS_TABLE.'.'.self::$POST_TYPE.'_id', $id)
			->whereNull(self::$COMMENTS_TABLE.'.deleted_at')
			->get();

		//OLD STYLE CODE: $comments ? $comments : [];
        //NEW:
        return $comments ?: [];
	}

	public static function submitPost($post, $postVote, Request $request): \Illuminate\Http\JsonResponse {
		$user=self::getUser();

		$post->user_id=$user->id;

		if ($post->save()) {
			$postVote->user_id=$user->id;
			$postVote[self::$POST_TYPE.'_id']=$post->id;
			$postVote->vote=1;
			$postVote->save();

			return response()->json(['success'=>self::$POST_TYPE.'_created', 'id'=>$post->id]);
		}
		return response()->json(['error'=>'db_error'], 500);
	}
}
