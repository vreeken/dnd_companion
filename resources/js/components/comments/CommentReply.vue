<template>
	<div>
		<div class="field">
			<div class="control">
				<textarea v-model="newComment.body" class="child-comment-body textarea" :class="{'error':newComment.bodyError}" type="text" placeholder="Comment" rows="2" />
			</div>
		</div>
		<div class="comment-buttons">
			<div class="button is-block is-info is-large submit-btn" @click="replyTo(comment)">
				Submit Reply
			</div>
			<div class="button is-block is-dark is-large cancel-btn" @click="$emit('onReplyCancel');">
				Cancel
			</div>
		</div>
		<div v-if="newComment.ajaxError.length>0" class="error-field">
			{{ newComment.ajaxError }}
		</div>
	</div>
</template>

<script>
export default {
	filters: {
			
	},
	props: {
		comment: Object,
		replyToComment: Object,
		postId: Number
	},
	data: function() {
		return {
			newComment: {
				body: '',
				bodyError: false,
				ajaxError: ''
			}
		}
	},
	computed: {
			
	},
	methods:{
		replyTo(comment) {
			if (!LOGGED_IN) {
				this.$root.$emit('showLogin', 'You must be logged in to comment');
				return;
			}
				
			//basic clientside validation
			if (this.newComment.body.length==0) {
				this.newComment.bodyError=true;
				return;
			}
			//Reset any errors
			this.newComment.bodyError=false;
			this.newComment.ajaxError="";

			//For use within Axios scope to gain access to 'this'
			var _this = this;

			console.log(this.postId);
			console.log(POST_TYPE);
			//ajax post
			axios.post(SUBMIT_COMMENT_URL, {
				post_type: POST_TYPE,
				post_id: this.postId,
				comment: this.newComment.body,
				parent_id: comment.id
			}, config)
				.then(function(response) {
					console.log(response);
					if (response.data.success) {
						//Create a new basic 'comment' with the newly submitted into and add to the parent comments list of children
						var c = {
							children: [],
							comment: _this.newComment.body,
							created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
							downvotes: 0,
							upvotes: 1,
							id: response.data.new_id,
							parent_id: comment.id,
							updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
							username: USERNAME,
							voted: 1
						}
						//Add to 0 position of parent's children comments so that it show up on top (near the submit form), 
						//if reloaded their comment will be at the end of the list, but this makes things more intuitive
						_this.comment.children.unshift(c);

						//unset the new comment data
						_this.newComment = {
							body: '',
							bodyError: false,
							ajaxError: ''
						}

						//Emit event to let parent (comment group) know the form is done
						_this.$emit('onReplySuccess');
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
		}
	},
}
</script>