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
				<v-carousel height="100vh">
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
						v-for="item in multimedia.multimedia_images"
						:key="item.id + 5 * 7"
						active-class="multimedia-active-image"
						:src="item.image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					/>
					<v-carousel-item
						v-for="item in multimedia.multimedia_videos"
						:key="item.id + 7 * 11"
						active-class="multimedia-active-video"
						reverse-transition="fade-transition"
						transition="fade-transition"
					>
						<template #default>
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
						</template>
					</v-carousel-item>
					<v-carousel-item v-for="(item) in multimedia.multimedia_video_urls"
						:key="item.id + 11 * 13"
						active-class="multimedia-active-video-url"
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
			</template>
			<template #comments>
				<comments-detail :id="multimediaId" />
			</template>
		</base-post-detail>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";


export default {
	name: "MultimediaDetailView",
	components: {
		VideoPlayer: () => import("@/components/VideoPlayer"),
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		multimediaId: null,
		loading: false,
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
		async init() {
			this.loading=true
			this.multimediaId = parseInt(this.$route.params.id)
			await this.$store.dispatch("multimedia/getSingle", {id: this.multimediaId})
			this.loading=false
		},
		getId(url) {
			return this.$helper.getVideoIdFromYoutubeURL(url)
		},
		prepareEmbedUrl(url) {
			return `https://www.youtube.com/embed/${this.getId(url)}`
		}
	}
}
</script>
<style lang="sass" scoped>
::v-deep div.title
	text-align: center !important
</style>
