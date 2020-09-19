<template>
	<v-toolbar id="sacchai-home-toolbar" color="blue lighten-4">
		<v-avatar>
			<v-img :src="logo" alt="SacchaiLogo" />
		</v-avatar>
		<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp" class="text-uppercase"
			>Sacchai Nepal</v-toolbar-title
		>
		<div class="ml-lg-12 mr-lg-12"></div>
		<div class="ml-lg-12 mr-lg-12"></div>
		<v-text-field
			id="search"
			class="mx-3"
			dense
			solo
			hide-details
			append-icon="search"
			clearable
			clear-icon="clear"
			placeholder="Search Members, Branch, Articles, Multimedia..."
		></v-text-field>
		<div class="ml-lg-12 mr-lg-12"></div>
		<div class="ml-lg-12 mr-lg-12"></div>
		<div class="ml-lg-12 mr-lg-12"></div>
		<profile-dropdown />
	</v-toolbar>
</template>
<style lang="sass">
	#sacchai-home-toolbar
	  position: -webkit-sticky
	  position: sticky
	  top: 0
	  z-index: 10
	.v-toolbar__title
	  padding-left: 8px
	  font-family: 'Fira Sans Condensed', sans-serif
	  font-size: 22px
	#search
	  width: 100px !important
</style>
<script>
	import ProfileDropdown from "@/views/home_layout/ProfileDropdown"

	export default {
		name: "TopNavToolBarComponent",
		components: {
			ProfileDropdown
		},
		data() {
			return {
				logo: require("@/assets/sacchai_logo.jpg")
			}
		}
	}
</script>
