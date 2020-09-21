<template>
	<v-tabs
		centered
		show-arrows
		center-active
		icons-and-text
		id="sacchai-home-tab"
		height="60"
		slider-size="2"
		color="darkblue"
		background-color="blue lighten-5"
		v-model="tab"
	>
		<v-tab v-for="item in items" :key="item.name" :to="item.to">
			{{ item.name }}
			<v-icon>{{ item.icon }}</v-icon>
		</v-tab>
	</v-tabs>
</template>
<style lang="sass">
a[role="tab"]
  font-size: 12px
  font-weight: bold
</style>
<script>
export default {
	name: "HomeTabComponent",
	data() {
		return {
			tab: null,
			items: [
				{ name: "Home", icon: "mdi-home", to: "/" },
				{ name: "Branches", icon: "mdi-home-group", to: "/branch" },
				{ name: "Members", icon: "mdi-account-group", to: "/member" },
				{ name: "Articles", icon: "mdi-post", to: "/article" },
				{ name: "Multimedia", icon: "mdi-video-vintage", to: "/multimedia" }
			]
		}
	}
}
</script>
