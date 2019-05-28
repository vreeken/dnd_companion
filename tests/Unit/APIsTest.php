<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class APIsTest extends TestCase
{
    public function testAPIs()
    {
        $post_types = ['hooks', 'items', 'riddles', 'puzzles', 'maps'];

        foreach ($post_types as $type) {
            echo "\nTesting ".$type." API...";

            $response = $this->json('POST', 'api/'.$type, [
                'page'=>'0',
                'method'=>'r',
                'seed'=>'12345',
                'filter'=>false
            ]);
            
            $response
                ->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'posts' => true
                ]);

            echo "OK";
        }
    }
}
