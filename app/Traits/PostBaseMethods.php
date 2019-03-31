<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait PostBaseMethods  {
	public function getPosts(Request $request): \Illuminate\Http\JsonResponse {
		return response()->json($this->model::getPosts($request));
	}

	public function getPostDetails($id, Request $request): \Illuminate\Http\JsonResponse {
		return response()->json($this->model::getPostDetails($id, $request));
	}

	public function _submitPost($post, $postVote, Request $request): \Illuminate\Http\JsonResponse {
		return $this->model::submitPost($post, $postVote, $request);
	}

	public function getPostsPage(Request $request, $id=null): \Illuminate\View\View {
		//Check if we have a valid id in the url
		if ($id !== null && (int) $id>0) {
            //Send the post id along to the getPostsPage function
            return $this->model::getPostsPage($this->model, $id, $request);
		}

		//No valid post id so send null
		return $this->model::getPostsPage($this->model, null, $request);
	}
}