<template>
	<div id="new-post-modal" class="modal is-active">
		<div class="modal-background" @click="$emit('hideNewPost')" />
		<div class="modal-content">
			<div class="has-text-centered">
				<div class="box">
					<div class="modal__title">
						Submit a new {{ postType }}
					</div>
					<div v-if="newPost.titleError.length>0" class="error-field">
						{{ newPost.titleError }}
					</div>
					<div class="field">
						<div class="control">
							<input id="post-title" v-model="newPost.title" class="input is-large" type="text" placeholder="Title" autofocus="">
						</div>
					</div>

					<div v-if="newPost.bodyError.length>0" class="error-field">
						{{ newPost.bodyError }}
					</div>
					<div class="field">
						<div class="control">
							<textarea id="post-body" v-model="newPost.body" class="textarea is-large" type="text" :placeholder="postType" rows="5" />
						</div>
					</div>
					<div class="button is-block is-info is-large is-fullwidth" @click="submitPost()">
						Submit
					</div>
					<div v-if="newPost.ajaxError.length>0" class="error-field">
						{{ newPost.ajaxError }}
					</div>
				</div>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="$emit('hideNewPost')" />
	</div>
</template>

<script>
import NewPostBase from '../NewPostBase.vue';
export default {
	filters: {
			
	},
	extends: NewPostBase,
	data: function() {
		return {
			newPost: this.clearPost(),
		}
	},
	computed: {
			
	},
		
	methods:{
		submitPost: function() {
			//Init newPost error values to blank
			this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = "";

			//Client side validation, make sure there's a title and body
			if (this.newPost.title.length == 0) {
				this.newPost.titleError = "Please include a title";
				return;
			}
			if (this.newPost.body.length == 0) {
				this.newPost.bodyError = "Please include content in your " + this.postType;
				return;
			}
			var data = {
				hook_body: this.newPost.body,
				hook_title: this.newPost.title
			}


			this.submit(data);
		},
		clearPost: function() {
			this.newPost = {
				title: "",
				titleError: "",
				body: "",
				bodyError: "",
				ajaxError: ""
			}
		}
	},
}
</script>
