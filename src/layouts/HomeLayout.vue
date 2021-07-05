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
				class="mr-8 ml-4"
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

			<v-card light
				color="transparent"
				class="top-tab-wrapper"
				height="55"
			>
				<home-tabs />
			</v-card>
			<v-spacer />
			<div class="px-1" />
			<profile-dropdown />
		</v-app-bar>

		<v-card
			light
			max-width="1000"
			color="rgb(221 161 221)"
			class="mx-auto rounded-t-0 aux-home-tab-card elevation-12"
		>
			<home-tabs :arrows="true" />
		</v-card>

		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-navigation-drawer v-model="homeDrawer" :mini-variant.sync="mini"
			app
			:permanent="$vuetify.breakpoint.mdAndUp"
			:temporary="!$vuetify.breakpoint.mdAndUp"
		>
			<quick-links @toggle="mini = !mini" />
		</v-navigation-drawer>

		<v-main class="mt-0 pt-0">
			<v-container
				fluid
				class="home-router-container px-0 mt-0 pt-0"
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
			<scroll-up />
			<home-footer />
		</v-main>
	</v-card>
</template>

<script>
import TheSnackbar from "@/components/TheSnackbar";
import HomeTabs from "@/views/home/Tabs";

export default {
	name: "SacchaiHomeLayout",
	components: {
		HomeTabs,
		TheSnackbar,
		ProfileDropdown: () => import("@/views/home/ProfileDropdown"),
		HomeFooter: () => import("@/views/home/Footer"),
		QuickLinks: () => import("@/views/home/QuickLinks"),
		ScrollUp: () => import("@/components/ScrollTop")
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
.top-tab-wrapper
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 600px)
		margin: 0
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
.aux-home-tab-card
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (min-width: 601px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
	@media only screen and (max-width: 601px)
		margin-top: 60px
.home-router-container
	padding-top: 0
	padding-bottom: 0
	margin-top: 60px
	background-color: #f3edff
	@media only screen and (min-width: 601px)
		margin-top: 60px !important
</style>
<style lang="scss" scoped>
.purple-gradient {
	background-image: linear-gradient( 111.5deg,  rgba(254,210,255,1) -7.2%, rgba(115,9,112,1) 100.2% );
}
.aux-tab-gradient {

}
</style>
