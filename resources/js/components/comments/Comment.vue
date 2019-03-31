<template>
	<div :class="[bgClass]" class="comment-group">
		<div class="post-comment">
			<div class="comment-vote-btns not-mobile">
				<div class="vote-arrow up" :class="{'voted': comment.voted==1}" @click="voteOnComment(1, comment)">
					<i class="fas fa-arrow-alt-circle-up" />
				</div>
				<div class="vote-arrow down" :class="{'voted': comment.voted==0}" @click="voteOnComment(0, comment)">
					<i class="fas fa-arrow-alt-circle-down" />
				</div>
			</div>
			<div>
				<div class="comment-body">
					{{ comment.comment }}
				</div>
				<div class="comment-header">
					<div>
						<span class="vote-arrow mobile-only-inline up" :class="{'voted': comment.voted==1}" @click="voteOnComment(1, comment)"><i class="fas fa-arrow-alt-circle-up" /></span>
						<span class="comment-score" :title="'+'+comment.upvotes+' -'+comment.downvotes">{{ comment.upvotes-comment.downvotes }} point<span v-if="comment.upvotes-comment.downvotes != 1 && comment.upvotes-comment.downvotes != -1">s</span></span> 
						<span class="vote-arrow mobile-only-inline down" :class="{'voted': comment.voted==0}" @click="voteOnComment(0, comment)"><i class="fas fa-arrow-alt-circle-down" /></span>
						<span class="comment-author"> - Posted by {{ comment.username }}</span> 
						<span class="comment-date">{{ comment.created_at | fromNow }}</span> 
					</div>
					<div>
						<span class="comment-reply-btn fake-link" @click="replyToComment == comment ? replyToComment=false : replyToComment=comment">&nbsp;Reply</span>
						<span v-if="comment.username==me">
							&nbsp;&bull;&nbsp;<span class="comment-edit-btn fake-link" @click="editComment == comment ? editComment=false : editComment=comment">Edit</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<comment-reply v-if="replyToComment == comment" :comment="comment" :reply-to-comment="replyToComment" :post-id="postId" @onReplySuccess="replyToComment=false" @onReplyCancel="replyToComment=false" />
		<comment-edit v-if="editComment == comment" :comment="comment" :edit-comment="editComment" @onEditSuccess="editComment=false" @onEditCancel="editComment=false" />
		<comment-list v-if="comment.children.length" :comments="comment.children" :post-id="postId" />
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
		comment: Object,
		postId: Number
	},
	data: function() {
		return {
			replyToComment: false,
			editComment: false,
			me: USERNAME,
			bgClass: 'cg'+this.comment.depth%5,
		}
	},
	computed: {
			
	},
	mounted: function() {
			
	},
	methods: {
		voteOnComment(v, c) {
			if (v!=0 && v!=1) { return; }

			var _this = this;
			//ajax post
			axios.post(VOTE_URL, {
				type: POST_TYPE+"_comment",
				id: _this.comment.id,
				vote: v
			}, config)
				.then(function(response) {
					console.log(response);
					if (response.data.success) {
						if (response.data.success == "vote_saved") {
							if (v==1) { _this.comment.upvotes+=1; }
							else if (v==0) { _this.comment.downvotes+=1; }
							_this.comment.voted=v;
						}
						else if (response.data.success == "vote_unchanged") {

						}
						else if (response.data.success == "vote_updated") {
							if (v==1) {
								_this.comment.upvotes+=1;
								_this.comment.downvotes-=1;
							}
							else if (v==0) {
								_this.comment.downvotes+=1;
								_this.comment.upvotes-=1;
							}
							_this.comment.voted=v;
						}
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