<template>
	<v-toolbar
		id="sacchai-home-toolbar"
		color="blue lighten-4"
		height="70"
	>
		<v-avatar size="60">
			<v-img
				:src="logo"
				alt="SacchaiLogo"
			/>
		</v-avatar>
		<v-toolbar-title
			v-show="$vuetify.breakpoint.smAndUp"
			class="text-uppercase"
		>
			Sachchai Nepal
		</v-toolbar-title>
		<v-spacer />
		<v-text-field
			id="search"
			class="mx-3"
			solo
			hide-details
			append-icon="search"
			clearable
			clear-icon="clear"
			placeholder="Search Members, Branch, Articles, Multimedia..."
		/>
		<v-spacer />
		<profile-dropdown />
	</v-toolbar>
</template>

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

<style lang="sass" scoped>
#sacchai-home-toolbar
	position: -webkit-sticky
	position: sticky
	top: 0
	z-index: 10

	::v-deep .v-toolbar__title
		padding-left: 8px
		font-family: 'Fira Sans Condensed', sans-serif
		font-size: 22px

	::v-deep .v-input__slot
		margin-left: -78px !important
		@media only screen and (max-width: 740px)
			margin-left: 0 !important
</style>
