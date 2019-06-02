<template>
	<div>
		<div class="post-title">
			<div>{{ post.title || post.item_title }}</div>
		</div>
		<div class="description puzzle">
			<img v-if="showExternalImages && post.image_link" class="external-image" ALIGN="left" :src="post.image_link"> 
			{{ post.description || post.body }}
			<div v-if="post.external_link" class="external-link">
				<span class="bold">External Link:</span> <a :href="post.external_link" target="_blank">{{ post.external_link }}</a>
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
