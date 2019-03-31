<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EncounterComment extends Model
{
    /**
     * Get the encounter that owns the comment.
     */
    public function encounter()
    {
        return $this->belongsTo('App\Encounter');
    }

    /**
     * Get the votes for the encounter.
     */
    public function votes()
    {
        return $this->hasMany('App\EncounterCommentVote');
    }
}
