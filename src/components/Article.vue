<template>
	<base-post-card>
		<template #media>
			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
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
	data: () => ({
		// return something
	})
};
</script>

<style lang="sass" scoped>
.v-icon
	color: #0e0d0d !important

.comment-history
	font-size: 13px
</style>
