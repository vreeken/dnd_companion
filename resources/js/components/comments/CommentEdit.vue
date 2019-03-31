<template>
	<div>
		<span v-if="bodyError">{{ bodyError }}</span>
		<div class="field">
			<div class="control">
				<textarea v-model="editedComment" class="child-comment-body textarea" :class="{'error':bodyError}" type="text" placeholder="Comment" rows="2" />
			</div>
		</div>
		<div class="comment-buttons">
			<div class="button is-block is-info is-large submit-btn" @click="update()">
				Update Comment
			</div>
			<div class="button is-block is-dark is-large cancel-btn" @click="$emit('onEditCancel');">
				Cancel
			</div>
		</div>
		<div v-if="ajaxError" class="error-field">
			{{ ajaxError }}
		</div>
	</div>
</template>

<script>
export default {
	filters: {
			
	},
	props: {
		comment: Object,
		editComment: Object
	},
	data: function() {
		return {
			bodyError: false,
			ajaxError: false,
			editedComment: this.comment.comment
		}
	},
	computed: {
			
	},
	methods:{
		update() {
			//basic clientside validation
			if (this.editedComment.length==0) {
				this.bodyError='Please fill out your comment or click delete if you wish to remove your comment';
				return;
			}
			//Reset any errors
			this.bodyError=false;
			this.ajaxError=false;

			//If comment didn't change then return, but still emit success so that parent closes the edit div
			if (this.editedComment == this.comment.comment) {
				this.$emit('onEditSuccess');
				return;
			}

			//For use within Axios scope to gain access to 'this'
			var self = this;

			//ajax post
			axios.post(UPDATE_COMMENT_URL, {
				post_type: POST_TYPE,
				comment: self.editedComment,
				comment_id: self.comment.id
			}, config)
				.then(function(response) {
					console.log(response);
					if (response.data.success) {
						self.comment.comment=self.editedComment;
						self.$emit('onEditSuccess');
					}
					else {
						//Unknown Error
						self.ajaxError="An error has occurred. Please try again.";
					}
				})
				.catch(function(error) {
					console.log("ERROR");
					console.log(error);
					console.log(error.response.headers);
					console.log(error.response.data);
					//invalid_parameters
					//db_error
					self.ajaxError="An error has occurred. Please try again.";
				});
		}
	},
}
</script>