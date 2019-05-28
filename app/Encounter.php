<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Encounter extends ParentPostModel {

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

		$this->POST_TYPE = 'encounter';
		$this->POST_TYPE_PRETTY = 'Encounter';

		$this->POSTS_URL = $this->POST_TYPE.'s';
		$this->POST_TABLE = $this->POST_TYPE.'s';
		$this->VOTES_TABLE = $this->POST_TYPE.'_votes';
		$this->COMMENTS_TABLE = $this->POST_TYPE.'_comments';
		$this->COMMENT_VOTES_TABLE = $this->POST_TYPE.'_comment_votes';
		$this->BOOKMARKS_TABLE = $this->POST_TYPE.'_bookmarks';

		//$this->POST_SELECT_QUERY = $this->POST_TABLE. '.id, ' .$this->POST_TABLE. '.title, ' .$this->POST_TABLE. '.user_id, ' .$this->POST_TABLE. '.description, ' .$this->POST_TABLE. '.external_link, ' .$this->POST_TABLE. '.image_link, ' .$this->POST_TABLE. '.created_at, ' .$this->POST_TABLE. '.updated_at, users.username';
	}
    //

    /**
	 * Get the author of the post.
	 */
	public function user()
	{
		return $this->belongsTo('App\User');
	}
	
    /**
     * Get the comments for the encounter.
     */
    public function comments()
    {
        return $this->hasMany('App\EncounterComment');
    }

    /**
     * Get the votes for the encounter.
     */
    public function votes()
    {
        return $this->hasMany('App\EncounterVote');
    }
}
