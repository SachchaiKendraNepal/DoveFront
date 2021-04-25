<template>
	<v-card :loading="loading"
		class="ma-0 pa-0 elevation-0"
	>
		<base-post-detail
			v-if="article"
			:target="article"
			:is-article="true"
		>
			<template #imageCarousel>
				<v-carousel height="100vh">
					<v-carousel-item
						v-for="item in articleImages"
						:key="item.id"
						:src="item.image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					/>
				</v-carousel>
			</template>
			<template v-if="article"
				#comments
			>
				<comments-detail :id="article.id" />
			</template>
		</base-post-detail>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "ArticleDetailView",
	components: {
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		loading: false
	}),
	computed: {
		... mapGetters({
			article: "article/articleDetail",
			articleImages: "article/allArticleImages"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			const postId = this.$route.params.id
			await this.$store.dispatch("article/getSingle", {id: postId})
			await this.$store.dispatch("article/fetchImagesForArticle", {id: postId})
			this.loading=false
		}
	}
}
</script>
