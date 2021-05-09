<template>
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
				id="post-column"
				class="ma-0"
				cols="12"
				xl="8"
				lg="8"
				md="8"
				sm="8"
			>
				<add-post-box />
				<div v-for="post in posts"
					:key="post.id" class="mb-2"
				>
					<article-post v-if="post.isArticle"
						:post="post"
					/>
					<multimedia v-else
						:post="post"
					/>
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
</template>

<script>
import HomeAdsColumnView from "@/views/home/Ads";
import {mapGetters} from "vuex";
export default {
	name: "HomeComponent",
	components: {
		HomeAdsColumnView,
		ArticlePost: () => import("@/components/Article"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home/AddPostBox")
	},
	data: () => ({
		loadingPosts: false,
		posts: []
	}),
	computed: {
		...mapGetters({
			articles: "article/allArticles",
			multimedias: "multimedia/allMultimedias"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.loadingPosts = true
			await this.$store.dispatch("article/getAllApproved")
			await this.$store.dispatch("multimedia/getAllApproved")
			this.sortPostsByUploadedDate()
			this.loadingPosts = false
		},
		sortPostsByUploadedDate() {
			this.articles.forEach(article => {
				article.isArticle = true
			})
			this.multimedias.forEach(media => {
				media.isArticle = false
			})
			this.posts = this.posts.concat(this.articles)
			this.posts = this.posts.concat(this.multimedias)
			this.posts.sort((a, b) => (Date.parse(a.uploaded_at) < Date.parse(b.uploaded_at)) ? 1 : -1)
		}
	}
}
</script>
<style lang="sass" scoped>
.sticky
	position: sticky
	top: 140px
#post-column
	overflow-y: auto
	height: 93vh
	-ms-overflow-style: none
	scrollbar-width: none
#post-column::-webkit-scrollbar
	display: none
</style>
