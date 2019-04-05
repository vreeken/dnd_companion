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
		if (!$request->has('npc')) {
			return response()->json(['error'=>'invalid_npc_data'], 400);
		}

		$npc = self::parseNPCFromRequest($request);

		if ($npc->save()) {
			return response()->json(['success'=>'npc_created', 'id'=>$npc->id]);
		}

		return response()->json(['error'=>'db_error'], 500);
	}

	public static function updateNPC(Request $request): \Illuminate\Http\JsonResponse {
		if (!$request->has('npc')) {
			return response()->json(['error'=>'invalid_npc_data'], 400);
		}

		$d = $request->input('npc');

		$id = isset($d['id']) ? (int) $d['id'] : false;
		if ($id === false) {
			return response()->json(['error'=>'invalid_npc_id'], 400);
		}

		$user = self::getUser();

		$npc = NPC::where('id', $id)->where('user_id', $user->id)->first();

		if ($npc) {
			$npc->public = isset($d['public']) ? $d['public'] : 0;
			$npc->name = isset($d['name']) ? $d['name'] : null;
			$npc->age = isset($d['age_int']) ? $d['age_int'] : null;
			$npc->alignment = isset($d['alignment_int']) ? $d['alignment_int'] : null;
			$npc->appearance = isset($d['appearance']) ? $d['appearance'] : null;
			$npc->attacks_abilities = isset($d['attacks_abilities']) ? $d['attacks_abilities'] : null;
			$npc->attr_cha = isset($d['asi'][0]) ? $d['asi'][0] : null;
			$npc->attr_con = isset($d['asi'][1]) ? $d['asi'][1] : null;
			$npc->attr_dex = isset($d['asi'][2]) ? $d['asi'][2] : null;
			$npc->attr_int = isset($d['asi'][3]) ? $d['asi'][3] : null;
			$npc->attr_str = isset($d['asi'][4]) ? $d['asi'][4] : null;
			$npc->attr_wis = isset($d['asi'][5]) ? $d['asi'][5] : null;
			$npc->bond = isset($d['bond']) ? $d['bond'] : null;
			$npc->class_id = isset($d['class_int']) ? $d['class_int'] : null;
			$npc->class_other = isset($d['class_other']) ? $d['class_other'] : null;
			$npc->detail = isset($d['detail']) ? $d['detail'] : null;
			$npc->flaw = isset($d['flaw']) ? $d['flaw'] : null;
			$npc->hook = isset($d['hook']) ? $d['hook'] : null;
			$npc->hp = isset($d['hp']) ? $d['hp'] : null;
			$npc->ideal = isset($d['ideal']) ? $d['ideal'] : null;
			$npc->inventory = isset($d['inventory']) ? $d['inventory'] : null;
			$npc->languages = isset($d['languages']) ? $d['languages'] : null;
			$npc->level = isset($d['level']) ? $d['level'] : null;
			$npc->life_event = isset($d['life_event']) ? $d['life_event'] : null;
			$npc->misc = isset($d['misc']) ? $d['misc'] : null;
			$npc->motivation = isset($d['motivation']) ? $d['motivation'] : null;
			$npc->personality = isset($d['personality']) ? $d['personality'] : null;
			$npc->profession = isset($d['profession']) ? $d['profession'] : null;
			$npc->quirk = isset($d['quirk']) ? $d['quirk'] : null;
			$npc->race_id = isset($d['race_id']) ? $d['race_id'] : null;
			$npc->race_other = isset($d['race_other']) ? $d['race_other'] : null;
			$npc->racials = isset($d['racials']) ? $d['racials'] : null;
			$npc->relationship = isset($d['relationship']) ? $d['relationship'] : null;
			$npc->sex = isset($d['sex']) ? $d['sex'] : null;
			$npc->skills = isset($d['skills']) ? $d['skills'] : null;
			$npc->speed = isset($d['speed']) ? $d['speed'] : null;
			$npc->speed_fly = isset($d['speed_fly']) ? $d['speed_fly'] : null;
			$npc->speed_swim = isset($d['speed_swim']) ? $d['speed_swim'] : null;
			$npc->summary = isset($d['summary']) ? $d['summary'] : $d['name'];
			$npc->trait = isset($d['trait']) ? $d['trait'] : null;
			$npc->voice = isset($d['voice']) ? $d['voice'] : null;
			$npc->worship_habit = isset($d['worship_habit']) ? $d['worship_habit'] : null;
		}
		else {
			return response()->json(['error'=>'invalid_npc'], 400);
		}

		if ($npc->save()) {
			return response()->json(['success'=>'npc_updated']);
		}

		return response()->json(['error'=>'db_error'], 500);
	}



	private static function parseNPCFromRequest(Request $request): NPC {
		$user=self::getUser();
		$npc = new NPC();

		$npc->user_id=$user->id;

		$d = $request->input('npc');

		$npc->public = isset($d['public']) ? $d['public'] : 0;
		$npc->name = isset($d['name']) ? $d['name'] : null;
		$npc->age = isset($d['age_int']) ? $d['age_int'] : null;
		$npc->alignment = isset($d['alignment_int']) ? $d['alignment_int'] : null;
		$npc->appearance = isset($d['appearance']) ? $d['appearance'] : null;
		$npc->attacks_abilities = isset($d['attacks_abilities']) ? $d['attacks_abilities'] : null;
		$npc->attr_cha = isset($d['asi'][0]) ? $d['asi'][0] : null;
		$npc->attr_con = isset($d['asi'][1]) ? $d['asi'][1] : null;
		$npc->attr_dex = isset($d['asi'][2]) ? $d['asi'][2] : null;
		$npc->attr_int = isset($d['asi'][3]) ? $d['asi'][3] : null;
		$npc->attr_str = isset($d['asi'][4]) ? $d['asi'][4] : null;
		$npc->attr_wis = isset($d['asi'][5]) ? $d['asi'][5] : null;
		$npc->bond = isset($d['bond']) ? $d['bond'] : null;
		$npc->class_id = isset($d['class_id']) ? $d['class_id'] : null;
		$npc->class_other = isset($d['class_other']) ? $d['class_other'] : null;
		$npc->detail = isset($d['detail']) ? $d['detail'] : null;
		$npc->flaw = isset($d['flaw']) ? $d['flaw'] : null;
		$npc->hook = isset($d['hook']) ? $d['hook'] : null;
		$npc->hp = isset($d['hp']) ? $d['hp'] : null;
		$npc->ideal = isset($d['ideal']) ? $d['ideal'] : null;
		$npc->inventory = isset($d['inventory']) ? $d['inventory'] : null;
		$npc->languages = isset($d['languages']) ? $d['languages'] : null;
		$npc->level = isset($d['level']) ? $d['level'] : null;
		$npc->life_event = isset($d['life_event']) ? $d['life_event'] : null;
		$npc->misc = isset($d['misc']) ? $d['misc'] : null;
		$npc->motivation = isset($d['motivation']) ? $d['motivation'] : null;
		$npc->personality = isset($d['personality']) ? $d['personality'] : null;
		$npc->profession = isset($d['profession']) ? $d['profession'] : null;
		$npc->quirk = isset($d['quirk']) ? $d['quirk'] : null;
		$npc->race_id = isset($d['race_id']) ? $d['race_id'] : null;
		$npc->race_other = isset($d['race_other']) ? $d['race_other'] : null;
		$npc->racials = isset($d['racials']) ? $d['racials'] : null;
		$npc->relationship = isset($d['relationship']) ? $d['relationship'] : null;
		$npc->sex = isset($d['sex']) ? $d['sex'] : null;
		$npc->skills = isset($d['skills']) ? $d['skills'] : null;
		$npc->speed = isset($d['speed']) ? $d['speed'] : null;
		$npc->speed_fly = isset($d['speed_fly']) ? $d['speed_fly'] : null;
		$npc->speed_swim = isset($d['speed_swim']) ? $d['speed_swim'] : null;
		$npc->summary = isset($d['summary']) ? $d['summary'] : $d['name'];
		$npc->trait = isset($d['trait']) ? $d['trait'] : null;
		$npc->voice = isset($d['voice']) ? $d['voice'] : null;
		$npc->worship_habit = isset($d['worship_habit']) ? $d['worship_habit'] : null;

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
