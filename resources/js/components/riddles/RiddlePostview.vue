<template>
	<div>
		<div class="post-title">
			<div>{{ post.riddle }}</div>
		</div>
		<div v-if="!post.minimized" class="post-description">
			<div v-if="post.revealed" class="description riddle" @click="post.revealed=false">
				{{ post.answer }}
			</div>
			<div v-else class="description riddle-reveal" @click="post.revealed=true">
				Click to reveal
			</div>
		</div>
	</div>
</template>

<script>
import ViewBase from '../ViewBase.vue';
export default {		
	extends: ViewBase,
	data() { return {} },
}
</script>
