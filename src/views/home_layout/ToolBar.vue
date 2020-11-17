<template>
	<div id="sacchai-home-toolbar">
		<div class="left-float">
			<v-avatar size="60">
				<v-img
					:src="logo"
					alt="SacchaiLogo"
				/>
			</v-avatar>
			<div class="search-wrapper">
				<v-text-field
					id="search"
					class="search-sachchai mx-6"
					solo
					hide-details
					append-icon="search"
					clearable
					clear-icon="clear"
					placeholder="Search Sachchai Kendra Nepal"
				/>
			</div>
		</div>
		<v-card class="center-float pa-0"
			flat color="transparent"
		>
			<v-tabs
				v-show="$vuetify.breakpoint.mdAndUp"
				v-model="currentItem"
				icons-and-text
				background-color="transparent"
				slider-color="primary"
			>
				<v-tab
					v-for="(tab, index) in homeTabItems"
					:key="index"
					:href="'#tab-' + tab.text"
				>
					{{ tab.text }}
					<v-icon>{{ tab.icon }}</v-icon>
				</v-tab>
			</v-tabs>
		</v-card>
		<div class="right-float">
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-avatar
						class="elevation-4 mx-2"
						color="#0e7ed8"
						v-bind="attrs"
						v-on="on"
						@click="routeToShowcase()"
					>
						<v-icon size="24"
							color="grey lighten-3"
						>
							mdi-view-dashboard
						</v-icon>
					</v-avatar>
				</template>
				<span>Showcase</span>
			</v-tooltip>
			<profile-dropdown />
		</div>
		<!--		<v-toolbar-title-->
		<!--			v-show="$vuetify.breakpoint.smAndUp"-->
		<!--			class="text-uppercase"-->
		<!--		>-->
		<!--			Sachchai Nepal-->
		<!--		</v-toolbar-title>-->
		<!--		<div class="search-wrapper" />-->
	</div>
</template>

<script>
import ProfileDropdown from "@/views/home_layout/ProfileDropdown"
import router from "@/router";

export default {
	name: "TopNavToolBarComponent",
	components: {
		ProfileDropdown,
	},
	data() {
		return {
			currentItem: "",
			logo: require("@/assets/sacchai_logo.jpg"),
			homeTabItems: [
				{icon: "mdi-post", text: "Posts"},
				{icon: "mdi-folder-multiple-image", text: "Photos"},
				{icon: "mdi-camcorder", text: "Multimedia"},
				{icon: "mdi-information-variant", text: "About"},
			]
		}
	},
	methods: {
		routeToShowcase() {
			router.push({name: "SACHCHAI SHOWCASE"})
		}
	},
}
</script>

<style lang="sass" scoped>
#sacchai-home-toolbar
	position: -webkit-sticky
	position: sticky
	top: 0
	margin: 0
	padding: 0 16px
	z-index: 200
	height: 72px
	display: flex
	align-items: center
	background-color: aliceblue
	.left-float
		position: fixed
		left: 16px
		display: flex
		justify-content: center
		align-items: center
	.center-float
		position: fixed
		width: 100vw
		left: 33.5%
		@media only screen and (max-width: 1260px)
			left: 45%
	.right-float
		position: fixed
		right: 16px
		display: flex
		justify-content: center
		align-items: center

	::v-deep .v-toolbar__title
		padding-left: 8px
		font-family: 'Fira Sans Condensed', sans-serif
		font-size: 22px

	.search-wrapper
		transition: all .4s
		max-width: 350px
		display: block
		@media only screen and (max-width: 550px)
			max-width: 300px
		@media only screen and (max-width: 500px)
			max-width: 250px
		@media only screen and (max-width: 445px)
			max-width: 200px
		@media only screen and (max-width: 445px)
			max-width: 180px
		@media only screen and (max-width: 370px)
			max-width: 130px
			.search-sachchai
				margin: 0 8px !important
		@media only screen and (max-width: 340px)
			max-width: 100px
			.search-sachchai
				margin: 0 8px !important
		@media only screen and (max-width: 310px)
			display: none
		.search-home-top
			margin-left: 15px
</style>
