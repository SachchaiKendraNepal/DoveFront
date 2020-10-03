<template>
	<base-post-card :post="post">
		<template #media>
			<vue-player
				v-model="playing"
				:src="videoUrl"
				:poster="videoPosterImageUrl"
				:title="videoPosterTitle"
			/>
		</template>
	</base-post-card>
</template>
<script>
import vuePlayer from "@algoz098/vue-player"

export default {
	name: "MultimediaComponent",
	components: {
		vuePlayer,
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
			videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
			videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
			videoPosterTitle: "ALICE IN THE WONDERLAND",
			playing: false,
			isLiked: false
		}
	}
}
</script>
<style lang="sass" scoped>
::v-deep div.title
	text-align: center !important
</style>
