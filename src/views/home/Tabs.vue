<template>
	<v-tabs
		background-color="transparent"
		centered
		:show-arrows="arrows"
		icons-and-text
		slider-size="3"
		active-class="home-tab-active"
		slider-color="white"
	>
		<v-tab
			v-for="(tab, index) in homeTabItems"
			:key="index"
			:to="tab.to"
		>
			<v-icon size="30">
				{{ tab.icon }}
			</v-icon>
		</v-tab>
	</v-tabs>
</template>

<script>
export default {
	name: "HomeTabs",
	props: {
		arrows: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			homeTabItems: [
				{icon: "mdi-home", text: "Home", to: "/home/feeds"},
				{icon: "mdi-post", text: "Articles", to: "/home/article"},
				{icon: "mdi-video-vintage", text: "Multimedia", to: "/home/multimedia"},
				{icon: "mdi-calendar-clock", text: "Events", to: "/home/event"},
			],
		}
	}
}
</script>

<style scoped>
.home-tab-active {
	color: white !important;
}
</style>
