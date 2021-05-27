<template>
	<iframe v-if="videoUrl" :src="prepareEmbedUrl(videoUrl)"
		frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		height="100%"
		width="100%"
	/>
</template>

<script>
export default {
	name: "YoutubeIframe",
	props: {
		videoUrl: {
			type: String,
			required: true
		}
	},
	methods: {
		getId(videoUrl) {
			return this.$helper.getVideoIdFromYoutubeURL(videoUrl)
		},
		prepareEmbedUrl(videoUrl) {
			return `https://www.youtube.com/embed/${this.getId(videoUrl)}`
		}
	}
}
</script>

<style scoped>

</style>
