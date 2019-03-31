<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\SectionModel;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'puzzle');
defined('POST_URL') || define('POST_URL', 'puzzles');
defined('POST_TABLE') || define('POST_TABLE', 'puzzles');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Puzzle');

class Puzzle extends Model {

    use SoftDeletes;
    use SectionModel;

    public static $POST_SELECT_QUERY = POST_TABLE. '.id, ' .POST_TABLE. '.title, ' .POST_TABLE. '.user_id, ' .POST_TABLE. '.description, ' .POST_TABLE. '.external_link, ' .POST_TABLE. '.image_link, ' .POST_TABLE. '.created_at, ' .POST_TABLE. '.updated_at, users.username';

    /**
     * Get the author of the post.
     */
    public function user() { return $this->belongsTo('App\User'); }
    
    /**
     * Get the comments for the puzzle.
     */
    public function comments() { return $this->hasMany('App\PuzzleComment'); }

    /**
     * Get the votes for the puzzle.
     */
    public function votes() { return $this->hasMany('App\PuzzleVote'); }

}
