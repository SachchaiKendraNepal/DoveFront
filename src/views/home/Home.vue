<template>
	<div>
		<v-overlay :value="fetchingPostsOverlay">
			<v-progress-circular indeterminate
				size="64"
			/>
		</v-overlay>
		<v-card
			:loading="loadingPosts"
			flat
			color="transparent"
			class="mx-auto pa-0"
			max-width="1000"
		>
			<v-row
				class="ma-0 pa-0"
				align="start"
				justify="center"
			>
				<v-col
					class="ma-0"
					cols="12"
					xl="8"
					lg="8"
					md="8"
					sm="8"
				>
					<add-post-box />
					<no-home-data v-if="posts.length === 0" />
					<div v-else>
						<div v-for="post in posts"
							:key="post.id" class="mb-2"
						>
							<multimedia
								:post="post"
							/>
						</div>
					</div>
				</v-col>
				<v-col
					cols="12"
					xl="4"
					lg="4"
					md="4"
					sm="4"
				>
					<home-ads-column-view />
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	name: "HomeComponent",
	components: {
		NoHomeData: () => import("@/components/NoHomeData"),
		HomeAdsColumnView: () => import("@/views/home/Ads"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home/AddPostBox")
	},
	data: () => ({
		loadingPosts: false,
		fetchingPostsOverlay: true,
		posts: []
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		})
	},
	async mounted() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.loadingPosts = true
			// only fetch if store has not any data 😎
			this.fetchingPostsOverlay = true
			await this.$store.dispatch("multimedia/getAllApproved")
			this.posts = this.multimedias.results
			console.log(this.posts)
			this.fetchingPostsOverlay = false
			this.loadingPosts = false
		},
	}
}
</script>
