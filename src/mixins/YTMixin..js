const YTMixin = {
	computed: {
		player() {
			return this.$refs.youtube.yt
		}
	},
	methods: {
		async playing(e) {
			const currentPlaying = e.getVideoUrl()
			if (Array.isArray(this.$refs.yt)) {
				await this.$refs.yt.forEach(async ref => {
					const url = await ref.player.getVideoUrl()
					if (url !== currentPlaying) {
						ref.player.pauseVideo()
					}
				})
			}
		},
	},
}

export default YTMixin
