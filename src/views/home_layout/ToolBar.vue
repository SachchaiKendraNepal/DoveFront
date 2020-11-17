<template>
	<div class="home-navbar">
		<v-app-bar
			color="aliceblue"
			class="sacchai-home-toolbar-top"
			height="73"
		>
			<div class="left-float">
				<v-avatar
					class="cursor"
					size="60"
					@click.stop="homeDrawer=!(homeDrawer)"
				>
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
					active-class="home-tab-active"
					slider-color="grey darken-2"
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
		</v-app-bar>
		<v-tabs
			v-show="$vuetify.breakpoint.smAndDown"
			v-model="currentItem"
			class="home-toolbar-tab"
			icons-and-text
			show-arrows
			centered
			center-active
			background-color="aliceblue"
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
		<v-navigation-drawer
			:value="homeDrawer"
			class="home-sidenav"
			app
			floating
			color="#eeeeee"
		>
			<user-clip />
			<v-list>
				<v-list-group
					v-for="item in items"
					:key="item.title"
					v-model="item.active"
					active-class="darkblue--text"
					:prepend-icon="item.action"
					no-action
				>
					<template #activator>
						<v-list-item-content>
							<v-list-item-title v-text="item.title" />
						</v-list-item-content>
					</template>

					<v-list-item
						v-for="child in item.items"
						:key="child.title"
						:to="child.to"
					>
						<v-list-item-icon><v-icon>{{ child.icon }}</v-icon></v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="child.title" />
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import router from "@/router"
import ProfileDropdown from "@/views/home_layout/ProfileDropdown"

export default {
	name: "TopNavToolBarComponent",
	components: {
		ProfileDropdown,
		UserClip: () => import("@/views/home_layout/UserClip"),
	},
	data() {
		return {
			currentItem: "",
			logo: require("@/assets/sacchai_logo.jpg"),
			homeTabItems: [
				{icon: "mdi-home", text: "Home"},
				{icon: "mdi-folder-multiple-image", text: "Photos"},
				{icon: "mdi-post", text: "Articles"},
				{icon: "mdi-camcorder", text: "Multimedia"},
			],
			homeDrawer: true,
			items: [
				{
					action: "mdi-star-circle",
					items: [
						{ title: "My Profile", icon: "mdi-account-circle", to: "/home/profile" },
						{ title: "My Posts", icon: "mdi-post" },
						{ title: "My Medias", icon: "mdi-video-vintage" },
						{ title: "My Bookmarks", icon: "mdi-bookmark" },
					],
					title: "My Links",
				},
				{
					action: "mdi-city",
					items: [
						{ title: "Province", icon: "mdi-office-building-marker-outline" },
						{ title: "District", icon: "mdi-map-marker-multiple-outline" },
						{ title: "VDC", icon: "mdi-home-map-marker" },
						{ title: "Municipality", icon: "mdi-google-maps" },
					],
					title: "Branch",
				},
				{
					action: "mdi-calendar-clock",
					active: false,
					items: [
						{ title: "All Events", icon: "mdi-calendar-multiple" },
						{ title: "Satsang", icon: "mdi-heart" },
						{ title: "Kendra Events", icon: "mdi-calendar-star" },
						{ title: "Branch Events", icon: "mdi-calendar-text" },
						{ title: "General Meets", icon: "mdi-account-supervisor-circle" },
					],
					title: "Events",
				},
				{
					action: "mdi-post",
					items: [
						{ title: "Photos", icon: "mdi-image" }
					],
					title: "Articles",
				},
				{
					action: "mdi-video-vintage",
					items: [
						{ title: "Sounds", icon: "mdi-music-box" },
						{ title: "Photos", icon: "mdi-image" },
						{ title: "Videos", icon: "mdi-video-box" },
					],
					title: "Multimedia",
				},
				{
					action: "mdi-earth",
					items: [
						{ title: "Motivation", icon: "mdi-run" },
						{ title: "Health", icon: "mdi-bottle-tonic-plus" },
						{ title: "Peace", icon: "mdi-peace" },
						{ title: "Dance", icon: "mdi-dance-ballroom" },
					],
					title: "Our Services",
				},
				{
					action: "mdi-google-maps",
					items: [
						{ title: "Branches", icon: "mdi-city" },
						{ title: "Kendra Branch", icon: "mdi-map-marker-star" },
					],
					title: "Maps",
				},
				{
					action: "mdi-office-building",
					items: [
						{ title: "About Us", icon: "mdi-information" },
						{ title: "Contact Us", icon: "mdi-phone" },
						{ title: "Kendra Message", icon: "mdi-message" },
						{ title: "Write Feedback", icon: "mdi-comment-quote" },
					],
					title: "Office",
				},
				{
					action: "mdi-tag",
					items: [{ title: "Our Partners", icon: "mdi-handshake" }],
					title: "Promotions",
				},
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
.home-navbar
	overflow: hidden
	position: fixed /* Set the navbar to fixed position */
	top: 0 /* Position the navbar at the top of the page */
	width: 100% /* Full width */
	z-index: 100
.sacchai-home-toolbar-top
	border-radius: 0
	margin: 0
	padding: 0 16px
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
.home-sidenav
	transition: all .5s
	margin-top: 73px
	@media only screen and (max-width: 960px)
		margin-top: 145px
.cursor
	cursor: pointer
.home-tab-active
	color: darkslategrey
</style>
