<template>
	<base-post-card
		:post="post"
		:is-article="true"
	>
		<template #media>
			<v-img
				:src="image"
				height="194"
			/>
		</template>
	</base-post-card>
</template>

<script>
export default {
	name: "ArticleComponent",
	components: {
		BasePostCard: () => import("@/components/post/_post"),
	},
	props: {
		post: {
			required: true,
			type: Object
		}
	},
	data: () => ({
		image: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
	})
};
</script>

<style lang="sass" scoped>
.v-icon
	color: #0e0d0d !important

.comment-history
	font-size: 13px
</style>
