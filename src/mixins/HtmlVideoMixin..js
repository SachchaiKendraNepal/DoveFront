const HtmlVideoMixin = {
	computed: {
		player() {
			return this.$refs.youtube.yt
		}
	},
	methods: {
		async onPlay(e) {
			await this.pauseAllYt()
			document.querySelectorAll("video")
				.forEach(video => {
					if (video !== e.currentTarget) {
						if (!video.paused) {
							video.pause()
						}
					}
				})
		},
		pauseAllPlayingHTMLVideos() {
			document.querySelectorAll("video")
				.forEach(video => {
					if (!video.paused) {
						video.pause()
					}
				})
		},
		async playing(e) {
			const currentPlaying = e.getVideoUrl()
			this.pauseAllPlayingHTMLVideos()
			if (Array.isArray(this.$refs.yt)) {
				await this.$refs.yt.forEach(async ref => {
					const url = await ref.player.getVideoUrl()
					if (url !== currentPlaying) {
						await ref.player.pauseVideo()
					}
				})
			}
		},
		async pauseAllYt() {
			if (Array.isArray(this.$refs.yt)) {
				await this.$refs.yt.forEach(async ref => {
					await ref.player.pauseVideo()
				})
			}
		},
	},
}

export default HtmlVideoMixin
