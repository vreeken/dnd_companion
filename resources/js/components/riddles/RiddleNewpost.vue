<template>
	<div id="new-post-modal" class="modal is-active">
		<div class="modal-background" @click="$emit('hideNewPost')" />
		<div class="modal-content">
			<div class="has-text-centered">
				<div class="box">
					<div class="modal__title">
						Submit a new {{ postType }}
					</div>
					<div v-if="newPost.riddleError.length>0" class="error-field">
						{{ newPost.riddleError }}
					</div>
					<div class="field">
						<div class="control">
							<textarea id="post-body" v-model="newPost.riddle" class="textarea is-large" type="text" placeholder="Riddle" rows="5" autofocus="" />
						</div>
					</div>

					<div v-if="newPost.answerError.length>0" class="error-field">
						{{ newPost.answerError }}
					</div>
					<div class="field">
						<div class="control">
							<input id="post-title" v-model="newPost.answer" class="input is-large" type="text" placeholder="Answer">
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
			
		}
	},
	computed: {
			
	},
	mounted: function() {
		this.newPost.riddleError = this.newPost.answerError = this.newPost.ajaxError = "";
		this.newPost.riddle = "";
		this.newPost.answer = "";
	},
	methods:{
		submitPost: function() {
			//Init newPost error values to blank
			this.newPost.riddleError = this.newPost.answerError = this.newPost.ajaxError = "";

			//Client side validation, make sure there's a riddle and answer
			if (this.newPost.riddle.length == 0) {
				this.newPost.riddleError = "Please include a riddle";
				return;
			}
			if (this.newPost.answer.length == 0) {
				this.newPost.answerError = "Please include an answer";
				return;
			}


			var data = {
				riddle: this.newPost.riddle,
				answer: this.newPost.answer,
			}

			this.submit(data);
		},
		clearPost: function() {
			this.newPost = {
				riddle: "",
				riddleError: "",
				answer: "",
				answerError: "",
				ajaxError: ""
			}
		}
	},
}
</script>
