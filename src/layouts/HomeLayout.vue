<template>
	<div
		id="home-layout"
		class="d-flex flex-column"
	>
		<tool-bar />
		<scroll-up />
		<div class="home-router-container">
			<transition name="fade">
				<router-view />
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "SacchaiHomeLayout",
	components: {
		ToolBar: () => import("@/views/home_layout/ToolBar"),
		ScrollUp: () => import("@/components/ScrollTop")
	}
}
</script>

<style lang="sass">
#home-layout
	height: 100%
.home-router-container
	transition: all .5s
	margin-top: 72px
	@media only screen and (max-width: 960px)
		margin-top: 144px
</style>
