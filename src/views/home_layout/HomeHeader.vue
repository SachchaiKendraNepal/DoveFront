<template>
	<v-card id="home-header">
		<tool-bar />
		<v-btn
			v-show="fab"
			id="to-top"
			v-scroll="onScroll"
			fab
			dark
			fixed
			bottom
			right
			color="primary"
			@click="$vuetify.goTo(0)"
		>
			<v-icon>keyboard_arrow_up</v-icon>
		</v-btn>
		<home-tab />
		<router-view />
	</v-card>
</template>
<script>
export default {
	name: "TopNavTabComponent",
	components: {
		HomeTab: () => import("@/views/home_layout/Tab"),
		ToolBar: () => import("@/views/home_layout/ToolBar")
	},
	data() {
		return {
			fab: false
		}
	},
	methods: {
		onScroll(e) {
			if (typeof window === "undefined") return
			const top = window.pageYOffset || e.target.scrollTop
			this.fab = top > 20
		}
	}
}
</script>

<style lang="sass">
#home-header
	background-color: rgba(236, 230, 221, 0.91)
</style>
