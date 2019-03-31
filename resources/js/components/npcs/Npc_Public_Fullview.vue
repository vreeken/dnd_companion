<template>
	<div v-if="npc" class="npc-public-fullview">
		<npc-view :npc="npc" />
	</div>
</template>

<script>

export default {
	props: {
		npc: Object
	},
	data() {
		return {

		}
	},
}
</script>