<template>
	<v-card :loading="loading"
		class="ma-0 pa-0 elevation-0"
	>
		<base-post-detail
			v-if="postId"
			:target="article"
			:is-article="true"
		>
			<template #imageCarousel>
				<v-carousel height="100vh">
					<v-carousel-item
						v-for="item in article.article_images"
						:key="item.id"
						:src="item.image"
						reverse-transition="fade-transition"
						transition="fade-transition"
					/>
				</v-carousel>
			</template>
			<template
				#comments
			>
				<comments-detail :id="postId"
					:is-article="true"
				/>
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
		loading: false,
		postId: null,
	}),
	computed: {
		... mapGetters({
			article: "article/articleDetail"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			this.postId = parseInt(this.$route.params.id)
			await this.$store.dispatch("article/getSingle", {id: this.postId})
			this.loading=false
		}
	}
}
</script>
