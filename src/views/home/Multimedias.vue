<template>
	<v-card v-if="multimedias"
		:loading="loading"
		flat
		max-width="700" class="mx-auto rounded-0"
		color="transparent"
	>
		<div v-if="$vuetify.breakpoint.smAndUp"
			class="py-4"
		/>

		<v-card color="#90328e14">
			<v-tabs
				v-model="tab"
				background-color="transparent"
				color="basil"
				grow
				show-arrows
				height="50"
				rounded
			>
				<v-tab
					v-for="item in items"
					:key="item.title"
				>
					<v-icon>{{ item.icon }}</v-icon>
					<span class="pl-1">{{ item.title }}</span>
				</v-tab>
			</v-tabs>
		</v-card>

		<v-tabs-items v-model="tab"
			style="background-color: transparent"
		>
			<v-tab-item>
				<v-card
					min-height="75vh"
					color="transparent"
				>
					<div v-if="posts.length === 0"
						class="d-flex justify-center pa-2"
					>
						<v-chip>Image database is empty</v-chip>
					</div>
					<v-card v-for="p in images"
						:key="p.id" class="my-2 mx-1"
					>
						<card-img :src="p.image"
							height="35vh"
							:contain="false"
							style="border-radius: 4px;"
						/>
						<div class="py-1" />
						<multimedia-action />
					</v-card>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					tile
					min-height="75vh"
					color="transparent"
				>
					<div class="py-2" />
					<v-text-field label="search"
						name="search"
						solo hide-details="auto"
						prepend-inner-icon="mdi-magnify"
					/>
					<no-home-data v-if="videos.length === 0"
						:image="require('@/assets/noEventVideos.jpg')"
					/>
					<multimedia-video
						v-for="video in videos"
						v-else
						:key="video.id"
						class="mx-1"
						:video="video"
					/>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					flat
					min-height="75vh"
					color="transparent"
				>
					<div v-if="youtube.length === 0"
						class="d-flex justify-center pa-2"
					>
						<v-chip>Youtube database is empty.</v-chip>
					</div>

					<multimedia-youtube
						class="mx-1"
						:videos="youtube"
					/>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
		<div class="py-4" />
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import NoHomeData from "@/components/feeds/NoHomeData.vue";
import MultimediaVideo from "@/components/multimedia/MultimediaVideo.vue";
import MultimediaYoutube from "@/components/multimedia/MultimediaYoutube.vue";
import MultimediaAction from "@/components/multimedia/MultimediaAction.vue";

export default {
	name: "Multimedias",
	components: {
		MultimediaAction,
		MultimediaYoutube,
		MultimediaVideo,
		NoHomeData,
	},
	data: () => ({
		posts: [],
		images: [],
		videos: [],
		youtube: [],
		loading: false,
		tab: null,
		items: [
			{icon: "mdi-image", title: "Images"},
			{icon: "mdi-video", title: "Videos"},
			{icon: "mdi-youtube", title: "Youtube"},
		],
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
	},
	async created() {
		this.loading = true
		if (!this.multimedias.count) {
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
		}
		this.posts = this.posts.concat(this.multimedias.results)
		this.prepareMultimedias()
		this.loading = false
	},
	methods: {
		prepareMultimedias() {
			this.videos = []
			this.images = []
			this.youtube = []
			this.multimedias.results.forEach(multimedia => {
				this.images = this.images.concat(multimedia["multimedia_images"])
				this.videos = this.videos.concat(multimedia["multimedia_videos"])
				this.youtube = this.youtube.concat(multimedia["multimedia_video_urls"])
			})
		},
	}
}
</script>

<style scoped lang="scss">
.library-title {
	font-size: 2.6rem;
	font-weight: 400;
	font-family: 'Quicksand', sans-serif;
	padding: 20px 0;
}
.page-title {
	font-weight: bold;
	font-size: 3rem;
	@media only screen and (max-width: 600px) {
		font-size: 2rem;
	}
	@media only screen and (max-width: 255px) {
		font-size: 1.6rem;
	}
}
</style>
