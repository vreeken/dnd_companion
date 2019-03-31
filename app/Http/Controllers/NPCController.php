<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\NPC;

use App\Traits\UserAndOptionsUtils;


class NPCController extends Controller {

    use UserAndOptionsUtils;

	public function getNPCsPage(Request $request): \Illuminate\View\View {
        $user=self::getUser();

        $data['startPage']='gen';

        if ($user) {
            $data['my_npcs']=$user->npcs()->get();
        }

        return view('sections.npcs', ['data'=>$data]);
    }




    public function getNPCsPageWithID(Request $request, $id): \Illuminate\View\View {
        //Check if we have a valid id in the url
        if ($id !== null) {
            //Send the npc id along to the getNPCsPage function
            return NPC::getMyNPCsPage($id, $request);
        }

        //No given npc id so send null to get the base page
        return NPC::getMyNPCsPage(null, $request);
    }


    public function createNPC(Request $request): \Illuminate\Http\JsonResponse {
        return NPC::createNPC($request);
    }

    public function getPublicNPCs(Request $request): \Illuminate\Http\JsonResponse {
	    return NPC::getPublicNPCs($request);
    }


    public function getNamesPage(Request $request): \Illuminate\View\View {
        return view('coming-soon');
    }
}
