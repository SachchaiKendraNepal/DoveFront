<template>
	<base-post-card :post="post">
		<template #media>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="py-0"
				>
					<v-card height="400"
						dark
					>
						<v-img
							v-if="post['multimedia_video_urls'].length > 0"
							height="400"
							contain
							:src="$helper.getThumbnailForYoutubeVideo(post['multimedia_video_urls'][0]['video_url'])"
							class="youtube-thumbnail"
							@click="dialog=true"
						>
							<div class="video-icon">
								<v-icon
									size="40"
									color="white"
								>
									mdi-video
								</v-icon>
							</div>
							<v-img
								class="yt-video-icon"
								:src="require('@/assets/yt-icon.png')"
								height="60"
								width="80"
							/>
						</v-img>
						<v-img
							v-else-if="post['multimedia_images'].length > 0"
							height="400"
							contain
							class="youtube-thumbnail"
							:src="post['multimedia_images'][0]['image']"
							@click="dialog=true"
						>
							<div class="video-icon">
								<v-icon
									size="40"
									color="white"
								>
									mdi-video
								</v-icon>
							</div>
						</v-img>
					</v-card>
				</v-col>
			</v-row>
			<v-dialog v-model="dialog">
				<v-card
					dark
					height="600"
					width="98vw"
					class="mx-auto"
				>
					<v-carousel
						show-arrows
						width="98vw"
						height="600"
						hide-delimiters
					>
						<template #next="{ on, attrs }">
							<v-btn dark
								icon
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>mdi-chevron-right</v-icon>
							</v-btn>
						</template>
						<template #prev="{ on, attrs }">
							<v-btn dark
								icon
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>mdi-chevron-left</v-icon>
							</v-btn>
						</template>
						<v-carousel-item
							v-for="item in post['multimedia_images']"
							:key="item.id + 5 * 7"
							:src="item.image"
							transition="fade-transition"
							reverse-transition="fade-transition"
						/>
						<v-carousel-item v-for="(item, index) in post['multimedia_videos']"
							:key="item.id + 7 * 11"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
								<v-card height="600"
									max-width="1000" class="mx-auto"
									:class="'video-player-' + index"
								>
									<video-player
										:options="{
											fluid: true,
											fill: true,
											autoplay: false,
											controls: true,
											sources: [
												{
													src: item.video,
													type: 'video/mp4'
												}
											]
										}"
									/>
								</v-card>
							</template>
						</v-carousel-item>
						<v-carousel-item v-for="item in post['multimedia_video_urls']"
							:key="item.id + 11 * 13"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
								<v-card height="600"
									max-width="1000" class="mx-auto"
								>
									<youtube-iframe :video-url="item.video_url"
										height="600"
									/>
								</v-card>
							</template>
						</v-carousel-item>
					</v-carousel>
				</v-card>
			</v-dialog>
		</template>
	</base-post-card>
</template>
<script>
export default {
	name: "MultimediaComponent",
	components: {
		YoutubeIframe: () => import("@/components/YoutubeIframe"),
		VideoPlayer: () => import("@/components/VideoPlayer"),
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
			dialog: false
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
</style>
