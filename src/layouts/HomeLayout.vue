<template>
	<v-card
		class="overflow-hidden rounded-0"
	>
		<v-app-bar
			dark
			app
			fixed
			height="60"
			color="purple-gradient"
		>
			<v-app-bar-nav-icon @click.stop="toggleHomeDrawer()">
				<v-icon v-if="mini"
					color="grey darken-4"
				>
					mdi-menu
				</v-icon>
				<v-icon v-else
					color="grey darken-4"
				>
					mdi-menu-open
				</v-icon>
			</v-app-bar-nav-icon>
			<v-card
				class="mx-4"
				:class="$route.name === 'HOME' ? '' : 'cursor'"
				flat
				color="transparent"
				height="45"
				width="45"
			>
				<v-img
					contain
					height="45"
					width="45"
					:src="require('@/assets/peace-pegion.png')"
					@click="routeToFeeds"
				/>
			</v-card>
			<v-spacer />

			<home-tabs />
			<v-spacer />
			<div class="px-1" />
			<profile-dropdown />
		</v-app-bar>

		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-navigation-drawer v-model="homeDrawer" :mini-variant.sync="mini"
			app
			:permanent="$vuetify.breakpoint.mdAndUp"
			:temporary="!$vuetify.breakpoint.mdAndUp"
		>
			<quick-links @toggle="mini = !mini" />
		</v-navigation-drawer>

		<v-main>
			<v-container
				fluid
				class="home-router-container"
			>
				<v-row no-gutters>
					<v-col>
						<the-snackbar />
						<transition name="view">
							<router-view />
						</transition>
					</v-col>
				</v-row>
			</v-container>
			<scroll-up color="#91348e" />
			<home-footer />
		</v-main>
	</v-card>
</template>

<script>
import TheSnackbar from "@/components/utils/TheSnackbar.vue";
import HomeTabs from "@/views/home/Tabs";

export default {
	name: "SacchaiHomeLayout",
	components: {
		HomeTabs,
		TheSnackbar,
		ProfileDropdown: () => import("@/views/home/ProfileDropdown"),
		HomeFooter: () => import("@/views/home/Footer"),
		QuickLinks: () => import("@/views/home/QuickLinks"),
		ScrollUp: () => import("@/components/utils/ScrollTop.vue")
	},
	data: () => ({
		homeDrawer: false,
		mini: false,
		logo: require("@/assets/showcase_logo_v1.png"),
	}),
	created() {
		this.mini = this.$vuetify.breakpoint.smAndUp
	},
	methods: {
		routeToFeeds() {
			if (this.$route.name !== "HOME") {
				this.$router.push({name: "HOME"})
			}
		},
		toggleHomeDrawer() {
			if (this.$vuetify.breakpoint.mdAndUp) this.mini = !this.mini
			else {
				this.homeDrawer = !this.homeDrawer
			}
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
.home-router-container
	padding: 0
	background-color: #f3edff
</style>
<style lang="scss" scoped>
.purple-gradient {
	background-image: linear-gradient( 111.5deg,  rgba(254,210,255,1) -7.2%, rgba(115,9,112,1) 100.2% );
}
</style>
