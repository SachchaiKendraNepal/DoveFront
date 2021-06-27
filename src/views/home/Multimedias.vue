<template>
	<v-card v-if="multimedias"
		:loading="loading"
		flat
		max-width="650" class="mx-auto rounded-0"
		color="transparent"
	>
		<div class="library-title">
			<v-icon size="40"
				color="red lighten-1"
			>
				mdi-video
			</v-icon>
			Multimedia Library
		</div>
		<no-home-data v-if="posts.length === 0" />
		<multimedia-post
			v-for="post in posts"
			v-else
			:key="post.id"
			:post="post"
			:is-article="false"
			class="mb-3"
		/>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import NoHomeData from "@/components/NoHomeData.vue";

export default {
	name: "Multimedias",
	components: {
		NoHomeData,
		MultimediaPost: () => import("@/components/Multimedia"),
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
		await this.$store.dispatch("multimedia/getAllApproved")
		this.posts = this.posts.concat(this.multimedias.results)
		this.loading = false
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
</style>
