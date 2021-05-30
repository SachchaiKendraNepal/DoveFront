<template>
	<v-card
		:loading="loading"
		class="ma-0 pa-0 elevation-0"
	>
		<base-post-detail
			v-if="multimediaId"
			:target="multimedia"
			:is-article="false"
		>
			<template #imageCarousel>
				<v-carousel height="100vh"
					dark
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
						:key="item.id + 5 * 7"
						active-class="multimedia-active-image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					>
						<template #default>
							<v-card height="100vh"
								class="rounded-0"
							>
								<v-img :src="item.image"
									height="100vh"
									contain
								/>
							</v-card>
						</template>
					</v-carousel-item>
					<v-carousel-item
						v-for="item in multimedia['multimedia_videos']"
						:key="item.id + 7 * 11"
						active-class="multimedia-active-video"
						reverse-transition="fade-transition"
						transition="fade-transition"
					>
						<template #default>
							<v-card
								height="100vh"
								class="rounded-0"
							>
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
						active-class="multimedia-active-video-url"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<template #default>
							<v-card
								v-if="nowPlaying"
								dark
								height="100vh"
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
									<v-list-item v-for="(videoUrl, index) in multimedia['multimedia_video_urls']"
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
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "MultimediaDetailView",
	components: {
		YoutubeIframe: () => import("@/components/YoutubeIframe"),
		VideoPlayer: () => import("@/components/VideoPlayer"),
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		multimediaId: null,
		loading: false,
		nowPlaying: null,
	}),
	computed: {
		... mapGetters({
			multimedia: "multimedia/multimediaDetail"
		}),
	},
	async created() {
		await this.init()
	},
	methods: {
		thumbnail(videoUrl) {
			const youtube_video_id = this.getId(videoUrl)
			return `//img.youtube.com/vi/${youtube_video_id}/0.jpg`
		},
		getId(videoUrl) {
			return this.$helper.getVideoIdFromYoutubeURL(videoUrl)
		},
		async init() {
			this.loading=true
			this.multimediaId = parseInt(this.$route.params.id)
			await this.$store.dispatch("multimedia/getSingle", {id: this.multimediaId})
			if (this.multimedia["multimedia_video_urls"].length > 0) {
				this.nowPlaying = this.multimedia["multimedia_video_urls"][0].video_url
			}
			this.loading=false
		},
		async getVideoTitle(url) {
			const id = this.getId(url)
			const title = await this.$store.dispatch("multimedia/getYTVideoTitle", {id: id})
			return title
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
