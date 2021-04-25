<template>
	<v-card
		:loading="loading"
		class="ma-0 pa-0 elevation-0"
	>
		<base-post-detail
			v-if="multimedia"
			:target="multimedia"
			:is-article="false"
		>
			<template #imageCarousel>
				<v-carousel height="100vh">
					<v-carousel-item
						v-for="item in multimediaImages"
						:key="item.id + 5 * 7"
						:src="item.image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					/>
					<v-carousel-item
						v-for="item in multimediaVideos"
						:key="item.id + 7 * 11"
						reverse-transition="fade-transition"
						transition="fade-transition"
					>
						<template #default>
							<vue-player
								:v-model="playing"
								:src="item.video"
							/>
						</template>
					</v-carousel-item>
					<v-carousel-item v-for="item in multimediaVideoUrls"
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
			</template>
			<template v-if="multimedia"
				#comments
			>
				<comments-detail :id="multimedia.id" />
			</template>
		</base-post-detail>
	</v-card>
</template>
<script>
import vuePlayer from "@algoz098/vue-player"
import {mapGetters} from "vuex";

export default {
	name: "MultimediaDetailView",
	components: {
		vuePlayer,
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		loading: false,
		playing: false,
	}),
	computed: {
		... mapGetters({
			multimedia: "multimedia/multimediaDetail",
			multimediaImages: "multimedia/allMultimediaImages",
			multimediaVideos: "multimedia/allMultimediaVideos",
			multimediaVideoUrls: "multimedia/allMultimediaVideoUrls"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			const postId = this.$route.params.id
			await this.$store.dispatch("multimedia/getSingle", {id: postId})
			await this.$store.dispatch("multimedia/fetchImagesFor", {id: postId})
			await this.$store.dispatch("multimedia/fetchVideosFor", {id: postId})
			await this.$store.dispatch("multimedia/fetchVideoUrlsFor", {id: postId})
			this.loading=false
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
		}
	}
}
</script>
<style lang="sass" scoped>
::v-deep div.title
	text-align: center !important
</style>
