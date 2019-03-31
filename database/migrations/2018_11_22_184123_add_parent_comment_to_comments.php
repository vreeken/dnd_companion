<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddParentCommentToComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('hook_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
        });
        Schema::table('riddle_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
        });
        Schema::table('puzzle_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
        });
        Schema::table('item_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
        });
        Schema::table('dungeon_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
        });
        Schema::table('map_comments', function($table) {
            $table->integer('parent_id')->nullable()->default(null);
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
            $table->dropColumn('parent_id');
        });
        Schema::table('riddle_comments', function($table) {
            $table->dropColumn('parent_id');
        });
        Schema::table('puzzle_comments', function($table) {
            $table->dropColumn('parent_id');
        });
        Schema::table('item_comments', function($table) {
            $table->dropColumn('parent_id');
        });
        Schema::table('dungeon_comments', function($table) {
            $table->dropColumn('parent_id');
        });
        Schema::table('map_comments', function($table) {
            $table->dropColumn('parent_id');
        });
    }
}
