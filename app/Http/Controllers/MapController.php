<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Map;

class MapController extends ParentPostController {
    public $model;

	function __construct() {
		$this->model = new Map();
	}

    public function submitPost(Request $request) {
        return $this->model->submitMap($request);
    }

	public function getMaps(Request $request) {
		return $this->model->getMaps($request);
	}

	public function getPostDetails($id, Request $request): \Illuminate\Http\JsonResponse {
		return $this->model->getMapDetails($id, $request);
	}

	/*
    public function getPostsPage(Request $request, $id=null) {
        //Check if we have a valid id in the url
        if ($id !== null && (int) $id>0) {
            //Send the post id along to the getPostsPage function
            return $this->model::getPostsPage($this->model, $id, $request);
        }

        //No valid post id so send null
        return $this->model::getPostsPage($this->model, null, $request);
    }
	*/
}
