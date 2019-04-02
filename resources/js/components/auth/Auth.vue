<template>
	<div id="login__modal" class="modal" :class="{'is-active': showingModal}">
		<div class="modal-background" @click="hideLoginModal()"></div>
		<div class="modal-content">
			<div class="has-text-centered login-container">

				<!--Login tab-->
				<div id="login__modal__login" class="column login-tab" :class="{'active': activeTab==='l'}">
					<div class="box">
						<div class="modal__title" id="login-title">{{loginTitle}}</div>
						<figure class="avatar">
							<img src="/img/dnd_companion_logo.svg" onerror="this.onerror=null; this.src='/img/dnd_companion_logo.png'">
						</figure>
						<form>
							<div class="error-field" id="login-email-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="login-email" class="input is-large" type="email" placeholder="Email" autofocus="" :model="lEmail">
								</div>
							</div>

							<div class="error-field" id="login-password-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="login-password" class="input is-large" type="password" placeholder="Password" :model="lPassword">
								</div>
							</div>
							<div class="field">
								<label class="checkbox">
									<input id="login-remember" type="checkbox">
									Remember me
								</label>
							</div>
							<div class="error-field" id="login-error" v-show="loginError.length">{{loginError}}</div>
							<div id="login-btn" class="button is-block is-info is-large is-fullwidth" @click="login()" :class="{'busy': ajaxing}">
								<div class="btn-normal-div">Login</div>
								<div class="btn-busy-div spinner">
									<div class="bounce1"></div>
									<div class="bounce2"></div>
									<div class="bounce3"></div>
								</div>
							</div>
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
									<input id="register-username" class="input is-large" type="text" placeholder="Username" autofocus="" :model="rUsername">
								</div>
							</div>

							<div class="error-field" id="register-email-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="register-email" class="input is-large" type="email" placeholder="Email" :model="rEmail">
								</div>
							</div>

							<div class="error-field" id="register-password-error" style="display: none;"></div>
							<div class="field">
								<div class="control">
									<input id="register-password" class="input is-large" type="password" placeholder="Password" :model="rPassword">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input id="register-password-confirm" class="input is-large" type="password" placeholder="Confirm Password" :model="rPassword2">
								</div>
							</div>
							<div class="field">
								<label class="checkbox">
									<input id="register-remember" type="checkbox">
									Remember me
								</label>
							</div>
							<div class="error-field" id="register-error" style="display: none;"></div>
							<div id="register-btn" class="button is-block is-info is-large is-fullwidth" @click="register()" :class="{'busy': ajaxing}">
								<div class="btn-normal-div">Create Account</div>
								<div class="btn-busy-div spinner">
									<div class="bounce1"></div>
									<div class="bounce2"></div>
									<div class="bounce3"></div>
								</div>
							</div>
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
			showingModal: false,
			loginTitle: 'Login',
			activeTab: 'l',
			ajaxing: false,
			loginError: '',
			emailError: '',
			passwordError: '',
			registerError: '',
			rUsername: '',
			rEmail: '',
			rPassword: '',
			rPassword2: '',
			lEmail: '',
			lPassword: '',
		}
	},
	mounted: function() {
		const _this = this;
		if (document.getElementById("navbar-login")) {
			document.getElementById("navbar-login").addEventListener('click', function(event) {
				event.preventDefault();
				_this.showLoginModal();
			});
		}
		if (document.getElementById("navbar-register")) {
			document.getElementById("navbar-register").addEventListener('click', function(event) {
				event.preventDefault();
				_this.showRegisterModal();
			});
		}
		if (document.getElementById("nav-logout")) {
			document.getElementById("nav-logout").addEventListener('click', function(event) {
				event.preventDefault();
				localStorage.clear();
				//TODO doesn't work?
				document.getElementById('frm-logout').submit();
			});
		}

		EventBus.$on('showLogin', function(title) {
			_this.showLoginModal(title);
		});
		EventBus.$on('showRegister', function() {
			_this.showRegisterModal();
		});
	},
	methods: {
		showLoginModal: function(title) {
			this.loginTitle = title || "Login";
			this.loginModalChangeTab('l');
			this.showingModal = true;
		},
		showRegisterModal: function() {
			this.loginModalChangeTab('r');
			this.showingModal = true;
		},
		hideLoginModal: function() {
			this.showingModal = false;
		},
		loginModalChangeTab: function(a) {
			this.activeTab = a;
		},
		login: function() {
			this.loginError = '';
			this.emailError = '';
			this.passwordError = '';

			if (!this.lEmail.length) {
				this.emailError = "Please Input Your Email";
				return;
			}

			if (!this.lPassowrd.length) {
				this.passwordError = "Please Input Your Password";
				return;
			}

			var re = document.querySelector('#login-remember').checked;
			this.ajaxing=true;
			const _this=this;

			axios.post(SITE_URL+'/auth/login', {
				email: this.lEmail,
				password: this.lPassowrd,
				remember: re
			}).then(function(response) {
				_this.ajaxing=false;
				if (response.data && response.data.jwt) {
					//Success!
					//Save token to Local Storage
					localStorage.setItem('user', JSON.stringify(response.data));
					//refresh the page
					//TODO DON'T REFRESH, or they will lose current NPC data, what to do?
					window.location.reload();
				}
				else {
					_this.loginError = "An error occurred. Please try again.";
				}
			}).catch(function(error) {
				_this.ajaxing=false;
				if (error.response.status === 401) {
					_this.loginError = "Invalid Email/Password";
				}
				else {
					_this.loginError = "An error occurred. Please try again.";
				}
			});
		},
		register: function() {
			this.registerError = '';
			this.loginError = '';
			this.emailError = '';
			this.passwordError = '';

			if (!this.rEmail.length) {
				this.emailError = "Please Input Your Email";
			}
			else if (this.rEmail.indexOf('@') === -1 || this.rEmail.indexOf('.') === -1) {
				this.emailError = "Please Input a Valid Email";
			}
			
			if (!this.rUsername.length) {
				this.usernameError = "Please Input Your Username";
			}
			if (this.rPassword.length < 6) {
				this.passwordError = "Please Input Your Password (Min 6 Characters)";
			}

			if (this.rPassword !== this.rPassword2) {
				this.passwordError = "Your Passwords Do Not Match";
			}

			if (this.emailError.length || this.usernameError.length || this.passwordError.length) {
				return;
			}

			var re = document.querySelector('#register-remember').checked;

			this.ajaxing=true;
			const _this=this;

			axios.post(SITE_URL+"/auth/register", {
				email: this.rEmail,
				username: this.rUsername,
				password: this.rPassword,
				remember: re
			}).then(function(response) {
				_this.ajaxing=false;
				if (response.data) {
					//Success!
					//Save token and user data to Local Storage
					localStorage.setItem('user', JSON.stringify(response.data));
					//refresh the page
					window.location.reload();
				}
				else {
					_this.registerError = "An error occurred. Please try again.";
				}
			}).catch(function(error) {
				_this.ajaxing=false;
				if (error.response && error.response.data && error.response.data.error) {
					switch(error.response.data.error) {
					case "invalid_password":
						_this.registerError = "Your password must be at least 6 characters long";
						break;
					case "username_in_use":
						_this.registerError = "This username is already in use";
						break;
					case "email_in_use":
						_this.registerError = "This email is already in use";
						break;
					case "unable_to_send_email":
						_this.registerError = "An error occurred. Please try again.";
						break;
					default:
						_this.registerError = "An error occurred. Please try again.";
					}
				}
				else {
					_this.registerError = "An error occurred. Please try again.";
				}
			});
		}

	},
}
</script>




<style>

</style>
