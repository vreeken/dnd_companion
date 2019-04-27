<template>
	<div v-if="posts">
		<div v-for="p in posts" :key="p.id" class="post" :class="{minimized: p.minimized}">
			<!--
            <div class="post-rank">
                <br/>
                <span v-html="index+1"></span>
            </div>
            -->
			<div class="vote-btns">
				<div class="vote-arrow up" :class="{'voted': p.voted==1}" @click="upvote(p)">
					<i class="fas fa-arrow-alt-circle-up" />
				</div>
				<div class="score" :title="'+'+p.upvotes+' -'+p.downvotes">
					{{ p.upvotes-p.downvotes }}
				</div>
				<div class="vote-arrow down" :class="{'voted': p.voted==0}" @click="downvote(p)">
					<i class="fas fa-arrow-alt-circle-down" />
				</div>
			</div>
			<div class="post-content">
				<div class="">
					<component :is="postTypeListview" :post="p" :show-external-images="showExternalImages" />
					<div v-show="!p.minimized" class="post-date">
						Submitted 
						<time :title="p.created_at" class="">{{ p.created_at | fromNow }}</time> 
						by <span>{{ p.username }}</span>
					</div>
					<ul v-show="!p.minimized" class="post-buttons">
						<li>
							<span class="link post-num-comments" @click="viewPost(p, true)"><i v-if="p.commentcount>0" class="fas fa-comments" /><i v-else class="far fa-comments" /> {{ p.commentcount }} comment<span v-if="p.commentcount!=1">s</span></span>
						</li>
						<li class="post-save">
							<span v-if="p.saved" class="post-save link" @click="unsavePost(p)"><i class="fas fa-bookmark" /> unsave</span>
							<span v-else class="post-save link" @click="savePost(p)"><i class="far fa-bookmark" /> save</span>
						</li>
						<li class="post-share">
							<span class="post-share link" @click="sharePost(p)"><i class="fas fa-share-alt" /> share</span>
						</li>
						<li class="post-report-button">
							<span class="post-report link" @click="reportPost(p)"><i class="fas fa-exclamation-triangle" /> report</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="post-minimize-btn" @click="toggleMinimized(p)">
				<i v-show="!p.minimized" class="far fa-minus-square" />
				<i v-show="p.minimized" class="far fa-plus-square" />
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from './eventbus/EventBus.js';

export default {
	filters: {
		fromNow: function(v) {
			/*
			if (moment(v).isValid()) {
				return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
			}
			return v;
			*/
			return window.fromNow(v);
		},
	},
	props: {
		posts: Array,
		showExternalImages: Boolean,
		componentPostType: String
	},
	data: function() {
		return {
			postTypeListview: this.componentPostType + '-listview'
		}
	},
	mounted: function() {
		EventBus.$on('postLogin', () => {
			window.location.reload();
		});
		EventBus.$on('postRegister', () => {
			window.location.reload();
		});
	},
	computed: {
				
	},
	methods:{
		upvote: function(p) { this.$root.$emit('upvote', p); },
		downvote: function(p) { this.$root.$emit('downvote', p); },
		expandPost: function(p) { this.$root.$emit('expandPost', p); },
		viewPost: function(p, b) { this.$root.$emit('viewPost', p, b); },
		unsavePost: function(p) { this.$root.$emit('unsavePost', p); },
		savePost: function(p) { this.$root.$emit('savePost', p); },
		sharePost: function(p) { this.$root.$emit('sharePost', p); },
		reportPost: function(p) { this.$root.$emit('reportPost', p); },
		toggleMinimized: function(p) { this.$root.$emit('toggleMinimized', p); },
	},
}
</script>
