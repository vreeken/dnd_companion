<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HookComment extends Model
{
    /**
     * Get the hook that owns the comment.
     */
    public function hook()
    {
        return $this->belongsTo('App\Hook');
    }

    /**
     * Get the votes for the hook.
     */
    public function votes()
    {
        return $this->hasMany('App\HookCommentVote');
    }
}
