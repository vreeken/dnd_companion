@extends('templates.main_layout')

@section('title')
{{ env('APP_TITLE') . ' D100 Lists'}}
@endsection

@section('extra_header')
@endsection

@section('extra_css')
@endsection

@section('content')
	<d100-view :data='@json($data)'></d100-view>
@endsection

@section('footer_scripts')
<script>
    var GET_URL = '{{ url('api/d100s') }}';

	//Default config for Axios, send jwt if user is logged in
    var config = {};
@if (Auth::check())
    var USER = JSON.parse(localStorage.getItem('user'));
	if (USER) { config.headers = {'Authorization': "Bearer " + USER.jwt} }
	var LOGGED_IN=true;
@else
	var LOGGED_IN=false;
@endif
	var LOGIN_TITLE='Login';
	var REGISTER_TITLE='Create an Account';
	var USERNAME = '{{ Auth::user() ? Auth::user()->username : '' }}';
		
	</script>

	<script src="{{ asset('js/manifest.js') }}"></script>
	<script src="{{ asset('js/vendor.js') }}"></script>
	<script src="{{ asset('js/d100.js')}}?v={{mt_rand()}}"></script>
@endsection