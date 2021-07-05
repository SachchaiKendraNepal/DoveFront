<template>
	<v-card v-if="multimedias"
		:loading="loading"
		flat
		max-width="650" class="mx-auto rounded-0"
		color="transparent"
	>
		<div class="py-4" />
		<div class="px-2">
			<h2 class="px-1">
				Multimedia Library
			</h2>
			<v-divider />
		</div>
		<no-home-data v-if="posts.length === 0"
			:image="require('@/assets/noEventVideos.jpg')"
		/>
		<div v-for="post in posts"
			v-else
			:key="post.id"
		>
			<multimedia-video
				v-for="video in post['multimedia_videos']"
				:key="video.id"
				:video="video"
			/>
		</div>
		<div class="py-4" />
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import NoHomeData from "@/components/feeds/NoHomeData.vue";
import MultimediaVideo from "@/components/multimedia/MultimediaVideo.vue";

export default {
	name: "Multimedias",
	components: {
		MultimediaVideo,
		NoHomeData,
	},
	data: () => ({
		posts: [],
		loading: false,
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		})
	},
	async created() {
		this.loading = true
		if (!this.multimedias.count) {
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
		}
		this.posts = this.posts.concat(this.multimedias.results)
		this.loading = false
	},
}
</script>

<style scoped lang="scss">
.library-title {
	font-size: 2.6rem;
	font-weight: 400;
	font-family: 'Quicksand', sans-serif;
	padding: 20px 0;
}
</style>
