<template>
	<div>
		<div id="npc-tabs" class="tabs is-boxed is-large">
			<ul>
				<li :class="{'is-active':activeTab==='gen'}">
					<a @click="changeTab('gen')">NPC Generator</a>
				</li>
				<li :class="{'is-active':activeTab==='mine'}">
					<a @click="changeTab('mine')">My NPCs</a>
				</li>
				<li :class="{'is-active':activeTab==='public'}">
					<a @click="changeTab('public')">Public NPCs</a>
				</li>
			</ul>
		</div>
		<div id="npc-tab-content">
			<div v-show="activeTab==='gen'">
				<npc-generator ref="tab_gen" :data="data" @onSaveNPCToMine="saveNPCToMine" />
			</div>
			<div v-show="activeTab==='mine'">
				<my-npcs v-if="LOGGED_IN" ref="tab_mine" :data="data" />
			</div>
			<div v-show="activeTab==='public'">
				<public-npcs />
			</div>
		</div>
	</div>
</template>

<script>

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
	},
	props: {
		data: Object
	},
	data() {
		return {
			activeTab: 'gen',
			base_url: BASE_URL,
			LOGGED_IN: LOGGED_IN,
		}
	},
	mounted: function() {
		//Listen for the back and forward buttons of the browser
		let _this = this;
		window.addEventListener('popstate', function(event) {
			if (history.state) {
				//If we've pushed to the history then act appropriately depending on the state's id
				_this.onNavigate(history.state.id);
			}
			else {
				//otherwise use the default function
				window.history.back();
			}
		}, false);


		//Check if we get an NPC's data from the server from the url
		if (URL_NPC) {
			//We got an NPC so show it
                
			//this.currNPC = this.preFormatNPC(URL_NPC);
			//this.showingNPC=true;

			//Push new url to history, so the user can click back from here and get to a list of other posts
			history.pushState({id: this.base_url}, null, this.base_url);
			history.pushState({id: this.base_url+'/'+URL_NPC.id}, null, this.base_url+'/'+URL_NPC.id);


		}

		if (window.location.hash == '#new') {
			history.replaceState({id: '/'}, null, this.base_url);
			history.pushState({id: 'new_npc'}, null, this.base_url+'#new');
			this.showingNewNPC=true;
		}
	},
	methods: {
		changeTab: function(t) {
			if (t==='mine' && !LOGGED_IN) {
				EventBus.$emit('showLogin', 'Log in to view saved NPCs');
				return;
			}

			this.activeTab=t;
		},
		saveNPCToMine: function(npc) {
			if (!LOGGED_IN) {
				EventBus.$emit('showLogin', 'Log in to save NPCs');
				return;
			}
			this.$refs.tab_mine.saveNewNPC(npc);
			this.changeTab('mine');
		},
		onNavigate: function(deprecated_id) {
			//Look at the url to determine what to show/hide
			/*
                if (window.location.hash == '#new') {
                    //Show the new post modal if #new is in the url
                    this.clearNewPost();
                    this.showingNewPost=true;
                }
                else if (window.location.href == this.base_url) {
                    //if we are at the base url then hide any posts or new post modals
                    this.currPost=null;
                    this.showingNewPost=false;
                    this.clearNewPost();
                }
                else {
                    //get the id of the post to show by stripping the last entry from the end of the url, that is the id
                    var path = window.location.pathname;
                    var ar = path.split('/');
                    var id = parseInt(ar[ar.length-1]);
                    this.viewPostById(id);
                }
                */
		},

	},
}

</script>




<style>
    
</style>
