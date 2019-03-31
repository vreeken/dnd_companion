<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Encounter extends Model
{
    //

    /**
	 * Get the author of the post.
	 */
	public function user()
	{
		return $this->belongsTo('App\User');
	}
	
    /**
     * Get the comments for the encounter.
     */
    public function comments()
    {
        return $this->hasMany('App\EncounterComment');
    }

    /**
     * Get the votes for the encounter.
     */
    public function votes()
    {
        return $this->hasMany('App\EncounterVote');
    }
}
