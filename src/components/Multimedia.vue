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
								<youtube
									ref="youtube"
									class="pa-0"
									:video-id="getId(item.video_url)"
									:resize="true"
									:resize-delay="0"
									:fit-parent="true"
									@playing="playing"
								/>
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
