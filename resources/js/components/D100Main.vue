<template>
	<div>
		<div class="page-transition top" />
		<div class="page-transition bottom" />

		<div id="global-loader">
			<img src="/img/global-loader.svg" alt="Global Loader Icon">
		</div>

		<div class="vue-loader" style="display: none">
			<svg id="d20_anim_icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="720px" height="720px" viewBox="0 0 720 720" enable-background="new 0 0 720 720" xml:space="preserve">
				<polygon id="d20_outside" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" points="355.933,124.834 153.167,241.167 153.167,481.834 360,598.5 569.833,481.834 569.833,241.167 360,122.5" style="stroke-dasharray: 1438.407470703125; stroke-dashoffset: 1438.407470703125;" />
				<polygon id="d20_inside" fill="none" stroke="#000000" stroke-width="20" stroke-linejoin="round" stroke-miterlimit="10" points="360,122.5 245.167,293.5 153.167,481.834 361.873,494.5 569.833,481.834 475.833,293.5" style="stroke-dasharray: 1250.046630859375; stroke-dashoffset: 1250.046630859375;" />
				<polyline id="d20_line1" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" points="153.167,241.167 245.167,293.5 475.833,293.5" style="stroke-dasharray: 336.5090026855469; stroke-dashoffset: 336.5090026855469;" />
				<polyline id="d20_line2" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" points="245.167,293.5 360,494.5 360,598.5" style="stroke-dasharray: 335.489990234375; stroke-dashoffset: 335.489990234375;" />
				<polyline id="d20_line3" fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" points="361.873,494.5 475.833,293.5 569.833,241.167" style="stroke-dasharray: 338.6441650390625; stroke-dashoffset: 338.6441650390625;" />
			</svg>
		</div>
		<div class="section-content">
			
		</div>

		<div v-if="sharePost" id="share-modal" class="modal" :class="{'is-active': sharePost}">
			<div class="modal-background" @click="hideShare()" />
			<div class="modal-content">
				<div class="has-text-centered">
					<div class="box">
						<div class="modal__title">
							Share this {{ postType }}
						</div>
						<div class="share-title">
							{{ sharePost.title }}
						</div>
						<div>Direct Link: <a :href="base_url+'/'+sharePost.id">{{ base_url+'/'+sharePost.id }}</a></div>
						<div class="socials-large">
							<a :href="'https://twitter.com/home?status='+encodeURIComponent(base_url+'/'+sharePost.id)" target="_blank"><i class="fab fa-twitter-square" /></a>
							<a :href="'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(base_url+'/'+sharePost.id)" target="_blank"><i class="fab fa-facebook-square" /></a>
							<a :href="'https://plus.google.com/share?url='+encodeURIComponent(base_url+'/'+sharePost.id)" target="_blank"><i class="fab fa-google-plus-square" /></a>
						</div>
					</div>
				</div>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="hideShare()" />
		</div>

		<div v-if="reportPost" id="report-modal" class="modal" :class="{'is-active': reportPost}">
			<div class="modal-background" @click="hideReport()" />
			<div class="modal-content">
				<div class="has-text-centered">
					<div class="box">
						<div class="modal__title">
							Report this {{ postType }}
						</div>
						<div class="share-title">
							{{ reportPost.title }}
						</div>
						<p>
							Only report content if it is offensive, off-topic, spam, or malicious.
						</p>
						<div class="modal-footer-btns">
							<div v-if="reportResult" class="modal-result">
								<div>{{ reportResult }}</div>
								<div class="button is-large is-light is-fullwidth" aria-label="cancel" @click="hideReport()">
									Close
								</div>
							</div>
							<div v-else>
								<div class="button is-large is-danger" aria-label="report" @click="reportThisPost(reportPost)">
									Report
								</div>
								<div class="button is-large is-light" aria-label="cancel" @click="hideReport()">
									Cancel
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="hideReport()" />
		</div>
	</div>
</template>

<script>
export default {
	filters: {
		fromNow: function(v) {
			if (moment(v).isValid()) {
				return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
			}
			console.log(v);
			return v;
		},
	},
	props: {
		data: Object
	},
	data() {
		return {
			
		}
	},
	mounted: function() {
		//Event Listeners
		this.$root.$on('upvote', (p) => { this.upvote(p); });
		this.$root.$on('downvote', (p) => { this.downvote(p); });
		this.$root.$on('expandPost', (p) => { this.expandPost(p); });
		this.$root.$on('viewPost', (p, b) => { this.viewPost(p, b); });
		this.$root.$on('unsavePost', (p) => { this.unsavePost(p); });
		this.$root.$on('savePost', (p) => { this.savePost(p); });
		this.$root.$on('sharePost', (p) => { this.sharePost = p; });
		this.$root.$on('reportPost', (p) => { this.reportPost = p; });
		this.$root.$on('toggleMinimized', (p) => { this.toggleMinimized(p); });
		this.$root.$on('closePost', () => { this.closePost(); });
		this.$root.$on('newPostCreated', (p) => { this.newPostCreated(p); });
		this.$root.$on('showLogin', (t) => { this.showLogin(t); });
		//this.$on('hideNewPost', () => { this.hideNewPost(); });

		//Init New post
		this.clearNewPost();

		//Listen for the back and forward buttons of the browser
		let _this = this;
		window.addEventListener('popstate', function(event) {
			_this.onNavigate();
		}, false);


		//Check if we get a post's data from the server from the url
		if (URL_POST && URL_COMMENTS) {
			//We got a post so make it the current post and show it

			this.currPost = this.preFormatPost(URL_POST);
			this.showingPost=true;

			//Push new url to history, so the user can click back from here and get to a list of other posts
			history.replaceState({id: this.base_url}, null, this.base_url);
			//history.pushState({id: this.base_url}, null, this.base_url);
			history.pushState({id: this.base_url+'/'+this.currPost.id}, null, this.base_url+'/'+this.currPost.id);

			//Sort the comments given to us by the server
			this.processComments(URL_COMMENTS);

		}

		//Get some posts to show to the user
		this.getPosts();

		if (window.location.hash === '#new') {
			history.replaceState({id: '/'}, null, this.base_url);
			history.pushState({id: 'new_post'}, null, this.base_url+'#new');
			this.showingNewPost=true;
		}
	},
	methods: {
		/*
			hover: () => {
				this.timer = setTimeout(() => this.showPopover(), 600)
			},
			hoverOut: () => {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					if ( ! this.isInInfo) {
						this.closePopover();
					}
				}, 200);
			},
			hoverInfo: () => this.isInInfo = true,
			hoverOutInfo: () => {
				this.isInInfo = false;
				this.hoverOut()
			},
			showPopover: () => this.showPopup = true,
			closePopover: () => this.showPopup = false,
			*/


		clearNewPost: function() {

		},
		getPosts: function() {

		},
		fetchD100Posts: function() {
			//immediate: true = immediately add new posts to our current posts, false = add to our prefetchedPosts array
			const _this = this;
			axios.post(window.GET_URL, {
				page: this.pageNum,
				filter: this.filterByMethod,
				method: SORT_BY_METHODS[this.sortByMethod],
				seed: this.sortByRandomSeed
			}, config)
				.then(function(response) {
					if (response.data && response.data.success) {
						if (response.data.posts && response.data.posts.length===0) {
							//No new posts
							//_this.noMorePosts=true;
							//TODO alert user somehow (other than hiding the "Load More" button)?
							return;
						}

						//Increment page num to keep track of sql pagination
						_this.pageNum+=1;

						//If this is the first time we're getting posts, then do some initializing
						if (_this.posts == null) {
							_this.posts = [];
							if (URL_POST) {
								//Do we have a post's data provided by the server? If so, add it as the first post before adding newly fetched posts

								_this.posts.push(_this.preFormatPost(URL_POST));
							}
						}
						//Loop through posts retrieved from the server, append some client side vars then add to our current posts array
						while(response.data.posts.length) {
							//If we happen to come across our url provided post then don't add it to the list, because we already have it
							response.data.posts[0] = _this.preFormatPost(response.data.posts[0]);
							_this.posts.push(response.data.posts.shift());
						}
					}
					else {
						//TODO handle this error
						console.log('Error');
						console.log(response);
						console.log(response.data);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		unsavePost: function(p) {
			this.savePost(p, true);
		},
		savePost: function(p, unsave) {
			//p = Post object
			//unsave = flag of whether or not to remove or add the bookmark

			//Make sure the user is logged in
			if (!this.checkLoggedIn("You must be logged in to save")) { return; }

			axios.post(BOOKMARK_URL, {
				type: POST_TYPE,
				bookmark: unsave ? 0 : 1,
				id: p.id
			}, config)
				.then(function(response) {
					if (response.data && response.data.success) {
						//Set the post object's saved attribute depending on the value of 'unsave'
						p.saved=!unsave;
						return;
					}
					//TODO handle error
					console.log('error');
					console.log(response.data);
				})
				.catch(function(error) {
					//TODO handle error
					console.log('catch error');
					console.log(error.response);
					console.log(error.response.data);
				});
		},
		toggleMinimized: function(p) {
			p.minimized = !p.minimized;
		},
		expandPost: function(p) {
			if (p.minimized) p.minimized=false;
		},
		upvote: function(p) {
			this.vote(p, 1);
		},
		downvote: function(p) {
			this.vote(p, 0);
		},
		vote: function(p, v) {
			//Make sure the user is logged in
			if (!this.checkLoggedIn("You must be logged in to vote")) { return; }

			axios.post(VOTE_URL, {
				type: POST_TYPE,
				vote: v,
				id: p.id
			}, config)
				.then(function(response) {
					if (response.data.success) {
						//update the post's upvotes and donwvotes values depending on whether the vote is new, unchanged, or updated
						if (response.data.success === "vote_saved") {
							if (v===1) { p.upvotes+=1; }
							else if (v===0) { p.downvotes+=1; }
							p.voted=v;
						}
						else if (response.data.success === "vote_unchanged") {

						}
						else if (response.data.success === "vote_updated") {
							if (v===1) {
								p.upvotes+=1;
								p.downvotes-=1;
							}
							else if (v===0) {
								p.downvotes+=1;
								p.upvotes-=1;
							}
							p.voted=v;
						}
					}
					else {
						//Error
					}
				})
				.catch(function(error) {
					console.log("ERROR");
					console.log(error);
					console.log(error.response.headers);
					console.log(error.response.data);
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

			//Clear out our prefetched posts
			this.prefetchedPosts=[];

			//Reset this flag so it shows the "Load More" button in case it was hidden
			this.noMorePosts=false;

			//Check if a cache of posts already exists for this new sort method, but not if they're looking up "saved" posts
			if (this.cachedPosts[sbm][this.filterByMethod].length>0 && this.filterByMethod!==3) {
				this.pageNum = this.cachedPageNums[sbm][this.filterByMethod];
				this.posts=this.cachedPosts[sbm][this.filterByMethod];
				this.$set(this.posts, 0, this.cachedPosts[sbm][this.filterByMethod][0]);
			}
			else {
				this.posts = [];
				this.pageNum=0;
				this.getPosts();
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

			//Clear out our prefetched posts
			this.prefetchedPosts=[];

			//Reset this flag so it shows the "Load More" button in case it was hidden
			this.noMorePosts=false;

			//Check if a cache of posts already exists for this new filter method
			if (this.cachedPosts[this.sortByMethod][fbm].length>0) {
				this.pageNum = this.cachedPageNums[this.sortByMethod][fbm];
				this.posts=this.cachedPosts[this.sortByMethod][fbm];
				this.$set(this.posts, 0, this.cachedPosts[this.sortByMethod][fbm][0]);
			}
			else {
				this.posts = [];
				this.pageNum=0;
				this.getPosts();
			}

		},
		showNewPost: function() {
			if (!this.checkLoggedIn("Please login to submit a post")) { return; }

			history.pushState({id: 'new_post'}, null, this.base_url+'#new');

			this.showingNewPost=true;
		},
		newPostCreated: function(p) {
			this.hideNewPost();

			//TODO Optimize
			//For some reason if there isn't a delay before calling viewPost() then the post isn't shown
			//Probably has to do with the window.history.back() listener;
			let _this=this;
			setTimeout(function() {
				_this.viewPost(p, true);
			}, 300);
		},
		hideNewPost: function() {
			window.history.back();
			this.showingNewPost=false;
		},
		checkLoggedIn: function(t) {
			//If the user is NOT logged in then we show a modal and set the title as t
			if (!LOGGED_IN) {
				this.showLogin(t);
				return false;
			}
			//Otherwise the user is logged in and good to go
			return true;
		},
		showLogin: function(t) {
			this.showingNewPost=false;
			showLoginModal(t);
		},
		onNavigate: function() {
			//Look at the url to determine what to show/hide

			if (window.location.hash === '#new') {
				//Show the new post modal if #new is in the url
				this.clearNewPost();
				this.showingNewPost=true;
			}
			else if (window.location.href === this.base_url) {
				//if we are at the base url then hide any posts or new post modals
				this.currPost=null;
				this.showingNewPost=false;
				this.clearNewPost();
			}
			else {
				//get the id of the post to show by stripping the last entry from the end of the url, that is the id
				const path = window.location.pathname;
				const ar = path.split('/');
				const id = parseInt(ar[ar.length - 1]);
				this.viewPostById(id);
			}
		},
		viewPostById: function(id) {
			for (let i=0; i<this.posts.length; i++) {
				if (this.posts[i].id===id) {
					this.viewPost(this.posts[i], false);
					return;
				}
			}

			//Post isn't found in the array, this is due to leaving the page,
			//then coming back but no longer having the post loaded
			this.fetchSinglePostByIdAndView(id);
		},
		fetchSinglePostByIdAndView: function(id) {
			const _this = this;
			axios.post(window.GET_URL, {
				id: id
			}, config)
				.then(function(response) {
					if (response.data && response.data.success) {
						if (response.data.post) {
							_this.posts.unshift(_this.preFormatPost(response.data.post));
							_this.viewPost(_this.posts[0], false);
						}
					}
					else {
						//TODO handle this error
						console.log('Error');
						console.log(response);
						console.log(response.data);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		viewPost: function(p, pushState) {
			//Set our current post
			this.currPost = p;
			//TODO is this needed for browsers other than Chrome?
			//var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
			//this.bodyScrollPosition=scrollTop;

			//Push new url to history if needed. We only have to push to history if the user is clicking a post, not if they use browser navigation buttons
			if (pushState) {
				history.pushState({id: p.id}, null, this.base_url+'/'+p.id);
			}
			//Begin loading the comments for the current post
			this.loadComments();
		},
		closePost: function() {
			//Hide the post
			this.currPost=null;
			//move back in history to update the url
			window.history.back();
		},
		loadComments: function() {
			//Show the loader icon while loading the comments
			this.commentsLoading=true;
			showGlobalLoader();

			const _this = this;
			axios.post(GET_COMMENTS_URL, {
				post_type: POST_TYPE,
				post_id: this.currPost.id
			}, config)
				.then(function(response) {
					if (response.data.success) {
						_this.processComments(response.data.comments);
						//_this.commentsLoading=false; is called at the end of processComments()
					}
					else {
						//Unknown Error
						//TODO handle ajax errors
						//_this.newComment.ajaxError = "An error has occurred. Please try again.";
						_this.commentsLoading=false;
						hideGlobalLoader();
					}
				})
				.catch(function(error) {
					console.log("ERROR");
					console.log(error);
					_this.commentsLoading=false;
					hideGlobalLoader();
					//TODO handle ajax errors
					//invalid_parameters
					//db_error
					//_this.newComment.ajaxError = "An error has occurred. Please try again.";
				}).then(function() {
					//endPageTransition();
				});
		},
		processComments: function(c) {
			//loop through all the comments and organize them in a parent->child format
			//Start with a blank array
			this.currPostComments = [];

			const commentIdMap = {}; //Keeps track of nodes using id as key, for fast lookup
			const roots = []; //Initially set our root node to an array

			//loop over data
			c.forEach(function(comment) {
				//each node will have children, so let's give it a "children" poperty
				comment.children = [];
				//add an entry for this node to the map so that any future children can lookup the parent
				commentIdMap[comment.id] = comment;
				//Does this node have a parent?
				if (comment.parent_id == null) {
					//No, so add it to the array of root nodes
					roots.push(comment);
				}
				else {
					//This node has a parent, so let's look it up using the id
					let parentNode = commentIdMap[comment.parent_id];

					//Let's add the current node as a child of the parent node.
					parentNode.children.push(comment);
				}
			});


			//Add each root (comment without a parent) to the currPostComments array, all of the children will be brought via their parents
			for (let i=0; i<roots.length; i++) {
				this.currPostComments.push(roots[i]);
			}


			//Assign a "depth" value to each comment using recursion
			for (let i=0; i<roots.length; i++) {
				roots[i].depth=0;
				this.loop(roots[i]);
			}

			//Hide the loading icon
			this.commentsLoading=false;

			//TODO do we need this try catch?
			try { hideGlobalLoader(); }
			catch(e) {}
		},
		loop: function(parent) {
			//Recursively loop through each comment and assign a "depth" property
			let _this = this;
			parent.children.forEach(function(c) {
				c.depth=parent.depth+1;
				if (c.children.length) {
					_this.loop(c);
				}
			});
		},
		hideShare: function() {
			this.sharePost=null;
		},
		hideReport: function() {
			this.reportPost=null;
			this.reportComment=null;
			this.reportResult=null;
		},
		reportThisPost: function(p) {
			this.reportThis('p', p);
		},
		reportThisComment: function(c) {
			this.reportThis('c', c);
		},
		reportThis: function(type, obj) {
			const _this = this;
			axios.post(REPORT_URL, {
				type: type==='c' ? POST_TYPE + '_comment' : POST_TYPE,
				id: obj.id
			}, config)
				.then(function(response) {
					//we're just going to close this window whether we succeed or not
				})
				.catch(function(error) {
					//we're just going to close this window whether we succeed or not
				}).then(function() {
					_this.reportResult = "Report submitted successfully and will be reviewed soon";
					//_this.reportPost=null;
					//_this.reportComment=null;
				});
		},

		toggleShowExternalImages: function() {
			//Don't let the user spam this back and forth
			if (this.ajaxingShowExternalImages) {
				return;
			}

			this.showExternalImages=!this.showExternalImages;
			this.ajaxingShowExternalImages=true;

			const _this = this;
			axios.post(SAVE_OPTIONS_URL, {
				option: 'showExternalImages',
				value: _this.showExternalImages,
			}, config)
				.then(function(response) {

				})
				.catch(function(error) {
					//
					//_this.showExternalImages=!_this.showExternalImages;
				}).then(function() {
					console.log('done');
					_this.ajaxingShowExternalImages=false;
				});
		},
		preFormatPost: function(p) {
			//add any members you want reactive in Vue BEFORE you add them to our Vue array
			p.minimized=false;

			if (this.postType === "Riddle") {
				p.revealed=false;
			}

			//New line to <br> - nl2br()
			if (p.description) {
				// p.description = this.nl2br(p.description);
			}
			if (p.riddle) {
				//p.riddle = this.nl2br(p.riddle);
			}

			return p;
		},
		nl2br: function(t) {
			return t.replace(/(?:\r\n|\r|\n)/g, "<br />")
		},
	},
}
</script>




<style>

</style>
