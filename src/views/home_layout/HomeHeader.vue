<template>
	<v-card id="home-header">
		<tool-bar />
		<scroll-up />
		<home-tab />
		<router-view />
	</v-card>
</template>
<script>
export default {
	name: "TopNavTabComponent",
	components: {
		HomeTab: () => import("@/views/home_layout/Tab"),
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
