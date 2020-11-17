<template>
	<v-card id="home-header">
		<tool-bar />
		<scroll-up />
		<router-view />
	</v-card>
</template>
<script>
export default {
	name: "TopNavTabComponent",
	components: {
		ToolBar: () => import("@/views/home_layout/ToolBar"),
		ScrollUp: () => import("@/components/ScrollTop")

	},
}
</script>

<style lang="sass">
#home-header
	background-color: white
	border-radius: 0
</style>
