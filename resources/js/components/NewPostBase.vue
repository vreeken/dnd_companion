<script>
import { EventBus } from './eventbus/EventBus.js';

export default {
	filters: {
				
	},
	props: {
		postType: String,
		postTypePretty: String,
		submitPostUrl: String,
		username: String
	},
	data: function() {
		return {
			newPost: {},
		}
	},
	computed: {
				
	},
	created: function() {
		this.clearPost();
	},
	mounted: function() {
		EventBus.$on('newPostCreatedSuccessfully', () => { this.clearPost(); });
	},
	methods:{
		submit: function(data) {
			EventBus.$emit('submitNewPost', data);
		}
		/*
		submit: function(data) {
			let _this = this;
			axios.post(this.submitPostUrl, data, config)
				.then(function(response) {
					if (response.data.success) {
						_this.showingNewPost=false;
						var p = {
							title: _this.newPost.title,
							body: _this.newPost.body,
							comments: [],
							id: response.data.id,
							upvotes: 1,
							downvotes: 0,
							created_at: _this.now(),
							username: _this.username
						}

						_this.$root.$emit('newPostCreated', p);
							
						_this.clearPost();
					}
					else {
						//Unknown Error
						_this.newPost.ajaxError = "An error has occurred. Please try again.";
					}
				})
				.catch(function(error) {
					console.log("ERROR");
					console.log(error);
					//console.log(error.response.headers);
					//console.log(error.response.data);
					//invalid_parameters
					//db_error
					_this.newPost.ajaxError = "An error has occurred. Please try again.";
				});
				
		},
		now: function() {
			var date = new Date();
			var aaaa = date.getFullYear();
			var gg = date.getDate();
			var mm = (date.getMonth() + 1);

			if (gg < 10)
			    gg = "0" + gg;

			if (mm < 10)
			    mm = "0" + mm;

			var cur_day = aaaa + "-" + mm + "-" + gg;

			var hours = date.getHours()
			var minutes = date.getMinutes()
			var seconds = date.getSeconds();

			if (hours < 10)
			    hours = "0" + hours;

			if (minutes < 10)
			    minutes = "0" + minutes;

			if (seconds < 10)
			    seconds = "0" + seconds;

			return cur_day + " " + hours + ":" + minutes + ":" + seconds+'Z';

		}
		*/
	},
	clearPost: function() {
		//Overridden in each child class
		this.newPost = {};
	},
}
</script>