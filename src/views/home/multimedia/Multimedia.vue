<template>
	<base-post-card>
		<template v-slot:media>
			<vue-player
				src="http://techslides.com/demos/sample-videos/small.mp4"
				poster="https://via.placeholder.com/150"
				title="this is a title"
				v-model="playing"
			></vue-player>
		</template>
	</base-post-card>
</template>
<script>
	import vuePlayer from "@algoz098/vue-player"

	export default {
		name: "MultimediaComponent",
		components: {
			vuePlayer,
			BasePostCard: () => import("@/views/home/post/_post")
		},
		data() {
			return {
				isLiked: false
			}
		}
	}
</script>
