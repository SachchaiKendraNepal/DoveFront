<template>
	<div>
		<div class="feeds-wrapper">
			<v-app-bar
				color="#c4e4ff"
				class="sacchai-home-toolbar-top elevation-0"
				height="73"
				fixed
			>
				<div class="left-float">
					<v-avatar
						class="cursor"
						size="60"
						@click.stop="toggleHomeDrawer()"
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
						slider-color="primary"
						slider-size="3"
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
			<v-card
				v-show="$vuetify.breakpoint.smAndDown"
				class="bottom-tab-card"
				flat
			>
				<v-tabs
					background-color="#c4e4ff"
					centered
					show-arrows
					icons-and-text
					slider-size="3"
					active-class="home-tab-active-down"
					slider-color="primary"
				>
					<v-tab
						v-for="item in homeTabItems"
						:key="item.text"
						:to="item.to"
					>
						<v-icon size="30">
							{{ item.icon }}
						</v-icon>
					</v-tab>
				</v-tabs>
			</v-card>
			<v-navigation-drawer
				:value="homeDrawer"
				class="home-sidenav"
				app
				floating
			>
				<user-clip />
				<v-list>
					<v-list-group
						v-for="item in items"
						:key="item.title"
						v-model="item.active"
						active-class="darkblue--text"
						no-action
					>
						<template #prependIcon>
							<v-icon :color="item.color">
								{{ item.action }}
							</v-icon>
						</template>
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
			<v-main>
				<v-container
					fluid
					class="home-router-container"
				>
					<v-row class="ma-0 pa-0">
						<v-col class="pa-0">
							<transition name="fade">
								<router-view />
							</transition>
						</v-col>
					</v-row>
					<home-footer />
				</v-container>
			</v-main>
		</div>
		<scroll-up />
	</div>
</template>

<script>
import router from "@/router"

export default {
	name: "SacchaiHomeLayout",
	components: {
		ProfileDropdown: () => import("@/views/home_layout/ProfileDropdown"),
		UserClip: () => import("@/views/home_layout/UserClip"),
		HomeFooter: () => import("@/views/home_layout/Footer"),
		ScrollUp: () => import("@/components/ScrollTop")
	},
	data: () => ({
		currentItem: "",
		logo: require("@/assets/sacchai_logo.jpg"),
		homeTabItems: [
			{icon: "mdi-home", text: "Home", to: "/home"},
			{icon: "mdi-post", text: "Articles", to: "/home/article"},
			{icon: "mdi-video-vintage", text: "Multimedia", to: "/home/multimedia"},
			{icon: "mdi-calendar-clock", text: "Events", to: "/home/event"},
		],
		homeDrawer: true,
		items: [
			{
				color: "grey darken-3",
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
				color: "indigo",
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
				color: "red darken-1",
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
				color: "orange darken-2",
				action: "mdi-post",
				items: [
					{ title: "Photos", icon: "mdi-image" }
				],
				title: "Articles",
			},
			{
				color: "teal darken-2",
				action: "mdi-video-vintage",
				items: [
					{ title: "Sounds", icon: "mdi-music-box" },
					{ title: "Photos", icon: "mdi-image" },
					{ title: "Videos", icon: "mdi-video-box" },
				],
				title: "Multimedia",
			},
			{
				color: "blue darken-4",
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
				color: "pink darken-1",
				action: "mdi-google-maps",
				items: [
					{ title: "Branches", icon: "mdi-city" },
					{ title: "Kendra Branch", icon: "mdi-map-marker-star" },
				],
				title: "Maps",
			},
			{
				color: "purple darken-4",
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
				color: "green darken-3",
				action: "mdi-tag",
				items: [{ title: "Our Partners", icon: "mdi-handshake" }],
				title: "Promotions",
			},
		]
	}),
	methods: {
		routeToShowcase() {
			router.push({name: "SACHCHAI SHOWCASE"})
		},
		toggleHomeDrawer() {
			this.homeDrawer = !this.homeDrawer
		}
	},
}
</script>
<style lang="sass" scoped>
.feeds-wrapper
	background-color: #edf6fd
.sacchai-home-toolbar-top
	border-radius: 0
	margin: 0
	padding: 0 16px
	height: 72px
	display: flex
	align-items: center
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
	background: linear-gradient(180deg, rgb(237,246,253), rgb(202,215,231), rgb(207,212,218))
	transition: all 1s
	margin-top: 73px
	@media only screen and (max-width: 960px)
		margin-top: 0
.cursor
	cursor: pointer
.home-tab-active
	color: #3b78f2
.bottom-tab-card
	border-radius: 0
	position: fixed
	top: 72px
	width: 100vw
	z-index: 2
.home-tab-active-down
	color: #3b78f2
.home-router-container
	transition: all .3s
	padding: 0
	background: aliceblue
	margin-top: 73px
	@media only screen and (max-width: 960px)
		margin-top: 145px
</style>
