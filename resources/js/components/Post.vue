<template>
	<div class="post-page">
		<div class="post-close link" @click="closePost()">
			BACK&nbsp;&nbsp;&nbsp;<i class="fas fa-times" />
		</div>

		<div class="post-view">
			<div class="post-header">
				<div class="vote-btns">
					<div class="vote-arrow up" :class="{'voted': post.voted==1}" @click="upvote(post)">
						<i class="fas fa-arrow-alt-circle-up" />
					</div>
					<div class="score" :title="'+'+post.upvotes+' -'+post.downvotes">
						{{ post.upvotes-post.downvotes }}
					</div>
					<div class="vote-arrow down" :class="{'voted': post.voted==0}" @click="downvote(post)">
						<i class="fas fa-arrow-alt-circle-down" />
					</div>
				</div>
				<div class="post-content">
					<div class="">
						<component :is="postTypePostview" :post="post" />
						<div class="post-date">
							Submitted 
							<time :title="post.created_at" class="">{{ post.created_at | fromNow }}</time> 
							by <span>{{ post.username }}</span>
						</div>
						<ul style="" class="post-buttons">
							<li class="post-save">
								<span v-if="post.saved" class="post-save link" @click="unsavePost(post)"><i class="fas fa-bookmark" /> unsave</span>
								<span v-else class="post-save link" @click="savePost(post)"><i class="far fa-bookmark" /> save</span>
							</li>
							<li class="post-share">
								<span class="post-share link" @click="sharePost=post"><i class="fas fa-share-alt" /> share</span>
							</li>
							<li class="post-report-button">
								<span class="post-report link" @click="reportPost=post"><i class="fas fa-exclamation-triangle" /> report</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div v-show="!commentsLoading" class="post-comments">
				<div class="new-comment">
					<div v-if="newComment.bodyError.length>0" class="error-field">
						{{ newComment.bodyError }}
					</div>
					<div class="field">
						<div class="control">
							<textarea id="comment-body" v-model="newComment.body" class="textarea" :class="{'error':newComment.bodyError.length>0}" type="text" placeholder="Comment" rows="2" />
						</div>
					</div>
					<div class="button is-block is-info is-large is-fullwidth" @click="submitComment()">
						Submit Comment
					</div>
					<div v-if="newComment.ajaxError.length>0" class="error-field">
						{{ newComment.ajaxError }}
					</div>
				</div>
				<comment-list :comments="comments" :post-id="post.id" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	filters: {
		fromNow: function(v) {
			/*
			if (moment(v).isValid()) {
				return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
			}
			return v;
			*/
			return fromNow(v);
		},
	},
	props: {
		post: Object,
		comments: Array,
		commentsLoading: Boolean,
		componentPostType: String
	},
	data: function() {
		return {
			postTypePostview: this.componentPostType + '-postview',
			newComment: {
				body: "",
				bodyError: "",
				ajaxError: "",
			},
		}
	},
	computed: {
			
	},
	mounted: function() {
		//this.$root.$on('submitComment', (b) => { this.submitComment(b); });
	},
	methods:{
		upvote: function(p) { this.$root.$emit('upvote', p); },
		downvote: function(p) { this.$root.$emit('downvote', p); },
		expandPost: function(p) { this.$root.$emit('expandPost', p); },
		viewPost: function(p, b) { this.$root.$emit('viewPost', p, b); },
		unsavePost: function(p) { this.$root.$emit('unsavePost', p); },
		savePost: function(p) { this.$root.$emit('savePost', p); },
		sharePost: function(p) { this.$root.$emit('sharePost', p); },
		reportPost: function(p) { this.$root.$emit('reportPost', p); },
		toggleMinimized: function(p) { this.$root.$emit('toggleMinimized', p); },
		closePost: function() { this.$root.$emit('closePost'); },
		

		submitComment: function() {
			//Make sure user is logged in
			if (!LOGGED_IN) {
				this.$root.$emit('showLogin', 'You must be logged in to comment');
				return;
			}

			//clear any previous errors
			this.newComment.bodyError = this.newComment.ajaxError = "";
                
			//Client-side validation, make sure there is a body
			if (this.newComment.body.length == 0) {
				this.newComment.bodyError = "Please include content in your comment";	
				return;
			}

			var _this = this;
			axios.post(SUBMIT_COMMENT_URL, {
				post_type: POST_TYPE,
				post_id: this.post.id,
				comment: this.newComment.body,
				parent_id: null
			}, config)
				.then(function(response) {
					console.log(response);
					if (response.data.success) {	
						//Create an artificial "comment" object formatted as you would get from the server based off the user's newly submitted comment						
						var c = {
							children: [],
							comment: _this.newComment.body,
							created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
							downvotes: 0,
							upvotes: 1,
							id: response.data.new_id,
							parent_id: null,
							updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
							username: USERNAME,
							voted: 1
						}
						//Add our new comment (now correctly formatted) to the top of our list of comments
						_this.comments.unshift(c);
						//Clear the new comment inputs
						_this.clearNewComment();
					}
					else {
						//Unknown Error
						_this.newComment.ajaxError = "An error has occurred. Please try again.";
					}
				})
				.catch(function(error) {
					console.log("ERROR");
					console.log(error);
					console.log(error.response.headers);
					console.log(error.response.data);
					//invalid_parameters
					//db_error
					_this.newComment.ajaxError = "An error has occurred. Please try again.";
				});
		},
		clearNewComment: function() {
			this.newComment = {
				body: "",
				bodyError: "",
				ajaxError: ""
			};
		},
	},
}
</script>
