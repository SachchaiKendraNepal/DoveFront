<template>
	<v-tabs
		v-show="$vuetify.breakpoint.mdAndUp"
		v-model="tab"
		background-color="transparent"
		centered
		show-arrows
		icons-and-text
		slider-size="3"
		slider-color="primary"
		active-class="event-detail-active-tab"
	>
		<v-tab
			v-for="(item, index) in eventTabItems"
			:key="index"
			@click.prevent.stop="$router.push({name: item.router})"
		>
			{{ item.title }}
			<v-icon>{{ item.icon }}</v-icon>
		</v-tab>
	</v-tabs>
</template>

<script>
export default {
	name: "DetailTabs",
	data: () => ({
		tab: null,
		eventTabItems: [
			{ title: "about", icon: "mdi-information-variant", router: "ABOUT EVENT" },
			{ title: "discussion", icon: "mdi-account-multiple", router: "EVENT DISCUSSION" },
			{ title: "photos", icon: "mdi-image", router: "EVENT PHOTOS" },
			{ title: "multimedia", icon: "mdi-video-vintage", router: "EVENT MULTIMEDIAS" },
		],
	})
}
</script>

<style scoped>

</style>
