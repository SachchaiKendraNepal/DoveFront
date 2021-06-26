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
							class="youtube-thumbnail cursor"
							@click="$router.push({ name: 'SACHCHAI NEPAL MULTIMEDIA', params: { id: post.id }})"
						>
							<v-img
								class="yt-video-icon"
								:src="require('@/assets/yt-icon.png')"
								height="30"
								width="40"
							/>
						</v-img>
						<v-img
							v-else-if="post['multimedia_images'].length > 0"
							height="400"
							contain
							class="youtube-thumbnail"
							:src="post['multimedia_images'][0]['image']"
						>
							<div class="video-icon">
								<v-icon
									size="20"
									color="white"
								>
									mdi-video
								</v-icon>
							</div>
						</v-img>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</base-post-card>
</template>
<script>
export default {
	name: "MultimediaComponent",
	components: {
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
