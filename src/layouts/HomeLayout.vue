<template>
	<v-card
		class="overflow-hidden rounded-0"
	>
		<v-app-bar
			id="home-app-bar"
			color="deep-purple lighten-2"
			dark
			height="auto"
			fixed
		>
			<v-app-bar-nav-icon @click.stop="toggleHomeDrawer()" />

			<v-avatar
				class="homo-logo elevation-4"
				size="70"
			>
				<v-img :src="logo" />
			</v-avatar>

			<v-card
				v-if="$route.name !== 'SACHCHAI NEPAL EVENTS' && $route.name !== 'SACHCHAI NEPAL BRANCHES'"
				max-width="500"
				class="mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 search-sachchai"
			>
				<v-text-field
					id="search"
					solo
					hide-details
					append-icon="mdi-magnify"
					clearable
					clear-icon="clear"
					placeholder="Search Sachchai Kendra Nepal"
				/>
			</v-card>

			<v-spacer />

			<v-card light
				color="transparent"
				class="ma-0 pa-0 top-tab-wrapper"
			>
				<v-tabs
					v-model="currentItem"
					icons-and-text
					background-color="deep-purple lighten-1"
					slider-color="white"
					active-class="home-active-tab"
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

			<div class="d-flex align-center">
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-avatar
							class="to-showcase elevation-4 mx-2"
							color="#7e57c2"
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

		<the-snackbar />

		<v-card
			light
			max-width="1000"
			color="deep-purple lighten-4"
			class="mx-auto rounded-t-0 aux-home-tab-card elevation-12"
		>
			<v-tabs
				background-color="transparent"
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
			v-model="homeDrawer"
			app
			floating
			class="home-nav-drawer"
		>
			<v-card class="nav-action-card rounded-b-circle text-center"
				color="light-blue lighten-5"
			>
				<v-btn
					fab
					height="30"
					width="30"
					class="my-2"
					@click.stop="homeDrawer = false"
				>
					<v-icon size="20">
						mdi-close
					</v-icon>
				</v-btn>
			</v-card>
			<user-clip />
			<quick-links />
		</v-navigation-drawer>

		<v-main>
			<v-container
				fluid
				class="home-router-container px-0"
			>
				<v-row class="ma-0 pa-0">
					<v-col class="pa-0">
						<transition name="view">
							<router-view />
						</transition>
					</v-col>
				</v-row>
			</v-container>
			<scroll-up />
			<home-footer />
		</v-main>
	</v-card>
</template>

<script>
import router from "@/router"
import {mapGetters} from "vuex";
import TheSnackbar from "@/components/TheSnackbar";

export default {
	name: "SacchaiHomeLayout",
	components: {
		TheSnackbar,
		ProfileDropdown: () => import("@/views/home/ProfileDropdown"),
		UserClip: () => import("@/views/home/UserClip"),
		HomeFooter: () => import("@/views/home/Footer"),
		QuickLinks: () => import("@/views/home/QuickLinks"),
		ScrollUp: () => import("@/components/ScrollTop")
	},
	data: () => ({
		group: null,
		currentItem: "Home",
		logo: require("@/assets/showcase_logo_v1.png"),
		homeTabItems: [
			{icon: "mdi-home", text: "Home", to: "/home/feeds"},
			{icon: "mdi-post", text: "Articles", to: "/home/article"},
			{icon: "mdi-video-vintage", text: "Multimedia", to: "/home/multimedia"},
			{icon: "mdi-calendar-clock", text: "Events", to: "/home/event"},
		],
		homeDrawer: false
	}),
	computed: {
		...mapGetters({
			snackText: "snack/snackText",
			snackColor: "snack/snackColor"
		}),
		snack: {
			get() {
				return this.$store.state.snack.snack
			},
			set(v) {
				this.$store.dispatch("snack/setSnackState", v)
			}
		},
	},
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
.view-enter-active, .view-leave-active
	transition: opacity .4s ease-in-out, transform .4s ease
.view-enter-active
	transition-delay: .3s
.view-enter, .view-leave-to
	opacity: 0
.view-enter-to, .view-leave
	opacity: 1
.homo-logo
	// visibility hidden but not occupying space :)
	// love transition
	transition: all .2s ease-in-out
	visibility: visible
	opacity: 1
	margin: 0 10px 0 2px
	@media only screen and (max-width: 360px)
		height: 45px !important
		min-width: 45px !important
		width: 45px !important
	@media only screen and (max-width: 310px)
		visibility: hidden
		opacity: 0
		height: 0 !important
		min-width: 0 !important
		width: 0 !important
		overflow: hidden
.to-showcase
	transition: all .2s ease-in-out
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 260px)
		visibility: hidden
		opacity: 0
		height: 0 !important
		min-width: 0 !important
		width: 0 !important
		overflow: hidden
.search-sachchai
	transition: all .2s ease-in-out
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 190px)
		width: 0 !important
		height: 0 !important
		max-width: 0 !important
		visibility: hidden
		opacity: 0
		overflow: hidden
.top-tab-wrapper
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 730px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
.aux-home-tab-card
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 360px)
		margin-top: 55px
	@media only screen and (min-width: 361px) and (max-width: 730px)
		margin-top: 74px
	@media only screen and (min-width: 731px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
.home-router-container
	padding-top: 0
	padding-bottom: 0
	margin-top: 80px
	background-color: #f3edff
	@media only screen and (max-width: 730px)
		margin-top: 0
::v-deep.v-tabs-bar__content
	a
		i
			color: red !important
.home-active-tab
	i
		color: aliceblue !important
.home-nav-drawer
	transition: all .4s
	margin-top: 80px
	border-right: 1px solid grey
	@media only screen and (max-width: 1259px)
		margin-top: 0
.nav-action-card
	transition: all .4s
	visibility: visible
	opacity: 1
	@media only screen and (min-width: 1259px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
</style>
