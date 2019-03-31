<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\SectionModel;

//Make sure we define things here if they haven't already been defined elsewhere
defined('POST_TYPE') || define('POST_TYPE', 'riddle');
defined('POST_URL') || define('POST_URL', 'riddles');
defined('POST_TABLE') || define('POST_TABLE', 'riddles');
defined('POST_TYPE_PRETTY') || define('POST_TYPE_PRETTY', 'Riddle');

class Riddle extends Model {

    use SoftDeletes;
    use SectionModel;

    public static $POST_SELECT_QUERY = POST_TABLE. '.id, ' .POST_TABLE. '.riddle, ' .POST_TABLE. '.user_id, ' .POST_TABLE. '.answer, ' .POST_TABLE. '.created_at, ' .POST_TABLE. '.updated_at, users.username';

    /**
     * Get the author of the post.
     */
    public function user() { return $this->belongsTo('App\User'); }
    
    /**
     * Get the comments for the riddle.
     */
    public function comments() { return $this->hasMany('App\RiddleComment'); }

    /**
     * Get the votes for the riddle.
     */
    public function votes() { return $this->hasMany('App\RiddleVote'); }
}
