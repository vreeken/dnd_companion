<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PuzzleComment extends Model
{
    /**
     * Get the puzzle that owns the comment.
     */
    public function puzzle()
    {
        return $this->belongsTo('App\Puzzle');
    }

    /**
     * Get the votes for the hook.
     */
    public function votes()
    {
        return $this->hasMany('App\HookCommentVote');
    }
}
