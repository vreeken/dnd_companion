@extends('templates.home_layout')

@section('title')
{{ env('APP_TITLE') }} Register
@endsection

@section('extra_header')
	
@endsection

@section('extra_css')
	
@endsection

@section('content')
	<div class="container has-text-centered login-container">
		<div class="column">
			<div class="box">
				<div id="login-title" class="modal__title">Register</div>
				<figure class="avatar">
					<img src="{{ url('/img/dnd_companion_logo.png') }}">
				</figure>
				<form>
					<div class="error-field" id="uername-error" style="display: none;"></div>
					<div class="field">
						<div class="control">
							<input id="username" class="input is-large" type="text" placeholder="username" autofocus="">
						</div>
					</div>


					<div class="error-field" id="email-error" style="display: none;"></div>
					<div class="field">
						<div class="control">
							<input id="email" class="input is-large" type="email" placeholder="Email">
						</div>
					</div>

					<div class="error-field" id="password-error" style="display: none;"></div>
					<div class="field">
						<div class="control">
							<input id="password" class="input is-large" type="password" placeholder="Password">
						</div>
					</div>

					<div class="field">
						<div class="control">
							<input id="password2" class="input is-large" type="password" placeholder="Confirm Password">
						</div>
					</div>

					<div class="field">
						<label class="checkbox">
							<input id="remember" type="checkbox">
							Remember me
						</label>
					</div>
					<div id="register-btn" class="button is-block is-info is-large is-fullwidth">Create account</div>
					<div class="error-field" id="register-error" style="display: none;"></div>
				</form>
			</div>
			<p class="has-text-grey">
				<a href="{{ url('auth/login') }}">Log in</a> &nbsp;·&nbsp;
				<a href="{{ url('auth/reset-password') }}">Forgot Password</a><!-- &nbsp;·&nbsp;
				<a href="{{ url('') }}">Need Help?</a>-->
			</p>
		</div>
	</div>
@endsection

@section('footer_scripts')
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script>

		document.getElementById("register-btn").addEventListener("click", register);
		
		function register() {
			var efs = document.querySelectorAll('.error-field');
			for (var i=0; i<efs.length; i++) {
				efs[i].setAttribute("style", "display:none");
			}

			var user = document.getElementById("username").value;
			var em = document.getElementById("email").value;
			var pw = document.getElementById("password").value;
			var pw = document.getElementById("password2").value;

			if (user.length==0) {
				document.getElementById("username-error").innerHTML = "Please input a username";
				document.getElementById("username-error").setAttribute("style", "display:block");
				return;
			}

			if (em.length==0) {
				document.getElementById("email-error").innerHTML = "Please input your email";
				document.getElementById("email-error").setAttribute("style", "display:block");
				return;
			}
			if (em.indexOf('@')==-1 || em.indexOf('.')==-1) {
				document.getElementById("email-error").innerHTML = "Please input a valid email";
				document.getElementById("email-error").setAttribute("style", "display:block");
				return;
			}
			if (pw.length==0) {
				document.getElementById("password-error").innerHTML = "Please input your password";
				document.getElementById("password-error").setAttribute("style", "display:block");
				return;
			}

			if (pw!==pw2) {
				document.getElementById("password-error").innerHTML = "Your passwords don't match";
				document.getElementById("password-error").setAttribute("style", "display:block");
				return;
			}

			var re = document.querySelector('#remember').checked;

			axios.post("{{ url('auth/register') }}", {
				username: user,
				email: em,
				password: pw,
				remember: re
			})
			.then(function (response) {
				//console.log(response.data);
				if (response.data && response.data.jwt) {
					localStorage.setItem('user', JSON.stringify(response.data));
					window.location.href = "{{ url('/') }}";
				}
				else {
					var e = document.getElementById("register-error");
					e.innerHTML = "An error occurred. Please try again.";
					e.setAttribute("style", "display:block");
				}
			})
			.catch(function (error) {
				var e = document.getElementById("register-error");
				if (error.response.status == 401) {
					e.innerHTML = "Invalid Email/Password";
				}
				else {
					e.innerHTML = "An error occurred. Please try again.";
				}
				e.setAttribute("style", "display:block");
			});
		}

	</script>
@endsection