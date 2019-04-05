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
					<div v-for="(npc, i) in my_npcs" :key="i" class="button" @click="showNPC(npc, i)">
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
			curr_npc_index: 0,
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
			this.checkNPCCustomInputs(npc);

			this.my_npcs.push(npc);
			this.curr_npc = npc;
			this.curr_npc_index = this.my_npcs.length-1;
			
			this.saveNewNPCToDB(npc);
		},
		showNPC: function(npc, i) {
			this.curr_npc_index = i;
			this.curr_npc = npc;
		},
		saveNewNPCToDB: function(npc) {
			const _this = this;
			axios.post(NEW_NPC_URL, {
				npc: npc,
			}, config)
				.then(function(response) {
					if (response.data && response.data.success && response.data.id) {
						_this.$toasted.global.success({message: 'NPC Saved'});
						npc.id = response.data.id;
						return;
					}
					//TODO handle error
					console.log('error saving to db');
					console.log(response.data);
					_this.$toasted.global.error();
				})
				.catch(function(error) {
					//TODO handle error
					console.log('catch error');
					console.log(error);
					console.log(error.response);
					console.log(error.response.data);
					_this.$toasted.global.error();
				});
		},

		saveChanges: function(new_npc) {
			this.curr_npc = new_npc;
			this.my_npcs[i] = this.curr_npc;
			this.editing=false;

			this.checkNPCCustomInputs(this.npc);

			const _this = this;
			axios.post(UPDATE_NPC_URL, {
				npc: this.npc,
			}, config)
				.then(function(response) {
					if (response.data && response.data.success) {
						_this.$toasted.global.success({message: 'NPC Updated'});
						return;
					}
					_this.$toasted.global.error();
				})
				.catch(function(error) {
					//TODO handle error
					console.log('catch error');
					console.log(error.response);
					console.log(error.response.data);
					_this.$toasted.global.error();
				});
		},

		checkNPCCustomInputs: function(npc) {
			// Check if they have a custom class and/or race, if so set the int id to null and set *_other to the custom input
			if (this.CLASSES.indexOf(npc.class) === -1) {
				npc.class_id=null;
				npc.class_other = npc.class;
			}
			let found=false;
			for (let i=0; i<this.RACES.length; i++) {
				if (this.RACES[i].name.toLowerCase() === npc.race.toLowerCase()) {
					found=true;
					break
				}
			}
			if (!found) {
				npc.race_id=null;
				npc.race_other = npc.race;
			}
		}


	},
}
</script>




<style>
    
</style>
