<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRiddlevotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('riddle_votes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('riddle_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->tinyInteger('vote')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('riddle_votes');
    }
}
