<template>
	<iframe
		v-if="videoUrl"
		id="youtube-video-frame"
		:src="prepareEmbedUrl(videoUrl)"
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
		allowfullscreen
		controls="1"
		:height="height"
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
		},
		height: {
			type: String,
			required: false,
			default: "100%"
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
