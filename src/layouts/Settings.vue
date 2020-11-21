<template>
	<div id="settings">
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
						to="/home"
						v-bind="attrs"
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
			:value="drawer"
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
					/>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center"
				>
					<v-avatar
						size="120"
						style="border: 4px solid white; margin-top: -70px"
					>
						<v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
					</v-avatar>
				</v-col>
			</v-row>
			<v-list class="py-0 text-center">
				<v-list-item link>
					<v-list-item-content class="py-0">
						<v-list-item-title class="title">
							Sandra Adams
						</v-list-item-title>
						<v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
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
					<v-col class="pt-0">
						<transition name="fade">
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
				©️ {{ new Date().getFullYear() }} — <strong>Ishowiya Marg Bhajan Mandal Sachchai Kendra Nepal</strong>
			</v-col>
		</v-footer>
	</div>
</template>
<script>
export default {
	name: "SettingsLayout",
	data() {
		return {
			drawer: true,
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
				{ title: "Ads", icon: "mdi-cash-usd", to: "/admin/ad" }
			],
		}
	},
}
</script>
<style lang="sass" scoped>

</style>
