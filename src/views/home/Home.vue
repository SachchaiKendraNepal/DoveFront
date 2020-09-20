<template>
	<div>
		<article-post />
		<article-post />
		<multimedia />
		<multimedia />
	</div>
</template>

<script>
	export default {
		name: "HomeComponent",
		components: {
			ArticlePost: () => import("@/views/home/article/Article"),
			Multimedia: () => import("@/views/home/multimedia/Multimedia")
		},
		data: () => ({
			loading: false,
			selection: 1
		})
	}
</script>
