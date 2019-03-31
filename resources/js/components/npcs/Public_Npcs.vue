<template>
	<div class="npcs-public">
		<div>
			COMING SOON
		</div>
		<!--
			<div v-if="!curr_npc" class="listview">
				<div class="section-header">
					<div class="field is-horizontal">
						<div class="lbl is-normal">
							Sort By:
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control is-expanded">
									<div class="select is-fullwidth">
										<select id="sortby" :value="sortByMethod" @change="changeSortMethod(sortByMethod, $event)">
											<option value="0">
												Random
											</option>
											<option value="1">
												Upvotes
											</option>
											<option value="2">
												Downvotes
											</option>
											<option value="3">
												Newest
											</option>
											<option value="4">
												Oldest
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="lbl is-normal">
							Filter By:
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control is-expanded">
									<div class="select is-fullwidth">
										<select id="filterby" :value="filterByMethod" @change="changeFilterMethod(filterByMethod, $event)">
											<option value="0">
												Show All
											</option>
											<option value="1">
												Just Mine
											</option>
											<option value="2">
												Not Mine
											</option>
											<option value="3">
												Saved
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="npc-list">
					<div v-for="npc in public_npcs" :key="npc.id">
						<div v-if="npc" class="npc-list-item post">
							<div class="vote-btns">
								<div class="vote-arrow up" :class="{'voted': npc.voted==1}" @click="upvote(npc)">
									<i class="fas fa-arrow-alt-circle-up" />
								</div>
								<div class="score" :title="'+'+npc.upvotes+' -'+npc.downvotes">
									{{ npc.upvotes-npc.downvotes }}
								</div>
								<div class="vote-arrow down" :class="{'voted': npc.voted==0}" @click="downvote(npc)">
									<i class="fas fa-arrow-alt-circle-down" />
								</div>
							</div>
							<div class="post-content">
								<div class="">
									<div>
										<span>{{ npc.summary }}</span>
									</div>
									<div v-show="!npc.minimized" class="post-date">
										Submitted
										<time :title="npc.created_at" class="">{{ npc.created_at | fromNow }}</time>
										by <span>{{ npc.username }}</span>
									</div>
									<ul v-show="!npc.minimized" class="post-buttons">
										<li>
											<span class="link post-num-comments" @click="viewPost(p, true)"><i v-if="npc.commentcount>0" class="fas fa-comments" /><i v-else class="far fa-comments" /> {{ npc.commentcount }} comment<span v-if="npc.commentcount!=1">s</span></span>
										</li>
										<li class="post-save">
											<span v-if="npc.saved" class="post-save link" @click="unsavePost(npc)"><i class="fas fa-bookmark" /> unsave</span>
											<span v-else class="post-save link" @click="savePost(p)"><i class="far fa-bookmark" /> save</span>
										</li>
										<li class="post-share">
											<span class="post-share link" @click="sharePost(npc)"><i class="fas fa-share-alt" /> share</span>
										</li>
										<li class="post-report-button">
											<span class="post-report link" @click="reportPost(npc)"><i class="fas fa-exclamation-triangle" /> report</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<npc-public-fullview v-if="curr_npc" :npc="curr_npc" />
		-->
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

	props: [],

	data() {
		return {
			public_npcs: [],
			curr_npc: false,
			pageNum: 0,
			filterByMethod: 0,
			sortByMethod: 0,
			sortByRandomSeed: Math.floor(Math.random() * 1000000),
			SORT_BY_METHODS: ["r", "uv", "dv", "dd", "da"],
			cachedPosts: [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]],
			cachedPageNums: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
			noMoreNPCs: false,
			prefetchedNPCs: [],
		}
	},
	mounted: function() {
		//this.getNPCs();
	},
	methods: {
		getNPCs: function() {
			//If there aren't any prefetched NPCs then get some posts
			if (this.prefetchedNPCs.length===0) {
				this.fetchPublicNPCs(true)
			}
			else {
				//We've already prefetched some NPCs, so add those to our NPCs array, then prefetch more
				while(this.prefetchedNPCs.length) {
					this.posts.push(this.prefetchedNPCs.shift());
				}
				this.fetchPublicNPCs(false);
			}
		},
		fetchPublicNPCs: function(alsoPrefetch) {
			const _this=this;
			axios.post(GET_PUBLIC_NPCS_URL, {
				page: this.pageNum,
				filter: this.filterByMethod,
				method: this.SORT_BY_METHODS[this.sortByMethod],
				seed: this.sortByRandomSeed
			}, config)
				.then(function(response) {
					if (response.data.npcs && response.data.npcs.length===0 && alsoPrefetch===false) {
						//No new npcs
						_this.noMoreNPCs=true;
						//TODO alert user somehow (other than hiding the "Load More" button)?
						return;
					}

					//Increment page num to keep track of sql pagination
					_this.pageNum+=1;

					//If this is the first time we're getting NPCs, then do some initializing
					if (_this.public_npcs == null) {
						_this.public_npcs = [];
						if (URL_POST) {
							//Do we have a post's data provided by the server? If so, add it as the first post before adding newly fetched NPCs

							_this.public_npcs.push(_this.preFormatPost(URL_POST));
						}
					}
					//Loop through NPCs retrieved from the server, append some client side vars then add to our current NPCs array
					while(response.data.npcs.length) {
						//If we happen to come across our url provided post then don't add it to the list, because we already have it
						/*
                        if (URL_NPC && response.data.npcs[0].id === URL_POST.id) {
                            let found=false;
                            for (let i=0; i<_this.public_npcs.length; i++) {
                                if (_this.public_npcs[i].id === response.data.npcs[0].id) {
                                    found=true;
                                    break;
                                }
                            }
                            if (found) {
                                continue;
                            }
                        }
                        */

						if (alsoPrefetch) {
							//transfer it to our current array of npcs
							_this.public_npcs.push(response.data.npcs.shift());
						}
						else {
							//transfer it to our prefetched array
							_this.prefetchedNPCs.push(response.data.npcs.shift());
						}
					}
					//If we're immediately showing these npcs, then prefetch more npcs for next time
					if (alsoPrefetch) {
						_this.fetchPublicNPCs(false);
					}
				})
				.catch(function(error) {
					//TODO handle error
					console.log('catch error');
					console.log(error.response);
				});
		},
		changeSortMethod: function(sbm, event) {
			sbm = event.target.value;
			if (this.sortByMethod === sbm) {
				//No Change in sort method
				return;
			}

			//Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination
			//But make sure we don't cache "saved" posts as they might save/unsave
			if (this.filterByMethod!==3) {
				this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
				this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum;
			}

			//Update our sort by method
			this.sortByMethod = sbm;

			//Clear out our prefetched NPCs
			this.prefetchedNPCs=[];

			//Reset this flag so it shows the "Load More" button in case it was hidden
			this.noMoreNPCs=false;

			//Check if a cache of posts already exists for this new sort method, but not if they're looking up "saved" posts
			if (this.cachedPosts[sbm][this.filterByMethod].length>0 && this.filterByMethod!==3) {
				this.pageNum = this.cachedPageNums[sbm][this.filterByMethod];
				this.posts=this.cachedPosts[sbm][this.filterByMethod];
				this.$set(this.posts, 0, this.cachedPosts[sbm][this.filterByMethod][0]);
			}
			else {
				this.posts = [];
				this.pageNum=0;
				this.loadMore();
			}
		},
		changeFilterMethod: function(fbm, event) {
			fbm = event.target.value;
			if (this.filterByMethod === fbm) {
				//No Change in filter method
				return;
			}

			//Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination
			this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
			this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum;

			//Update our filter by method
			this.filterByMethod = fbm;

			//Clear out our prefetched NPCs
			this.prefetchedNPCs=[];

			//Reset this flag so it shows the "Load More" button in case it was hidden
			this.noMoreNPCs=false;

			//Check if a cache of posts already exists for this new filter method
			if (this.cachedPosts[this.sortByMethod][fbm].length>0) {
				this.pageNum = this.cachedPageNums[this.sortByMethod][fbm];
				this.public_npcs=this.cachedPosts[this.sortByMethod][fbm];
				this.$set(this.posts, 0, this.cachedPosts[this.sortByMethod][fbm][0]);
			}
			else {
				this.public_npcs = [];
				this.pageNum=0;
				this.loadMore();
			}

		},



	},
}
</script>




<style>
    
</style>
