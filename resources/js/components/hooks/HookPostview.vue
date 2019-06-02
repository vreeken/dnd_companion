<template>
	<div>
		<div class="post-title">
			<div>{{ post.title || post.hook_title }}</div>
		</div>
		<div class="post-description">
			<div class="description">
				{{ post.description || post.body || post.hook_body }}
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
