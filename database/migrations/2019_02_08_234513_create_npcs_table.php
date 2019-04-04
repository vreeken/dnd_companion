<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNpcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('npcs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->boolean('public')->default(false);

            $table->string('name', 512)->nullable()->default(null);
            $table->smallInteger('age')->unsigned()->nullable()->default(null);
            $table->tinyInteger('alignment')->unsigned()->nullable()->default(null);
            $table->string('appearance', 1024)->nullable()->default(null);
            $table->string('attacks_abilities', 512)->nullable()->default(null);
            $table->tinyInteger('attr_cha')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_con')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_dex')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_int')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_str')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_wis')->unsigned()->nullable()->default(null);
            $table->string('bond', 512)->nullable()->default(null);
            $table->tinyInteger('class_id')->nullable()->default(null);
            $table->string('class_other', 512)->nullable()->default(null);
            $table->string('detail', 512)->nullable()->default(null);
            $table->string('flaw', 512)->nullable()->default(null);
            $table->string('hook', 512)->nullable()->default(null);
            $table->smallInteger('hp')->unsigned()->nullable()->default(null);
            $table->string('ideal', 512)->nullable()->default(null);
            $table->string('inventory', 512)->nullable()->default(null);
            $table->string('languages', 512)->nullable()->default(null);
            $table->tinyInteger('level')->unsigned()->nullable()->default(null);
            $table->string('life_event', 512)->nullable()->default(null);
            $table->string('misc', 512)->nullable()->default(null);
            $table->string('motivation', 512)->nullable()->default(null);
            $table->string('personality', 512)->nullable()->default(null);
            $table->string('profession', 512)->nullable()->default(null);
            $table->string('quirk', 512)->nullable()->default(null);
            $table->tinyInteger('race_id')->unsigned()->nullable()->default(null);
            $table->string('race_other', 512)->nullable()->default(null);
            $table->string('racials', 512)->nullable()->default(null);
            $table->string('relationship', 512)->nullable()->default(null);
            $table->string('sex', 3)->nullable()->default(null);
            $table->string('skills', 512)->nullable()->default(null);
            $table->tinyInteger('speed')->unsigned()->nullable()->default(null);
            $table->tinyInteger('speed_fly')->unsigned()->nullable()->default(null);
            $table->tinyInteger('speed_swim')->unsigned()->nullable()->default(null);
            $table->string('summary', 512)->nullable()->default(null);
            $table->string('trait', 512)->nullable()->default(null);
            $table->string('voice', 512)->nullable()->default(null);
            $table->string('worship_habit', 512)->nullable()->default(null);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('npcs');
    }
}
