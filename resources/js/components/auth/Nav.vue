<template>
	<nav class="navbar has-shadow">
		<div class="navbar-brand">
			<a class="navbar-item" :href="base_url + '/'"><img :src="base_url + '/img/dnd_companion_logo_simple.svg'" alt="DnD Companion" onerror="this.onerror=null; this.src=window.location.origin+'/img/dnd_companion_logo_small.png'"/></a>

			<div class="navbar-burger burger" data-target="navMenu"><span></span><span></span><span></span></div>
		</div>
		<div class="navbar-menu" id="navMenu">
			<div class="navbar-start is-link">
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-link">Sections</a>
					<div class="navbar-dropdown">
						<a class="navbar-item" :href="base_url + 'npcs'">NPC Generator</a>
						<a class="navbar-item" :href="base_url + 'hooks'">Plot Hooks</a>
						<a class="navbar-item" :href="base_url + 'items'">Unique Items</a>
						<a class="navbar-item" :href="base_url + 'maps'">Encounter Maps</a>
						<a class="navbar-item" :href="base_url + 'riddles'">Riddles</a>
						<a class="navbar-item" :href="base_url + 'puzzles'">Puzzles</a>
						<!--
						<a class="navbar-item" href="{{ url('dungeons') }}">Dungeons</a>
						<a class="navbar-item" href="{{ url('names') }}">Name Generator</a>
						<a class="navbar-item" href="{{ url('dice') }}">Dice Roller</a>
						<a class="navbar-item" href="{{ url('loot') }}">Loot Generator</a>
						<a class="navbar-item" href="{{ url('d100') }}">d100 Lists</a>
						-->
					</div>
				</div>
			</div>
			<div v-if="LOGGED_IN" class="navbar-end">
				<a class="navbar-item">Profile</a>
				<a class="navbar-item">Settings</a>
				<a id="nav-logout" class="navbar-item" :href="base_url + 'auth/logout'">Logout</a>
			</div>
			<div v-else class="navbar-end">
				<a id="navbar-login" class="navbar-item" :href="base_url + 'auth/login'">
					Login
				</a>
				<a id="navbar-register" class="navbar-item" :href="base_url + 'auth/register'">
					Register
				</a>
			</div>
		</div>
	</nav>
</template>
<script>

import { EventBus } from '../eventbus/EventBus.js';

export default {
	props: {
		
	},
	data() {
		return {
			showingModal: false,
			loginTitle: 'Login',
			activeTab: 'l',
			ajaxing: false,
			loginError: '',
			lEmailError: '',
			lPasswordError: '',
			rEmailError: '',
			rPasswordError: '',
			rUsernameError: '',
			registerError: '',
			rUsername: '',
			rEmail: '',
			rPassword: '',
			rPassword2: '',
			lEmail: '',
			lPassword: '',
			base_url: window.location.origin
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
			this.lEmailError = '';
			this.lPasswordError = '';

			if (!this.lEmail.length) {
				this.lEmailError = "Please Input Your Email";
				return;
			}

			if (!this.lPassword.length) {
				this.lPasswordError = "Please Input Your Password";
				return;
			}

			var re = document.querySelector('#login-remember').checked;
			this.ajaxing=true;
			const _this=this;

			axios.post(this.base_url+'/auth/login', {
				email: this.lEmail,
				password: this.lPassword,
				remember: re
			}).then(function(response) {
				_this.ajaxing=false;
				if (response.data.jwt) {
					localStorage.setItem('jwt', response.data.jwt);
					//Let other components know (specifically the Npc_generator.vue so it can save npc before refreshing the page)
					EventBus.$emit('postLogin');
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
			this.rUsernameError = '';
			this.rEmailError = '';
			this.rPasswordError = '';

			if (!this.rEmail.length) {
				this.rEmailError = "Please Input Your Email";
			}
			else if (this.rEmail.indexOf('@') === -1 || this.rEmail.indexOf('.') === -1) {
				this.rEmailError = "Please Input a Valid Email";
			}
			
			if (!this.rUsername.length) {
				this.rUsernameError = "Please Input Your Username";
			}
			if (this.rPassword.length < 6) {
				this.rPasswordError = "Please Input Your Password (Min 6 Characters)";
			}

			if (this.rPassword !== this.rPassword2) {
				this.rPasswordError = "Your Passwords Do Not Match";
			}

			if (this.rEmailError.length || this.rUsernameError.length || this.rPasswordError.length) {
				return;
			}

			var re = document.querySelector('#register-remember').checked;

			this.ajaxing=true;
			const _this=this;

			axios.post(this.base_url+"/auth/register", {
				email: this.rEmail,
				username: this.rUsername,
				password: this.rPassword,
				remember: re
			}).then(function(response) {
				_this.ajaxing=false;
				if (response.data.jwt) {
					localStorage.setItem('jwt', response.data.jwt);
					//Let other components know (specifically the Npc_generator.vue so it can save npc before refreshing the page)
					EventBus.$emit('postRegister');
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
