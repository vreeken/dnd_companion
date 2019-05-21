<template>
	<div class="comment-list">
		<comment v-for="comment in comments" :key="comment.id" :comment="comment" :post="post" />
	</div>
</template>

<script>

import { EventBus } from '../eventbus/EventBus.js';

export default {
	filters: {
			
	},
	props: {
		comments: Array,
		post: Object
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