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
