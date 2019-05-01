<script>
export default {
	filters: {
				
	},
	props: [],
	data: function() {
		return {
			postType: POST_TYPE_PRETTY,
			newPost: {},
		}
	},
	computed: {
				
	},
	created: function() {
		this.clearPost();
	},
	methods:{
		submit: function(data) {
			let _this = this;
			axios.post(SUBMIT_POST_URL, data, config)
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
							created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
							username: USERNAME
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
		}
	},
	clearPost: function() {
		//Overridden in each child class
		this.newPost = {};
	},
}
</script>