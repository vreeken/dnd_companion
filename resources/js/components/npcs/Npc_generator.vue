<template>
	<div class="npc-generator">
		<div v-show="!editing" class="columns">
			<div class="column is-three-quarters">
				<npc-view :npc="npc" />
			</div>
			<div class="column">
				<button class="button is-info is-fullwidth" @click="randomize()">
					<span class="icon"><i class="fas fa-dice" /></span>Randomize
				</button>
				<button class="button is-danger is-fullwidth" @click="editing=true">
					<span class="icon"><i class="fas fa-edit" /></span>Edit
				</button>
				<button class="button is-success is-fullwidth" @click="saveNPCToMine()">
					<span class="icon"><i class="fas fa-save" /></span>Save to My NPCs
				</button>
			</div>
		</div>
		<npc-edit v-if="editing" ref="edit" :npc="npc" @saveChanges="saveChanges($event)" @stopEditing="editing=false" />
	</div>
</template>

<script>
import NPC_GEN_DATA from './NPC_GEN_DATA.vue';

import { EventBus } from '../eventbus/EventBus.js';

export default {
	filters: {
		fromNow: function(v) {
			/*
			if (moment(v).isValid()) {
				return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
			}
			return v;
			*/
			return fromNow(v);
		},
		nl2br: function(t) {
			return t.replace(/(?:\r\n|\r|\n)/g, "<br />")
		},
	},
	extends: NPC_GEN_DATA,

	props: {
		data: Object
	},
	data() {
		return {
			npc: null,
			editing: false,
		}
	},
	mounted: function() {
		EventBus.$on('postLogin', () => {
			localStorage.setItem("flashNPC", JSON.stringify(this.npc));
			window.location.reload();
		});
		EventBus.$on('postRegister', () => {
			localStorage.setItem("flashNPC", JSON.stringify(this.npc));
			window.location.reload();
		});


		let flashNPC = localStorage.getItem("flashNPC");
		if (flashNPC !== null) {
			this.npc = JSON.parse(flashNPC);
			localStorage.removeItem("flashNPC");
		}
		else {
			this.randomize();
		}
	},
	methods: {
		randomize: function() {
			this.npc = this.generateRandomNPC();
		},

		saveNPCToMine: function() {
			this.$emit('onSaveNPCToMine', this.npc);
			this.npc = this.generateRandomNPC();
		},
		saveChanges: function(new_npc) {
			this.npc = new_npc;
			this.editing=false;
		},
	},
}
</script>




<style>
    
</style>
