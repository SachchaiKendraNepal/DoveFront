<template>
	<v-col
		v-if="nowPlaying"
		cols="12"
		class="ma-0"
	>
		<v-card
			max-width="1000"
			height="400"
			class="ma-0 pa-0 mx-0"
		>
			<youtube-iframe :video-url="nowPlaying"
				height="400"
			/>
		</v-card>
		<v-list>
			<v-list-item v-for="(videoUrl, index) in videoUrls"
				:key="videoUrl.id"
				@click="1"
			>
				<v-list-item-avatar tile>
					<v-img class="thumbnail-radius"
						:src="thumbnail(videoUrl.video_url)"
					/>
				</v-list-item-avatar>
				<v-list-item-content>
					<div class="video-list-name">
						Video {{ index + 1 }}
						<!--						{{ getYTTitle(videoUrl.video_url) }} {{ index }}-->
						<!--						{{ // titleArray[index] }}-->
					</div>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn v-if="!(nowPlaying === videoUrl.video_url)" icon
						color="red lighten-1"
						@click="nowPlaying = videoUrl.video_url"
					>
						<v-icon>mdi-play</v-icon>
					</v-btn>
					<div v-else
						class="green--text"
					>
						Currently Playing
					</div>
				</v-list-item-action>
			</v-list-item>
		</v-list>
	</v-col>
</template>

<script>
// const getYoutubeTitle = require("get-youtube-title")
// import getVideoTitleCheck from "@/ytTitle"
export default {
	name: "YoutubePlayList",
	components: {
		YoutubeIframe: () => import("@/components/YoutubeIframe")
	},
	props: {
		videoUrls: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			nowPlaying: null,
			titleArray: [],
		}
	},
	created() {
		if (this.videoUrls.length > 0) {
			this.nowPlaying = this.videoUrls[0].video_url
		}
	},
	methods: {
		thumbnail(videoUrl) {
			const youtube_video_id = this.getId(videoUrl)
			return `//img.youtube.com/vi/${youtube_video_id}/0.jpg`
		},
		getId(videoUrl) {
			return this.$helper.getVideoIdFromYoutubeURL(videoUrl)
		}
	}
}
</script>

<style scoped>
.thumbnail-radius {
	border-radius: 5px;
}
</style>
