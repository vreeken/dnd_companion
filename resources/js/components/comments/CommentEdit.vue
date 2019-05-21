<template>
	<div>
		<span v-if="editedComment.bodyError.length">{{ editedComment.bodyError }}</span>
		<div class="field">
			<div class="control">
				<textarea v-model="editedComment.body" class="child-comment-body textarea" :class="{'error':editedComment.bodyError.length}" type="text" placeholder="Comment" rows="2" />
			</div>
		</div>
		<div class="comment-buttons">
			<div class="button is-block is-info is-large submit-btn" @click="updateComment()">
				Update Comment
			</div>
			<div class="button is-block is-dark is-large cancel-btn" @click="cancelEdit()">
				Cancel
			</div>
		</div>
		<div v-if="editedComment.ajaxError.length" class="error-field">
			{{ editedComment.ajaxError }}
		</div>
	</div>
</template>

<script>

import { EventBus } from '../eventbus/EventBus.js';

export default {
	filters: {
			
	},
	props: {
		comment: Object,
		editComment: Object
	},
	data: function() {
		return {
			editedComment: {
				body: this.comment.comment,
				bodyError: false,
				ajaxError: ''
			}
		}
	},
	computed: {
			
	},
	methods:{
		updateComment: function() { EventBus.$emit('updateComment', this.comment, this.editedComment); },
		cancelEdit: function() {
			EventBus.$emit('onEditCancel');
		},
	},
}
</script>