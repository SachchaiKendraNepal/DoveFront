<template>
	<base-post-card :post="post">
		<template #media>
			<youtube
				ref="youtube"
				class="pa-4"
				:video-id="getId(videoUrl)"
				:resize="true"
				:resize-delay="100"
				:fit-parent="true"
				@playing="playing"
			/>
		</template>
	</base-post-card>
</template>
<script>
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
			videoUrl: "https://www.youtube.com/watch?v=6li2Kib4uI0&ab_channel=Sachhaikendranepal",
			videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
			videoPosterTitle: "ALICE IN THE WONDERLAND",
			isLiked: false,
			duration: 1000
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
			console.log("\o/ we are watching!!!")
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
