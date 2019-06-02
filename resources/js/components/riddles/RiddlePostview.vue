<template>
	<div>
		<div class="post-title">
			<div>{{ post.riddle }}</div>
		</div>
		<div v-if="!post.minimized" class="post-description">
			<div class="description riddle">
				{{ post.answer }}
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
