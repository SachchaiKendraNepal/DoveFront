<template>
	<base-post-card :post="post">
		<template #media>
			<v-row
				class="ma-0 pa-0"
			>
				<v-col
					v-for="(item,index) of post.video_urls.slice(0, 2)"
					:key="item.id"
					class="ma-0 pa-0"
					cols="12"
					:xl="
						(post.video_urls.slice(0, 2).length === 1)
							? '12'
							: '6'
					"
					:lg="
						(post.video_urls.slice(0, 2).length === 1)
							? '12'
							: '6'
					"
					:md="
						(post.video_urls.slice(0, 2).length === 1)
							? '12'
							: '6'
					"
					:sm="
						(post.video_urls.slice(0, 2).length === 1)
							? '12'
							: '6'
					"
					:class="
						(post.video_urls.slice(0, 2).length === 1)
							? ''
							: (index === 1) && $vuetify.breakpoint.smAndUp
								? 'pl-1'
								: ''
					"
				>
					<youtube
						ref="youtube"
						class="pa-0"
						:video-id="getId(item)"
						:resize="true"
						:resize-delay="1"
						:fit-parent="true"
						@playing="playing"
					/>
				</v-col>
			</v-row>
		</template>
	</base-post-card>
</template>
<script>
const util = require("util")

export default {
	name: "MultimediaComponent",
	components: {
		BasePostCard: () => import("@/components/post/_post")
	},
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isLiked: false
		}
	},
	computed: {
		player() {
			return this.$refs.youtube.player
		},
	},
	methods: {
		playVideo() {
			this.player.playVideo()
		},
		playing() {
			// console.log("\o/ we are watching!!!")
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
		}
	}
}
</script>
<style lang="sass" scoped>
::v-deep div.title
	text-align: center !important
</style>
