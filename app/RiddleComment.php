<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RiddleComment extends Model
{
    /**
     * Get the riddle that owns the comment.
     */
    public function riddle()
    {
        return $this->belongsTo('App\Riddle');
    }

    /**
     * Get the votes for the riddle.
     */
    public function votes()
    {
        return $this->hasMany('App\RiddleCommentVote');
    }
}
