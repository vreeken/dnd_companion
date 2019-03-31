@extends('templates.main_layout')

@section('title')
{{ env('APP_TITLE') }} NPCs
@endsection

@section('extra_header')
	
@endsection

@section('extra_css')
	
@endsection

@section('auth')
	<auth></auth>
@endsection

@section('content')
	<npcs :data='@json($data)'></npcs>
@endsection

@section('footer_scripts')
	<script>
		const BASE_URL = '{{url('/npcs')}}';
		const SUBMIT_POST_URL = '{{ url('api/npcs/new') }}';
		const GET_URL = '{{ url('api/npcs') }}';

		//Default config for Axios, send jwt if user is logged in
		const config = {};
@if (Auth::check())
		const USER = JSON.parse(localStorage.getItem('user'));
		if (USER) { config.headers = {'Authorization': "Bearer " + USER.jwt} }
		const LOGGED_IN=true;
@else
		const LOGGED_IN=false;
@endif

		/***************************************
		 TODO


		 ****************************************/

		const NEW_NPC_URL = '{{ url('api/npcs/new') }}';
        //const GET_MY_NPCS_URL = '{{ url('api/npcs/mine') }}';
        //const GET_NPCS_URL = '{{ url('api/npcs') }}';
        const GET_PUBLIC_NPCS_URL = '{{ url('api/npcs/public/get') }}';


		const SAVE_OPTIONS_URL = '{{ url('api/save-options') }}';
		const REPORT_URL = '{{ url('api/report') }}';
		const BOOKMARK_URL = '{{ url('api/bookmark') }}';
		const VOTE_URL = '{{ url('api/vote') }}';
		const SORT_BY_METHODS = ["r", "uv", "dv", "dd", "da"];
		const LOGIN_TITLE='Login';
		const REGISTER_TITLE='Create an Account';
		const SUBMIT_COMMENT_URL = '{{ url('api/comments/new') }}';
		const UPDATE_COMMENT_URL = '{{ url('api/comments/update') }}';
		const GET_COMMENTS_URL = '{{ url('api/comments/get') }}';
		const VOTE_ON_COMMENT_URL = '{{ url('api/comments/vote') }}';
		const D20_ANIM_DONE = false;
		const VUE_LOADED = false;
		const USERNAME = '{{ Auth::user() ? Auth::user()->username : '' }}';

@if (isset($data['npc']))
		const URL_NPC = {!! json_encode($data['npc']) !!};
		const URL_COMMENTS = null;
@else
		const URL_NPC = null;
		const URL_COMMENTS = null;
@endif


		/*
        const d20Interval = setInterval(checkD20Anim, 300);

        function checkD20Anim() {
            let e = document.getElementById('d20_outside');
            let s = window.getComputedStyle(e);
            let sdo = s.getPropertyValue('stroke-dashoffset');
            if (sdo=='0px') {
                clearInterval(d20Interval);
                if (VUE_LOADED) {
                    document.querySelector('.vue-loader').setAttribute("style", "display:none");
                    document.querySelector('.section-content').setAttribute("style", "display:block");
                }
                D20_ANIM_DONE=true;
            }
        }
        */

	</script>

	<script src="js/manifest.js"></script>
	<script src="js/vendor.js"></script>
	<script src="js/npcs.js?v={{mt_rand()}}"></script>
@endsection