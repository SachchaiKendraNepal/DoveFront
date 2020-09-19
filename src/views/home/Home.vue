<template>
	<div>
		<article-here />
		<article-here />
		<multimedia />
		<multimedia />
	</div>
</template>

<script>
	export default {
		name: "HomeComponent",
		components: {
			ArticleHere: () => import("@/views/home/article/Article"),
			Multimedia: () => import("@/views/home/multimedia/Multimedia")
		},
		data: () => ({
			loading: false,
			selection: 1
		}),
		methods: {
			reserve() {
				this.loading = true

				setTimeout(() => (this.loading = false), 2000)
			}
		}
	}
</script>
