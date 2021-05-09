<template>
	<div>
		<video ref="videoPlayer"
			class="video-js"
		/>
	</div>
</template>

<script>
import videojs from "video.js";
export default {
	name: "VideoPlayer",
	props: {
		options: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			player: null
		}
	},
	mounted() {
		this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
			// do sth
		})
	},
	beforeUnmount() {
		if (this.player) this.player.dispose()
	}
}
</script>

<style scoped>

</style>
