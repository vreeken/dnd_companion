<template>
	<div>
		<div class="post-title">
			<div>{{ post.title }}</div>
		</div>
		<div class="post-description">
			<div class="description">
				{{ post.description || nl2br || maxLength }}
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
