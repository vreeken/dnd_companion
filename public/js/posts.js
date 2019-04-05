(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/posts"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Main.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Main.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  props: {
    data: Object
  },
  data: function data() {
    return {
      //registerTitle: REGISTER_TITLE,
      postType: POST_TYPE_PRETTY,
      componentPostType: COMPONENT_POST_TYPE,
      postTypeNewPost: COMPONENT_POST_TYPE + '-newpost',
      sortByMethod: 0,
      filterByMethod: 0,
      sortByRandomSeed: Math.floor(Math.random() * 1000000),
      pageNum: 0,
      posts: null,
      prefetchedPosts: [],
      //Array of sortByMethods, with filterByMethod 0-3 within each sortByMethod
      cachedPosts: [[[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []]],
      cachedPageNums: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      showingNewPost: false,
      //newPostAjaxError: null,
      //newPost: null,
      currPost: null,
      currPostComments: [],
      //bodyScrollPosition: 0,
      commentsLoading: false,
      sharePost: null,
      reportPost: null,
      reportComment: null,
      reportResult: null,
      base_url: BASE_URL,
      showExternalImages: this.data.show_external_images == 'true',
      ajaxingShowExternalImages: false,
      noMorePosts: false
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    //Event Listeners
    this.$root.$on('upvote', function (p) {
      _this2.upvote(p);
    });
    this.$root.$on('downvote', function (p) {
      _this2.downvote(p);
    });
    this.$root.$on('expandPost', function (p) {
      _this2.expandPost(p);
    });
    this.$root.$on('viewPost', function (p, b) {
      _this2.viewPost(p, b);
    });
    this.$root.$on('unsavePost', function (p) {
      _this2.unsavePost(p);
    });
    this.$root.$on('savePost', function (p) {
      _this2.savePost(p);
    });
    this.$root.$on('sharePost', function (p) {
      _this2.sharePost = p;
    });
    this.$root.$on('reportPost', function (p) {
      _this2.reportPost = p;
    });
    this.$root.$on('toggleMinimized', function (p) {
      _this2.toggleMinimized(p);
    });
    this.$root.$on('closePost', function () {
      _this2.closePost();
    });
    this.$root.$on('newPostCreated', function (p) {
      _this2.newPostCreated(p);
    });
    this.$root.$on('showLogin', function (t) {
      _this2.showLogin(t);
    }); //this.$on('hideNewPost', () => { this.hideNewPost(); });
    //Init New post

    this.clearNewPost(); //Listen for the back and forward buttons of the browser

    var _this = this;

    window.addEventListener('popstate', function (event) {
      _this.onNavigate();
    }, false); //Check if we get a post's data from the server from the url

    if (URL_POST && URL_COMMENTS) {
      //We got a post so make it the current post and show it
      this.currPost = this.preFormatPost(URL_POST);
      this.showingPost = true; //Push new url to history, so the user can click back from here and get to a list of other posts

      history.replaceState({
        id: this.base_url
      }, null, this.base_url); //history.pushState({id: this.base_url}, null, this.base_url);

      history.pushState({
        id: this.base_url + '/' + this.currPost.id
      }, null, this.base_url + '/' + this.currPost.id); //Sort the comments given to us by the server

      this.processComments(URL_COMMENTS);
    } //Get some posts to show to the user


    this.getPosts();

    if (window.location.hash === '#new') {
      history.replaceState({
        id: '/'
      }, null, this.base_url);
      history.pushState({
        id: 'new_post'
      }, null, this.base_url + '#new');
      this.showingNewPost = true;
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
    clearNewPost: function clearNewPost() {
      //TODO Migrate
      this.newPost = {};
    },
    getPosts: function getPosts() {
      //If there aren't any prefetched posts then get some posts
      if (this.prefetchedPosts.length === 0) {
        this.fetchPosts(true);
      } else {
        //We've already prefetched some posts, so add those to our posts array, then prefetch more
        while (this.prefetchedPosts.length) {
          this.posts.push(this.prefetchedPosts.shift());
        }

        this.fetchPosts(false);
      }
    },
    fetchPosts: function fetchPosts(immediate) {
      //immediate: true = immediately add new posts to our current posts, false = add to our prefetchedPosts array
      var _this = this;

      axios.post(window.GET_URL, {
        page: this.pageNum,
        filter: this.filterByMethod,
        method: SORT_BY_METHODS[this.sortByMethod],
        seed: this.sortByRandomSeed
      }, config).then(function (response) {
        if (response.data && response.data.success) {
          //Check if we got no posts from the server
          //if nonoe were received, and if we are just prefetching (not showing we we already have prefetched)
          //then set noMorePosts flag
          if (response.data.posts && response.data.posts.length === 0 && immediate === false) {
            //No new posts
            _this.noMorePosts = true; //TODO alert user somehow (other than hiding the "Load More" button)?

            return;
          } //Increment page num to keep track of sql pagination


          _this.pageNum += 1; //If this is the first time we're getting posts, then do some initializing

          if (_this.posts == null) {
            _this.posts = [];

            if (URL_POST) {
              //Do we have a post's data provided by the server? If so, add it as the first post before adding newly fetched posts
              _this.posts.push(_this.preFormatPost(URL_POST));
            }
          } //Loop through posts retrieved from the server, append some client side vars then add to our current posts array


          while (response.data.posts.length) {
            //If we happen to come across our url provided post then don't add it to the list, because we already have it
            if (URL_POST && response.data.posts[0].id === URL_POST.id) {
              var found = false;

              for (var i = 0; i < _this.posts.length; i++) {
                if (_this.posts[i].id === response.data.posts[0].id) {
                  found = true;
                  break;
                }
              }

              if (found) {
                continue;
              }
            } //preFormatPost() adds any client-side only necessary properties, like minimized, or revealed


            response.data.posts[0] = _this.preFormatPost(response.data.posts[0]);

            if (immediate) {
              //transfer it to our current array of posts
              _this.posts.push(response.data.posts.shift());
            } else {
              //transfer it to our prefetched array
              _this.prefetchedPosts.push(response.data.posts.shift());
            }
          } //If we're immediately showing these posts, then prefetch more posts for next time


          if (immediate) {
            _this.fetchPosts(false);
          }
        } else {
          //TODO handle this error
          console.log('Error');
          console.log(response);
          console.log(response.data);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    unsavePost: function unsavePost(p) {
      this.savePost(p, true);
    },
    savePost: function savePost(p, unsave) {
      //p = Post object
      //unsave = flag of whether or not to remove or add the bookmark
      //Make sure the user is logged in
      if (!this.checkLoggedIn("You must be logged in to save")) {
        return;
      }

      axios.post(BOOKMARK_URL, {
        type: POST_TYPE,
        bookmark: unsave ? 0 : 1,
        id: p.id
      }, config).then(function (response) {
        if (response.data && response.data.success) {
          //Set the post object's saved attribute depending on the value of 'unsave'
          p.saved = !unsave;
          return;
        } //TODO handle error


        console.log('error');
        console.log(response.data);
      }).catch(function (error) {
        //TODO handle error
        console.log('catch error');
        console.log(error.response);
        console.log(error.response.data);
      });
    },
    toggleMinimized: function toggleMinimized(p) {
      p.minimized = !p.minimized;
    },
    expandPost: function expandPost(p) {
      if (p.minimized) p.minimized = false;
    },
    upvote: function upvote(p) {
      this.vote(p, 1);
    },
    downvote: function downvote(p) {
      this.vote(p, 0);
    },
    vote: function vote(p, v) {
      //Make sure the user is logged in
      if (!this.checkLoggedIn("You must be logged in to vote")) {
        return;
      }

      axios.post(VOTE_URL, {
        type: POST_TYPE,
        vote: v,
        id: p.id
      }, config).then(function (response) {
        if (response.data.success) {
          //update the post's upvotes and donwvotes values depending on whether the vote is new, unchanged, or updated
          if (response.data.success === "vote_saved") {
            if (v === 1) {
              p.upvotes += 1;
            } else if (v === 0) {
              p.downvotes += 1;
            }

            p.voted = v;
          } else if (response.data.success === "vote_unchanged") {} else if (response.data.success === "vote_updated") {
            if (v === 1) {
              p.upvotes += 1;
              p.downvotes -= 1;
            } else if (v === 0) {
              p.downvotes += 1;
              p.upvotes -= 1;
            }

            p.voted = v;
          }
        } else {//Error
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
    },
    changeSortMethod: function changeSortMethod(sbm, event) {
      sbm = event.target.value;

      if (this.sortByMethod === sbm) {
        //No Change in sort method
        return;
      } //Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination
      //But make sure we don't cache "saved" posts as they might save/unsave


      if (this.filterByMethod !== 3) {
        this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
        this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum;
      } //Update our sort by method


      this.sortByMethod = sbm; //Clear out our prefetched posts

      this.prefetchedPosts = []; //Reset this flag so it shows the "Load More" button in case it was hidden

      this.noMorePosts = false; //Check if a cache of posts already exists for this new sort method, but not if they're looking up "saved" posts

      if (this.cachedPosts[sbm][this.filterByMethod].length > 0 && this.filterByMethod !== 3) {
        this.pageNum = this.cachedPageNums[sbm][this.filterByMethod];
        this.posts = this.cachedPosts[sbm][this.filterByMethod];
        this.$set(this.posts, 0, this.cachedPosts[sbm][this.filterByMethod][0]);
      } else {
        this.posts = [];
        this.pageNum = 0;
        this.getPosts();
      }
    },
    changeFilterMethod: function changeFilterMethod(fbm, event) {
      fbm = event.target.value;

      if (this.filterByMethod === fbm) {
        //No Change in filter method
        return;
      } //Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination


      this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
      this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum; //Update our filter by method

      this.filterByMethod = fbm; //Clear out our prefetched posts

      this.prefetchedPosts = []; //Reset this flag so it shows the "Load More" button in case it was hidden

      this.noMorePosts = false; //Check if a cache of posts already exists for this new filter method

      if (this.cachedPosts[this.sortByMethod][fbm].length > 0) {
        this.pageNum = this.cachedPageNums[this.sortByMethod][fbm];
        this.posts = this.cachedPosts[this.sortByMethod][fbm];
        this.$set(this.posts, 0, this.cachedPosts[this.sortByMethod][fbm][0]);
      } else {
        this.posts = [];
        this.pageNum = 0;
        this.getPosts();
      }
    },
    showNewPost: function showNewPost() {
      if (!this.checkLoggedIn("Please login to submit a post")) {
        return;
      }

      history.pushState({
        id: 'new_post'
      }, null, this.base_url + '#new');
      this.showingNewPost = true;
    },
    newPostCreated: function newPostCreated(p) {
      this.hideNewPost(); //TODO Optimize
      //For some reason if there isn't a delay before calling viewPost() then the post isn't shown
      //Probably has to do with the window.history.back() listener;

      var _this = this;

      setTimeout(function () {
        _this.viewPost(p, true);
      }, 300);
    },
    hideNewPost: function hideNewPost() {
      window.history.back();
      this.showingNewPost = false;
    },
    checkLoggedIn: function checkLoggedIn(t) {
      //If the user is NOT logged in then we show a modal and set the title as t
      if (!LOGGED_IN) {
        this.showLogin(t);
        return false;
      } //Otherwise the user is logged in and good to go


      return true;
    },
    showLogin: function showLogin(t) {
      this.showingNewPost = false;
      showLoginModal(t);
    },
    onNavigate: function onNavigate() {
      //Look at the url to determine what to show/hide
      if (window.location.hash === '#new') {
        //Show the new post modal if #new is in the url
        this.clearNewPost();
        this.showingNewPost = true;
      } else if (window.location.href === this.base_url) {
        //if we are at the base url then hide any posts or new post modals
        this.currPost = null;
        this.showingNewPost = false;
        this.clearNewPost();
      } else {
        //get the id of the post to show by stripping the last entry from the end of the url, that is the id
        var path = window.location.pathname;
        var ar = path.split('/');
        var id = parseInt(ar[ar.length - 1]);
        this.viewPostById(id);
      }
    },
    viewPostById: function viewPostById(id) {
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id === id) {
          this.viewPost(this.posts[i], false);
          return;
        }
      } //Post isn't found in the array, this is due to leaving the page,
      //then coming back but no longer having the post loaded


      this.fetchSinglePostByIdAndView(id);
    },
    fetchSinglePostByIdAndView: function fetchSinglePostByIdAndView(id) {
      var _this = this;

      axios.post(window.GET_URL, {
        id: id
      }, config).then(function (response) {
        if (response.data && response.data.success) {
          if (response.data.post) {
            _this.posts.unshift(_this.preFormatPost(response.data.post));

            _this.viewPost(_this.posts[0], false);
          }
        } else {
          //TODO handle this error
          console.log('Error');
          console.log(response);
          console.log(response.data);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    viewPost: function viewPost(p, pushState) {
      //Set our current post
      this.currPost = p; //TODO is this needed for browsers other than Chrome?
      //var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      //this.bodyScrollPosition=scrollTop;
      //Push new url to history if needed. We only have to push to history if the user is clicking a post, not if they use browser navigation buttons

      if (pushState) {
        history.pushState({
          id: p.id
        }, null, this.base_url + '/' + p.id);
      } //Begin loading the comments for the current post


      this.loadComments();
    },
    closePost: function closePost() {
      //Hide the post
      this.currPost = null; //move back in history to update the url

      window.history.back();
    },
    loadComments: function loadComments() {
      //Show the loader icon while loading the comments
      this.commentsLoading = true;
      showGlobalLoader();

      var _this = this;

      axios.post(GET_COMMENTS_URL, {
        post_type: POST_TYPE,
        post_id: this.currPost.id
      }, config).then(function (response) {
        if (response.data.success) {
          _this.processComments(response.data.comments); //_this.commentsLoading=false; is called at the end of processComments()

        } else {
          //Unknown Error
          //TODO handle ajax errors
          //_this.newComment.ajaxError = "An error has occurred. Please try again.";
          _this.commentsLoading = false;
          hideGlobalLoader();
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        _this.commentsLoading = false;
        hideGlobalLoader(); //TODO handle ajax errors
        //invalid_parameters
        //db_error
        //_this.newComment.ajaxError = "An error has occurred. Please try again.";
      }).then(function () {//endPageTransition();
      });
    },
    processComments: function processComments(c) {
      //loop through all the comments and organize them in a parent->child format
      //Start with a blank array
      this.currPostComments = [];
      var commentIdMap = {}; //Keeps track of nodes using id as key, for fast lookup

      var roots = []; //Initially set our root node to an array
      //loop over data

      c.forEach(function (comment) {
        //each node will have children, so let's give it a "children" poperty
        comment.children = []; //add an entry for this node to the map so that any future children can lookup the parent

        commentIdMap[comment.id] = comment; //Does this node have a parent?

        if (comment.parent_id == null) {
          //No, so add it to the array of root nodes
          roots.push(comment);
        } else {
          //This node has a parent, so let's look it up using the id
          var parentNode = commentIdMap[comment.parent_id]; //Let's add the current node as a child of the parent node.

          parentNode.children.push(comment);
        }
      }); //Add each root (comment without a parent) to the currPostComments array, all of the children will be brought via their parents

      for (var i = 0; i < roots.length; i++) {
        this.currPostComments.push(roots[i]);
      } //Assign a "depth" value to each comment using recursion


      for (var _i = 0; _i < roots.length; _i++) {
        roots[_i].depth = 0;
        this.loop(roots[_i]);
      } //Hide the loading icon


      this.commentsLoading = false; //TODO do we need this try catch?

      try {
        hideGlobalLoader();
      } catch (e) {}
    },
    loop: function loop(parent) {
      //Recursively loop through each comment and assign a "depth" property
      var _this = this;

      parent.children.forEach(function (c) {
        c.depth = parent.depth + 1;

        if (c.children.length) {
          _this.loop(c);
        }
      });
    },
    hideShare: function hideShare() {
      this.sharePost = null;
    },
    hideReport: function hideReport() {
      this.reportPost = null;
      this.reportComment = null;
      this.reportResult = null;
    },
    reportThisPost: function reportThisPost(p) {
      this.reportThis('p', p);
    },
    reportThisComment: function reportThisComment(c) {
      this.reportThis('c', c);
    },
    reportThis: function reportThis(type, obj) {
      var _this = this;

      axios.post(REPORT_URL, {
        type: type === 'c' ? POST_TYPE + '_comment' : POST_TYPE,
        id: obj.id
      }, config).then(function (response) {//we're just going to close this window whether we succeed or not
      }).catch(function (error) {//we're just going to close this window whether we succeed or not
      }).then(function () {
        _this.reportResult = "Report submitted successfully and will be reviewed soon"; //_this.reportPost=null;
        //_this.reportComment=null;
      });
    },
    toggleShowExternalImages: function toggleShowExternalImages() {
      //Don't let the user spam this back and forth
      if (this.ajaxingShowExternalImages) {
        return;
      }

      this.showExternalImages = !this.showExternalImages;
      this.ajaxingShowExternalImages = true;

      var _this = this;

      axios.post(SAVE_OPTIONS_URL, {
        option: 'showExternalImages',
        value: _this.showExternalImages
      }, config).then(function (response) {}).catch(function (error) {//
        //_this.showExternalImages=!_this.showExternalImages;
      }).then(function () {
        console.log('done');
        _this.ajaxingShowExternalImages = false;
      });
    },
    preFormatPost: function preFormatPost(p) {
      //add any members you want reactive in Vue BEFORE you add them to our Vue array
      p.minimized = false;

      if (this.postType === "Riddle") {
        p.revealed = false;
      } //New line to <br> - nl2br()


      if (p.description) {// p.description = this.nl2br(p.description);
      }

      if (p.riddle) {//p.riddle = this.nl2br(p.riddle);
      }

      return p;
    },
    nl2br: function nl2br(t) {
      return t.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewPostBase.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/NewPostBase.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  props: [],
  data: function data() {
    return {
      postType: POST_TYPE_PRETTY,
      newPost: null
    };
  },
  computed: {},
  created: function created() {
    this.clearPost();
  },
  methods: {
    submit: function submit(data) {
      var _this = this;

      axios.post(SUBMIT_POST_URL, data, config).then(function (response) {
        if (response.data.success) {
          _this.showingNewPost = false;
          var p = {
            title: _this.newPost.title,
            body: _this.newPost.body,
            comments: [],
            id: response.data.id,
            upvotes: 1,
            downvotes: 0,
            created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
            username: USERNAME
          };

          _this.$root.$emit('newPostCreated', p);

          _this.clearPost();
        } else {
          //Unknown Error
          _this.newPost.ajaxError = "An error has occurred. Please try again.";
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error); //console.log(error.response.headers);
        //console.log(error.response.data);
        //invalid_parameters
        //db_error

        _this.newPost.ajaxError = "An error has occurred. Please try again.";
      });
    }
  },
  clearPost: function clearPost() {
    //Overridden in each child class
    this.newPost = {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Post.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Post.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    })
  },
  props: {
    post: Object,
    comments: Array,
    commentsLoading: Boolean,
    componentPostType: String
  },
  data: function data() {
    return {
      postTypePostview: this.componentPostType + '-postview',
      newComment: {
        body: "",
        bodyError: "",
        ajaxError: ""
      }
    };
  },
  computed: {},
  mounted: function mounted() {//this.$root.$on('submitComment', (b) => { this.submitComment(b); });
  },
  methods: {
    upvote: function upvote(p) {
      this.$root.$emit('upvote', p);
    },
    downvote: function downvote(p) {
      this.$root.$emit('downvote', p);
    },
    expandPost: function expandPost(p) {
      this.$root.$emit('expandPost', p);
    },
    viewPost: function viewPost(p, b) {
      this.$root.$emit('viewPost', p, b);
    },
    unsavePost: function unsavePost(p) {
      this.$root.$emit('unsavePost', p);
    },
    savePost: function savePost(p) {
      this.$root.$emit('savePost', p);
    },
    sharePost: function sharePost(p) {
      this.$root.$emit('sharePost', p);
    },
    reportPost: function reportPost(p) {
      this.$root.$emit('reportPost', p);
    },
    toggleMinimized: function toggleMinimized(p) {
      this.$root.$emit('toggleMinimized', p);
    },
    closePost: function closePost() {
      this.$root.$emit('closePost');
    },
    submitComment: function submitComment() {
      //Make sure user is logged in
      if (!LOGGED_IN) {
        this.$root.$emit('showLogin', 'You must be logged in to comment');
        return;
      } //clear any previous errors


      this.newComment.bodyError = this.newComment.ajaxError = ""; //Client-side validation, make sure there is a body

      if (this.newComment.body.length == 0) {
        this.newComment.bodyError = "Please include content in your comment";
        return;
      }

      var _this = this;

      axios.post(SUBMIT_COMMENT_URL, {
        post_type: POST_TYPE,
        post_id: this.post.id,
        comment: this.newComment.body,
        parent_id: null
      }, config).then(function (response) {
        console.log(response);

        if (response.data.success) {
          //Create an artificial "comment" object formatted as you would get from the server based off the user's newly submitted comment						
          var c = {
            children: [],
            comment: _this.newComment.body,
            created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
            downvotes: 0,
            upvotes: 1,
            id: response.data.new_id,
            parent_id: null,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
            username: USERNAME,
            voted: 1 //Add our new comment (now correctly formatted) to the top of our list of comments

          };

          _this.comments.unshift(c); //Clear the new comment inputs


          _this.clearNewComment();
        } else {
          //Unknown Error
          _this.newComment.ajaxError = "An error has occurred. Please try again.";
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data); //invalid_parameters
        //db_error

        _this.newComment.ajaxError = "An error has occurred. Please try again.";
      });
    },
    clearNewComment: function clearNewComment() {
      this.newComment = {
        body: "",
        bodyError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Posts.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Posts.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function fromNow(v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return window.fromNow(v);
    }
  },
  props: {
    posts: Array,
    showExternalImages: Boolean,
    componentPostType: String
  },
  data: function data() {
    return {
      postTypeListview: this.componentPostType + '-listview'
    };
  },
  computed: {},
  methods: {
    upvote: function upvote(p) {
      this.$root.$emit('upvote', p);
    },
    downvote: function downvote(p) {
      this.$root.$emit('downvote', p);
    },
    expandPost: function expandPost(p) {
      this.$root.$emit('expandPost', p);
    },
    viewPost: function viewPost(p, b) {
      this.$root.$emit('viewPost', p, b);
    },
    unsavePost: function unsavePost(p) {
      this.$root.$emit('unsavePost', p);
    },
    savePost: function savePost(p) {
      this.$root.$emit('savePost', p);
    },
    sharePost: function sharePost(p) {
      this.$root.$emit('sharePost', p);
    },
    reportPost: function reportPost(p) {
      this.$root.$emit('reportPost', p);
    },
    toggleMinimized: function toggleMinimized(p) {
      this.$root.$emit('toggleMinimized', p);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ViewBase.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ViewBase.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    maxLength: function maxLength(t) {
      //Limit the max length of the output to 'max', and backtrack to the last space to end at the end of a word
      var max = 1000;

      if (t.length > max) {
        var t2 = t.substr(0, max);
        return t2.substr(0, t2.lastIndexOf(' ')) + '...';
      }

      return t;
    },
    nl2br: function nl2br(t) {
      return t.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  },
  props: {
    post: Object,
    showExternalImages: Boolean
  },
  data: function data() {
    return {};
  },
  computed: {},
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/Comment.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/Comment.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    })
  },
  props: {
    comment: Object,
    postId: Number
  },
  data: function data() {
    return {
      replyToComment: false,
      editComment: false,
      me: USERNAME,
      bgClass: 'cg' + this.comment.depth % 5
    };
  },
  computed: {},
  mounted: function mounted() {},
  methods: {
    voteOnComment: function voteOnComment(v, c) {
      if (v != 0 && v != 1) {
        return;
      }

      var _this = this; //ajax post


      axios.post(VOTE_URL, {
        type: POST_TYPE + "_comment",
        id: _this.comment.id,
        vote: v
      }, config).then(function (response) {
        console.log(response);

        if (response.data.success) {
          if (response.data.success == "vote_saved") {
            if (v == 1) {
              _this.comment.upvotes += 1;
            } else if (v == 0) {
              _this.comment.downvotes += 1;
            }

            _this.comment.voted = v;
          } else if (response.data.success == "vote_unchanged") {} else if (response.data.success == "vote_updated") {
            if (v == 1) {
              _this.comment.upvotes += 1;
              _this.comment.downvotes -= 1;
            } else if (v == 0) {
              _this.comment.downvotes += 1;
              _this.comment.upvotes -= 1;
            }

            _this.comment.voted = v;
          }
        } else {
          //Unknown Error
          _this.newComment.ajaxError = "An error has occurred. Please try again.";
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data); //invalid_parameters
        //db_error

        _this.newComment.ajaxError = "An error has occurred. Please try again.";
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  props: {
    comment: Object,
    editComment: Object
  },
  data: function data() {
    return {
      bodyError: false,
      ajaxError: false,
      editedComment: this.comment.comment
    };
  },
  computed: {},
  methods: {
    update: function update() {
      //basic clientside validation
      if (this.editedComment.length == 0) {
        this.bodyError = 'Please fill out your comment or click delete if you wish to remove your comment';
        return;
      } //Reset any errors


      this.bodyError = false;
      this.ajaxError = false; //If comment didn't change then return, but still emit success so that parent closes the edit div

      if (this.editedComment == this.comment.comment) {
        this.$emit('onEditSuccess');
        return;
      } //For use within Axios scope to gain access to 'this'


      var self = this; //ajax post

      axios.post(UPDATE_COMMENT_URL, {
        post_type: POST_TYPE,
        comment: self.editedComment,
        comment_id: self.comment.id
      }, config).then(function (response) {
        console.log(response);

        if (response.data.success) {
          self.comment.comment = self.editedComment;
          self.$emit('onEditSuccess');
        } else {
          //Unknown Error
          self.ajaxError = "An error has occurred. Please try again.";
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data); //invalid_parameters
        //db_error

        self.ajaxError = "An error has occurred. Please try again.";
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  props: {
    comments: Array,
    postId: Number
  },
  data: function data() {
    return {};
  },
  computed: {},
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  props: {
    comment: Object,
    replyToComment: Object,
    postId: Number
  },
  data: function data() {
    return {
      newComment: {
        body: '',
        bodyError: false,
        ajaxError: ''
      }
    };
  },
  computed: {},
  methods: {
    replyTo: function replyTo(comment) {
      if (!LOGGED_IN) {
        this.$root.$emit('showLogin', 'You must be logged in to comment');
        return;
      } //basic clientside validation


      if (this.newComment.body.length == 0) {
        this.newComment.bodyError = true;
        return;
      } //Reset any errors


      this.newComment.bodyError = false;
      this.newComment.ajaxError = ""; //For use within Axios scope to gain access to 'this'

      var _this = this;

      console.log(this.postId);
      console.log(POST_TYPE); //ajax post

      axios.post(SUBMIT_COMMENT_URL, {
        post_type: POST_TYPE,
        post_id: this.postId,
        comment: this.newComment.body,
        parent_id: comment.id
      }, config).then(function (response) {
        console.log(response);

        if (response.data.success) {
          //Create a new basic 'comment' with the newly submitted into and add to the parent comments list of children
          var c = {
            children: [],
            comment: _this.newComment.body,
            created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
            downvotes: 0,
            upvotes: 1,
            id: response.data.new_id,
            parent_id: comment.id,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
            username: USERNAME,
            voted: 1 //Add to 0 position of parent's children comments so that it show up on top (near the submit form), 
            //if reloaded their comment will be at the end of the list, but this makes things more intuitive

          };

          _this.comment.children.unshift(c); //unset the new comment data


          _this.newComment = {
            body: '',
            bodyError: false,
            ajaxError: '' //Emit event to let parent (comment group) know the form is done

          };

          _this.$emit('onReplySuccess');
        } else {
          //Unknown Error
          _this.newComment.ajaxError = "An error has occurred. Please try again.";
        }
      }).catch(function (error) {
        console.log("ERROR");
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data); //invalid_parameters
        //db_error

        _this.newComment.ajaxError = "An error has occurred. Please try again.";
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a title and body

      if (this.newPost.title.length == 0) {
        this.newPost.titleError = "Please include a title";
        return;
      }

      if (this.newPost.description.length == 0) {
        this.newPost.descriptionError = "Please include content in your " + this.postType;
        return;
      }

      var data = {
        hook_title: this.newPost.title,
        item_description: this.newPost.description
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        externalLink: "",
        externalLinkError: "",
        imageLink: "",
        imageLinkError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {
      postType: POST_TYPE_PRETTY,
      newPost: this.clearPost()
    };
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a title and body

      if (this.newPost.title.length == 0) {
        this.newPost.titleError = "Please include a title";
        return;
      }

      if (this.newPost.body.length == 0) {
        this.newPost.bodyError = "Please include content in your " + this.postType;
        return;
      }

      var data = {
        hook_body: this.newPost.body,
        hook_title: this.newPost.title
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        title: "",
        titleError: "",
        body: "",
        bodyError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a title and body

      if (this.newPost.title.length == 0) {
        this.newPost.titleError = "Please include a title";
        return;
      }

      if (this.newPost.description.length == 0) {
        this.newPost.descriptionError = "Please include content in your " + this.postType;
        return;
      }

      var data = {
        hook_title: this.newPost.title,
        item_description: this.newPost.description
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        externalLink: "",
        externalLinkError: "",
        imageLink: "",
        imageLinkError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a title and body

      if (this.newPost.title.length == 0) {
        this.newPost.titleError = "Please include a title";
        return;
      }

      if (this.newPost.description.length == 0) {
        this.newPost.descriptionError = "Please include content in your " + this.postType;
        return;
      }

      var data = {
        hook_title: this.newPost.title,
        item_description: this.newPost.description
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        externalLink: "",
        externalLinkError: "",
        imageLink: "",
        imageLinkError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.titleError = this.newPost.bodyError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a title and body

      if (this.newPost.title.length == 0) {
        this.newPost.titleError = "Please include a title";
        return;
      }

      if (this.newPost.description.length == 0) {
        this.newPost.descriptionError = "Please include content in your " + this.postType;
        return;
      }

      var data = {
        hook_title: this.newPost.title,
        item_description: this.newPost.description
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        externalLink: "",
        externalLinkError: "",
        imageLink: "",
        imageLinkError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NewPostBase.vue */ "./resources/js/components/NewPostBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {},
  extends: _NewPostBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    submitPost: function submitPost() {
      //Init newPost error values to blank
      this.newPost.riddleError = this.newPost.answerError = this.newPost.ajaxError = ""; //Client side validation, make sure there's a riddle and answer

      if (this.newPost.riddle.length == 0) {
        this.newPost.riddleError = "Please include a riddle";
        return;
      }

      if (this.newPost.answer.length == 0) {
        this.newPost.answerError = "Please include an answer";
        return;
      }

      var data = {
        riddle: this.newPost.riddle,
        answer: this.newPost.answer
      };
      this.submit(data);
    },
    clearPost: function clearPost() {
      this.newPost = {
        riddle: "",
        riddleError: "",
        answer: "",
        answerError: "",
        ajaxError: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ViewBase.vue */ "./resources/js/components/ViewBase.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _ViewBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "page-transition top" }),
      _vm._v(" "),
      _c("div", { staticClass: "page-transition bottom" }),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vue-loader", staticStyle: { display: "none" } },
        [
          _c(
            "svg",
            {
              attrs: {
                id: "d20_anim_icon",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                x: "0px",
                y: "0px",
                width: "720px",
                height: "720px",
                viewBox: "0 0 720 720",
                "enable-background": "new 0 0 720 720",
                "xml:space": "preserve"
              }
            },
            [
              _c("polygon", {
                staticStyle: {
                  "stroke-dasharray": "1438.407470703125",
                  "stroke-dashoffset": "1438.407470703125"
                },
                attrs: {
                  id: "d20_outside",
                  fill: "none",
                  stroke: "#000000",
                  "stroke-width": "20",
                  "stroke-miterlimit": "10",
                  points:
                    "355.933,124.834 153.167,241.167 153.167,481.834 360,598.5 569.833,481.834 569.833,241.167 360,122.5"
                }
              }),
              _vm._v(" "),
              _c("polygon", {
                staticStyle: {
                  "stroke-dasharray": "1250.046630859375",
                  "stroke-dashoffset": "1250.046630859375"
                },
                attrs: {
                  id: "d20_inside",
                  fill: "none",
                  stroke: "#000000",
                  "stroke-width": "20",
                  "stroke-linejoin": "round",
                  "stroke-miterlimit": "10",
                  points:
                    "360,122.5 245.167,293.5 153.167,481.834 361.873,494.5 569.833,481.834 475.833,293.5"
                }
              }),
              _vm._v(" "),
              _c("polyline", {
                staticStyle: {
                  "stroke-dasharray": "336.5090026855469",
                  "stroke-dashoffset": "336.5090026855469"
                },
                attrs: {
                  id: "d20_line1",
                  fill: "none",
                  stroke: "#000000",
                  "stroke-width": "20",
                  "stroke-miterlimit": "10",
                  points: "153.167,241.167 245.167,293.5 475.833,293.5"
                }
              }),
              _vm._v(" "),
              _c("polyline", {
                staticStyle: {
                  "stroke-dasharray": "335.489990234375",
                  "stroke-dashoffset": "335.489990234375"
                },
                attrs: {
                  id: "d20_line2",
                  fill: "none",
                  stroke: "#000000",
                  "stroke-width": "20",
                  "stroke-miterlimit": "10",
                  points: "245.167,293.5 360,494.5 360,598.5"
                }
              }),
              _vm._v(" "),
              _c("polyline", {
                staticStyle: {
                  "stroke-dasharray": "338.6441650390625",
                  "stroke-dashoffset": "338.6441650390625"
                },
                attrs: {
                  id: "d20_line3",
                  fill: "none",
                  stroke: "#000000",
                  "stroke-width": "20",
                  "stroke-miterlimit": "10",
                  points: "361.873,494.5 475.833,293.5 569.833,241.167"
                }
              })
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "section-content",
          class: { "overlay-open": _vm.currPost }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.currPost,
                  expression: "!currPost"
                }
              ],
              staticClass: "posts-page"
            },
            [
              _c("div", { staticClass: "section-header" }, [
                _c("div", { staticClass: "field is-horizontal" }, [
                  _c("div", { staticClass: "lbl is-normal" }, [
                    _vm._v("\n\t\t\t\t\t\tSort By:\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field-body" }, [
                    _c("div", { staticClass: "field" }, [
                      _c("div", { staticClass: "control is-expanded" }, [
                        _c("div", { staticClass: "select is-fullwidth" }, [
                          _c(
                            "select",
                            {
                              attrs: { id: "sortby" },
                              domProps: { value: _vm.sortByMethod },
                              on: {
                                change: function($event) {
                                  return _vm.changeSortMethod(
                                    _vm.sortByMethod,
                                    $event
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "0" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tRandom\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tUpvotes\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "2" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tDownvotes\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "3" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tNewest\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "4" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tOldest\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ])
                            ]
                          )
                        ])
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "field is-horizontal" }, [
                  _c("div", { staticClass: "lbl is-normal" }, [
                    _vm._v("\n\t\t\t\t\t\tFilter By:\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field-body" }, [
                    _c("div", { staticClass: "field" }, [
                      _c("div", { staticClass: "control is-expanded" }, [
                        _c("div", { staticClass: "select is-fullwidth" }, [
                          _c(
                            "select",
                            {
                              attrs: { id: "filterby" },
                              domProps: { value: _vm.filterByMethod },
                              on: {
                                change: function($event) {
                                  return _vm.changeFilterMethod(
                                    _vm.filterByMethod,
                                    $event
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "0" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tShow All\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tJust Mine\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "2" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tNot Mine\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "3" } }, [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t\tSaved\n\t\t\t\t\t\t\t\t\t\t"
                                )
                              ])
                            ]
                          )
                        ])
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "div",
                    {
                      staticClass: "button",
                      attrs: { id: "new-post-btn" },
                      on: {
                        click: function($event) {
                          return _vm.showNewPost()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n\t\t\t\t\t\tNew " +
                          _vm._s(_vm.postType) +
                          "\n\t\t\t\t\t"
                      )
                    ]
                  )
                ])
              ]),
              _vm._v(" "),
              _vm.componentPostType !== "hook"
                ? _c("div", { staticClass: "options" }, [
                    _c(
                      "div",
                      {
                        staticClass: "toggle-group",
                        on: {
                          click: function($event) {
                            return _vm.toggleShowExternalImages()
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.showExternalImages,
                              expression: "showExternalImages"
                            }
                          ],
                          attrs: {
                            id: "external-images-switch",
                            type: "checkbox",
                            name: "external-images-switch",
                            tabindex: "1"
                          },
                          domProps: {
                            checked: Array.isArray(_vm.showExternalImages)
                              ? _vm._i(_vm.showExternalImages, null) > -1
                              : _vm.showExternalImages
                          },
                          on: {
                            change: function($event) {
                              var $$a = _vm.showExternalImages,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    (_vm.showExternalImages = $$a.concat([$$v]))
                                } else {
                                  $$i > -1 &&
                                    (_vm.showExternalImages = $$a
                                      .slice(0, $$i)
                                      .concat($$a.slice($$i + 1)))
                                }
                              } else {
                                _vm.showExternalImages = $$c
                              }
                            }
                          }
                        }),
                        _vm._v(" "),
                        _vm._m(1),
                        _vm._v(" "),
                        _vm._m(2)
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("posts", {
                attrs: {
                  posts: _vm.posts,
                  "show-external-images": _vm.showExternalImages,
                  "component-post-type": _vm.componentPostType
                }
              }),
              _vm._v(" "),
              !_vm.noMorePosts
                ? _c(
                    "div",
                    {
                      staticClass: "load-more button",
                      on: {
                        click: function($event) {
                          return _vm.getPosts()
                        }
                      }
                    },
                    [_vm._v("\n\t\t\t\tLoad More\n\t\t\t")]
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.currPost
            ? _c("post", {
                attrs: {
                  post: _vm.currPost,
                  comments: _vm.currPostComments,
                  "comments-loading": _vm.commentsLoading,
                  "component-post-type": _vm.componentPostType
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.showingNewPost
        ? _c(_vm.postTypeNewPost, {
            tag: "component",
            on: {
              hideNewPost: function($event) {
                return _vm.hideNewPost()
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.sharePost
        ? _c(
            "div",
            {
              staticClass: "modal",
              class: { "is-active": _vm.sharePost },
              attrs: { id: "share-modal" }
            },
            [
              _c("div", {
                staticClass: "modal-background",
                on: {
                  click: function($event) {
                    return _vm.hideShare()
                  }
                }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "has-text-centered" }, [
                  _c("div", { staticClass: "box" }, [
                    _c("div", { staticClass: "modal__title" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\tShare this " +
                          _vm._s(_vm.postType) +
                          "\n\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "share-title" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t" +
                          _vm._s(_vm.sharePost.title) +
                          "\n\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _vm._v("Direct Link: "),
                      _c(
                        "a",
                        {
                          attrs: { href: _vm.base_url + "/" + _vm.sharePost.id }
                        },
                        [_vm._v(_vm._s(_vm.base_url + "/" + _vm.sharePost.id))]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "socials-large" }, [
                      _c(
                        "a",
                        {
                          attrs: {
                            href:
                              "https://twitter.com/home?status=" +
                              encodeURIComponent(
                                _vm.base_url + "/" + _vm.sharePost.id
                              ),
                            target: "_blank"
                          }
                        },
                        [_c("i", { staticClass: "fab fa-twitter-square" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          attrs: {
                            href:
                              "https://www.facebook.com/sharer/sharer.php?u=" +
                              encodeURIComponent(
                                _vm.base_url + "/" + _vm.sharePost.id
                              ),
                            target: "_blank"
                          }
                        },
                        [_c("i", { staticClass: "fab fa-facebook-square" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          attrs: {
                            href:
                              "https://plus.google.com/share?url=" +
                              encodeURIComponent(
                                _vm.base_url + "/" + _vm.sharePost.id
                              ),
                            target: "_blank"
                          }
                        },
                        [_c("i", { staticClass: "fab fa-google-plus-square" })]
                      )
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("button", {
                staticClass: "modal-close is-large",
                attrs: { "aria-label": "close" },
                on: {
                  click: function($event) {
                    return _vm.hideShare()
                  }
                }
              })
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.reportPost
        ? _c(
            "div",
            {
              staticClass: "modal",
              class: { "is-active": _vm.reportPost },
              attrs: { id: "report-modal" }
            },
            [
              _c("div", {
                staticClass: "modal-background",
                on: {
                  click: function($event) {
                    return _vm.hideReport()
                  }
                }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "has-text-centered" }, [
                  _c("div", { staticClass: "box" }, [
                    _c("div", { staticClass: "modal__title" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\tReport this " +
                          _vm._s(_vm.postType) +
                          "\n\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "share-title" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t" +
                          _vm._s(_vm.reportPost.title) +
                          "\n\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("p", [
                      _vm._v(
                        "\n\t\t\t\t\t\tOnly report content if it is offensive, off-topic, spam, or malicious.\n\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "modal-footer-btns" }, [
                      _vm.reportResult
                        ? _c("div", { staticClass: "modal-result" }, [
                            _c("div", [_vm._v(_vm._s(_vm.reportResult))]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "button is-large is-light is-fullwidth",
                                attrs: { "aria-label": "cancel" },
                                on: {
                                  click: function($event) {
                                    return _vm.hideReport()
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\tClose\n\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ])
                        : _c("div", [
                            _c(
                              "div",
                              {
                                staticClass: "button is-large is-danger",
                                attrs: { "aria-label": "report" },
                                on: {
                                  click: function($event) {
                                    return _vm.reportThisPost(_vm.reportPost)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\tReport\n\t\t\t\t\t\t\t"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "button is-large is-light",
                                attrs: { "aria-label": "cancel" },
                                on: {
                                  click: function($event) {
                                    return _vm.hideReport()
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ])
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("button", {
                staticClass: "modal-close is-large",
                attrs: { "aria-label": "close" },
                on: {
                  click: function($event) {
                    return _vm.hideReport()
                  }
                }
              })
            ]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "global-loader" } }, [
      _c("img", {
        attrs: { src: "/img/global-loader.svg", alt: "Global Loader Icon" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "external-images-switch" } }, [
      _c("span", { staticClass: "aural" }, [_vm._v("Load:")]),
      _vm._v(" Load External Images\n\t\t\t\t\t")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "onoffswitch pull-right",
        attrs: { "aria-hidden": "true" }
      },
      [
        _c("div", { staticClass: "onoffswitch-label" }, [
          _c("div", { staticClass: "onoffswitch-inner" }),
          _vm._v(" "),
          _c("div", { staticClass: "onoffswitch-switch" })
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Post.vue?vue&type=template&id=5e8280ea&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Post.vue?vue&type=template&id=5e8280ea& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "post-page" }, [
    _c(
      "div",
      {
        staticClass: "post-close link",
        on: {
          click: function($event) {
            return _vm.closePost()
          }
        }
      },
      [_vm._v("\n\t\tBACK   "), _c("i", { staticClass: "fas fa-times" })]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "post-view" }, [
      _c("div", { staticClass: "post-header" }, [
        _c("div", { staticClass: "vote-btns" }, [
          _c(
            "div",
            {
              staticClass: "vote-arrow up",
              class: { voted: _vm.post.voted == 1 },
              on: {
                click: function($event) {
                  return _vm.upvote(_vm.post)
                }
              }
            },
            [_c("i", { staticClass: "fas fa-arrow-alt-circle-up" })]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "score",
              attrs: {
                title: "+" + _vm.post.upvotes + " -" + _vm.post.downvotes
              }
            },
            [
              _vm._v(
                "\n\t\t\t\t\t" +
                  _vm._s(_vm.post.upvotes - _vm.post.downvotes) +
                  "\n\t\t\t\t"
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "vote-arrow down",
              class: { voted: _vm.post.voted == 0 },
              on: {
                click: function($event) {
                  return _vm.downvote(_vm.post)
                }
              }
            },
            [_c("i", { staticClass: "fas fa-arrow-alt-circle-down" })]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "post-content" }, [
          _c(
            "div",
            {},
            [
              _c(_vm.postTypePostview, {
                tag: "component",
                attrs: { post: _vm.post }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "post-date" }, [
                _vm._v("\n\t\t\t\t\t\tSubmitted \n\t\t\t\t\t\t"),
                _c("time", { attrs: { title: _vm.post.created_at } }, [
                  _vm._v(_vm._s(_vm._f("fromNow")(_vm.post.created_at)))
                ]),
                _vm._v(" \n\t\t\t\t\t\tby "),
                _c("span", [_vm._v(_vm._s(_vm.post.username))])
              ]),
              _vm._v(" "),
              _c("ul", { staticClass: "post-buttons" }, [
                _c("li", { staticClass: "post-save" }, [
                  _vm.post.saved
                    ? _c(
                        "span",
                        {
                          staticClass: "post-save link",
                          on: {
                            click: function($event) {
                              return _vm.unsavePost(_vm.post)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "fas fa-bookmark" }),
                          _vm._v(" unsave")
                        ]
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "post-save link",
                          on: {
                            click: function($event) {
                              return _vm.savePost(_vm.post)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "far fa-bookmark" }),
                          _vm._v(" save")
                        ]
                      )
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "post-share" }, [
                  _c(
                    "span",
                    {
                      staticClass: "post-share link",
                      on: {
                        click: function($event) {
                          _vm.sharePost = _vm.post
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-share-alt" }),
                      _vm._v(" share")
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "post-report-button" }, [
                  _c(
                    "span",
                    {
                      staticClass: "post-report link",
                      on: {
                        click: function($event) {
                          _vm.reportPost = _vm.post
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-exclamation-triangle" }),
                      _vm._v(" report")
                    ]
                  )
                ])
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.commentsLoading,
              expression: "!commentsLoading"
            }
          ],
          staticClass: "post-comments"
        },
        [
          _c("div", { staticClass: "new-comment" }, [
            _vm.newComment.bodyError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newComment.bodyError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newComment.body,
                      expression: "newComment.body"
                    }
                  ],
                  staticClass: "textarea",
                  class: { error: _vm.newComment.bodyError.length > 0 },
                  attrs: {
                    id: "comment-body",
                    type: "text",
                    placeholder: "Comment",
                    rows: "2"
                  },
                  domProps: { value: _vm.newComment.body },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newComment, "body", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitComment()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit Comment\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newComment.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newComment.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("comment-list", {
            attrs: { comments: _vm.comments, "post-id": _vm.post.id }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.posts
    ? _c(
        "div",
        _vm._l(_vm.posts, function(p) {
          return _c(
            "div",
            {
              key: p.id,
              staticClass: "post",
              class: { minimized: p.minimized }
            },
            [
              _c("div", { staticClass: "vote-btns" }, [
                _c(
                  "div",
                  {
                    staticClass: "vote-arrow up",
                    class: { voted: p.voted == 1 },
                    on: {
                      click: function($event) {
                        return _vm.upvote(p)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-arrow-alt-circle-up" })]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "score",
                    attrs: { title: "+" + p.upvotes + " -" + p.downvotes }
                  },
                  [
                    _vm._v(
                      "\n\t\t\t\t\t" +
                        _vm._s(p.upvotes - p.downvotes) +
                        "\n\t\t\t\t"
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "vote-arrow down",
                    class: { voted: p.voted == 0 },
                    on: {
                      click: function($event) {
                        return _vm.downvote(p)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-arrow-alt-circle-down" })]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "post-content" }, [
                _c(
                  "div",
                  {},
                  [
                    _c(_vm.postTypeListview, {
                      tag: "component",
                      attrs: {
                        post: p,
                        "show-external-images": _vm.showExternalImages
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !p.minimized,
                            expression: "!p.minimized"
                          }
                        ],
                        staticClass: "post-date"
                      },
                      [
                        _vm._v("\n\t\t\t\t\t\tSubmitted \n\t\t\t\t\t\t"),
                        _c("time", { attrs: { title: p.created_at } }, [
                          _vm._v(_vm._s(_vm._f("fromNow")(p.created_at)))
                        ]),
                        _vm._v(" \n\t\t\t\t\t\tby "),
                        _c("span", [_vm._v(_vm._s(p.username))])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !p.minimized,
                            expression: "!p.minimized"
                          }
                        ],
                        staticClass: "post-buttons"
                      },
                      [
                        _c("li", [
                          _c(
                            "span",
                            {
                              staticClass: "link post-num-comments",
                              on: {
                                click: function($event) {
                                  return _vm.viewPost(p, true)
                                }
                              }
                            },
                            [
                              p.commentcount > 0
                                ? _c("i", { staticClass: "fas fa-comments" })
                                : _c("i", { staticClass: "far fa-comments" }),
                              _vm._v(" " + _vm._s(p.commentcount) + " comment"),
                              p.commentcount != 1
                                ? _c("span", [_vm._v("s")])
                                : _vm._e()
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "post-save" }, [
                          p.saved
                            ? _c(
                                "span",
                                {
                                  staticClass: "post-save link",
                                  on: {
                                    click: function($event) {
                                      return _vm.unsavePost(p)
                                    }
                                  }
                                },
                                [
                                  _c("i", { staticClass: "fas fa-bookmark" }),
                                  _vm._v(" unsave")
                                ]
                              )
                            : _c(
                                "span",
                                {
                                  staticClass: "post-save link",
                                  on: {
                                    click: function($event) {
                                      return _vm.savePost(p)
                                    }
                                  }
                                },
                                [
                                  _c("i", { staticClass: "far fa-bookmark" }),
                                  _vm._v(" save")
                                ]
                              )
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "post-share" }, [
                          _c(
                            "span",
                            {
                              staticClass: "post-share link",
                              on: {
                                click: function($event) {
                                  return _vm.sharePost(p)
                                }
                              }
                            },
                            [
                              _c("i", { staticClass: "fas fa-share-alt" }),
                              _vm._v(" share")
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "post-report-button" }, [
                          _c(
                            "span",
                            {
                              staticClass: "post-report link",
                              on: {
                                click: function($event) {
                                  return _vm.reportPost(p)
                                }
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "fas fa-exclamation-triangle"
                              }),
                              _vm._v(" report")
                            ]
                          )
                        ])
                      ]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "post-minimize-btn",
                  on: {
                    click: function($event) {
                      return _vm.toggleMinimized(p)
                    }
                  }
                },
                [
                  _c("i", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !p.minimized,
                        expression: "!p.minimized"
                      }
                    ],
                    staticClass: "far fa-minus-square"
                  }),
                  _vm._v(" "),
                  _c("i", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: p.minimized,
                        expression: "p.minimized"
                      }
                    ],
                    staticClass: "far fa-plus-square"
                  })
                ]
              )
            ]
          )
        }),
        0
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "comment-group", class: [_vm.bgClass] },
    [
      _c("div", { staticClass: "post-comment" }, [
        _c("div", { staticClass: "comment-vote-btns not-mobile" }, [
          _c(
            "div",
            {
              staticClass: "vote-arrow up",
              class: { voted: _vm.comment.voted == 1 },
              on: {
                click: function($event) {
                  return _vm.voteOnComment(1, _vm.comment)
                }
              }
            },
            [_c("i", { staticClass: "fas fa-arrow-alt-circle-up" })]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "vote-arrow down",
              class: { voted: _vm.comment.voted == 0 },
              on: {
                click: function($event) {
                  return _vm.voteOnComment(0, _vm.comment)
                }
              }
            },
            [_c("i", { staticClass: "fas fa-arrow-alt-circle-down" })]
          )
        ]),
        _vm._v(" "),
        _c("div", [
          _c("div", { staticClass: "comment-body" }, [
            _vm._v("\n\t\t\t\t" + _vm._s(_vm.comment.comment) + "\n\t\t\t")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "comment-header" }, [
            _c("div", [
              _c(
                "span",
                {
                  staticClass: "vote-arrow mobile-only-inline up",
                  class: { voted: _vm.comment.voted == 1 },
                  on: {
                    click: function($event) {
                      return _vm.voteOnComment(1, _vm.comment)
                    }
                  }
                },
                [_c("i", { staticClass: "fas fa-arrow-alt-circle-up" })]
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "comment-score",
                  attrs: {
                    title:
                      "+" + _vm.comment.upvotes + " -" + _vm.comment.downvotes
                  }
                },
                [
                  _vm._v(
                    _vm._s(_vm.comment.upvotes - _vm.comment.downvotes) +
                      " point"
                  ),
                  _vm.comment.upvotes - _vm.comment.downvotes != 1 &&
                  _vm.comment.upvotes - _vm.comment.downvotes != -1
                    ? _c("span", [_vm._v("s")])
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "vote-arrow mobile-only-inline down",
                  class: { voted: _vm.comment.voted == 0 },
                  on: {
                    click: function($event) {
                      return _vm.voteOnComment(0, _vm.comment)
                    }
                  }
                },
                [_c("i", { staticClass: "fas fa-arrow-alt-circle-down" })]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "comment-author" }, [
                _vm._v(" - Posted by " + _vm._s(_vm.comment.username))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "comment-date" }, [
                _vm._v(_vm._s(_vm._f("fromNow")(_vm.comment.created_at)))
              ])
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "span",
                {
                  staticClass: "comment-reply-btn fake-link",
                  on: {
                    click: function($event) {
                      _vm.replyToComment == _vm.comment
                        ? (_vm.replyToComment = false)
                        : (_vm.replyToComment = _vm.comment)
                    }
                  }
                },
                [_vm._v(" Reply")]
              ),
              _vm._v(" "),
              _vm.comment.username == _vm.me
                ? _c("span", [
                    _vm._v("\n\t\t\t\t\t\t • "),
                    _c(
                      "span",
                      {
                        staticClass: "comment-edit-btn fake-link",
                        on: {
                          click: function($event) {
                            _vm.editComment == _vm.comment
                              ? (_vm.editComment = false)
                              : (_vm.editComment = _vm.comment)
                          }
                        }
                      },
                      [_vm._v("Edit")]
                    )
                  ])
                : _vm._e()
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.replyToComment == _vm.comment
        ? _c("comment-reply", {
            attrs: {
              comment: _vm.comment,
              "reply-to-comment": _vm.replyToComment,
              "post-id": _vm.postId
            },
            on: {
              onReplySuccess: function($event) {
                _vm.replyToComment = false
              },
              onReplyCancel: function($event) {
                _vm.replyToComment = false
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.editComment == _vm.comment
        ? _c("comment-edit", {
            attrs: { comment: _vm.comment, "edit-comment": _vm.editComment },
            on: {
              onEditSuccess: function($event) {
                _vm.editComment = false
              },
              onEditCancel: function($event) {
                _vm.editComment = false
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.comment.children.length
        ? _c("comment-list", {
            attrs: { comments: _vm.comment.children, "post-id": _vm.postId }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.bodyError ? _c("span", [_vm._v(_vm._s(_vm.bodyError))]) : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "field" }, [
      _c("div", { staticClass: "control" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.editedComment,
              expression: "editedComment"
            }
          ],
          staticClass: "child-comment-body textarea",
          class: { error: _vm.bodyError },
          attrs: { type: "text", placeholder: "Comment", rows: "2" },
          domProps: { value: _vm.editedComment },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.editedComment = $event.target.value
            }
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "comment-buttons" }, [
      _c(
        "div",
        {
          staticClass: "button is-block is-info is-large submit-btn",
          on: {
            click: function($event) {
              return _vm.update()
            }
          }
        },
        [_vm._v("\n\t\t\tUpdate Comment\n\t\t")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "button is-block is-dark is-large cancel-btn",
          on: {
            click: function($event) {
              return _vm.$emit("onEditCancel")
            }
          }
        },
        [_vm._v("\n\t\t\tCancel\n\t\t")]
      )
    ]),
    _vm._v(" "),
    _vm.ajaxError
      ? _c("div", { staticClass: "error-field" }, [
          _vm._v("\n\t\t" + _vm._s(_vm.ajaxError) + "\n\t")
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "comment-list" },
    _vm._l(_vm.comments, function(comment) {
      return _c("comment", {
        key: comment.id,
        attrs: { comment: comment, "post-id": _vm.postId }
      })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "field" }, [
      _c("div", { staticClass: "control" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.newComment.body,
              expression: "newComment.body"
            }
          ],
          staticClass: "child-comment-body textarea",
          class: { error: _vm.newComment.bodyError },
          attrs: { type: "text", placeholder: "Comment", rows: "2" },
          domProps: { value: _vm.newComment.body },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.newComment, "body", $event.target.value)
            }
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "comment-buttons" }, [
      _c(
        "div",
        {
          staticClass: "button is-block is-info is-large submit-btn",
          on: {
            click: function($event) {
              return _vm.replyTo(_vm.comment)
            }
          }
        },
        [_vm._v("\n\t\t\tSubmit Reply\n\t\t")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "button is-block is-dark is-large cancel-btn",
          on: {
            click: function($event) {
              return _vm.$emit("onReplyCancel")
            }
          }
        },
        [_vm._v("\n\t\t\tCancel\n\t\t")]
      )
    ]),
    _vm._v(" "),
    _vm.newComment.ajaxError.length > 0
      ? _c("div", { staticClass: "error-field" }, [
          _vm._v("\n\t\t" + _vm._s(_vm.newComment.ajaxError) + "\n\t")
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("span", [
        _vm._v(_vm._s(_vm.post.description || _vm.nl2br || _vm.maxLength))
      ]),
      _vm._v(" "),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.newPost.titleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.titleError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.title,
                      expression: "newPost.title"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Title",
                    autofocus: ""
                  },
                  domProps: { value: _vm.newPost.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "title", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.descriptionError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.descriptionError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.description,
                      expression: "newPost.description"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-description",
                    type: "text",
                    placeholder: "Description",
                    rows: "5"
                  },
                  domProps: { value: _vm.newPost.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "description", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.externalLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.externalLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.externalLink,
                      expression: "newPost.externalLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-external-link",
                    type: "text",
                    placeholder: "External Link (optional)"
                  },
                  domProps: { value: _vm.newPost.externalLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "externalLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.imageLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.imageLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.imageLink,
                      expression: "newPost.imageLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-image-link",
                    type: "text",
                    placeholder: "Image Link (optional)"
                  },
                  domProps: { value: _vm.newPost.imageLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "imageLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newPost.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(
        " \n\t\t" + _vm._s(_vm.post.description || _vm.maxLength) + "\n\t\t"
      ),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "post-description" }, [
      _c("div", { staticClass: "description" }, [
        _vm._v(
          "\n\t\t\t" +
            _vm._s(_vm.post.description || _vm.nl2br || _vm.maxLength) +
            "\n\t\t"
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.newPost.titleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.titleError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.title,
                      expression: "newPost.title"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Title",
                    autofocus: ""
                  },
                  domProps: { value: _vm.newPost.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "title", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.bodyError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.bodyError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.body,
                      expression: "newPost.body"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-body",
                    type: "text",
                    placeholder: _vm.postType,
                    rows: "5"
                  },
                  domProps: { value: _vm.newPost.body },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "body", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newPost.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "post-description" }, [
      _c("div", { staticClass: "description" }, [
        _vm._v("\n\t\t\t" + _vm._s(_vm.post.description) + "\n\t\t")
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("span", [
        _vm._v(_vm._s(_vm.post.description || _vm.nl2br || _vm.maxLength))
      ]),
      _vm._v(" "),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.newPost.titleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.titleError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.title,
                      expression: "newPost.title"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Title",
                    autofocus: ""
                  },
                  domProps: { value: _vm.newPost.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "title", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.descriptionError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.descriptionError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.description,
                      expression: "newPost.description"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-description",
                    type: "text",
                    placeholder: "Description",
                    rows: "5"
                  },
                  domProps: { value: _vm.newPost.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "description", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.externalLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.externalLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.externalLink,
                      expression: "newPost.externalLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-external-link",
                    type: "text",
                    placeholder: "External Link (optional)"
                  },
                  domProps: { value: _vm.newPost.externalLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "externalLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.imageLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.imageLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.imageLink,
                      expression: "newPost.imageLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-image-link",
                    type: "text",
                    placeholder: "Image Link (optional)"
                  },
                  domProps: { value: _vm.newPost.imageLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "imageLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newPost.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(" \n\t\t" + _vm._s(_vm.post.description) + "\n\t\t"),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _c("a", { attrs: { href: _vm.post.link, target: "_blank" } }, [
        _vm.showExternalImages
          ? _c("img", {
              staticClass: "external-image",
              attrs: {
                ALIGN: "left",
                src: "map_thumbs/" + _vm.post.id + ".jpg"
              }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("span", [
        _vm._v(_vm._s(_vm.post.description || _vm.nl2br || _vm.maxLength))
      ]),
      _vm._v(" "),
      _vm.post.link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c("a", { attrs: { href: _vm.post.link, target: "_blank" } }, [
              _vm._v(_vm._s(_vm.post.link))
            ])
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.newPost.titleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.titleError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.title,
                      expression: "newPost.title"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Title",
                    autofocus: ""
                  },
                  domProps: { value: _vm.newPost.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "title", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.descriptionError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.descriptionError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.description,
                      expression: "newPost.description"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-description",
                    type: "text",
                    placeholder: "Description",
                    rows: "5"
                  },
                  domProps: { value: _vm.newPost.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "description", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.externalLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.externalLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.externalLink,
                      expression: "newPost.externalLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-external-link",
                    type: "text",
                    placeholder: "External Link (optional)"
                  },
                  domProps: { value: _vm.newPost.externalLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "externalLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.imageLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.imageLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.imageLink,
                      expression: "newPost.imageLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-image-link",
                    type: "text",
                    placeholder: "Image Link (optional)"
                  },
                  domProps: { value: _vm.newPost.imageLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "imageLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newPost.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _c("a", { attrs: { href: _vm.post.link, target: "_blank" } }, [
        _vm.showExternalImages
          ? _c("img", {
              staticClass: "external-image",
              attrs: {
                ALIGN: "left",
                src: "map_thumbs/" + _vm.post.id + ".jpg"
              }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.post.description))]),
      _vm._v(" "),
      _vm.post.link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c("a", { attrs: { href: _vm.post.link, target: "_blank" } }, [
              _vm._v(_vm._s(_vm.post.link))
            ])
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("span", [
        _vm._v(_vm._s(_vm.post.description || _vm.nl2br || _vm.maxLength))
      ]),
      _vm._v(" "),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.newPost.titleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.titleError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.title,
                      expression: "newPost.title"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Title",
                    autofocus: ""
                  },
                  domProps: { value: _vm.newPost.title },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "title", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.descriptionError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.descriptionError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.description,
                      expression: "newPost.description"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-description",
                    type: "text",
                    placeholder: "Description",
                    rows: "5"
                  },
                  domProps: { value: _vm.newPost.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "description", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.externalLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.externalLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.externalLink,
                      expression: "newPost.externalLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-external-link",
                    type: "text",
                    placeholder: "External Link (optional)"
                  },
                  domProps: { value: _vm.newPost.externalLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "externalLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.newPost.imageLinkError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.imageLinkError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newPost.imageLink,
                      expression: "newPost.imageLink"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-image-link",
                    type: "text",
                    placeholder: "Image Link (optional)"
                  },
                  domProps: { value: _vm.newPost.imageLink },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.newPost, "imageLink", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.newPost.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.newPost.ajaxError) +
                      "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.title))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "description puzzle" }, [
      _vm.showExternalImages && _vm.post.image_link
        ? _c("img", {
            staticClass: "external-image",
            attrs: { ALIGN: "left", src: _vm.post.image_link }
          })
        : _vm._e(),
      _vm._v(" \n\t\t" + _vm._s(_vm.post.description) + "\n\t\t"),
      _vm.post.external_link
        ? _c("div", { staticClass: "external-link" }, [
            _c("span", { staticClass: "bold" }, [_vm._v("External Link:")]),
            _vm._v(" "),
            _c(
              "a",
              { attrs: { href: _vm.post.external_link, target: "_blank" } },
              [_vm._v(_vm._s(_vm.post.external_link))]
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.riddle))])
    ]),
    _vm._v(" "),
    !_vm.post.minimized
      ? _c("div", { staticClass: "post-description" }, [
          _vm.post.revealed
            ? _c(
                "div",
                {
                  staticClass: "description riddle",
                  on: {
                    click: function($event) {
                      _vm.post.revealed = false
                    }
                  }
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.post.answer) + "\n\t\t")]
              )
            : _c(
                "div",
                {
                  staticClass: "description riddle-reveal",
                  on: {
                    click: function($event) {
                      _vm.post.revealed = true
                    }
                  }
                },
                [_vm._v("\n\t\t\tClick to reveal\n\t\t")]
              )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal is-active", attrs: { id: "new-post-modal" } },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "modal__title" }, [
              _vm._v(
                "\n\t\t\t\t\tSubmit a new " +
                  _vm._s(_vm.postType) +
                  "\n\t\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm.post.riddleError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" + _vm._s(_vm.post.riddleError) + "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.post.riddle,
                      expression: "post.riddle"
                    }
                  ],
                  staticClass: "textarea is-large",
                  attrs: {
                    id: "post-body",
                    type: "text",
                    placeholder: "Riddle",
                    rows: "5",
                    autofocus: ""
                  },
                  domProps: { value: _vm.post.riddle },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.post, "riddle", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm.post.answerError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" + _vm._s(_vm.post.answerError) + "\n\t\t\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.post.answer,
                      expression: "post.answer"
                    }
                  ],
                  staticClass: "input is-large",
                  attrs: {
                    id: "post-title",
                    type: "text",
                    placeholder: "Answer"
                  },
                  domProps: { value: _vm.post.answer },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.post, "answer", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "button is-block is-info is-large is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.submitPost()
                  }
                }
              },
              [_vm._v("\n\t\t\t\t\tSubmit\n\t\t\t\t")]
            ),
            _vm._v(" "),
            _vm.post.ajaxError.length > 0
              ? _c("div", { staticClass: "error-field" }, [
                  _vm._v(
                    "\n\t\t\t\t\t" + _vm._s(_vm.post.ajaxError) + "\n\t\t\t\t"
                  )
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.$emit("hideNewPost")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "post-title" }, [
      _c("div", [_vm._v(_vm._s(_vm.post.riddle))])
    ]),
    _vm._v(" "),
    !_vm.post.minimized
      ? _c("div", { staticClass: "post-description" }, [
          _vm.post.revealed
            ? _c(
                "div",
                {
                  staticClass: "description riddle",
                  on: {
                    click: function($event) {
                      _vm.post.revealed = false
                    }
                  }
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.post.answer) + "\n\t\t")]
              )
            : _c(
                "div",
                {
                  staticClass: "description riddle-reveal",
                  on: {
                    click: function($event) {
                      _vm.post.revealed = true
                    }
                  }
                },
                [_vm._v("\n\t\t\tClick to reveal\n\t\t")]
              )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-progressbar */ "./node_modules/vue-progressbar/dist/vue-progressbar.js");
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_progressbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_toasted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-toasted */ "./node_modules/vue-toasted/dist/vue-toasted.min.js");
/* harmony import */ var vue_toasted__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_toasted__WEBPACK_IMPORTED_MODULE_1__);
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
Vue.config.productionTip = false; // Ajax loading bar, MUST BE initialized with axios within each base .js file (eg posts.js and npcs.js)


var options = {
  color: '#3082ed',
  failedColor: '#ff0000',
  thickness: '10px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 500
  },
  autoRevert: true,
  location: 'bottom',
  inverse: false,
  autoFinish: false
};
Vue.use(vue_progressbar__WEBPACK_IMPORTED_MODULE_0___default.a, options);

Vue.use(vue_toasted__WEBPACK_IMPORTED_MODULE_1___default.a);
Vue.toasted.register('success', function (data) {
  if (data.message) {
    return data.message;
  }

  return 'Success';
}, {
  type: 'success',
  icon: {
    name: 'fa-check'
  },
  position: 'bottom-center',
  duration: '4000',
  iconPack: 'fontawesome',
  closeOnSwipe: true,
  action: {
    text: '×',
    class: 'toasted-icon',
    onClick: function onClick(e, toastObject) {
      toastObject.goAway(0);
    }
  }
});
Vue.toasted.register('error', function (data) {
  if (data.message) {
    return data.message;
  }

  return 'An error occurred. Please try again.';
}, {
  type: 'error',
  icon: {
    name: 'fa-exclamation-circle'
  },
  position: 'bottom-center',
  duration: '4000',
  iconPack: 'fontawesome',
  closeOnSwipe: true,
  action: {
    text: '×',
    class: 'toasted-icon',
    onClick: function onClick(e, toastObject) {
      toastObject.goAway(0);
    }
  }
});
window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt'); // Grab the csrf token from html document head and include with all axios requests

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),

/***/ "./resources/js/components/Main.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Main.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.vue?vue&type=template&id=b9c20fb8& */ "./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8&");
/* harmony import */ var _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.vue?vue&type=script&lang=js& */ "./resources/js/components/Main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Main.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Main.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=template&id=b9c20fb8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Main.vue?vue&type=template&id=b9c20fb8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_b9c20fb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/NewPostBase.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/NewPostBase.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewPostBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewPostBase.vue?vue&type=script&lang=js& */ "./resources/js/components/NewPostBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _NewPostBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/NewPostBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/NewPostBase.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/NewPostBase.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewPostBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./NewPostBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewPostBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewPostBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Post.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Post.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Post.vue?vue&type=template&id=5e8280ea& */ "./resources/js/components/Post.vue?vue&type=template&id=5e8280ea&");
/* harmony import */ var _Post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Post.vue?vue&type=script&lang=js& */ "./resources/js/components/Post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Post.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Post.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Post.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Post.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Post.vue?vue&type=template&id=5e8280ea&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Post.vue?vue&type=template&id=5e8280ea& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Post.vue?vue&type=template&id=5e8280ea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Post.vue?vue&type=template&id=5e8280ea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Post_vue_vue_type_template_id_5e8280ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Posts.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Posts.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Posts.vue?vue&type=template&id=4ac4d2f8& */ "./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8&");
/* harmony import */ var _Posts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Posts.vue?vue&type=script&lang=js& */ "./resources/js/components/Posts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Posts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Posts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Posts.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/Posts.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Posts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Posts.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Posts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Posts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Posts.vue?vue&type=template&id=4ac4d2f8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Posts.vue?vue&type=template&id=4ac4d2f8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Posts_vue_vue_type_template_id_4ac4d2f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ViewBase.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/ViewBase.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewBase.vue?vue&type=script&lang=js& */ "./resources/js/components/ViewBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _ViewBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ViewBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ViewBase.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/ViewBase.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ViewBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ViewBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/comments/Comment.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/comments/Comment.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=62ce996f& */ "./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f&");
/* harmony import */ var _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=js& */ "./resources/js/components/comments/Comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/comments/Comment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/comments/Comment.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/comments/Comment.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/Comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=template&id=62ce996f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/Comment.vue?vue&type=template&id=62ce996f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_62ce996f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/comments/CommentEdit.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/comments/CommentEdit.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentEdit.vue?vue&type=template&id=47711319& */ "./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319&");
/* harmony import */ var _CommentEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentEdit.vue?vue&type=script&lang=js& */ "./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CommentEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/comments/CommentEdit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentEdit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentEdit.vue?vue&type=template&id=47711319& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentEdit.vue?vue&type=template&id=47711319&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentEdit_vue_vue_type_template_id_47711319___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/comments/CommentList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/comments/CommentList.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentList.vue?vue&type=template&id=3828ebad& */ "./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad&");
/* harmony import */ var _CommentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentList.vue?vue&type=script&lang=js& */ "./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CommentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/comments/CommentList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentList.vue?vue&type=template&id=3828ebad& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentList.vue?vue&type=template&id=3828ebad&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentList_vue_vue_type_template_id_3828ebad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/comments/CommentReply.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/comments/CommentReply.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentReply.vue?vue&type=template&id=029db02a& */ "./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a&");
/* harmony import */ var _CommentReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentReply.vue?vue&type=script&lang=js& */ "./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CommentReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/comments/CommentReply.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentReply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommentReply.vue?vue&type=template&id=029db02a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/comments/CommentReply.vue?vue&type=template&id=029db02a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReply_vue_vue_type_template_id_029db02a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dungeons/DungeonListview.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonListview.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DungeonListview.vue?vue&type=template&id=5a49dfb2& */ "./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2&");
/* harmony import */ var _DungeonListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DungeonListview.vue?vue&type=script&lang=js& */ "./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DungeonListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dungeons/DungeonListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonListview.vue?vue&type=template&id=5a49dfb2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonListview.vue?vue&type=template&id=5a49dfb2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonListview_vue_vue_type_template_id_5a49dfb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dungeons/DungeonNewpost.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonNewpost.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DungeonNewpost.vue?vue&type=template&id=202f43a1& */ "./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1&");
/* harmony import */ var _DungeonNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DungeonNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DungeonNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dungeons/DungeonNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonNewpost.vue?vue&type=template&id=202f43a1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonNewpost.vue?vue&type=template&id=202f43a1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonNewpost_vue_vue_type_template_id_202f43a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dungeons/DungeonPostview.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonPostview.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DungeonPostview.vue?vue&type=template&id=1326b498& */ "./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498&");
/* harmony import */ var _DungeonPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DungeonPostview.vue?vue&type=script&lang=js& */ "./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DungeonPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dungeons/DungeonPostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonPostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DungeonPostview.vue?vue&type=template&id=1326b498& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dungeons/DungeonPostview.vue?vue&type=template&id=1326b498&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DungeonPostview_vue_vue_type_template_id_1326b498___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/hooks/HookListview.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/hooks/HookListview.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HookListview.vue?vue&type=template&id=d903aca0& */ "./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0&");
/* harmony import */ var _HookListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HookListview.vue?vue&type=script&lang=js& */ "./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HookListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/hooks/HookListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookListview.vue?vue&type=template&id=d903aca0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookListview.vue?vue&type=template&id=d903aca0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookListview_vue_vue_type_template_id_d903aca0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/hooks/HookNewpost.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/hooks/HookNewpost.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HookNewpost.vue?vue&type=template&id=a32a7c3a& */ "./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a&");
/* harmony import */ var _HookNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HookNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HookNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/hooks/HookNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookNewpost.vue?vue&type=template&id=a32a7c3a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookNewpost.vue?vue&type=template&id=a32a7c3a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookNewpost_vue_vue_type_template_id_a32a7c3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/hooks/HookPostview.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/hooks/HookPostview.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HookPostview.vue?vue&type=template&id=2fa0efb2& */ "./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2&");
/* harmony import */ var _HookPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HookPostview.vue?vue&type=script&lang=js& */ "./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HookPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/hooks/HookPostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookPostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HookPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./HookPostview.vue?vue&type=template&id=2fa0efb2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/hooks/HookPostview.vue?vue&type=template&id=2fa0efb2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HookPostview_vue_vue_type_template_id_2fa0efb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/items/ItemListview.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/items/ItemListview.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemListview.vue?vue&type=template&id=d58b9ce0& */ "./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0&");
/* harmony import */ var _ItemListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemListview.vue?vue&type=script&lang=js& */ "./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/items/ItemListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemListview.vue?vue&type=template&id=d58b9ce0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemListview.vue?vue&type=template&id=d58b9ce0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemListview_vue_vue_type_template_id_d58b9ce0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/items/ItemNewpost.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/items/ItemNewpost.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemNewpost.vue?vue&type=template&id=431e3e03& */ "./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03&");
/* harmony import */ var _ItemNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/items/ItemNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemNewpost.vue?vue&type=template&id=431e3e03& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemNewpost.vue?vue&type=template&id=431e3e03&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemNewpost_vue_vue_type_template_id_431e3e03___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/items/ItemPostview.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/items/ItemPostview.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemPostview.vue?vue&type=template&id=315cf792& */ "./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792&");
/* harmony import */ var _ItemPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemPostview.vue?vue&type=script&lang=js& */ "./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/items/ItemPostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemPostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemPostview.vue?vue&type=template&id=315cf792& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/items/ItemPostview.vue?vue&type=template&id=315cf792&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPostview_vue_vue_type_template_id_315cf792___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/maps/MapListview.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/maps/MapListview.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapListview.vue?vue&type=template&id=2845a61c& */ "./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c&");
/* harmony import */ var _MapListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapListview.vue?vue&type=script&lang=js& */ "./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MapListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/maps/MapListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapListview.vue?vue&type=template&id=2845a61c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapListview.vue?vue&type=template&id=2845a61c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapListview_vue_vue_type_template_id_2845a61c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/maps/MapNewpost.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/maps/MapNewpost.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapNewpost.vue?vue&type=template&id=145d4e61& */ "./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61&");
/* harmony import */ var _MapNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MapNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/maps/MapNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapNewpost.vue?vue&type=template&id=145d4e61& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapNewpost.vue?vue&type=template&id=145d4e61&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapNewpost_vue_vue_type_template_id_145d4e61___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/maps/MapPostview.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/maps/MapPostview.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapPostview.vue?vue&type=template&id=f0001a18& */ "./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18&");
/* harmony import */ var _MapPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapPostview.vue?vue&type=script&lang=js& */ "./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MapPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/maps/MapPostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapPostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapPostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapPostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MapPostview.vue?vue&type=template&id=f0001a18& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/maps/MapPostview.vue?vue&type=template&id=f0001a18&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MapPostview_vue_vue_type_template_id_f0001a18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleListview.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleListview.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PuzzleListview.vue?vue&type=template&id=388816a6& */ "./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6&");
/* harmony import */ var _PuzzleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PuzzleListview.vue?vue&type=script&lang=js& */ "./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PuzzleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/puzzles/PuzzleListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzleListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzleListview.vue?vue&type=template&id=388816a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleListview.vue?vue&type=template&id=388816a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleListview_vue_vue_type_template_id_388816a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleNewpost.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleNewpost.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PuzzleNewpost.vue?vue&type=template&id=0e945e2d& */ "./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d&");
/* harmony import */ var _PuzzleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PuzzleNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PuzzleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/puzzles/PuzzleNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzleNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzleNewpost.vue?vue&type=template&id=0e945e2d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzleNewpost.vue?vue&type=template&id=0e945e2d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzleNewpost_vue_vue_type_template_id_0e945e2d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/puzzles/PuzzlePostview.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzlePostview.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PuzzlePostview.vue?vue&type=template&id=56aa46b0& */ "./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0&");
/* harmony import */ var _PuzzlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PuzzlePostview.vue?vue&type=script&lang=js& */ "./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PuzzlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/puzzles/PuzzlePostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzlePostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PuzzlePostview.vue?vue&type=template&id=56aa46b0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/puzzles/PuzzlePostview.vue?vue&type=template&id=56aa46b0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PuzzlePostview_vue_vue_type_template_id_56aa46b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/riddles/RiddleListview.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/riddles/RiddleListview.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RiddleListview.vue?vue&type=template&id=b14a50ec& */ "./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec&");
/* harmony import */ var _RiddleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RiddleListview.vue?vue&type=script&lang=js& */ "./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RiddleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/riddles/RiddleListview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddleListview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleListview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleListview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddleListview.vue?vue&type=template&id=b14a50ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleListview.vue?vue&type=template&id=b14a50ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleListview_vue_vue_type_template_id_b14a50ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/riddles/RiddleNewpost.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/riddles/RiddleNewpost.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RiddleNewpost.vue?vue&type=template&id=43b3f0c9& */ "./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9&");
/* harmony import */ var _RiddleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RiddleNewpost.vue?vue&type=script&lang=js& */ "./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RiddleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/riddles/RiddleNewpost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddleNewpost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleNewpost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddleNewpost.vue?vue&type=template&id=43b3f0c9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddleNewpost.vue?vue&type=template&id=43b3f0c9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddleNewpost_vue_vue_type_template_id_43b3f0c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/riddles/RiddlePostview.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/riddles/RiddlePostview.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RiddlePostview.vue?vue&type=template&id=437d9d8c& */ "./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c&");
/* harmony import */ var _RiddlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RiddlePostview.vue?vue&type=script&lang=js& */ "./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RiddlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/riddles/RiddlePostview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddlePostview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddlePostview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddlePostview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RiddlePostview.vue?vue&type=template&id=437d9d8c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/riddles/RiddlePostview.vue?vue&type=template&id=437d9d8c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiddlePostview_vue_vue_type_template_id_437d9d8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/posts.js":
/*!*******************************!*\
  !*** ./resources/js/posts.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
//Vue.component('example-component', require('./components/ExampleComponent.vue').default);


Vue.component('main-view', __webpack_require__(/*! ./components/Main.vue */ "./resources/js/components/Main.vue").default);
Vue.component('posts', __webpack_require__(/*! ./components/Posts.vue */ "./resources/js/components/Posts.vue").default);
Vue.component('post', __webpack_require__(/*! ./components/Post.vue */ "./resources/js/components/Post.vue").default);
Vue.component('comment', __webpack_require__(/*! ./components/comments/Comment.vue */ "./resources/js/components/comments/Comment.vue").default);
Vue.component('comment-edit', __webpack_require__(/*! ./components/comments/CommentEdit.vue */ "./resources/js/components/comments/CommentEdit.vue").default);
Vue.component('comment-list', __webpack_require__(/*! ./components/comments/CommentList.vue */ "./resources/js/components/comments/CommentList.vue").default);
Vue.component('comment-reply', __webpack_require__(/*! ./components/comments/CommentReply.vue */ "./resources/js/components/comments/CommentReply.vue").default);
Vue.component('new-post-base', __webpack_require__(/*! ./components/NewPostBase.vue */ "./resources/js/components/NewPostBase.vue").default);
Vue.component('hook-listview', __webpack_require__(/*! ./components/hooks/HookListview.vue */ "./resources/js/components/hooks/HookListview.vue").default);
Vue.component('hook-postview', __webpack_require__(/*! ./components/hooks/HookPostview.vue */ "./resources/js/components/hooks/HookPostview.vue").default);
Vue.component('hook-newpost', __webpack_require__(/*! ./components/hooks/HookNewpost.vue */ "./resources/js/components/hooks/HookNewpost.vue").default);
Vue.component('item-listview', __webpack_require__(/*! ./components/items/ItemListview.vue */ "./resources/js/components/items/ItemListview.vue").default);
Vue.component('item-postview', __webpack_require__(/*! ./components/items/ItemPostview.vue */ "./resources/js/components/items/ItemPostview.vue").default);
Vue.component('item-newpost', __webpack_require__(/*! ./components/items/ItemNewpost.vue */ "./resources/js/components/items/ItemNewpost.vue").default);
Vue.component('riddle-listview', __webpack_require__(/*! ./components/riddles/RiddleListview.vue */ "./resources/js/components/riddles/RiddleListview.vue").default);
Vue.component('riddle-postview', __webpack_require__(/*! ./components/riddles/RiddlePostview.vue */ "./resources/js/components/riddles/RiddlePostview.vue").default);
Vue.component('riddle-newpost', __webpack_require__(/*! ./components/riddles/RiddleNewpost.vue */ "./resources/js/components/riddles/RiddleNewpost.vue").default);
Vue.component('puzzle-listview', __webpack_require__(/*! ./components/puzzles/PuzzleListview.vue */ "./resources/js/components/puzzles/PuzzleListview.vue").default);
Vue.component('puzzle-postview', __webpack_require__(/*! ./components/puzzles/PuzzlePostview.vue */ "./resources/js/components/puzzles/PuzzlePostview.vue").default);
Vue.component('puzzle-newpost', __webpack_require__(/*! ./components/puzzles/PuzzleNewpost.vue */ "./resources/js/components/puzzles/PuzzleNewpost.vue").default);
Vue.component('dungeon-listview', __webpack_require__(/*! ./components/dungeons/DungeonListview.vue */ "./resources/js/components/dungeons/DungeonListview.vue").default);
Vue.component('dungeon-postview', __webpack_require__(/*! ./components/dungeons/DungeonPostview.vue */ "./resources/js/components/dungeons/DungeonPostview.vue").default);
Vue.component('dungeon-newpost', __webpack_require__(/*! ./components/dungeons/DungeonNewpost.vue */ "./resources/js/components/dungeons/DungeonNewpost.vue").default);
Vue.component('map-listview', __webpack_require__(/*! ./components/maps/MapListview.vue */ "./resources/js/components/maps/MapListview.vue").default);
Vue.component('map-postview', __webpack_require__(/*! ./components/maps/MapPostview.vue */ "./resources/js/components/maps/MapPostview.vue").default);
Vue.component('map-newpost', __webpack_require__(/*! ./components/maps/MapNewpost.vue */ "./resources/js/components/maps/MapNewpost.vue").default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

var app = new Vue({
  el: '#app'
}); // before a request is made start vue-progressbar

axios.interceptors.request.use(function (config) {
  app.$Progress.start(5000);
  return config;
}); // before a response is returned stop vue-progressbar

axios.interceptors.response.use(function (response) {
  if (response.status !== 200) {
    console.log('ajax fail');
    app.$Progress.fail();
  } else {
    console.log('end ajax');
    app.$Progress.finish();
  }

  return response;
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/posts.js ./resources/sass/app.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\laragon\www\dnd_companion\resources\js\posts.js */"./resources/js/posts.js");
module.exports = __webpack_require__(/*! C:\laragon\www\dnd_companion\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);