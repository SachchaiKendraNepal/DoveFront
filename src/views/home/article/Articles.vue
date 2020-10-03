<template>
	<v-row
		justify="center"
		align="center"
		class="mx-4"
	>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<article-post :post="post" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<article-post :post="post" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<article-post :post="post" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<article-post :post="post"/>
		</v-col>
	</v-row>
</template>
<script>
import ArticlePost from "@/components/Article"
export default {
	name: "ArticlesView",
	components: {
		ArticlePost
	},
	data: () => ({
		post: {
			id: 1,
			title: "Our Changing Planet",
			author: "Kurt Wagner",
			description: "Visit ten places on our planet that are undergoing the biggest changes today."
		}
	})
}
</script>
<style lang="sass" scoped>

</style>
