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
					>
						<v-carousel-item
							v-for="item in images.data"
							:key="item.id + 5 * 7"
							:src="item.image"
							transition="fade-transition"
							reverse-transition="fade-transition"
						/>
						<v-carousel-item v-for="item in videos.data"
							:key="item.id + 7 * 11"
							transition="fade-transition"
							reverse-transition="fade-transition"
						>
							<template #default>
								<vue-player v-model="playing"
									:src="item.video"
								/>
							</template>
						</v-carousel-item>
						<v-carousel-item v-for="item in video_urls.data"
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
import vuePlayer  from "@algoz098/vue-player"
export default {
	name: "MultimediaComponent",
	components: {
		vuePlayer,
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
			player: null,
			playing: false,
			images: {},
			videos: {},
			sounds: {},
			video_urls: {}
		}
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.images = await this.$store.dispatch("multimedia/fetchImagesFor", {id: this.post.id})
			this.videos = await this.$store.dispatch("multimedia/fetchVideosFor", {id: this.post.id})
			this.sounds = await this.$store.dispatch("multimedia/fetchSoundsFor", {id: this.post.id})
			this.video_urls = await this.$store.dispatch("multimedia/fetchVideoUrlsFor", {id: this.post.id})
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
