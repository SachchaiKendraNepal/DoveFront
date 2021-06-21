<template>
	<v-card flat>
		<v-row v-if="myArticles.length > 0"
			justify="start"
			align="center"
			no-gutters
		>
			<v-col
				v-for="(item, keyring) in myArticles"
				:key="keyring"
				cols="12"
			>
				<article-post :post="item" />
			</v-col>
		</v-row>
		<div v-else
			class="ma-4"
		>
			<v-chip>No articles</v-chip>
		</div>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "MyArticles",
	components: {
		ArticlePost: () => import("@/components/Article"),
	},
	computed: {
		...mapGetters({
			myArticles: "article/list"
		})
	},
	created() {
		console.log(this.myArticles)
	}
}
</script>

<style scoped>

</style>
