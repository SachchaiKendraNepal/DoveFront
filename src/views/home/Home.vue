<template>
	<div>
		<article />
		<article />
		<multimedia />
		<multimedia />
	</div>
</template>

<script>
	export default {
		name: "HomeComponent",
		components: {
			Article: () => import("@/views/home/article/Article"),
			Multimedia: () => import("@/views/home/multimedia/Multimedia")
		},
		data: () => ({
			loading: false,
			selection: 1
		})
	}
</script>
