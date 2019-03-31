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

            $table->string('name')->nullable()->default(null);
            $table->smallInteger('age')->unsigned()->nullable()->default(null);
            $table->tinyInteger('alignment')->unsigned()->nullable()->default(null);
            $table->string('appearance')->nullable()->default(null);
            $table->string('attacks_abilities')->nullable()->default(null);
            $table->tinyInteger('attr_cha')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_con')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_dex')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_int')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_str')->unsigned()->nullable()->default(null);
            $table->tinyInteger('attr_wis')->unsigned()->nullable()->default(null);
            $table->string('bond')->nullable()->default(null);
            $table->tinyInteger('class')->nullable()->default(null);
            $table->string('class_other')->nullable()->default(null);
            $table->string('detail')->nullable()->default(null);
            $table->string('flaw')->nullable()->default(null);
            $table->string('hook')->nullable()->default(null);
            $table->smallInteger('hp')->unsigned()->nullable()->default(null);
            $table->string('ideal')->nullable()->default(null);
            $table->string('inventory')->nullable()->default(null);
            $table->string('languages')->nullable()->default(null);
            $table->tinyInteger('level')->unsigned()->nullable()->default(null);
            $table->string('life_event')->nullable()->default(null);
            $table->string('misc')->nullable()->default(null);
            $table->string('motivation')->nullable()->default(null);
            $table->string('personality')->nullable()->default(null);
            $table->string('profession')->nullable()->default(null);
            $table->string('quirk')->nullable()->default(null);
            $table->tinyInteger('race')->unsigned()->nullable()->default(null);
            $table->string('race_other')->nullable()->default(null);
            $table->string('racials')->nullable()->default(null);
            $table->string('relationship')->nullable()->default(null);
            $table->string('sex', 3)->nullable()->default(null);
            $table->string('skills')->nullable()->default(null);
            $table->tinyInteger('speed')->unsigned()->nullable()->default(null);
            $table->tinyInteger('speed_fly')->unsigned()->nullable()->default(null);
            $table->tinyInteger('speed_swim')->unsigned()->nullable()->default(null);
            $table->string('summary')->nullable()->default(null);
            $table->string('trait')->nullable()->default(null);
            $table->string('voice')->nullable()->default(null);
            $table->string('worship_habit')->nullable()->default(null);

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
