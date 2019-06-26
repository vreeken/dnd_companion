<template>
	<div>
		<div class="post-title">
			<div>{{ post.title }}</div>
		</div>
		<div class="description puzzle">
			<a :href="post.img || post.image_link || post.link || post.external_link" target="_blank"><img class="external-image" ALIGN="left" :src="'/map_thumbs/'+post.id+'.jpg'"></a>
			<span>{{ post.description || post.body }}</span>
			<div v-if="post.link || post.external_link" class="external-link">
				<span class="bold">External Link:</span> <a :href="post.link || post.external_link" target="_blank">{{ post.link || post.external_link }}</a>
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
