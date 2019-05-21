window.Vue = require('vue');
Vue.config.productionTip = false;

// Ajax loading bar, MUST BE initialized with axios within each base .js file (eg posts.js and npcs.js)
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#3082ed',
  failedColor: '#ff0000',
  thickness: '10px',
  transition: {
	speed: '0.2s',
	opacity: '0.6s',
	termination: 500
  },
  autoRevert: true,
  location: 'bottom',
  inverse: false,
  autoFinish: false
}

Vue.use(VueProgressBar, options);

import Toasted from 'vue-toasted';
Vue.use(Toasted);

Vue.toasted.register('success', (data) => {
		if (data.message) {
			return data.message;
		}
		return 'Success';
	},
	{
		type : 'success',
		icon : {
			name: 'fa-check',
		},
		position: 'bottom-center',
		duration: '4000',
		iconPack: 'fontawesome',
		closeOnSwipe: true,
		action : {
			text: '×',
			class: 'toasted-icon',
			onClick: (e, toastObject) => {
				toastObject.goAway(0);
			}
		},
	}
);

Vue.toasted.register('error', (data) => {
		if (data.message) {
			return data.message;
		}
		return 'An error occurred. Please try again.';
	},
	{
		type : 'error',
		icon : {
			name: 'fa-exclamation-circle',
		},
		position: 'bottom-center',
		duration: '4000',
		iconPack: 'fontawesome',
		closeOnSwipe: true,
		action : {
			text: '×',
			class: 'toasted-icon',
			onClick: (e, toastObject) => {
				toastObject.goAway(0);
			}
		},
	}
);

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

// Grab the csrf token from html document head and include with all axios requests
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
	window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
else {
	console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}




//Deep clone an object
window.clone = function(aObject) {
	if (!aObject) {
		return aObject;
	}

	var bObject, v, k;
	bObject = Array.isArray(aObject) ? [] : {};
	for (k in aObject) {
		v = aObject[k];
		bObject[k] = (typeof v === "object") ? window.clone(v) : v;
	}
	return bObject;
}

// This replaces Moment.js's fromNow() function
window.fromNow = function(date) {
	var thresholds = [46656000000,27648000000,3888000000,2246400000,129600000,79200000,5400000,2700000,90000,46000,0];
	var modifiers = [31536000000,1,2592000000,1,86400000,1,3600000,1,60000,1,1];
	var outputs = [' years ago','a year ago',' months ago','a month ago',' days ago','a day ago',' hours ago','an hour ago',' minutes ago','a minute ago','just now'];
	
	//If date doesn't have 'z' on the end, then append it
	date = date.substr(date.length - 1) === 'z' ? date : date+'z';

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
