<template>
	<v-card
		:loading="loading"
		class="ma-0 pa-0 elevation-0"
	>
		<base-post-detail
			v-if="multimediaId"
			:target-id="multimediaId"
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
						v-for="item in multimediaImages"
						:key="item.id + 5 * 7"
						active-class="multimedia-active-image"
						:src="item.image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					/>
					<v-carousel-item
						v-for="item in multimediaVideos"
						:key="item.id + 7 * 11"
						active-class="multimedia-active-video"
						reverse-transition="fade-transition"
						transition="fade-transition"
					>
						<template #default>
							<video-player
								:options="{
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
					<v-carousel-item v-for="(item) in multimediaVideoUrls"
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
			multimediaImages: "multimedia/allMultimediaImages",
			multimediaVideos: "multimedia/allMultimediaVideos",
			multimediaVideoUrls: "multimedia/allMultimediaVideoUrls"
		}),
	},
	async mounted() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			this.multimediaId = parseInt(this.$route.params.id)
			await this.$store.dispatch("multimedia/fetchImagesFor", {id: this.multimediaId})
			await this.$store.dispatch("multimedia/fetchVideosFor", {id: this.multimediaId})
			await this.$store.dispatch("multimedia/fetchVideoUrlsFor", {id: this.multimediaId})
			this.loading=false
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
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
<style scoped lang="scss">
.video-container {
	overflow: hidden;
	position: relative;
	width:100%;
}

.video-container::after {
	padding-top: 56.25%;
	display: block;
	content: '';
}

.video-container iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
