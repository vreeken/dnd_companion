@extends('templates.main_layout')

@section('title')
{{ env('APP_TITLE') . ' ' . $data['post_type_pretty'] . 's'}}
@endsection

@section('extra_header')
@endsection

@section('extra_css')
@endsection

@section('content')
	<div id="global-loader"><img src="{{ asset('/img/global-loader.svg')}}"></div>
	<main-view :data='@json($data)'></main-view>
@endsection

@section('footer_scripts')
<script>
	var config = {};
	/*
	var POST_TYPE = '{{ $data['post_type'] }}';
	//As of now this is redundant, but might need to be a little different
    var COMPONENT_POST_TYPE = '{{ $data['post_type'] }}';
    var BASE_URL = '{{url('/'. $data['post_type'] . 's')}}';
    var POST_TYPE_PRETTY = '{{ $data['post_type_pretty'] }}';
    var SUBMIT_POST_URL = '{{ url('api/' . $data['post_type'] . 's/new') }}';
    var GET_URL = '{{ url('api/' . $data['post_type'] . 's') }}';

	//Default config for Axios, send jwt if user is logged in

    */
@if (Auth::check())
    //var USER = JSON.parse(localStorage.getItem('user'));
	//if (USER) { config.headers = {'Authorization': "Bearer " + USER.jwt} }
	//var LOGGED_IN=true;
@else
	//var LOGGED_IN=false;
@endif

		/***************************************
		TODO
			Consider reworking the loading anim
				Maybe it's visible until Vue is done then clip-path out (or another anim out)
				Maybe just an anim for ajax loading

			Add an "Endless Scrolling" option to replace "Load More"

			Login/Register Popup needs re-working on mobile

			When initially brought to page via post/{id} then there is sometimes a crash when changing the sort by and/or other causes to load more
				go to hooks/1, close/back to main hooks list, change filter to "saved" and it crashes

		****************************************/
/*
			var SAVE_OPTIONS_URL = '{{ url('api/save-options') }}';
			var REPORT_URL = '{{ url('api/report') }}';
			var BOOKMARK_URL = '{{ url('api/bookmark') }}';
			var VOTE_URL = '{{ url('api/vote') }}';
			var SORT_BY_METHODS = ["r", "uv", "dv", "dd", "da"];
			var LOGIN_TITLE='Login';
			var REGISTER_TITLE='Create an Account';
			var SUBMIT_COMMENT_URL = '{{ url('api/comments/new') }}';
			var UPDATE_COMMENT_URL = '{{ url('api/comments/update') }}';
			var GET_COMMENTS_URL = '{{ url('api/comments/get') }}';
			var VOTE_ON_COMMENT_URL = '{{ url('api/comments/vote') }}';
			var D20_ANIM_DONE = false;
			var VUE_LOADED = false;
			var USERNAME = '{{ Auth::user() ? Auth::user()->username : '' }}';
*/
	@if (isset($data['post'], $data['comments']))
//			var URL_POST = {!! json_encode($data['post']) !!};
//			var URL_COMMENTS = {!! json_encode($data['comments']) !!};
	@else
//			var URL_POST = null;
//			var URL_COMMENTS = null;
	@endif


			/*
			var d20Interval = setInterval(checkD20Anim, 300);

			function checkD20Anim() {
				var e = document.getElementById('d20_outside');
				var s = window.getComputedStyle(e);
				var sdo = s.getPropertyValue('stroke-dashoffset');
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

	<script src="{{ asset('js/manifest.js') }}"></script>
	<script src="{{ asset('js/vendor.js') }}"></script>
	<script src="{{ asset('js/posts.js')}}?v={{mt_rand()}}"></script>
@endsection