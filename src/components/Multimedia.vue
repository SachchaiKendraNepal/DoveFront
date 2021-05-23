<template>
	<base-post-card :post="post">
		<template #media>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="py-0"
				>
					<v-carousel :show-arrows="false"
						height="30vh"
						vertical-delimiters="true"
						class="round-touch"
					>
						<v-carousel-item
							v-for="item in post['multimedia_images']"
							:key="item.id + 5 * 7"
							:src="item.image"
							transition="fade-transition"
							reverse-transition="fade-transition"
						/>
						<v-carousel-item v-for="item in post['multimedia_videos']"
							:key="item.id + 7 * 11"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
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
							</template>
						</v-carousel-item>
						<v-carousel-item v-for="item in post['multimedia_video_urls']"
							:key="item.id + 11 * 13"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
								<div class="video-container">
									<iframe :src="prepareEmbedUrl(item.video_url)"
										frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									/>
								</div>
							</template>
						</v-carousel-item>
					</v-carousel>
				</v-col>
			</v-row>
		</template>
	</base-post-card>
</template>
<script>
export default {
	name: "MultimediaComponent",
	components: {
		VideoPlayer: () => import("@/components/VideoPlayer"),
		BasePostCard: () => import("@/components/post/_post")
	},
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	methods: {
		getId(url) {
			return this.$helper.getVideoIdFromYoutubeURL(url)
		},
		prepareEmbedUrl(url) {
			return `https://www.youtube.com/embed/${this.getId(url)}`
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
		height: 14px;
		width: 14px;
	}
}
</style>
