@extends('templates.home_layout')

@section('title')
	{{ env('APP_TITLE') }} Reset Yor Password
@endsection

@section('extra_header')

@endsection

@section('extra_css')

@endsection

@section('content')
	<div class="container has-text-centered login-container">
		<div class="column">
			<div class="box">
				<div id="login-title" class="modal__title">Reset Your Password</div>
				<figure class="avatar">
					<img src="{{ url('/img/dnd_companion_logo.png') }}">
				</figure>
				<form id="reset-form">
					<div class="error-field" id="email-error" style="display: none;"></div>
					<div class="field">
						<div class="control">
							<input id="email" class="input is-large" type="email" placeholder="Email" autofocus="">
						</div>
					</div>
					<div id="reset-btn" class="button is-block is-info is-large is-fullwidth">
						<div class="btn-normal-div">Reset Password</div>
						<div class="btn-busy-div spinner">
							<div class="bounce1"></div>
							<div class="bounce2"></div>
							<div class="bounce3"></div>
						</div>
					</div>
					<div class="error-field" id="reset-error" style="display: none;"></div>
				</form>
				<div style="display:none;" id="check-email" class="modal__title">Check your email for further instructions</div>
			</div>
		</div>
	</div>
@endsection

@section('footer_scripts')
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script>

		document.getElementById("reset-btn").addEventListener("click", reset);

		function reset() {
			var efs = document.querySelectorAll('.error-field');
			for (var i=0; i<efs.length; i++) {
				efs[i].setAttribute("style", "display:none");
			}

			var em = document.getElementById("email").value;

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

			document.getElementById('reset-btn').classList.add('busy');

			axios.post("{{ url('api/create-password-reset') }}", {
				email: em
			})
				.then(function (response) {
					console.log(response.data);
					if (response.data && response.data.success) {
						var e = document.getElementById("check-email");
						e.setAttribute("style", "display:block");
						var f = document.getElementById("reset-form");
						f.setAttribute("style", "display:none");
						document.getElementById('reset-btn').classList.remove('busy');
					}
					else {
						var e = document.getElementById("reset-error");
						e.innerHTML = "An error occurred. Please try again.";
						e.setAttribute("style", "display:block");
						document.getElementById('reset-btn').classList.remove('busy');
					}
				})
				.catch(function (error) {
					var e = document.getElementById("reset-error");
					if (error.response.status == 401) {
						e.innerHTML = "Invalid Email/Password";
					}
					else {
						e.innerHTML = "An error occurred. Please try again.";
					}
					e.setAttribute("style", "display:block");
					document.getElementById('reset-btn').classList.remove('busy');
				});
		}

	</script>
@endsection