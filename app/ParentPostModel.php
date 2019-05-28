<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use DB;

use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Traits\UserAndOptionsUtils;

abstract class ParentPostModel extends Model {
	public $POSTS_URL;
	public $POST_TABLE;
	public $POST_TYPE;
	public $POST_TYPE_PRETTY;
	public $VOTES_TABLE;
	public $COMMENTS_TABLE;
	public $COMMENT_VOTES_TABLE;
	public $BOOKMARKS_TABLE;
	public $POST_SELECT_QUERY;


	use UserAndOptionsUtils;

	public function getSinglePostById($id) {
        $user=$this->getUser();

        if ($user) {
            $RAW_VOTED_QUERY = '(CASE '.
                'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->VOTES_TABLE.'.vote=0 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
                'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->VOTES_TABLE.'.vote=1 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
                'ELSE -1 END) AS voted'.
                ', (SELECT count(*) FROM '.$this->BOOKMARKS_TABLE.' WHERE '.$this->BOOKMARKS_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
        }
        else {
            $RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
        }

        $post = DB::table($this->POST_TABLE)
            ->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
            ->select(
                DB::raw($this->POST_SELECT_QUERY),
                DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=1) as upvotes'),
                DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=0) as downvotes'),
                DB::raw('(SELECT count(*) FROM '.$this->POST_TYPE.'_comments WHERE '.$this->POST_TYPE.'_comments.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id) as commentcount'),
                DB::raw($RAW_VOTED_QUERY))
            ->where($this->POST_TABLE.'.id', $id)
            ->whereNull($this->POST_TABLE.'.deleted_at')
            ->first();

        $output['success']=true;
        $output['post']=$post;

        return $output;
    }
	public function getPosts($request): array {
		//TODO
		//	Dealing with large table random queries
		//		Consider creating a temp table each night with a list of continuous ids mapped to valid (not deleted) post ids
		//		Then creating a list of random ids, client side, and grab from there
		//		Another option is to just grab random ids, but if they are deleted, then we just return 9 instead of 10 entries
		//		Another option is to live with the slow order by RAND(), but to pre-fetch everything so that it doesn't seem slow to the user
		//
		//		Another option is to use Redis for caching, specifically caching the ids in their respective orders (order by rand, upvotes, date, etc)
		//			and using WHERE IN [next set of ids], and update that each day. This keeps comment count and up/downvotes current. BUT this may not be worth the gain

		

        if ($request->has('id')) {
            return $this->getSinglePostById($request->input('id'));
        }

		$user=$this->getUser();

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
				$WHERE_RAW = $this->POST_TABLE . '.id IN (SELECT `id` FROM (SELECT `id` FROM `' . $this->POST_TABLE . '` ORDER BY RAND(' . $seed . ') LIMIT ' . $qty . ' OFFSET ' . ($page * $qty) . ') t)';
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
				$ORDER_BY_QUERY = $this->POST_TABLE.'.id DESC';
				break;
			case 'da':
				//Date, Ascending (Oldest)
				$ORDER_BY_QUERY = $this->POST_TABLE.'.id ASC';
				break;

			default:
				$output['error']= 'invalid_sort_method';
				return $output;
				break;
		}

		if ($user) {
			$RAW_VOTED_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->VOTES_TABLE.'.vote=0 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->VOTES_TABLE.'.vote=1 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
				'ELSE -1 END) AS voted'.
				', (SELECT count(*) FROM '.$this->BOOKMARKS_TABLE.' WHERE '.$this->BOOKMARKS_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TYPE.'s.id AND '.$this->BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
		}
		else {
			$RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
		}

		$SELECTS = [
			DB::raw($this->POST_SELECT_QUERY), 
			DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=1) as upvotes'),
			DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=0) as downvotes'),
			DB::raw('(SELECT count(*) FROM '.$this->POST_TYPE.'_comments WHERE '.$this->POST_TYPE.'_comments.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id) as commentcount'),
			DB::raw($RAW_VOTED_QUERY)
		];

		switch ($filter) {
			case 1:
				//Just Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table($this->POST_TABLE)
					->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS)
					->where($this->POST_TABLE.'.user_id', $user->id);
				break;
			case 2:
				//Not Mine
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table($this->POST_TABLE)
					->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS)
					->where($this->POST_TABLE.'.user_id', '<>', $user->id);
				break;
			case 3:
				//Saved
				if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
				$posts = DB::table($this->POST_TABLE)
					->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
					->join($this->POST_TYPE.'_bookmarks', $this->POST_TYPE.'_bookmarks.'.$this->POST_TYPE.'_id', '=', $this->POST_TABLE.'.id') //
					->select($SELECTS)
					->where($this->POST_TYPE.'_bookmarks.user_id', $user->id);
				break;
			default:
				//case 0 and default
				//ALL Posts
				$posts = DB::table($this->POST_TABLE)
					->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
					->select($SELECTS);
				break;
		}

		$posts->whereNull($this->POST_TABLE.'.deleted_at');
					
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

	public function getPostsPage($model, $id, Request $request) {
		$user=$this->getUser();
		$options=$this->getUserOptions($user);

		//Check if a post id was given to us
		if ($id !== null) {
			//We got a post id so retrieve the post and comments
			$post = $this->getPostById($id, $user);
			if ($post) {
				//Check if post has comments, if so retrieve them, otherwise return empty array
				$comments = (int)$post->commentcount > 0 ? $this->getCommentsByPostId($id, $user) : [];

				//Return the view with the post and comments
				$data['post']=$post;
				$data['comments']=$comments;
			}
		}


		$data['post_type']=$this->POST_TYPE;
		$data['post_type_pretty']=$this->POST_TYPE_PRETTY;
		$data['api_url']=url('api/');
		$data['base_url']=url('/');
		$data['username']=$user ? $user->username : '';

		// BEWARE $options->showExternalImages will return a boolean which doesn't pass to views as a string
		$data['show_external_images']=$options && isset($options->showExternalImages) && $options->showExternalImages ? 'true' : 'false';		
		
		return view('sections.main', ['data'=>$data]);
	}

	public function getPostById($id, $user=null) {
		$id = (int)$id;
		if ($id>0) {
			if ($user) {
				$RAW_VOTED_POST_QUERY = '(CASE '.
					'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=0 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
					'WHEN (SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=1 AND '.$this->VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
					'ELSE -1 END) AS voted'.
					', (SELECT count(*) FROM '.$this->BOOKMARKS_TABLE.' WHERE '.$this->BOOKMARKS_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->BOOKMARKS_TABLE.'.user_id='. (int)$user->id .') AS saved';
			}
			else {
				$RAW_VOTED_POST_QUERY = '-1 AS voted, 0 AS saved';
			}

			$post = DB::table($this->POST_TABLE)
				->join('users', $this->POST_TABLE.'.user_id', '=', 'users.id')
				->select(
					DB::raw($this->POST_SELECT_QUERY), 
					DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.$this->VOTES_TABLE.' WHERE '.$this->VOTES_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id AND '.$this->VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw('(SELECT count(*) FROM '.$this->COMMENTS_TABLE.' WHERE '.$this->COMMENTS_TABLE.'.'.$this->POST_TYPE.'_id='.$this->POST_TABLE.'.id) as commentcount'),
					DB::raw($RAW_VOTED_POST_QUERY))
				->where($this->POST_TABLE.'.id', $id)
				->first();

			if ($post) {
				return $post;
			}
		}
		
		return null;
	}

	
	public function getCommentsByPostId($id, $user=null) {
		if ($user) {
			$RAW_VOTED_COMMENT_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.$this->COMMENT_VOTES_TABLE.' WHERE '.$this->COMMENT_VOTES_TABLE.'.comment_id='.$this->COMMENTS_TABLE.'.id AND '.$this->COMMENT_VOTES_TABLE.'.vote=0 AND '.$this->COMMENT_VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.$this->COMMENT_VOTES_TABLE.' WHERE '.$this->COMMENT_VOTES_TABLE.'.comment_id='.$this->COMMENTS_TABLE.'.id AND '.$this->COMMENT_VOTES_TABLE.'.vote=1 AND '.$this->COMMENT_VOTES_TABLE.'.user_id='. (int)$user->id .')>0 THEN 1 '.
				'ELSE -1 END) AS voted';
		}
		else {
			$RAW_VOTED_COMMENT_QUERY = '-1 AS voted';
		}

		$comments = DB::table($this->COMMENTS_TABLE)
			->leftJoin('users', $this->COMMENTS_TABLE.'.user_id', '=', 'users.id')
			->select($this->COMMENTS_TABLE.'.id', $this->COMMENTS_TABLE.'.comment', $this->COMMENTS_TABLE.'.parent_id', $this->COMMENTS_TABLE.'.created_at', $this->COMMENTS_TABLE.'.updated_at', 'users.username', 
					DB::raw('(SELECT count(*) FROM '.$this->COMMENT_VOTES_TABLE.' WHERE '.$this->COMMENT_VOTES_TABLE.'.comment_id='.$this->COMMENTS_TABLE.'.id AND '.$this->COMMENT_VOTES_TABLE.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.$this->COMMENT_VOTES_TABLE.' WHERE '.$this->COMMENT_VOTES_TABLE.'.comment_id='.$this->COMMENTS_TABLE.'.id AND '.$this->COMMENT_VOTES_TABLE.'.vote=0) as downvotes'),
					DB::raw($RAW_VOTED_COMMENT_QUERY))
			->where($this->COMMENTS_TABLE.'.'.$this->POST_TYPE.'_id', $id)
			->whereNull($this->COMMENTS_TABLE.'.deleted_at')
			->get();

		//OLD STYLE CODE: $comments ? $comments : [];
        //NEW:
        return $comments ?: [];
	}

	public function submitPost($post, $postVote, Request $request): \Illuminate\Http\JsonResponse {
		$user=$this->getUser();

		$post->user_id=$user->id;

		if ($post->save()) {
			$postVote->user_id=$user->id;
			$postVote[$this->POST_TYPE.'_id']=$post->id;
			$postVote->vote=1;
			$postVote->save();

			return response()->json(['success'=>$this->POST_TYPE.'_created', 'id'=>$post->id]);
		}
		return response()->json(['error'=>'db_error'], 500);
	}
}
