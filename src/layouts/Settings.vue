<template>
	<div id="settings">
		<v-snackbar
			v-model="snack"
			:timeout="3000"
		>
			{{ snackText }}

			<template #action="{ attrs }">
				<v-btn
					:color="snackColor"
					text
					v-bind="attrs"
					@click="snack = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<v-app-bar app
			color="grey darken-4" dark
		>
			<v-app-bar-nav-icon @click="drawer= !(drawer)">
				<v-icon>mdi-menu</v-icon>
			</v-app-bar-nav-icon>
			<v-toolbar-title>{{ $route.name }}</v-toolbar-title>
			<v-spacer />
			<v-tooltip left>
				<template #activator="{ on, attrs }">
					<v-btn icon
						v-bind="attrs"
						@click="routeToFeedsPage"
						v-on="on"
					>
						<v-icon>
							mdi-post
						</v-icon>
					</v-btn>
				</template>
				<span>Feeds Page</span>
			</v-tooltip>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			app
			floating
			dark
			color="#011431"
		>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="ma-0 pa-0"
				>
					<v-img
						height="100"
						width="100%"
						src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
					>
						<v-row class="ma-0 pa-0 setting-nav-action">
							<v-toolbar class="text-center"
								dense
								color="transparent"
								dark
							>
								<v-spacer />
								<v-btn
									color="grey lighten-2"
									fab
									height="30"
									width="30"
									class="my-2"
									@click.stop="drawer = false"
								>
									<v-icon size="20"
										color="grey darken-3"
									>
										mdi-close
									</v-icon>
								</v-btn>
							</v-toolbar>
						</v-row>
					</v-img>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center"
				>
					<v-avatar
						size="120"
						class="profile-av-nav"
					>
						<v-img :src="getCurrentProfileImage" />
					</v-avatar>
				</v-col>
			</v-row>
			<v-list class="py-0 text-center">
				<v-list-item link>
					<v-list-item-content class="py-0">
						<v-list-item-title class="title">
							{{ currentUser.first_name }} {{ currentUser.last_name }}
						</v-list-item-title>
						<v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider class="mt-2 mx-4" />
			<v-list
				nav
				dense
			>
				<v-list-item
					v-for="(item, index) in drawerItems"
					:key="index"
					:to="item.to"
					link
				>
					<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container fluid
				class="pa-0"
			>
				<v-row class="ma-0 pa-0">
					<v-col class="pa-0">
						<transition name="setting">
							<router-view />
						</transition>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-footer padless>
			<v-col
				class="text-center"
				cols="12"
			>
				©️ {{ new Date().getFullYear() }} — <strong>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</strong>
			</v-col>
		</v-footer>
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "SettingsLayout",
	data() {
		return {
			drawer: true,
			currentUser: null,
			defaultProfileImage: require("@/assets/defaultProfileImage.png"),
			drawerItems: [
				{ title: "Home", icon: "mdi-home", to: "/admin/home" },
				{ title: "Followers", icon: "mdi-account-multiple", to: "/admin/follower" },
				{ title: "Members", icon: "mdi-account-tie", to: "/admin/member" },
				{ title: "Branch", icon: "mdi-city", to: "/admin/branch" },
				{ title: "Multimedias", icon: "mdi-video-vintage", to: "/admin/multimedia" },
				{ title: "Articles", icon: "mdi-post", to: "/admin/article" },
				{ title: "Pins", icon: "mdi-pin", to: "/admin/pin" },
				{ title: "Showcase Images", icon: "mdi-image", to: "/admin/showcase-image" },
				{ title: "Events", icon: "mdi-calendar-multiple", to: "/admin/event" },
				{ title: "Districts", icon: "mdi-map-marker-multiple-outline", to: "/admin/district" },
				{ title: "Ads", icon: "mdi-cash-usd", to: "/admin/ad" }
			],
		}
	},
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
		getCurrentProfileImage() {
			if (this.currentUser && this.currentUser.profile["profile_images"].length > 0) {
				return this.currentUser.profile["profile_images"][0].image
			}
			else return this.defaultProfileImage
		}
	},
	created() {
		this.currentUser = this.$helper.getCurrentUser()
	},
	methods: {
		routeToFeedsPage() {
			this.$router.push({name: "HOME"})
		}
	}
}
</script>
<style lang="sass" scoped>
.setting-enter-active, .setting-leave-active
	transition: opacity .4s ease-in-out, transform .4s ease
.setting-enter-active
	transition-delay: .3s
.setting-enter, .setting-leave-to
	opacity: 0
.setting-enter-to, .setting-leave
	opacity: 1
.setting-nav-action
	transition: all .4s
	visibility: visible
	opacity: 1
	@media only screen and (min-width: 1259px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
		width: 0 !important
</style>
<style lang="scss">
.v-label {
	font-size: 14px !important;
}
.v-input {
	font-size: 14px !important;
}
.profile-av-nav {
	border: 4px solid aliceblue;
	background: aliceblue;
	margin-top: -50px
}
</style>
