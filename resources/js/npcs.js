require('./bootstrap');

window.Vue = require('vue');

Vue.config.productionTip = false;

Vue.component('auth', require('./components/auth/Auth.vue').default);

Vue.component('npcs', require('./components/npcs/Npcs.vue').default);
Vue.component('npc-generator', require('./components/npcs/Npc_generator.vue').default);
Vue.component('NPC_GEN_DATA', require('./components/npcs/NPC_GEN_DATA.vue').default);

Vue.component('npc-view', require('./components/npcs/Npc_view.vue').default);
Vue.component('npc-edit', require('./components/npcs/Npc_edit.vue').default);
Vue.component('my-npcs', require('./components/npcs/My_Npcs.vue').default);
Vue.component('public-npcs', require('./components/npcs/Public_Npcs.vue').default);
//Vue.component('npc-public-listview', require('./components/npcs/Npc_Public_Listview.vue').default);
Vue.component('npc-public-fullview', require('./components/npcs/Npc_Public_Fullview.vue').default);

const app = new Vue({
	el: '#app'
});
