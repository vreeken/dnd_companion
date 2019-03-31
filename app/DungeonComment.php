<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DungeonComment extends Model
{
    /**
     * Get the puzzle that owns the comment.
     */
    public function item()
    {
        return $this->belongsTo('App\Dungeon');
    }

    /**
     * Get the votes for the hook.
     */
    public function votes()
    {
        return $this->hasMany('App\DungeonCommentVote');
    }
}
