<script>
export default {
	filters: {
		maxLength: function(t) {
			//Limit the max length of the output to 'max', and backtrack to the last space to end at the end of a word
			var max=1000;
			if (t.length > max) {
				var t2 = t.substr(0,max);
				return t2.substr(0, t2.lastIndexOf(' '))+'...';
    				}
    				return t;
		},
		nl2br: function(t) {
			return t.replace(/(?:\r\n|\r|\n|\\r\\n|\\r|\\n)/g, "<br />")
		},
	},
	props: {
		post: Object,
		showExternalImages: Boolean
	},
	data: function() {
		return {
			
		}
	},
	computed: {
				
	},
	methods:{
				
	},
}
</script>