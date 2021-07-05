<template>
	<v-tabs
		background-color="transparent"
		centered
		:show-arrows="showArrows"
		icons-and-text
		slider-size="3"
		active-class="profile-tab-active"
		slider-color="white"
	>
		<v-tab
			v-for="item in profileTabItems"
			:key="item.text"
			:to="item.to"
		>
			<v-icon size="30">
				{{ item.icon }}
			</v-icon>
		</v-tab>
	</v-tabs>
</template>

<script>
export default {
	name: "ProfileHeaderTab",
	props: {
		showArrows: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		profileTabItems: [
			{icon: "mdi-information-variant", text: "About", to: "/profile/home"},
			{icon: "mdi-image", text: "Photos", to: "/profile/photo"},
			{icon: "mdi-camcorder", text: "Multimedia", to: "/profile/multimedia"},
			{icon: "mdi-calendar", text: "Events", to: "/profile/event"}
		],
	})
}
</script>

<style scoped lang="sass">
.profile-tab-active
	color: white
</style>
