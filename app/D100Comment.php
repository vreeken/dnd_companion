<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class D100Comment extends Model
{
    /**
     * Get the encounter that owns the comment.
     */
    public function encounter()
    {
        return $this->belongsTo('App\D100');
    }

    /**
     * Get the votes for the encounter.
     */
    public function votes()
    {
        return $this->hasMany('App\D100CommentVote');
    }
}
