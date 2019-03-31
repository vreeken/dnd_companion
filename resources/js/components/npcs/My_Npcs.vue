<template>
	<div class="npcs-mine">
		<div v-show="!editing" class="columns">
			<div class="column is-three-quarters">
				<npc-view :npc="curr_npc" />
			</div>
			<div class="column">
				<button class="button is-danger is-fullwidth" @click="editing=true">
					<span class="icon"><i class="fas fa-edit" /></span>Edit
				</button>
				<div class="npc-list">
					<div v-for="npc in my_npcs" :key="npc.id" class="button" @click="showNPC(npc)">
						{{ npc.summary }}
					</div>
				</div>
			</div>
		</div>
		<npc-edit v-if="editing" ref="edit" :npc="curr_npc" @saveChanges="saveChanges($event)" @stopEditing="editing=false" />
	</div>
</template>

<script>
import NPC_GEN_DATA from './NPC_GEN_DATA.vue';

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
		data: Object,
		newSavedNPC: Object
	},
	data() {
		return {
			my_npcs: [],
			curr_npc: null,
			editing: false,
		}
	},
	mounted: function() {
		this.parseNPCsFromServer();
	},
	methods: {
		parseNPCsFromServer: function() {
			if (this.data.my_npcs.length) {
				for (let i=0; i<this.data.my_npcs.length; i++) {
					this.my_npcs.push(this.parseNPCFromServerData(this.data.my_npcs[i]));
				}
			}
			this.curr_npc = this.my_npcs[0];
		},
		saveNewNPC: function(npc) {
			this.my_npcs.push(npc);
			//this.curr_npc = this.my_npcs[this.my_npcs.length-1];
			this.curr_npc = npc;
			this.saveNewNPCToDB(npc);
		},
		showNPC: function(npc) {
			this.curr_npc = npc;
		},
		saveNewNPCToDB: function(npc) {
			axios.post(NEW_NPC_URL, {
				npc: npc,
			}, config)
				.then(function(response) {
					if (response.data && response.data.success) {
						console.log('saved to db');
						return;
					}
					//TODO handle error
					console.log('error saving to db');
					console.log(response.data);
				})
				.catch(function(error) {
					//TODO handle error
					console.log('catch error');
					console.log(error.response);
					console.log(error.response.data);
				});
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
