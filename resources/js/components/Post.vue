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
						<component :is="postTypePostview" :post="post" :show-external-images="showExternalImages" />
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
				<comment-list :comments="comments" :post="post" />
			</div>
		</div>
	</div>
</template>

<script>

import { EventBus } from './eventbus/EventBus.js';

export default {
	filters: {
		fromNow: function(v) {
			//found in bootstrap.js
			return window.fromNow(v);
		},
	},
	props: {
		post: Object,
		comments: Array,
		commentsLoading: Boolean,
		componentPostType: String,
		showExternalImages: Boolean
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
		//EventBus.$on('clearNewComment', () => { this.clearNewComment(); });
	},
	methods:{
		upvote: function(p) { EventBus.$emit('upvotePost', p); },
		downvote: function(p) { EventBus.$emit('downvotePost', p); },
		expandPost: function(p) { EventBus.$emit('expandPost', p); },
		viewPost: function(p, b) { EventBus.$emit('viewPost', p, b); },
		unsavePost: function(p) { EventBus.$emit('unsavePost', p); },
		savePost: function(p) { EventBus.$emit('savePost', p); },
		sharePost: function(p) { EventBus.$emit('sharePost', p); },
		reportPost: function(p) { EventBus.$emit('reportPost', p); },
		toggleMinimized: function(p) { EventBus.$emit('toggleMinimized', p); },
		closePost: function() { EventBus.$emit('closePost'); },

		submitComment: function() { EventBus.$emit('postComment', this.post, null, this.newComment, this.comments); },
		/*
		clearNewComment: function() {
			this.newComment = {
				body: "",
				bodyError: "",
				ajaxError: ""
			};
		},
		*/
	},
}
</script>
