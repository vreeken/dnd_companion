<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDeletedAtToComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('hook_comments', function($table) {
           $table->softDeletes();
        });
        Schema::table('riddle_comments', function($table) {
           $table->softDeletes();
        });
        Schema::table('puzzle_comments', function($table) {
           $table->softDeletes();
        });
        Schema::table('item_comments', function($table) {
           $table->softDeletes();
        });
        Schema::table('dungeon_comments', function($table) {
           $table->softDeletes();
        });
        Schema::table('map_comments', function($table) {
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
        Schema::table('hook_comments', function($table) {
            $table->dropSoftDeletes();
        });
        Schema::table('riddle_comments', function($table) {
            $table->dropSoftDeletes();
        });
        Schema::table('puzzle_comments', function($table) {
            $table->dropSoftDeletes();
        });
        Schema::table('item_comments', function($table) {
            $table->dropSoftDeletes();
        });
        Schema::table('dungeon_comments', function($table) {
            $table->dropSoftDeletes();
        });
        Schema::table('map_comments', function($table) {
            $table->dropSoftDeletes();
        });
    }
}
