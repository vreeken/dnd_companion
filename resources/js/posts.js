
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('main-view', require('./components/Main.vue').default);
Vue.component('posts', require('./components/Posts.vue').default);
Vue.component('post', require('./components/Post.vue').default);

Vue.component('comment', require('./components/comments/Comment.vue').default);
Vue.component('comment-edit', require('./components/comments/CommentEdit.vue').default);
Vue.component('comment-list', require('./components/comments/CommentList.vue').default);
Vue.component('comment-reply', require('./components/comments/CommentReply.vue').default);

Vue.component('new-post-base', require('./components/NewPostBase.vue').default);

Vue.component('hook-listview', require('./components/hooks/HookListview.vue').default);
Vue.component('hook-postview', require('./components/hooks/HookPostview.vue').default);
Vue.component('hook-newpost', require('./components/hooks/HookNewpost.vue').default);

Vue.component('item-listview', require('./components/items/ItemListview.vue').default);
Vue.component('item-postview', require('./components/items/ItemPostview.vue').default);
Vue.component('item-newpost', require('./components/items/ItemNewpost.vue').default);

Vue.component('riddle-listview', require('./components/riddles/RiddleListview.vue').default);
Vue.component('riddle-postview', require('./components/riddles/RiddlePostview.vue').default);
Vue.component('riddle-newpost', require('./components/riddles/RiddleNewpost.vue').default);

Vue.component('puzzle-listview', require('./components/puzzles/PuzzleListview.vue').default);
Vue.component('puzzle-postview', require('./components/puzzles/PuzzlePostview.vue').default);
Vue.component('puzzle-newpost', require('./components/puzzles/PuzzleNewpost.vue').default);

Vue.component('dungeon-listview', require('./components/dungeons/DungeonListview.vue').default);
Vue.component('dungeon-postview', require('./components/dungeons/DungeonPostview.vue').default);
Vue.component('dungeon-newpost', require('./components/dungeons/DungeonNewpost.vue').default);

Vue.component('map-listview', require('./components/maps/MapListview.vue').default);
Vue.component('map-postview', require('./components/maps/MapPostview.vue').default);
Vue.component('map-newpost', require('./components/maps/MapNewpost.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



const app = new Vue({
	el: '#app'
});

// before a request is made start vue-progressbar
axios.interceptors.request.use(config => {
	app.$Progress.start(5000);
	return config;
});

// before a response is returned stop vue-progressbar
axios.interceptors.response.use(response => {
	if (response.status !== 200) {
		console.log('ajax fail');
		app.$Progress.fail();
	}
	else {
		console.log('end ajax');
		app.$Progress.finish();
	}
	return response;
});