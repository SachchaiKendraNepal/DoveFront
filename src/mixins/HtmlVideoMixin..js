const HtmlVideoMixin = {
	methods: {
		onPlay(e) {
			document.querySelectorAll("video")
				.forEach(video => {
					if (video !== e.currentTarget) {
						if (!video.paused) {
							video.pause()
						}
					}
				})
		}
	},
}

export default HtmlVideoMixin
