<template>
	<v-card v-if="articles"
		:loading="loading"
		flat
		tile
		max-width="900" class="mx-auto"
		color="transparent"
	>
		<v-card class="ma-3 py-2"
			tile flat
		>
			<v-chip-group
				multiple
				active-class="primary--text"
				show-arrows
			>
				<v-chip v-for="tag in tags"
					:key="tag"
				>
					{{ tag }}
				</v-chip>
			</v-chip-group>
		</v-card>
		<article-card
			v-for="post in articles.results"
			:key="post.id"
			:article="post"
			class="ma-3"
		/>
		<div class="py-16" />
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Articles",
	components: {
		ArticleCard: () => import("@/components/ArticleCard"),
	},
	data: () => ({
		loading: false,
		tags: [
			"Work",
			"Home Improvement",
			"Vacation",
			"Food",
			"Drawers",
			"Shopping",
			"Art",
			"Tech",
			"Creative Writing",
		],
	}),
	computed: {
		...mapGetters({
			articles: "article/list"
		})
	},
	async created() {
		this.loading = true
		await this.$store.dispatch("article/filter", {
			is_approved: true
		})
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
