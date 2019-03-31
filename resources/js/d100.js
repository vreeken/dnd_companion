require('./bootstrap');

window.Vue = require('vue');

Vue.config.productionTip = false;

Vue.component('d100-view', require('./components/D100Main.vue').default);


const app = new Vue({
	el: '#app'
});
