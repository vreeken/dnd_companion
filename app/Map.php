<?php

namespace App;

use http\Env\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Image;

use App\Traits\SectionModel;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'map');
defined('POST_URL') || define('POST_URL', 'maps');
defined('POST_TABLE') || define('POST_TABLE', 'maps');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Map');

class Map extends Model {

    use SoftDeletes;
    use SectionModel;

    public static $POST_SELECT_QUERY = POST_TABLE. '.id, ' .POST_TABLE. '.title, ' .POST_TABLE. '.user_id, ' .POST_TABLE. '.description, ' .POST_TABLE. '.link, ' .POST_TABLE. '.created_at, ' .POST_TABLE. '.updated_at, users.username';

    public static $ENVIRONMENTS = ['Abyss/Nine Hells','Air/Sky Ship','Cave','City/Urban','Desert','Dungeon','Extraplanar','Feywild','Forest','House/Mansion','Island','Jungle','Megadungeon','Mountain','Other','Ruins','Sewer','Shadowfell','Ship','Stronghold/Castle/Tower','Swamp','Temple','Town/Village','Underdark','Underwater','Wilderness'];

    public static function submitMap(Request $request) {
        //Make sure Request has the correct parameters
        if (!$request->has('desc') || !$request->has('title') || !$request->has('link') || !$request->has('img') || !$request->has('envs')) {
            return response()->json(['error'=>'invalid_parameters'], 400);
        }

        $user = self::getUser();

        $envs = explode(',', $request->input('envs'));
        if (count($envs) < 1) {
            return response()->json(['error'=>'invalid_environments_parameter'], 400);
        }

        foreach ($envs as $env) {
            $env = (int)$env;
            if ($env < 0 || $env >= count(self::$ENVIRONMENTS)) {
                return response()->json(['error'=>'invalid_environment_parameter'], 400);
            }
        }

        $map = new Map;
        $map->user_id=$user->id;
        $map->link=$request->input('link');
        $map->title=$request->input('title');
        $map->description=$request->input('desc');

        if ($map->save()) {
            try {
                //TODO do this before creating Map?
                //create img
                //TODO make sure maps folder exists before using
                $image = Image::make($request->input('img'));
                $image->fit(100, 100)->save(public_path('map_thumbs/'. $map->id .'.jpg'));
            }
            catch(Exception $e) {
                $map->delete();
                return response()->json(['error'=>'img_error'], 400);
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

    public static function getMapDetails($id, Request $request) {
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
        $output['environments']=self::$ENVIRONMENTS;
        $output['comments']=$comments;

        return response()->json($output);
    }

    public static function getMaps(Request $request) {
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

    public static function getMapById($id, $user=null) {
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
