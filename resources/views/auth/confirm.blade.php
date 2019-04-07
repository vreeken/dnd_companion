@extends('templates.main_layout')

@section('title')
{{ env('APP_TITLE') }} Confirm Email
@endsection

@section('extra_header')
	
@endsection

@section('extra_css')
	
@endsection

@section('content')
	<div class="container has-text-centered login-container">
		<div class="column is-4 is-offset-4">
			<figure class="avatar">
				<img src="{{ url('/img/dnd_companion_logo.png') }}">
			</figure>
			@if ($output === 'success')
				<h1>Account Verified Successfully</h1>
				<h3>
					Thank you for verifying your email address.
				</h3>
				@if (Auth::check())
					<p>
						You are currently logged in
					</p>
				@else
					<p>
						You may now <a href="{{url('auth/login')}}">Log in</a>
					</p>
				@endif
			@else
				<h1>{{$output}}</h1>
			@endif
		</div>
	</div>
@endsection

@section('footer_scripts')
	<script>

	</script>
@endsection