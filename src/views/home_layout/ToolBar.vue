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
		<v-tooltip bottom>
			<template #activator="{ on, attrs }">
				<v-avatar
					class="elevation-4 mx-2"
					color="grey darken-3"
					v-bind="attrs"
					v-on="on"
					@click="routeToShowcase()"
				>
					<v-icon dark>
						mdi-view-carousel-outline
					</v-icon>
				</v-avatar>
			</template>
			<span>Showcase</span>
		</v-tooltip>
		<profile-dropdown />
	</v-toolbar>
</template>

<script>
import ProfileDropdown from "@/views/home_layout/ProfileDropdown"
import router from "@/router";

export default {
	name: "TopNavToolBarComponent",
	components: {
		ProfileDropdown
	},
	data() {
		return {
			logo: require("@/assets/sacchai_logo.jpg")
		}
	},
	methods: {
		routeToShowcase() {
			router.push({name: "SACHCHAI SHOWCASE"})
		}
	}
}
</script>

<style lang="sass" scoped>
#sacchai-home-toolbar
	position: -webkit-sticky
	position: sticky
	top: 0
	z-index: 200

	::v-deep .v-toolbar__title
		padding-left: 8px
		font-family: 'Fira Sans Condensed', sans-serif
		font-size: 22px

	::v-deep .v-input__slot
		margin-left: -78px !important
		@media only screen and (max-width: 740px)
			margin-left: 0 !important
</style>
