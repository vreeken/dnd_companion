<template>
	<div class="comment-list">
		<comment v-for="comment in comments" :key="comment.id" :comment="comment" :post-id="postId" />
	</div>
</template>

<script>
export default {
	filters: {
			
	},
	props: {
		comments: Array,
		postId: Number
	},
	data: function() {
		return { }
	},
	computed: {
			
	},
	methods:{
			
	},
}
</script>