<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class MiscController extends Controller {

	public function getLootPage(Request $request) {
		return view('coming-soon');
	}

	public function getAdventuresPage(Request $request) {
		return view('coming-soon');
	}

	public function getEncountersPage(Request $request) {
		return view('coming-soon');
	}

	public function getEnemiesPage(Request $request) {
		return view('coming-soon');
	}

	public function getResourcesPage(Request $request) {
		return view('coming-soon');
	}

	public function getDicePage(Request $request) {
		return view('coming-soon');
	}
}
