<template>
	<base-post-card :post="post">
		<template #media>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="py-0"
				>
					<v-carousel :show-arrows="false"
						height="400"
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
						<v-carousel-item v-for="(item, index) in post['multimedia_videos']"
							:key="item.id + 7 * 11"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
								<v-card height="400"
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
								<v-card height="400"
									max-width="1000" class="mx-auto"
								>
									<youtube-iframe :video-url="item.video_url"
										height="400"
									/>
								</v-card>
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
		YoutubeIframe: () => import("@/components/YoutubeIframe"),
		VideoPlayer: () => import("@/components/VideoPlayer"),
		BasePostCard: () => import("@/components/post/_post")
	},
	props: {
		post: {
			type: Object,
			required: true
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
