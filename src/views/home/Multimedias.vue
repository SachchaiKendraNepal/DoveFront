<template>
	<v-card v-if="multimedias"
		:loading="loading"
		flat
		max-width="650" class="mx-auto rounded-0"
		color="transparent"
	>
		<div class="py-4" />
		<div class="d-flex align-center">
			<v-icon size="40"
				color="pink lighten-1"
			>
				mdi-video
			</v-icon>
			<h2 class="pl-2">
				Multimedia Library
			</h2>
		</div>
		<v-divider />
		<no-home-data v-if="posts.length === 0"
			:image="require('@/assets/noEventVideos.jpg')"
		/>
		<div v-for="post in posts"
			v-else
			:key="post.id"
		>
			<v-card
				v-for="video in post['multimedia_videos']"
				:key="video.id"
				height="400"
				dark
				class="my-2"
			>
				<video
					:class="'sachchai-video-' + video.id"
					controls
					height="400"
					width="100%"
					:src="video.video"
					@play="onPlay"
				/>
			</v-card>
		</div>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import NoHomeData from "@/components/NoHomeData.vue";
import HtmlVideoMixin from "@/mixins/HtmlVideoMixin..js";

export default {
	name: "Multimedias",
	components: {
		NoHomeData,
	},
	mixins: [HtmlVideoMixin],
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
		console.log(this.posts)
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
