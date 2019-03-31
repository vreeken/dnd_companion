<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use DB;

use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Traits\UserAndOptionsUtils;

class NPC extends Model {

	use SoftDeletes;
    use UserAndOptionsUtils;

    protected $table = 'npcs';




    public static function createNPC(Request $request): \Illuminate\Http\JsonResponse {
        $npc = self::parseNPCFromRequest($request);

        if ($npc->save()) {
            return response()->json(['success'=>'npc_created', 'id'=>$npc->id]);
        }

        return response()->json(['error'=>'db_error'], 500);
    }



    private static function parseNPCFromRequest(Request $request): NPC {
        $user=self::getUser();
        $npc = new NPC();

        $npc->user_id=$user->id;

        $d = $request->input('npc');

        $npc->name=$d['name'] ?: null;
        $npc->age=$d['age_int'] ?: null;
        $npc->alignment=$d['alignment_int'] ?: null;
        $npc->appearance=$d['appearance'] ?: null;
        $npc->attacks_abilities=$d['attacks_abilities'] ?: null;
        $npc->attr_cha=$d['asi'][0] ?: null;
        $npc->attr_con=$d['asi'][1] ?: null;
        $npc->attr_dex=$d['asi'][2] ?: null;
        $npc->attr_int=$d['asi'][3] ?: null;
        $npc->attr_str=$d['asi'][4] ?: null;
        $npc->attr_wis=$d['asi'][5] ?: null;
        $npc->bond=$d['bond'] ?: null;
        $npc->class=$d['class_int'] ?: null;
        $npc->class_other=$d['class_other'] ?: null;
        $npc->detail=$d['detail'] ?: null;
        $npc->flaw=$d['flaw'] ?: null;
        $npc->hook=$d['hook'] ?: null;
        $npc->hp=$d['hp'] ?: null;
        $npc->ideal=$d['ideal'] ?: null;
        $npc->inventory=$d['inventory'] ?: null;
        $npc->languages=$d['languages'] ?: null;
        $npc->level=$d['level'] ?: null;
        $npc->life_event=$d['life_event'] ?: null;
        $npc->misc=$d['misc'] ?: null;
        $npc->motivation=$d['motivation'] ?: null;
        $npc->personality=$d['personality'] ?: null;
        $npc->profession=$d['profession'] ?: null;
        $npc->quirk=$d['quirk'] ?: null;
        $npc->race=$d['race_id'] ?: null;
        $npc->race_other=$d['race_other'] ?: null;
        $npc->racials=$d['racials'] ?: null;
        $npc->relationship=$d['relationship'] ?: null;
        $npc->sex=$d['sex'] ?: null;
        $npc->skills=$d['skills'] ?: null;
        $npc->speed=$d['speed'] ?: null;
        $npc->speed_fly=$d['speed_fly'] ?: null;
        $npc->speed_swim=$d['speed_swim'] ?: null;
        $npc->summary=$d['summary'] ?: null;
        $npc->trait=$d['trait'] ?: null;
        $npc->voice=$d['voice'] ?: null;
        $npc->worship_habit=$d['worship_habit'] ?: null;

        return $npc;
    }













    public static function getMyNPCsPage($npc_id, Request $request) {
        $user=self::getUser();

        $data['startPage']='mine';

        if ($npc_id !== null) {
            //Is the user logged in?
            if (!$user) {
                $data['error']= 'You must be logged in to view your saved NPCs';
                return view('sections.npcs', ['data'=>$data]);
            }
            //Get the NPC
            $npc = self::getMyNPCById($npc_id, $user);
            if (!$npc) {
                //If we failed to get an NPC
                $data['error']= 'Invalid NPC ID';
                return view('sections.npcs', ['data'=>$data]);
            }
            $data['npc']=json_encode($npc);
        }

        return view('sections.npcs', ['data'=>$data]);
    }



    public static function getPublicNPCs(Request $request): \Illuminate\Http\JsonResponse {
        $user=self::getUser();

        //Get values or use defaults
        $qty=10;
        $filter = $request->has('filter') ? (int)$request->input('filter') : false;
        $page = $request->has('page') ? (int)$request->input('page') : 0;
        $method = $request->has('method') ? $request->input('method') : 'r';
        $seed = $request->has('seed') ? (int)$request->input('seed') : 0;
        
        $SELECT_QUERY = 'npcs.*, users.username';

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
                $ORDER_BY_QUERY = 'npcs.id DESC';
                break;
            case 'da':
                //Date, Ascending (Oldest)
                $ORDER_BY_QUERY = 'npcs.id ASC';
                break;

            default:
                $output['error']= 'invalid_sort_method';
                return $output;
                break;
        }

        if ($user) {
            $RAW_VOTED_QUERY = '(CASE '.
                'WHEN (SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=0 AND npc_votes.user_id='. (int)$user->id .')>0 THEN 0 '.
                'WHEN (SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=1 AND npc_votes.user_id='. (int)$user->id .')>0 THEN 1 '.
                'ELSE -1 END) AS voted'.
                ', (SELECT count(*) FROM npc_bookmarks WHERE npc_bookmarks.npc_id=npcs.id AND npc_bookmarks.user_id='. (int)$user->id .') AS saved';
        }
        else {
            $RAW_VOTED_QUERY = '-1 AS voted, 0 AS saved';
        }



        switch ($filter) {
            case 1:
                //Just Mine
                if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                $npcs = DB::table('npcs')
                    ->join('users', 'npc.user_id', '=', 'users.id')
                    ->select(
                        DB::raw($SELECT_QUERY),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=1) as upvotes'),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=0) as downvotes'),
                        DB::raw('(SELECT count(*) FROM npc_comments WHERE npc_comments.npc_id=npcs.id) as commentcount'),
                        DB::raw($RAW_VOTED_QUERY))
                    ->where('npcs.public', 1)
                    ->where('npcs.user_id', $user->id)
                    ->whereNull('npcs.deleted_at')
                    ->take($qty)
                    ->orderByRaw($ORDER_BY_QUERY)
                    ->skip($page * $qty)
                    ->get();
                break;
            case 2:
                //Not Mine
                if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                $npcs = DB::table('npcs')
                    ->join('users', 'npcs.user_id', '=', 'users.id')
                    ->select(
                        DB::raw($SELECT_QUERY),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=1) as upvotes'),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=0) as downvotes'),
                        DB::raw('(SELECT count(*) FROM npc_comments WHERE npc_comments.npc_id=npcs.id) as commentcount'),
                        DB::raw($RAW_VOTED_QUERY))
                    ->where('npcs.public', 1)
                    ->where('npcs.user_id', '<>', $user->id)
                    ->whereNull('npcs.deleted_at')
                    ->take($qty)
                    ->orderByRaw($ORDER_BY_QUERY)
                    ->skip($page * $qty)
                    ->get();
                break;
            case 3:
                //Saved
                if (!$user) { return response()->json(['error'=>'invalid_data'], 400); }
                $npcs = DB::table('npcs')
                    ->join('users', 'npcs.user_id', '=', 'users.id')
                    ->join('npc_bookmarks', 'npc_bookmarks.npc_id', '=', 'npcs.id') //
                    ->select(
                        DB::raw($SELECT_QUERY),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=1) as upvotes'),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=0) as downvotes'),
                        DB::raw('(SELECT count(*) FROM npc_comments WHERE npc_comments.npc_id=npcs.id) as commentcount'),
                        DB::raw($RAW_VOTED_QUERY))
                    ->where('npcs.public', 1)
                    ->where('npc_bookmarks.user_id', $user->id)
                    ->whereNull('npcs.deleted_at')
                    ->take($qty)
                    ->orderByRaw($ORDER_BY_QUERY)
                    ->skip($page * $qty)
                    ->get();
                break;
            default:
                //case 0 and default
                //ALL Posts
                $npcs = DB::table('npcs')
                    ->join('users', 'npcs.user_id', '=', 'users.id')
                    ->select(
                        DB::raw($SELECT_QUERY),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=1) as upvotes'),
                        DB::raw('(SELECT count(*) FROM npc_votes WHERE npc_votes.npc_id=npcs.id AND npc_votes.vote=0) as downvotes'),
                        DB::raw('(SELECT count(*) FROM npc_comments WHERE npc_comments.npc_id=npcs.id) as commentcount'),
                        DB::raw($RAW_VOTED_QUERY))
                    ->where('npcs.public', 1)
                    ->whereNull('npcs.deleted_at')
                    ->take($qty)
                    ->orderByRaw($ORDER_BY_QUERY)
                    ->skip($page * $qty)
                    ->get();
                break;
        }

        return response()->json(['success'=>true, 'npcs'=>$npcs]);
    }
    /*
    public static function getPublicNPCsPage($npc_id, Request $request) {
        $user=self::getUser();

        $data['startPage']='public';

        if ($npc_id !== null) {
           //Get the NPC
            $npc = self::getPublicNPCById($npc_id, $user);
            if (!$npc) {
                $data['error']= 'Invalid NPC ID';
                return view('sections.npcs', ['data'=>$data]);
            }
            $data['npc']=json_encode($npc);
        }

        return view('sections.npcs', ['data'=>$data]);
    }
    */


    public static function getMyNPCById($id, $user=null) {
        if ($user === null) {
            $user = self::getUser();
        }
        if (!$user) {
            return null;
        }
        $npc = NPC::where('id', $id)->where('user_id', $user->id)->first();
        if (!$npc) {
            return null;
        }

        return $npc;
    }

    public static function getPublicNPCById($id, $user=null) {
        $npc = NPC::where('id', $id)->where('public', true)->first();
        if (!$npc) {
            return null;
        }

        return $npc;
    }





	/**
	 * Get the author of the post.
	 */
	public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    { return $this->belongsTo('App\User'); }
	
	/**
	 * Get the comments for the npc.
	 */
	public function comments(): \Illuminate\Database\Eloquent\Relations\HasMany
    { return $this->hasMany('App\NPCComment'); }

	/**
	 * Get the votes for the npc.
	 */
	public function votes(): \Illuminate\Database\Eloquent\Relations\HasMany
    { return $this->hasMany('App\NPCVote'); }

}
