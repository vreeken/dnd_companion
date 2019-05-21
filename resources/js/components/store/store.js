window.Vue = require('vue');
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    username: ''
  },
  methods: {

  }
});