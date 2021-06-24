<template>
	<v-card dark
		width="100vw"
		flat tile
	>
		<v-app-bar
			app
			fixed
			dark
			height="60"
			tile
		>
			<v-app-bar-nav-icon
				@click="$router.push({name: 'HOME'})"
			>
				<v-icon>
					mdi-arrow-left-circle
				</v-icon>
			</v-app-bar-nav-icon>
			<v-toolbar-title>
				{{ (multimedia) ? multimedia.title : "Not Found" }}
			</v-toolbar-title>
			<v-spacer />
			<v-icon>mdi-video-vintage</v-icon>
			<div class="px-1" />
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<not-found v-if="postNotAvailable" />
				<v-card v-else
					max-width="1000"
					:loading="loading"
					class="mx-auto"
					flat tile
				>
					<base-post-detail
						v-if="multimediaId"
						:target="multimedia"
					>
						<template #media>
							<v-carousel height="calc(100vh - 60px)"
								dark
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
									v-for="item in multimedia['multimedia_images']"
									:key="item.id + 505700 * 7"
									active-class="multimedia-active-image"
									reverse-transition="fade-transition"
									transition="fade-transition"
								>
									<template #default>
										<v-card height="calc(100vh - 60px)"
											class="rounded-0"
										>
											<v-img :src="item.image"
												height="calc(100vh - 60px)"
												contain
											>
												<v-btn
													class="ma-2"
													fab
													x-small
													@click="deleteImage(item.id)"
												>
													<v-icon color="error">
														mdi-delete
													</v-icon>
												</v-btn>
											</v-img>
										</v-card>
									</template>
								</v-carousel-item>
								<v-carousel-item
									v-for="item in multimedia['multimedia_videos']"
									:key="item.id + 700014 * 11"
									active-class="multimedia-active-video"
									reverse-transition="fade-transition"
									transition="fade-transition"
								>
									<template #default>
										<v-card
											height="calc(100vh - 60px)"
											class="rounded-0"
										>
											<v-btn
												class="ma-2"
												fab
												x-small
												@click="deleteVideo(item.id)"
											>
												<v-icon color="error">
													mdi-delete
												</v-icon>
											</v-btn>
											<video-player
												:options="{
													fluid: true,
													fill: true,
													autoplay: true,
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
								<v-carousel-item
									v-if="multimedia['multimedia_video_urls']"
									active-class="multimedia-active-video-url"
									transition="fade-transition"
									reverse-transition="fade-transition"
								>
									<template #default>
										<v-card
											v-if="nowPlaying"
											dark
											height="calc(100vh - 60px)"
											class="rounded-0"
										>
											<v-card
												height="600"
												class="rounded-0"
											>
												<youtube-iframe
													:video-url="nowPlaying"
													height="600"
												/>
											</v-card>
											<v-list class="rounded-t-0">
												<v-list-item v-for="(videoUrl) in multimedia['multimedia_video_urls']"
													:key="videoUrl.id + 522222 * 5.7"
													@click="1"
												>
													<v-list-item-avatar tile>
														<v-img class="thumbnail-radius"
															:src="videoUrlThumbnail(videoUrl)"
														/>
													</v-list-item-avatar>
													<v-list-item-content>
														<div class="video-list-name cursor"
															@click="nowPlaying = videoUrl.video_url"
														>
															{{ videoUrl['yt_info']['title'] }}
															<span>
																<v-btn v-if="!(nowPlaying === videoUrl.video_url)" icon
																	color="red lighten-1"
																>
																	<v-icon>mdi-play</v-icon>
																</v-btn>
																<span v-else>
																	<v-icon color="green">mdi-play</v-icon>
																</span>
															</span>
														</div>
													</v-list-item-content>
													<v-list-item-action>
														<v-btn
															class="ma-2"
															fab
															x-small
															@click="deleteVideoUrl(videoUrl.id)"
														>
															<v-icon color="error">
																mdi-delete
															</v-icon>
														</v-btn>
													</v-list-item-action>
												</v-list-item>
											</v-list>
										</v-card>
									</template>
								</v-carousel-item>
							</v-carousel>
						</template>
						<template #comments>
							<comments-detail />
						</template>
					</base-post-detail>
				</v-card>
			</v-container>
		</v-main>
		<small-footer />
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import SmallFooter from "@/components/SmallFooter";

export default {
	name: "MultimediaDetailView",
	components: {
		SmallFooter,
		YoutubeIframe: () => import("@/components/YoutubeIframe"),
		VideoPlayer: () => import("@/components/VideoPlayer"),
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		multimediaId: null,
		loading: false,
		nowPlaying: null,
		postNotAvailable: false
	}),
	computed: {
		... mapGetters({
			multimedia: "multimedia/multimediaDetail"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		videoUrlThumbnail(videoUrl) {
			return videoUrl["yt_info"]["thumbnail_url"]
		},
		async init() {
			this.loading=true
			this.multimediaId = parseInt(this.$route.params.id)
			this.$store.dispatch("multimedia/getSingle", {id: this.multimediaId})
				.then((fetched) => {
					this.postNotAvailable = !fetched;
					if (fetched) {
						if (this.multimedia["multimedia_video_urls"].length > 0) {
							this.nowPlaying = this.multimedia["multimedia_video_urls"][0].video_url
						}
					}
					this.loading=false
				})
		},
		async deleteImage(itemId) {

		},
		async deleteVideo(itemId) {

		},
		async deleteVideoUrl(itemId) {

		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep div.title {
	text-align: center !important;
}
.thumbnail-radius {
	border-radius: 5px;
}
</style>
