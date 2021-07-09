<template>
	<div>
		<div v-for="post in posts"
			:key="post.id" class="mb-2"
		>
			<base-post-card :post="post">
				<template #media>
					<v-col cols="12"
						class="pt-0 px-2"
					>
						<v-card height="40vh"
							dark
						>
							<v-carousel height="40vh"
								hide-delimiters
								class="media-carousel"
							>
								<template #prev="{ on, attrs }">
									<v-btn
										v-show="moreThanOneItem(post)"
										class="carousel-btn"
										v-bind="attrs"
										icon
										v-on="on"
										@click="pauseAllPlaying()"
									>
										<v-icon>mdi-chevron-left</v-icon>
									</v-btn>
								</template>
								<template #next="{ on, attrs }">
									<v-btn
										v-show="moreThanOneItem(post)"
										class="carousel-btn"
										v-bind="attrs"
										icon
										v-on="on"
										@click="pauseAllPlaying()"
									>
										<v-icon>mdi-chevron-right</v-icon>
									</v-btn>
								</template>
								<v-carousel-item v-for="image in post['multimedia_images']"
									:key="image.image"
									:src="image.image"
								/>
								<v-carousel-item v-for="video in post['multimedia_videos']"
									:key="video.video"
								>
									<v-card
										height="40vh"
										max-width="100%"
										dark
										class="ma-0 pa-0"
									>
										<video
											:poster="video.poster"
											controls
											height="100%"
											width="100%"
											:src="video.video"
											@play="onPlay"
										/>
									</v-card>
								</v-carousel-item>
								<v-carousel-item v-for="video in post['multimedia_video_urls']"
									:key="video.video_url"
								>
									<youtube
										ref="yt"
										height="100%"
										width="100%"
										:video-id="$youtube.getIdFromUrl(video.video_url)"
										@playing="playing"
									/>
								</v-carousel-item>
							</v-carousel>
						</v-card>
					</v-col>
				</template>
			</base-post-card>
		</div>
	</div>
</template>
<script>
import HtmlVideoMixin from "@/mixins/HtmlVideoMixin..js";

export default {
	name: "MultimediaList",
	components: {
		BasePostCard: () => import("@/components/post/_post.vue")
	},
	mixins: [HtmlVideoMixin],
	props: {
		posts: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			dialog: false
		}
	},
	methods: {
		async pauseAllPlaying() {
			await this.pauseAllYt()
			await this.pauseAllPlayingHTMLVideos()
		},
		moreThanOneItem(media) {
			const mediaImages = media["multimedia_images"]
			const mediaVideos = media["multimedia_videos"]
			const mediaUrls = media["multimedia_video_urls"]
			let temp = []
			temp = temp.concat(mediaImages)
			temp = temp.concat(mediaVideos)
			temp = temp.concat(mediaUrls)
			return temp.length > 1
		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep div.title {
	text-align: center !important;
}
::v-deep.v-carousel--vertical-delimiters .v-carousel__controls {
	width: 30px;
}
::v-deep.v-item-group {
	button {
		height: 4px !important;
		width: 4px !important;
	}
}
.youtube-thumbnail {
	position: relative;
	.yt-video-icon {
		position: absolute;
		top: 40%;
		left: 45%;
	}
	.video-icon {
		position: absolute;
		top: 2%;
		right: 2%;
	}
}
.media-carousel {
	.carousel-btn {
		display: none;
	}
}
.media-carousel:hover {
	.carousel-btn {
		display: block;
	}
}
</style>
