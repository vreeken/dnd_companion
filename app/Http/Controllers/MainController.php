<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use DB;

use App\Hook;
use App\HookVote;
use App\HookCommentVote;
use App\HookComment;
use App\Riddle;
use App\RiddleVote;
use App\RiddleCommentVote;
use App\RiddleComment;
use App\Puzzle;
use App\PuzzleVote;
use App\PuzzleCommentVote;
use App\PuzzleComment;
use App\Item;
use App\ItemVote;
use App\ItemCommentVote;
use App\ItemComment;
use App\Map;
use App\MapVote;
use App\MapCommentVote;
use App\MapComment;
use App\Dungeon;
use App\DungeonVote;
use App\DungeonCommentVote;
use App\DungeonComment;
use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exception;

class MainController extends Controller {

	public function getReleaseNotes(Request $request) {
		$o['msg']="Update 12/11/2018\n\nFinally got some free time and released an update, albeit a minor one.\n\nRemoved the App Name Poll which wasn't working due to it trying to access an old server.\n\nAdded 30+ new D100 lists and updated some existing ones.\n\nWorking on a web-based version which is coming along nicely\n\n\nUpdate 7/2/2018\n\nSorry for the server outages recently. My server provider has been struggling. I've currently moved to another server which will hopefully have better up-time. Unfortunately that means anything done over the past 24 hours or so has been erased.\n\nAlso, sorry there hasn't been any updates recently. I've been busy working on a paid project, which takes priority over this one. Once that one is finished I'll pick development back up on this. Thanks to everyone who has emailed me suggestions, I appreciate it and plan to implement most of them. Just give me time.\n\n\nUpdate 4/30/2018\n\nOut of Alpha!\nThere have been minimal crashes over the past couple versions, and I think we're stable enough for everybody.\n\nReworked the registration process: you no longer have to confirm your email address (email is only used for password resets).\n\nNew d100 lists\n\n\nUpdate 3/29/18\n\nNew d100 lists\n\nHopeful Bug Fixes\n\n\nUpdate 3/12/18\n\nThere has been an increase in crashes recently with not-so-obvious causes. Hopefully this release fixes those crashes.\n\nAdd Advantage/Disadvantage to dice roller.\n\nAdd Halfling name generator.\n\n\nUpdate 3/7/18\n\nLogged in users can now filter posts by \"All Posts\", \"Just Mine\", \"Exclude Mine\", and \"Saved Posts\".\n\nAdded 12 new d100 lists, and added more content to 4 old ones.\n\nServer Updates\n\nBug Fixes - Thanks again for all of your feedback on those everyone\n\n\nUpdate 2/26/18 Release Notes\n\nLogged in users can now bookmark/save posts and revisit them later.\n\nMinor Bug Fixes.\n\n\nUpdate 2/9/18 Release Notes\n\n10 New d100 lists\nYou can now sort content by upvotes, downvotes, newest, oldest, and random\nBug fixes (specifically for the poll vote which would crash if a user tried to vote but couldn't connect to the server)\n\n\nUpdate 1/31/18 Release Notes\n\nMajor code refactoring (you probably won't notice anything unless you get more crashes)\nLogged in users can now edit and delete their posts.\nVoting on content is now much easier and more intuitive.\nAdded a poll to see which app name you all prefer.\nLots of new d100 lists.\n\n10k users!\n\n\nUpdate 1/19/18 Release Notes\n\nPuzzle and Unique Item sections are finally up and functioning. I've included a dozen or so entries for each; a big thanks to everyone who contributes content.\n\nLots of bug fixes.\n\n\nUpdate 1/2/18 Release Notes\n\nNew Section: Name Generator - Still working on adding more races, but there is a decent start.\nNew Section: Dice Roller - Basic rolls as well as the ability to type out (and save) custom rolls, such as 1d20+1d6+5-2d8.\nNew Section: Credits - Added a basic screen that gives credit to people whose images I've used and some shout-outs to specific websites I get ideas from.\nUpdate to d100 section that allows users to long press each d100 option which will display the source of the content.\n3 new d100 lists.\nSome minor bug fixes.\n\n\nUpdate 12/16/17 Release Notes\n\nHappy Holidays!\n\nSorry it's been so long since I've released an update.\nI added a new Maps section for battle and encounter maps. There are currently only a handful so far. I'll be adding more, but I hope all of you add some as well.\nLots more d100 lists.\nImproved randomization while retrieving hooks, riddles, and maps. You shouldn't get any duplicates now.\nAnd bug fixes!\nThis version will be a slightly larger file size, I decided not to minify it in hopes that it would help me track down crashes better. Thanks to the many of you who contact me with issues and feedback.\n\n\nUpdate 11/27/17 Release Notes\n\nAdded a copy text button to the NPC Generator screens.\n\nReworked the d100 lists to be easier for me to just drop them in, code was getting ugly. Because of how easy it is now, I've also added 16 new d100 lists. Thanks to everyone at reddit.com/r/d100 for their list contributions. Enjoy!\n\n\nUpdate 11/23/17 Release Notes\n\nHappy Thanksgiving!\n\nCreated a Loot Generator section. It probably needs some tweaking still so let me know what you think.\n\nAdded a link in the Encounters section that takes you to Kobold Fight Club for building encounters.  The eventual goal is to have unique finely crafted encounters, as opposed to just throwing some monsters together based on the Challenge Rating, but that will be in the future.\n\n\nUpdate: 11/20/17 Release Notes\n\nQuite a few craches recently, I'm hoping this solves the problem, although I'm not entirely sure what the problem is. Feel free to contact me with details on any crashes you have.\n\n\nUpdate: 11/16/17 Release Notes \n\nPassword resets now implemented from the login page (clicking the forgot your password link)\n\nContact the developer link put into the menu\n\nAdded 4 new d100 lists: Interesting Books, Unique Shops and Stores, Holy Pilgrimage Quests, and Dungeon Lever Consequences\n\n\n\nUpdate: 11/12/17 Release Notes \n\nYou can now create an account, which requires a username and an email address which must be confirmed.\n\nWith an account you can submit your own riddles and plot hooks as well as vote on other user's submissions.\n\nThere is no way yet to view all of your submissions, but that will be coming soon; as will sorting - there will probably be sort by date and sort by number of votes as well as the current randomize.\n\nWe've reached 1000 downloads, so thanks to all of you for the encouragement to keep with this.";
		return response()->json($o);
	}

	public function getMobileNews(Request $request) {
		$o['id']=0;
		$o['msg']="http://www.dndcompanion.com is now live! It doesn't have every feature that this app has, but it does have commenting. Development on this app is mostly dead. I won't remove the app, but it won't get much updates. My time is mostly spent on the website now.";
		return response()->json($o);
	}

	public function getUser() {
		$user=null;
		try { $user = JWTAuth::toUser(JWTAuth::getToken()); }
		catch(JWTException $e) { $user = Auth::user(); }
		return $user;
	}

	/*DEPRECATED*/
	public function pollVote(Request $request) {
		$v = $request->has('vote') ? intval($request->input('vote')) : 0;
		DB::table("poll_vote")->insert(['vote'=>$v]);
		return response()->json(['success'=>'vote_saved']);
	}
	
	public function vote(Request $request) {
		//-1=didn't vote, 0=downvoted, 1=upvoted
		if (!$request->has('type') || !$request->has('vote') || !is_numeric($request->input('vote')) || !$request->has('id') || !is_numeric($request->input('id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$user=$this->getUser();
		$uid = $user->id;
		$id = intval($request->input('id'));
		$type = $request->input('type');
		$prop = $type."_id";
		$vote=intval($request->input('vote'));
		

		switch ($type) {
			case "hook":
				$prev = HookVote::where('user_id', $uid)->where('hook_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new HookVote;
				break;
			case "hook_comment":
				$prev = HookCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new HookCommentVote;
				$prop='comment_id';
				break;
			case "riddle":
				$prev = RiddleVote::where('user_id', $uid)->where('riddle_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new RiddleVote;
				break;
			case "riddle_comment":
				$prev = RiddleCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new RiddleCommentVote;
				$prop='comment_id';
				break;
			case "puzzle":
				$prev = PuzzleVote::where('user_id', $uid)->where('puzzle_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new PuzzleVote;
				break;
			case "puzzle_comment":
				$prev = PuzzleCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new PuzzleCommentVote;
				$prop='comment_id';
				break;
			case "item":
				$prev = ItemVote::where('user_id', $uid)->where('item_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new ItemVote;
				break;
			case "item_comment":
				$prev = ItemCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new ItemCommentVote;
				$prop='comment_id';
				break;
			case "dungeon":
				$prev = DungeonVote::where('user_id', $uid)->where('dungeon_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new DungeonVote;
				break;
			case "dungeon_comment":
				$prev = DungeonCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new DungeonCommentVote;
				$prop='comment_id';
				break;
			case "map":
				$prev = MapVote::where('user_id', $uid)->where('map_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new MapVote;
				break;
			case "map_comment":
				$prev = MapCommentVote::where('user_id', $uid)->where('comment_id', $id)->first();
				if ($prev) {
					if ($prev->vote == $vote) { return response()->json(['success'=>'vote_unchanged']); }
					$prev->vote = $vote;
					if ($prev->save()) { return response()->json(['success'=>'vote_updated']); }
					else { return response()->json(['error'=>'invalid_parameters'], 400); }
				}
				$insert = new MapCommentVote;
				$prop='comment_id';
				break;
			default:
				return response()->json(['error'=>'invalid_parameters'], 400);
		}
		
		$insert->$prop = $id;
		$insert->user_id = $uid;
		$insert->vote = $vote;

		if ($insert->save()) { return response()->json(['success'=>'vote_saved']); }
		else { return response()->json(['error'=>'db_error'], 500); }
	}


	public function getComments(Request $request) {
		if (!$request->has('post_type')  || !$request->has('post_id') || !is_numeric($request->input('post_id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}
		$post_id = intval($request->input('post_id'));
		$post_type = $request->input('post_type');
		$pc = $post_type.'_comments';
		$pcv = $post_type.'_comment_votes';

		$user=$this->getUser();

		if ($user) {
			$RAW_VOTED_QUERY = '(CASE '.
				'WHEN (SELECT count(*) FROM '.$post_type.'_comment_votes WHERE '.$post_type.'_comment_votes.comment_id='.$post_type.'_comments.id AND '.$post_type.'_comment_votes.vote=0 AND '.$post_type.'_comment_votes.user_id='.intval($user->id).')>0 THEN 0 '.
				'WHEN (SELECT count(*) FROM '.$post_type.'_comment_votes WHERE '.$post_type.'_comment_votes.comment_id='.$post_type.'_comments.id AND '.$post_type.'_comment_votes.vote=1 AND '.$post_type.'_comment_votes.user_id='.intval($user->id).')>0 THEN 1 '.
				'ELSE -1 END) AS voted';
		}
		else {
			$RAW_VOTED_QUERY = '-1 AS voted';
		}

		$comments = DB::table($pc)
			->leftJoin('users', $pc.'.user_id', '=', 'users.id')
			->select($pc.'.id', $pc.'.comment', $pc.'.parent_id', $pc.'.created_at', $pc.'.updated_at', 'users.username', 
					DB::raw('(SELECT count(*) FROM '.$pcv.' WHERE '.$pcv.'.comment_id='.$pc.'.id AND '.$pcv.'.vote=1) as upvotes'),
					DB::raw('(SELECT count(*) FROM '.$pcv.' WHERE '.$pcv.'.comment_id='.$pc.'.id AND '.$pcv.'.vote=0) as downvotes'),
					DB::raw($RAW_VOTED_QUERY))
			->where($pc.'.'.$post_type.'_id', $post_id)
			->whereNull($pc.'.deleted_at')
			->get();

		return response()->json(['success'=>'success', 'comments'=>$comments]);
	}

	public function postComment(Request $request) {
		//post_type=["hook","riddle", "puzzle", ...]
		//post_id=INT		
		if (!$request->has('post_type')  || !$request->has('post_id') || !is_numeric($request->input('post_id'))) {
			return response()->json(['error'=>'invalid_parameters1'], 400);
		}
		$post_id = intval($request->input('post_id'));
		$post_type = $request->input('post_type');

		//comment=STRING
		if (!$request->has('comment')) {
			return response()->json(['error'=>'invalid_parameters2'], 400);
		}
		$comment = $request->input('comment');
		if (strlen($comment)==0) { 
			return response()->json(['error'=>'invalid_parameters3'], 400);
		}

		//parent_id=NULL OR INT
			//NULL = top level comment
			//INT=child comment
		if ($request->has('parent_id') && !is_null($request->input('parent_id'))) {
			if (!is_numeric($request->input('parent_id'))) {
				return response()->json(['error'=>'invalid_parameters4'], 400);
			}
			else {
				$parent_id = $request->input('parent_id');
				$lineage=null;
			}
		}
		else {
			$parent_id=null;
			$lineage='/';
		}




		$user=$this->getUser();
		if (!$user) {
			return response()->json(['error'=>'not_logged_in'], 401);
		}

		$uid = $user->id;
		
		
		$prop = $post_type."_id";
		//$vote=intval($request->input('vote'));
		
		switch ($post_type) {
			case "hook":
				$insert = new HookComment;
				$vote = new HookCommentVote;
				if (is_null($lineage)) { $parent = HookComment::where('id', $parent_id)->first(); }
				break;
			case "riddle":
				$insert = new RiddleComment;
				$vote = new RiddleCommentVote;
				if (is_null($lineage)) { $parent = RiddleComment::where('id', $parent_id)->first(); }
				break;
			case "puzzle":
				$insert = new PuzzleComment;
				$vote = new PuzzleCommentVote;
				if (is_null($lineage)) { $parent = PuzzleComment::where('id', $parent_id)->first(); }
				break;
			case "item":
				$insert = new ItemComment;
				$vote = new ItemCommentVote;
				if (is_null($lineage)) { $parent = ItemComment::where('id', $parent_id)->first(); }
				break;
			case "dungeon":
				$insert = new DungeonComment;
				$vote = new DungeonCommentVote;
				if (is_null($lineage)) { $parent = DungeonComment::where('id', $parent_id)->first(); }
				break;
			case "map":
				$insert = new MapComment;
				$vote = new MapCommentVote;
				if (is_null($lineage)) { $parent = MapComment::where('id', $parent_id)->first(); }
				break;
			default:
				return response()->json(['error'=>'invalid_parameters'], 400);
		}

		if (isset($parent)) { $lineage=$parent->lineage.$parent_id.'/'; }
		
		$insert->parent_id=$parent_id;
		$insert->$prop=$post_id;
		$insert->user_id = $uid;
		$insert->comment=$comment;
		$insert->lineage=$lineage;

		if ($insert->save()) { 
			$vote->comment_id=$insert->id;
			$vote->user_id=$user->id;
			$vote->vote=1;
			$vote->save();
			return response()->json(['success'=>'comment_saved', 'new_id'=>$insert->id]);
		}
		else { return response()->json(['error'=>'db_error'], 500); }
	}


	public function updateComment(Request $request) {
		//post_type=["hook","riddle", "puzzle", ...]
		//post_id=INT		
		if (!$request->has('post_type')  || !$request->has('comment_id') || !is_numeric($request->input('comment_id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}
		$comment_id = intval($request->input('comment_id'));
		$post_type = $request->input('post_type');

		//comment=STRING
		if (!$request->has('comment')) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}
		$comment = $request->input('comment');
		if (strlen($comment)==0) { 
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$user=$this->getUser();
		if (!$user) {
			return response()->json(['error'=>'not_logged_in'], 401);
		}
		$uid = $user->id;
		
		$pc = $post_type.'_comments';
		$prop = $post_type."_id";
		//$vote=intval($request->input('vote'));
		
		if (DB::table($pc)->where('id', $comment_id)->where('user_id', $uid)->whereNull($pc.'.deleted_at')->update(['comment' => $comment, 'updated_at' => date('Y-m-d G:i:s')])) {
			return response()->json(['success'=>'comment_updated']);
		}
		else { 
			return response()->json(['error'=>'access_denied'], 403);
		}
	}





	public function bookmark(Request $request) {
		//int bookmark: 0=delete, 1=save
		if (!$request->has('type') || !$request->has('bookmark') || !is_numeric($request->input('bookmark')) || !$request->has('id') || !is_numeric($request->input('id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$user=$this->getUser();
		$uid = $user->id;
		$id = intval($request->input('id'));
		$type = $request->input('type');
		$prop = $type."_id";
		$table = $type."_bookmarks";
		$bookmark=intval($request->input('bookmark'));
		
		try {
			if ($bookmark==0) {
				DB::table($table)->where('user_id', $uid)->where($prop, $id)->delete();
				return response()->json(['success'=>'bookmark_unsaved']);
			}
			else {
				$row = DB::table($table)->where('user_id', $uid)->where($prop, $id)->first();
				if (!$row) {
					$dt = new \DateTime();
					DB::table($table)->insert(['user_id'=>$uid, $prop=>$id, 'created_at'=>$dt, 'updated_at'=>$dt]);
					return response()->json(['success'=>'bookmark_saved']);
				}
				else {
					return response()->json(['success'=>'already_saved']);
				}
			}
		}
		catch (Exception $e) {
			return response()->json(['error'=>'db_error'], 500);
		}
		return response()->json(['error'=>'db_error'], 500);
	}


	public function report(Request $request) {
		if (!$request->has('type') || !$request->has('id') || !is_numeric($request->input('id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$user=$this->getUser();
		$uid = $user ? $user->id : null;
		$id = intval($request->input('id'));
		$type = $request->input('type'); //'hook' or 'hook_comment'
		$table = 'reports';
		
		try {
			$row = DB::table($table)->where('user_id', $uid)->where('type', $type)->where('content_id', $id)->first();
			if (!$row) {
				$dt = new \DateTime();
				DB::table($table)->insert(['user_id'=>$uid, 'type'=>$type, 'content_id'=>$id, 'created_at'=>$dt]);
				return response()->json(['success'=>'report_saved']);
			}
			return response()->json(['error'=>'report_awaiting_approval'], 200);
		}
		catch (Exception $e) {
			return response()->json(['error'=>'db_error'], 500);
		}
		return response()->json(['error'=>'db_error'], 500);
	}


	public function updatePost(Request $request) {
		if (!$request->has('type') || !$request->has('id') || !is_numeric($request->input('id'))) {
			return response()->json(['error'=>'invalid_parameters'], 400);
		}

		$user=$this->getUser();
		$uid = $user->id;
		$id = intval($request->input('id'));
		$type = $request->input('type');
		
		switch ($type) {
			case "hook":
				if (!$request->has('title') || strlen($request->input('title'))==0 || !$request->has('description') || strlen($request->input('description'))==0) {
					break;
				}
				if (Hook::where('id', $id)->where('user_id', $uid)->update(['title' => $request->input('title'), 'description'=>$request->input('description')])) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "hook_comment":
				
				break;
			case "riddle":
				if (!$request->has('riddle') || strlen($request->input('riddle'))==0 || !$request->has('answer') || strlen($request->input('answer'))==0) {
					break;
				}
				if (Riddle::where('id', $id)->where('user_id', $uid)->update(['riddle' => $request->input('riddle'), 'answer'=>$request->input('answer')])) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "riddle_comment":
				
				break;
			case "puzzle":
				if (!$request->has('title') || strlen($request->input('title'))==0 || !$request->has('description') || strlen($request->input('description'))==0) {
					break;
				}
				$external_link = $request->has('external_link') ? $request->input('external_link') : "";
				$image_link = $request->has('image_link') ? $request->input('image_link') : "";
				if (Puzzle::where('id', $id)->where('user_id', $uid)->update(['title' => $request->input('title'), 'description'=>$request->input('description'),
						'external_link'=>$external_link, 'image_link'=>$image_link])) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "puzzle_comment":
				
				break;
			case "item":
				if (!$request->has('title') || strlen($request->input('title'))==0 || !$request->has('description') || strlen($request->input('description'))==0) {
					return response()->json(['error'=>'invalid_parameters2'], 400);
					break;
				}
				$external_link = $request->has('external_link') ? $request->input('external_link') : "";
				$image_link = $request->has('image_link') ? $request->input('image_link') : "";
				if (Item::where('id', $id)->where('user_id', $uid)->update(['title' => $request->input('title'), 'description'=>$request->input('description'),
						'external_link'=>$external_link, 'image_link'=>$image_link])) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "item_comment":
				
				break;
			case "map":
				if (!$request->has('title') || strlen($request->input('title'))==0 || !$request->has('description') || strlen($request->input('description'))==0) {
					break;
				}
				$link=$request->has('link') ? $request->input('link') : "";
				if (Map::where('id', $id)->where('user_id', $uid)->update(['title' => $request->input('title'), 'description'=>$request->input('description'),
						'link'=>$link])) {
					if ($request->has('envs')) {
						$envs = $request->input('envs');
						$ar = explode(",", $envs);
						if (count($ar)>0) {
							DB::table('map_environments')->where('map_id', $id)->delete();

							for ($i=0; $i<count($ar); $i++) {
								DB::table('map_environments')->insert(
									['map_id' => $id, 'environment' => $ar[$i]]
								);
							}
						}
					}
					return response()->json(['success'=>'success']);
				}
				break;
			default:
				return response()->json(['error'=>'invalid_parameters'], 400);
		}

		return response()->json(['error'=>'invalid_parameters'], 400);
	}



	public function deletePost(Request $request) {
		if (!$request->has('type')) {
			return response()->json(['error'=>'invalid_parameters1'], 400);
		}
		if (!$request->has('id')) {
			return response()->json(['error'=>'invalid_parameters2'], 400);
		}
		if (!is_numeric($request->input('id'))) {
			return response()->json(['error'=>'invalid_parameters3'], 400);
		}

		$user=$this->getUser();
		$uid = $user->id;
		$id = intval($request->input('id'));
		$type = $request->input('type');

		switch ($type) {
			case "hook":
				if (Hook::where('id', $id)->where('user_id', $uid)->delete()) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "item":
				return Item::where('id', $id)->toSql();
				if (Item::where('id', $id)->where('user_id', $uid)->delete()) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "riddle":
				if (Riddle::where('id', $id)->where('user_id', $uid)->delete()) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "map":
				if (Map::where('id', $id)->where('user_id', $uid)->delete()) {
					return response()->json(['success'=>'success']);
				}
				break;
			case "puzzle":
				if (Puzzle::where('id', $id)->where('user_id', $uid)->delete()) {
					return response()->json(['success'=>'success']);
				}
				break;
			default:

		}
		return response()->json(['error'=>'invalid_parameters4', 'id'=> $id], 400);
	}
}
