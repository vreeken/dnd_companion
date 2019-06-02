<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Image;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;
use DB;


class Map extends ParentPostModel {

	public $POSTS_URL;
	public $POST_TABLE;
	public $POST_TYPE;
	public $POST_TYPE_PRETTY;
	public $VOTES_TABLE;
	public $COMMENTS_TABLE;
	public $COMMENT_VOTES_TABLE;
	public $BOOKMARKS_TABLE;
	public $POST_SELECT_QUERY;

    use SoftDeletes;

	function __construct() {
		parent::__construct();

		$this->POST_TYPE = 'map';
		$this->POST_TYPE_PRETTY = 'Map';

		$this->POSTS_URL = $this->POST_TYPE.'s';
		$this->POST_TABLE = $this->POST_TYPE.'s';
		$this->VOTES_TABLE = $this->POST_TYPE.'_votes';
		$this->COMMENTS_TABLE = $this->POST_TYPE.'_comments';
		$this->COMMENT_VOTES_TABLE = $this->POST_TYPE.'_comment_votes';
		$this->BOOKMARKS_TABLE = $this->POST_TYPE.'_bookmarks';

		$this->POST_SELECT_QUERY = $this->POST_TABLE. '.id, ' .$this->POST_TABLE. '.title, ' .$this->POST_TABLE. '.user_id, ' .$this->POST_TABLE. '.description, ' .$this->POST_TABLE. '.link, ' .$this->POST_TABLE. '.created_at, ' .$this->POST_TABLE. '.updated_at, users.username';
	}

    public static $ENVIRONMENTS = ['Abyss/Nine Hells','Air/Sky Ship','Cave','City/Urban','Desert','Dungeon','Extraplanar','Feywild','Forest','House/Mansion','Island','Jungle','Megadungeon','Mountain','Other','Ruins','Sewer','Shadowfell','Ship','Stronghold/Castle/Tower','Swamp','Temple','Town/Village','Underdark','Underwater','Wilderness'];

    public function submitMap(Request $request) {
        //Make sure Request has the correct parameters
        if (!$request->has('desc') && !$request->has('body')) {
            return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing body param'], 400);
        }

        if (!$request->has('title')) {
            return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing title param'], 400);
        }

        if (!$request->has('link') && !$request->has('external_link')) {
            return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing link param'], 400);
        }

        $user = self::getUser();

        $envs = [];

        if ($request->has('envs')) {
            $envs = explode(',', $request->input('envs'));
        }

        /*
        if (count($envs) < 1) {
            return response()->json(['error'=>'invalid_environments_parameter'], 400);
        }
        */
        foreach ($envs as $env) {
            $env = (int)$env;
            if ($env < 0 || $env >= count($this->ENVIRONMENTS)) {
                return response()->json(['error'=>'invalid_parameters', 'msg'=>'Invalid envs param'], 400);
            }
        }
        

        $map = new Map;
        $map->user_id=$user->id;

        $map->title=$request->input('title');

        $map->description=$request->has('desc') ? $request->input('desc') : $request->input('body');


        $link = null;
        if ($request->has('link')) {
            $link = $request->input('link');
        }
        else if ($request->has('external_link')) {
            $link = $request->input('external_link');
        }
        $map->link = $link !== null ? $link : "";

        $suf = substr($map->link, -4);
        if ($suf === '.jpg' || $suf === '.png') {
            $img_url = $map->link; 
        }
        else {
            if (!$request->has('img') && !$request->has('image_link')) {
                return response()->json(['error'=>'invalid_parameters', 'msg'=>'Missing image param'], 400);
            }
            $img_url = $request->has('img') ? $request->input('img') : $request->input('image_link');
            $suf = substr($img_url, -4);
            if ($suf !== '.jpg' && $suf !== '.png') {
                return response()->json(['error'=>'invalid_parameters', 'msg'=>'Invalid image param, must be jpg or png'], 400);
            }

        }
        

        if ($map->save()) {
            try {
                //TODO do this before creating Map?
                //create img
                //TODO make sure maps folder exists before using
                $image = Image::make($img_url);
                $image->fit(100, 100)->save(public_path('map_thumbs/'. $map->id .'.jpg'));
            }
            catch(\Exception $e) {
                $map->delete();
                return response()->json(['error'=>'img_error', 'msg'=>'Invalid image url'], 400);
            }

            $env_ins = [];
            foreach ($envs as $env) {
                $env = (int)$env;
                $env_ins[] = ["map_id" => $map->id, "environment" => $env];
            }

            DB::table('map_environments')->insert($env_ins);

            $vote = new MapVote;
            $vote->user_id=$user->id;
            $vote->map_id=$map->id;
            $vote->vote=1;
            $vote->save();

            return response()->json(['success'=>'map_created', 'id'=>$map->id]);
        }
        return response()->json(['error'=>'db_error'], 500);
    }

    public function getMapDetails($id, Request $request): \Illuminate\Http\JsonResponse {
        $map_id = (int)$id;
        $map = DB::table('maps')
            ->join('users', 'maps.user_id', '=', 'users.id')
            ->select('maps.*', 'users.username')
            ->where('maps.id', $map_id)
            ->whereNull('maps.deleted_at')
            ->first();

        if ($map === null) {
            return response()->json(['error'=>'invalid_parameters'], 400);
        }

        $map->upvotes = DB::table('map_votes')->where('map_id', $map_id)->where('vote', 1)->count();
        $map->downvotes = DB::table('map_votes')->where('map_id', $map_id)->where('vote', 0)->count();
        $map->bookmarked=0;

        $envs = DB::table('map_environments')->where('map_id', $map_id)->get();

        $environments = '';
        foreach ($envs as $env) {
            $environments.=$env->environment.',';
        }
        if ($environments !== '') {
            $environments=substr($environments, 0, -1);
        }

        $map->envs=$environments;

        //Check if user is logged in, if so check if they've voted
        try {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            if ($user) {
                $h = DB::table('map_votes')->select('vote')->where('map_id', $map_id)->where('user_id', $user->id)->first();
                if ($h) { $map->voted=$h->vote; }
                else { $map->voted=-1; }

                if (DB::table('map_bookmarks')->where('map_id', $map_id)->where('user_id', $user->id)->first()) { $map->bookmarked=1; }
            }
            else { $map->voted=-1; }
        }
        catch(JWTException $e) {
            $map->voted=-1;
        }

        $map->environments = DB::table('map_environments')->where('map_id', $map->id)->select('environment')->get();

        $comments = DB::table('map_comments')
            ->join('users', 'map_comments.user_id', '=', 'users.id')
            ->select('map_comments.*', 'users.username')
            ->where('map_comments.map_id', $map_id)
            ->take(20)->get();

        $output['map']=$map;
        $output['environments']=$this->ENVIRONMENTS;
        $output['comments']=$comments;

        return response()->json($output);
    }

    public function getMaps(Request $request) {
        $qty=10;

        if (!$request->has('page') || !$request->has('envs')) {
            return response()->json(['error'=>'missing_data'], 400);
        }
        $page = (int)$request->input('page');
        $envs = explode(',', $request->input('envs'));

        $m = $request->has('method') ? $request->input('method') : 'r';

        //Check if user is logged in, so we can check if they've voted
        $user=null;
        try { $user = JWTAuth::toUser(JWTAuth::getToken()); }
        catch(JWTException $e) { }

        if ($user) {
            $RAW_VOTED_QUERY = '(CASE '.
                'WHEN (SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0 AND map_votes.user_id='. (int)$user->id .')>0 THEN 0 '.
                'WHEN (SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1 AND map_votes.user_id='. (int)$user->id .')>0 THEN 1 '.
                'ELSE -1 END) AS voted';
        }
        else {
            $RAW_VOTED_QUERY = '-1 AS voted';
        }

        switch ($m) {
            case 'r':
                //Random
                if (!$request->has('seed')) { return response()->json(['error'=>'missing_data'], 400); }
                $ORDER_BY_QUERY = 'RAND('. (float)$request->input('seed') .')';
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
                $ORDER_BY_QUERY = 'maps.created_at DESC';
                break;
            case 'da':
                //Date, Ascending (Oldest)
                $ORDER_BY_QUERY = 'maps.created_at ASC';
                break;

            default:
                return response()->json(['error'=>'invalid_data'], 400);
                break;
        }

        if ($user && $request->has('saved')) { // deprecated - to be removed in future versions
            $maps = DB::table('maps')
                ->distinct()
                ->join('users', 'maps.user_id', '=', 'users.id')
                ->join('map_environments', 'maps.id', '=', 'map_environments.map_id')
                ->join('map_bookmarks', 'map_bookmarks.map_id', '=', 'maps.id') //
                ->select('maps.id', 'maps.user_id', 'maps.link', 'maps.title', 'maps.description', 'maps.created_at', 'maps.updated_at', 'users.username',
                    DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1) as upvotes'),
                    DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0) as downvotes'),
                    DB::raw($RAW_VOTED_QUERY))
                ->whereIn('map_environments.environment', $envs)
                ->where('map_bookmarks.user_id', $user->id) //
                ->whereNull('maps.deleted_at')
                ->take($qty)
                ->orderByRaw($ORDER_BY_QUERY)
                ->skip($page * $qty)
                ->get();
        }
        else if ($request->has('filter') && (int)$request->input("filter") > 0) { //0=all which is done in else statement below
            switch ((int)$request->input("filter")) {
                case 1:
                    //Just Mine
                    if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                    $maps = DB::table('maps')
                        ->distinct()
                        ->join('users', 'maps.user_id', '=', 'users.id')
                        ->join('map_environments', 'maps.id', '=', 'map_environments.map_id')
                        ->select('maps.id', 'maps.user_id', 'maps.link', 'maps.title', 'maps.description', 'maps.created_at', 'maps.updated_at', 'users.username',
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1) as upvotes'),
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0) as downvotes'),
                            DB::raw($RAW_VOTED_QUERY))
                        ->where('maps.user_id', $user->id)
                        ->whereIn('map_environments.environment', $envs)
                        ->whereNull('maps.deleted_at')
                        ->take($qty)
                        ->orderByRaw($ORDER_BY_QUERY)
                        ->skip($page * $qty)
                        ->get();
                    break;
                case 2:
                    //Not Mine
                    if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                    $maps = DB::table('maps')
                        ->distinct()
                        ->join('users', 'maps.user_id', '=', 'users.id')
                        ->join('map_environments', 'maps.id', '=', 'map_environments.map_id')
                        ->select('maps.id', 'maps.user_id', 'maps.link', 'maps.title', 'maps.description', 'maps.created_at', 'maps.updated_at', 'users.username',
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1) as upvotes'),
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0) as downvotes'),
                            DB::raw($RAW_VOTED_QUERY))
                        ->where('maps.user_id', '<>', $user->id)
                        ->whereIn('map_environments.environment', $envs)
                        ->whereNull('maps.deleted_at')
                        ->take($qty)
                        ->orderByRaw($ORDER_BY_QUERY)
                        ->skip($page * $qty)
                        ->get();
                    break;
                case 3:
                    //Saved
                    if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                    $maps = DB::table('maps')
                        ->distinct()
                        ->join('users', 'maps.user_id', '=', 'users.id')
                        ->join('map_environments', 'maps.id', '=', 'map_environments.map_id')
                        ->join('map_bookmarks', 'map_bookmarks.map_id', '=', 'maps.id') //
                        ->select('maps.id', 'maps.user_id', 'maps.link', 'maps.title', 'maps.description', 'maps.created_at', 'maps.updated_at', 'users.username',
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1) as upvotes'),
                            DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0) as downvotes'),
                            DB::raw($RAW_VOTED_QUERY))
                        ->whereIn('map_environments.environment', $envs)
                        ->where('map_bookmarks.user_id', $user->id) //
                        ->whereNull('maps.deleted_at')
                        ->take($qty)
                        ->orderByRaw($ORDER_BY_QUERY)
                        ->skip($page * $qty)
                        ->get();
                    break;
                default:
                    return response()->json(['error'=>'invalid_data'], 400);
                    break;
            }
        }
        else {
            $maps = DB::table('maps')
                ->distinct()
                ->join('users', 'maps.user_id', '=', 'users.id')
                ->join('map_environments', 'maps.id', '=', 'map_environments.map_id')
                ->select('maps.id', 'maps.user_id', 'maps.link', 'maps.title', 'maps.description', 'maps.created_at', 'maps.updated_at', 'users.username',
                    DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=1) as upvotes'),
                    DB::raw('(SELECT count(*) FROM map_votes WHERE map_votes.map_id=maps.id AND map_votes.vote=0) as downvotes'),
                    DB::raw($RAW_VOTED_QUERY))
                ->whereIn('map_environments.environment', $envs)
                ->whereNull('maps.deleted_at')
                ->take($qty)
                ->orderByRaw($ORDER_BY_QUERY)
                ->skip($page * $qty)
                ->get();
        }

        return response()->json($maps);
    }

    public function getMapById($id, $user=null) {
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

    /*
     public function getEnvironments(Request $request) {
		return response()->json($this->environments);
	 }
     */

    /**
     * Get the author of the post.
     */
    public function user() { return $this->belongsTo('App\User'); }
    
    /**
     * Get the comments for the map.
     */
    public function comments() { return $this->hasMany('App\MapComment'); }

    /**
     * Get the votes for the map.
     */
    public function votes() { return $this->hasMany('App\MapCommentVote'); }

}
