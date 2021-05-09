<template>
	<v-card v-if="articles"
		:loading="loading"
		flat
		max-width="650" class="mx-auto rounded-0"
		color="transparent"
	>
		<div class="library-title">
			<v-icon size="40"
				color="red lighten-1"
			>
				mdi-newspaper
			</v-icon>
			Articles Library
		</div>
		<article-post
			v-for="post in articles"
			:key="post.id"
			:post="post"
			:is-article="true"
			class="mb-3"
		/>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Articles",
	components: {
		ArticlePost: () => import("@/components/Article"),
	},
	data: () => ({
		loading: false
	}),
	computed: {
		...mapGetters({
			articles: "article/allArticles"
		})
	},
	async created() {
		this.loading = true
		await this.$store.dispatch("article/getAllApproved")
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
