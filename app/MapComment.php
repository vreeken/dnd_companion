<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapComment extends Model
{
    /**
     * Get the map that owns the comment.
     */
    public function map()
    {
        return $this->belongsTo('App\Map');
    }

    /**
     * Get the votes for the map.
     */
    public function votes()
    {
        return $this->hasMany('App\MapCommentVote');
    }
}
