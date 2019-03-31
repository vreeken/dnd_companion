<template>
	<div id="login__modal" class="modal">
		<div class="modal-background" @click="hideLoginModal()"></div>
		<div class="modal-content">
			<div class="has-text-centered login-container">

				<!--Login tab-->
				<div id="login__modal__login" class="column login-tab" :class="{'active': activeTab==='l'}">
					<div class="box">
						<div class="modal__title" id="login-title">Login</div>
						<figure class="avatar">
							<img src="/img/dnd_companion_logo.svg" onerror="this.onerror=null; this.src='/img/dnd_companion_logo.png'">
						</figure>
						<form>
							<div class="error-field" id="login-email-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="login-email" class="input is-large" type="email" placeholder="Email" autofocus="">
								</div>
							</div>

							<div class="error-field" id="login-password-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="login-password" class="input is-large" type="password" placeholder="Password">
								</div>
							</div>
							<div class="field">
								<label class="checkbox">
									<input id="login-remember" type="checkbox">
									Remember me
								</label>
							</div>
							<div class="error-field" id="login-error" style="display: none;"></div>
							<div id="login-btn" class="button is-block is-info is-large is-fullwidth" @click="login()">Login</div>
						</form>
					</div>
					<p class="login__modal__footer has-text-grey column is-8 is-offset-2">
						<a @click="loginModalChangeTab('r')">Sign Up</a> &nbsp;·&nbsp;
						<a href="../">Forgot Password</a> &nbsp;·&nbsp;
						<a href="../">Need Help?</a>
					</p>
				</div>

				<!--Register tab-->
				<div id="login__modal__register" class="column login-tab" :class="{'active': activeTab==='r'}">
					<div class="box">
						<div class="modal__title">Create an Account</div>
						<figure class="avatar">
							<img src="/img/dnd_companion_logo.svg" onerror="this.onerror=null; this.src='/img/dnd_companion_logo.png'">
						</figure>
						<form>
							<div class="error-field" id="register-username-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="register-username" class="input is-large" type="text" placeholder="Username" autofocus="">
								</div>
							</div>

							<div class="error-field" id="register-email-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="register-email" class="input is-large" type="email" placeholder="Email" autofocus="">
								</div>
							</div>

							<div class="error-field" id="register-password-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="register-password" class="input is-large" type="password" placeholder="Password">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input id="register-password-confirm" class="input is-large" type="password" placeholder="Confirm Password">
								</div>
							</div>
							<div class="field">
								<label class="checkbox">
									<input id="register-remember" type="checkbox">
									Remember me
								</label>
							</div>
							<div class="error-field" id="register-error" style="display: none;"></div>
							<div id="register-btn" class="button is-block is-info is-large is-fullwidth" @click="register()">Create Account</div>
						</form>
					</div>
					<p class="login__modal__footer has-text-grey column is-8 is-offset-2">
						<a @click="loginModalChangeTab('l')">Already have an account?</a> &nbsp;·&nbsp;
						<a href="../">Need Help?</a>
					</p>
				</div>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="hideLoginModal()"></button>
		<!-- TODO needs csrf -->
		<form id="frm-logout" action="/auth/logout" method="POST" style="display: none;"></form>
	</div>
</template>
<script>

import { EventBus } from '../eventbus/EventBus.js';

export default {
	props: {
		data: Object
	},
	data() {
		return {
			navLogin: document.getElementById("navbar-login"),
			navRegister: document.getElementById("navbar-register"),
			navLogout: document.getElementById("nav-logout"),
			activeTab: 'l'
		}
	},
	mounted: function() {
		if (this.navLogin) {
			this.navLogin.addEventListener('click', function(event) {
				event.preventDefault();
				this.showLoginModal();
			});
		}
		if (this.navRegister) {
			this.navRegister.addEventListener('click', function(event) {
				event.preventDefault();
				this.showRegisterModal();
			});
		}

		if (this.navLogout) {
			this.navLogout.addEventListener('click', function(event) {
				event.preventDefault();
				localStorage.clear();
				document.getElementById('frm-logout').submit();
			});
		}


		const _this = this;
		EventBus.$on('showLogin', function(title) {
			_this.showLoginModal(title);
		});
		EventBus.$on('showRegister', function() {
			_this.showRegisterModal();
		});
	},
	methods: {
		showLoginModal: function(title) {
			title=title||"Login";
			document.getElementById('login-title').innerHTML=title;
			this.loginModalChangeTab('l');
			document.getElementById('login__modal').classList.add('is-active');
		},
		showRegisterModal: function() {
			this.loginModalChangeTab('r');
			document.getElementById('login__modal').classList.add('is-active');
		},
		hideLoginModal: function() {
			document.getElementById('login__modal').classList.remove('is-active');
		},
		loginModalChangeTab: function(a) {
			console.log(a);
			this.activeTab = a;
		},
		login: function() {
			var loginErr = document.getElementById("login-error");
			var emErr = document.getElementById("login-email-error");
			var pwErr = document.getElementById("login-password-error");
			//Hide all error messages
			loginErr.setAttribute("style", "display:none");
			emErr.setAttribute("style", "display:none");
			pwErr.setAttribute("style", "display:none");

			var em = document.getElementById("login-email").value;
			if (!em.length) {
				emErr.innerHTML = "Please Input Your Email";
				emErr.setAttribute("style", "display:block");
				return;
			}

			var pw = document.getElementById("login-password").value;
			if (!pw.length) {
				pwErr.innerHTML = "Please Input Your Password";
				pwErr.setAttribute("style", "display:block");
				return;
			}

			var re = document.querySelector('#login-remember').checked;

			axios.post(SITE_URL+'/auth/login', {
				email: em,
				password: pw,
				remember: re
			}).then(function(response) {
				if (response.data && response.data.jwt) {
					//Success!
					//Save token to Local Storage
					localStorage.setItem('user', JSON.stringify(response.data));
					//refresh the page
					window.location.reload();
				}
				else {
					loginErr.innerHTML = "An error occurred. Please try again.";
					loginErr.setAttribute("style", "display:block");
				}
			}).catch(function(error) {
				if (error.response.status === 401) {
					loginErr.innerHTML = "Invalid Email/Password";
				}
				else {
					loginErr.innerHTML = "An error occurred. Please try again.";
				}
				loginErr.setAttribute("style", "display:block");
			});
		},
		register: function() {
			var registerErr = document.getElementById("register-error");
			var emErr = document.getElementById("register-email-error");
			var pwErr = document.getElementById("register-password-error");
			var unErr = document.getElementById("register-username-error");
			//Hide all error messages
			registerErr.setAttribute("style", "display:none");
			emErr.setAttribute("style", "display:none");
			pwErr.setAttribute("style", "display:none");
			unErr.setAttribute("style", "display:none");

			var un = document.getElementById("register-username").value;
			if (!un.length) {
				unErr.innerHTML = "Please Input Your Username";
				unErr.setAttribute("style", "display:block");
				return;
			}

			var em = document.getElementById("register-email").value;
			if (!em.length) {
				emErr.innerHTML = "Please Input Your Email";
				emErr.setAttribute("style", "display:block");
				return;
			}
			if (em.indexOf('@') === -1 || em.indexOf('.') === -1) {
				emErr.innerHTML = "Please Input A Valid Email Address";
				emErr.setAttribute("style", "display:block");
				return;
			}

			var pw = document.getElementById("register-password").value;
			if (pw.length<6) {
				pwErr.innerHTML = "Please Input A Password (Min 6 Characters)";
				pwErr.setAttribute("style", "display:block");
				return;
			}
			var pw2 = document.getElementById("register-password-confirm").value;
			if (pw2 !== pw) {
				pwErr.innerHTML = "Your Passwords Do Not Match";
				pwErr.setAttribute("style", "display:block");
				return;
			}

			var re = document.querySelector('#register-remember').checked;

			axios.post(SITE_URL+"/auth/register", {
				email: em,
				username: un,
				password: pw,
				remember: re
			}).then(function(response) {
				if (response.data) {
					//Success!
					//Save token and user data to Local Storage
					localStorage.setItem('user', JSON.stringify(response.data));
					//refresh the page
					window.location.reload();
				}
				else {
					registerErr.innerHTML = "An error occurred. Please try again.";
					registerErr.setAttribute("style", "display:block");
				}
			}).catch(function(error) {
				if (error.response && error.response.data && error.response.data.error) {
					switch(error.response.data.error) {
					case "invalid_password":
						registerErr.innerHTML = "Your password must be at least 6 characters long";
						break;
					case "username_in_use":
						registerErr.innerHTML = "This username is already in use";
						break;
					case "email_in_use":
						registerErr.innerHTML = "This email is already in use";
						break;
					case "unable_to_send_email":
						registerErr.innerHTML = "An error occurred. Please try again.";
						break;
					default:
						registerErr.innerHTML = "An error occurred. Please try again.";
					}
				}
				else {
					registerErr.innerHTML = "An error occurred. Please try again.";
				}
				registerErr.setAttribute("style", "display:block");
			});
		}

	},
}
</script>




<style>

</style>
