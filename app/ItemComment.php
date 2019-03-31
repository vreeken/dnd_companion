<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemComment extends Model
{
    /**
     * Get the puzzle that owns the comment.
     */
    public function item()
    {
        return $this->belongsTo('App\Item');
    }

    /**
     * Get the votes for the hook.
     */
    public function votes()
    {
        return $this->hasMany('App\ItemCommentVote');
    }
}
