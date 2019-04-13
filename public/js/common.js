var SITE_URL = "https://dndcompanion.com";
/************************************************
			Burger Menu Toggle
************************************************/
//This must be executed after Vue()
/*
var burger = document.querySelector('.burger');
console.log(burger);
var menu = document.querySelector('#'+burger.dataset.target);
burger.addEventListener('click', function() {
	console.log('burger');
	burger.classList.toggle('is-active');
	menu.classList.toggle('is-active');
});
*/

/************************************************
			Modal Closing (Global)
************************************************/
//Close button (X) for Modals
var close_btns = document.querySelectorAll('#login__modal .modal-close');
for (var i = 0; i < close_btns.length; i++) {
	close_btns[i].addEventListener('click', function(event) {
		this.parentElement.classList.remove('is-active');
	});
}
//Close Modals when clicking on empty background
var modal_bgs = document.querySelectorAll('#login__modal .modal-background');
for (var i = 0; i < modal_bgs.length; i++) {
	modal_bgs[i].addEventListener('click', function(event) {
		this.parentElement.classList.remove('is-active');
	});
}

/************************************************
			Global Loader Show/Hide
************************************************/
var l = document.getElementById('global-loader');
function showGlobalLoader() {
	l.classList.add('unhide');
}

function hideGlobalLoader() {
	l.classList.remove('unhide');
}


/************************************************
				Login/Registration
************************************************/
/*
//Override navigation bar buttons for login/register to instead open the modal
var navLogin = document.getElementById("navbar-login");
if (navLogin) {
	navLogin.addEventListener('click', function(event) {
		showLoginModal();
		event.preventDefault();
	});
}
var navRegister = document.getElementById("navbar-register");
if (navRegister) {
	navRegister.addEventListener('click', function(event) {
		showRegisterModal();
		event.preventDefault();
	});
}


function showLoginModal(title) {
	title=title||"Login";
	document.getElementById('login-title').innerHTML=title;
	loginModalChangeTab('l');
	document.getElementById('login__modal').classList.add('is-active');
}
function showRegisterModal() {
	loginModalChangeTab('r');
	document.getElementById('login__modal').classList.add('is-active');
}
function hideLoginModal() {
	document.getElementById('login__modal').classList.remove('is-active');
}

//Toggle between Login and Register tabs within the #login__modal
function loginModalChangeTab(a) {
	if (a == 'l') {
		document.getElementById('login__modal__register').classList.remove('active');
		document.getElementById('login__modal__login').classList.add('active');
	}
	else {
		document.getElementById('login__modal__register').classList.add('active');
		document.getElementById('login__modal__login').classList.remove('active');
	}
}

//Login Button on Modal click
document.getElementById("login-btn").addEventListener('click', function(event) {
	var loginErr = document.getElementById("login-error");
	var emErr = document.getElementById("login-email-error");
	var pwErr = document.getElementById("login-password-error");
	//Hide all error messages
	loginErr.setAttribute("style", "display:none");
	emErr.setAttribute("style", "display:none");
	pwErr.setAttribute("style", "display:none");

	var em = document.getElementById("login-email").value;
	if (em.length==0) {
		emErr.innerHTML = "Please Input Your Email";
		emErr.setAttribute("style", "display:block");
		return;
	}

	var pw = document.getElementById("login-password").value;
	if (pw.length==0) {
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
			window.location.reload(false);
		}
		else {
			loginErr.innerHTML = "An error occurred. Please try again.";
			loginErr.setAttribute("style", "display:block");
		}
	}).catch(function(error) {
		if (error.response.status == 401) {
			loginErr.innerHTML = "Invalid Email/Password";
		}
		else {
			loginErr.innerHTML = "An error occurred. Please try again.";
		}
		loginErr.setAttribute("style", "display:block");
	});
});


//Register Button on Modal click
document.getElementById("register-btn").addEventListener('click', function(event) {
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
	if (un.length==0) {
		unErr.innerHTML = "Please Input Your Username";
		unErr.setAttribute("style", "display:block");
		return;
	}

	var em = document.getElementById("register-email").value;
	if (em.length==0) {
		emErr.innerHTML = "Please Input Your Email";
		emErr.setAttribute("style", "display:block");
		return;
	}
	if (em.indexOf('@')==-1 || em.indexOf('.')==-1) {
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
	if (pw2!=pw) {
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
			window.location.reload(false);
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
});

//Logout
//Override the standard navigation to instead Post to the logout url to prevent csrf
//Also this allows us to clear localStorage of any tokens and user data
var navLogout = document.getElementById("nav-logout");
if (navLogout) {
	navLogout.addEventListener('click', function(event) {
		event.preventDefault();
		localStorage.clear();
		document.getElementById('frm-logout').submit();
	});
}
*/

//Deep clone an object
function clone(aObject) {
	if (!aObject) {
		return aObject;
	}

	var bObject, v, k;
	bObject = Array.isArray(aObject) ? [] : {};
	for (k in aObject) {
		v = aObject[k];
		bObject[k] = (typeof v === "object") ? this.clone(v) : v;
	}
	return bObject;
}

// This replaces Moment.js's fromNow() function
function fromNow(date) {
	var thresholds = [46656000000,27648000000,3888000000,2246400000,129600000,79200000,5400000,2700000,90000,46000,0];
	var modifiers = [31536000000,1,2592000000,1,86400000,1,3600000,1,60000,1,1];
	var outputs = [' years ago','a year ago',' months ago','a month ago',' days ago','a day ago',' hours ago','an hour ago',' minutes ago','a minute ago','just now'];
	var d = new Date(date);
	var elapsed = Math.round(new Date() - d);
	for (var i=0; i<thresholds.length; i++) {
		if (elapsed >= thresholds[i]) {
			if (modifiers[i]>1) {
				return Math.round(elapsed / modifiers[i]) + outputs[i];
			}
			return outputs[i];
		}
	}
	return 'just now';
}
