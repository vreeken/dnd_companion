<template>
	<div>
		<div class="post-title">
			<div>{{ post.title }}</div>
		</div>
		<div class="description puzzle">
			<a :href="post.link" target="_blank"><img v-if="showExternalImages" class="external-image" ALIGN="left" :src="'map_thumbs/'+post.id+'.jpg'"></a>
			<span>{{ post.description || nl2br || maxLength }}</span>
			<div v-if="post.link" class="external-link">
				<span class="bold">External Link:</span> <a :href="post.link" target="_blank">{{ post.link }}</a>
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
