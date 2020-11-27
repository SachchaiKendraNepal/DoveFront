<template>
	<base-post-detail
		:target="multimedia"
		:is-article="false"
	>
		<template #imageCarousel>
			<v-carousel height="77vh">
				<v-carousel-item
					v-for="item in multimediaImages"
					:key="item.image"
					:src="item.image"
					reverse-transition="fade-transition"
					transition="fade-transition"
				/>
				<v-carousel-item
					v-for="(item) in multimedia.video_urls"
					:key="item"
					reverse-transition="fade-transition"
					transition="fade-transition"
				>
					<youtube
						ref="youtube"
						class="pa-0"
						:video-id="getId(item)"
						:resize="true"
						:resize-delay="1"
						:fit-parent="true"
						@playing="playing"
					/>
				</v-carousel-item>
			</v-carousel>
		</template>
		<template #audios>
			<APlayer
				ref="player"
				class="my-6"
				:music="list[0]"
				:list="list"
				:mutex="true"
				:controls="true"
				preload="true"
				theme="indigo"
				list-max-height="100px"
			/>
		</template>
		<template #comments>
			<comments-detail :id="multimedia.id" />
		</template>
	</base-post-detail>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "MultimediaDetailView",
	components: {
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/components/post/CommentsDetail"),
		APlayer: ()=> import("vue-aplayer"),
	},
	data: () => ({
		isLiked: false,
		now: null,
		selection: 1,
		loading: false,
		list: [
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
		]
	}),
	computed: {
		...mapGetters({
			multimedia: "article/multimedia",
			multimediaImages: "article/detailImagesM",
			multimediaAudios: "article/detailAudiosM"
		}),
		player() {
			return this.$refs.youtube.player
		},
	},
	async created() {
		await this.getMultimediaArtifacts()
	},
	methods: {
		async getMultimediaArtifacts() {
			await this.$store.dispatch("article/getDetailM", {id: this.$route.params.id})
			await this.$store.dispatch("article/getDetailImagesM", {id: this.$route.params.id})
			await this.$store.dispatch("article/getDetailAudiosM", {id: this.$route.params.id})
			console.log(this.multimediaImages)
			console.log(this.multimediaAudios)
			this.multimediaAudios.forEach(audio => {
				this.list.push({
					title: "Hero Audio",
					artist: "Kiran Parajuli",
					src: audio.audio,
					pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
					lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
				})
			})
		},
		playVideo() {
			this.player.playVideo()
		},
		playing() {
			// console.log("\o/ we are watching!!!")
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
