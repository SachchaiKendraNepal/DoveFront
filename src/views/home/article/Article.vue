<template>
	<base-post-card>
		<template v-slot:media>
			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
				height="194"
			></v-img>
		</template>
	</base-post-card>
</template>
<style lang="sass" scoped>
	.v-icon
	  color: #0e0d0d !important
	.comment-history
	  font-size: 13px
</style>
<script>
	export default {
		name: "ArticleComponent",
		components: {
			BasePostCard: () => import("@/views/home/post/_post")
		},
		data() {
			return {
				// return something
			}
		}
	}
</script>
