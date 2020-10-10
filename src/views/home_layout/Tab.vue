<template>
	<v-tabs
		id="sacchai-home-tab"
		v-model="tab"
		centered
		show-arrows
		center-active
		icons-and-text
		height="60"
		slider-size="2"
		color="darkblue"
		background-color="blue lighten-5"
	>
		<v-tab
			v-for="item in items"
			:key="item.name"
			:to="item.to"
		>
			{{ item.name }}
			<v-icon>{{ item.icon }}</v-icon>
		</v-tab>
	</v-tabs>
</template>
<script>
export default {
	name: "HomeTabComponent",
	data() {
		return {
			tab: null,
			items: [
				{ name: "Home", icon: "mdi-home", to: "/home" },
				{ name: "Branches", icon: "mdi-home-group", to: "/home/branch" },
				{ name: "Followers", icon: "mdi-account-group", to: "/home/follower" },
				{ name: "Articles", icon: "mdi-post", to: "/home/article" },
				{ name: "Multimedia", icon: "mdi-video-vintage", to: "/home/multimedia" }
			]
		}
	}
}
</script>
<style lang="sass">
a[role="tab"]
	font-size: 12px
	font-weight: bold
</style>
