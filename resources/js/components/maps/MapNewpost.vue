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

					<div v-if="newPost.descriptionError.length>0" class="error-field">
						{{ newPost.descriptionError }}
					</div>
					<div class="field">
						<div class="control">
							<textarea id="post-description" v-model="newPost.description" class="textarea is-large" type="text" placeholder="Description" rows="5" />
						</div>
					</div>

					<div v-if="newPost.externalLinkError.length>0" class="error-field">
						{{ newPost.externalLinkError }}
					</div>
					<div class="field">
						<div class="control">
							<input id="post-external-link" v-model="newPost.externalLink" class="input is-large" type="text" placeholder="External Link (required)">
						</div>
					</div>

					<div v-if="newPost.imageLinkError.length>0" class="error-field">
						{{ newPost.imageLinkError }}
					</div>
					<div v-if="thumbRequired" class="field">
						<div class="control">
							<input id="post-image-link" v-model="newPost.imageLink" class="input is-large" type="text" placeholder="Image Link (.jpg or .png)">
						</div>
					</div>

					<div>
						The external link should point to an image, an album, or a web page that includes this map. If the external link does NOT point directly to an image file (ie a link ending in ".jpg" or ".png") then you must include an image link to be used as the thumbnail. 
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
		thumbRequired() {
			const suf = this.newPost.externalLink.substr(this.newPost.externalLink.length-4);
			return suf !== '.jpg' && suf !== '.png';
		}
	},
	methods:{
		submitPost: function() {
			//Init newPost error values to blank
			this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = this.newPost.imageLinkError = this.newPost.externalLinkError = "";

			//Client side validation, make sure there's a title and body
			if (!this.newPost.title.length) {
				this.newPost.titleError = "Please include a title";
				return;
			}
			if (!this.newPost.description.length) {
				this.newPost.descriptionError = "Please include content in your " + this.postType;
				return;
			}

			if (this.newPost.externalLink.length < 8) {
				this.newPost.externalLinkError = "Please include an external link to an image, album, or webpage";
				return;
			}
			if (this.newPost.externalLink.substr(0, 7) !== 'http://' && this.newPost.externalLink.substr(0, 8) !== 'https://') {
				this.newPost.externalLinkError = "This link must begin with \"http://\" or \"https://\"";
				return;
			}

			const suf = this.newPost.externalLink.substr(this.newPost.externalLink.length-4);
			if (suf !== '.jpg' && suf !== '.png') {
				if (this.newPost.imageLink.length < 8) {
					this.newPost.imageLinkError = "Your external link doesn't point directly to an image so please include a valid image link ending with \".jpg\" or \".png\"";
					return;
				}
				
				if (this.newPost.imageLink.substr(0, 7) !== 'http://' && this.newPost.imageLink.substr(0, 8) !== 'https://') {
					this.newPost.imageLinkError = "Please include a valid image link beginning with \"http://\" or \"https://\"";
					return;
				}

				const suf2 = this.newPost.imageLink.substr(this.newPost.imageLink.length-4);
				if (suf2 !== '.jpg' && suf2 !== '.png') {
					this.newPost.imageLinkError = "Invalid image link; it must end in \".jpg\" or \".png\"";
					return;
				}
			}
			else {
				this.newPost.imageLink = "";
				// if (this.newPost.imageLink.length < 8) {
				// 	this.newPost.ImageLinkError = "Please include a valid image link ending with \".jpg\" or \".png\"";
				// 	return;
				// }
				
				// if (this.newPost.imageLink.substr(0, 7) !== 'http://' && this.newPost.imageLink.substr(0, 8) !== 'https://') {
				// 	this.newPost.imageLinkError = "This link must begin with \"http://\" or \"https://\"";
				// 	return;
				// }

				// const suf2 = this.newPost.imageLink.substr(this.newPost.imageLink.length-4);
				// if (suf2 !== '.jpg' && suf2 !== '.png') {
				// 	this.newPost.imageLinkError = "Invalid image link; it must end in \".jpg\" or \".png\"";
				// 	return;
				// }
			}


			var data = {
				title: this.newPost.title,
				body: this.newPost.description,
				external_link: this.newPost.externalLink,
				image_link: this.newPost.imageLink
			}

			this.submit(data);
		},
		clearPost: function() {
			this.newPost = {
				title: "",
				titleError: "",
				description: "",
				descriptionError: "",
				externalLink: "",
				externalLinkError: "",
				imageLink: "",
				imageLinkError: "",
				ajaxError: ""
			}
		}
	},
}
</script>
