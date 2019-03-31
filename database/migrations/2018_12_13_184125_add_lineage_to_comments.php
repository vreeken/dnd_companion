<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLineageToComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     *
     * https://www.sqlteam.com/articles/more-trees-hierarchies-in-sql
     * 
     */
    public function up()
    {
        Schema::table('hook_comments', function($table) {
            $table->string('lineage', 1000)->default('/');
        });
        Schema::table('riddle_comments', function($table) {
            $table->string('lineage', 1000)->default('');
        });
        Schema::table('puzzle_comments', function($table) {
            $table->string('lineage', 1000)->default('/');
        });
        Schema::table('item_comments', function($table) {
            $table->string('lineage', 1000)->default('/');
        });
        Schema::table('dungeon_comments', function($table) {
            $table->string('lineage', 1000)->default('/');
        });
        Schema::table('map_comments', function($table) {
            $table->string('lineage', 1000)->default('/');
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
            $table->dropColumn('lineage');
        });
        Schema::table('riddle_comments', function($table) {
            $table->dropColumn('lineage');
        });
        Schema::table('puzzle_comments', function($table) {
            $table->dropColumn('lineage');
        });
        Schema::table('item_comments', function($table) {
            $table->dropColumn('lineage');
        });
        Schema::table('dungeon_comments', function($table) {
            $table->dropColumn('lineage');
        });
        Schema::table('map_comments', function($table) {
            $table->dropColumn('lineage');
        });
    }
}
