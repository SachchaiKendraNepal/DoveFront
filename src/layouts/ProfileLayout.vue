<template>
	<v-card
		class="overflow-hidden rounded-0"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-navigation-drawer v-model="drawer" :mini-variant.sync="mini"
			app
			permanent
		>
			<sidebar-list />
		</v-navigation-drawer>
		<v-app-bar
			dark
			app
			fixed
			height="80"
			class="blue-gradient"
		>
			<v-app-bar-nav-icon @click.stop="mini=!mini">
				<v-icon v-if="mini">
					mdi-menu
				</v-icon>
				<v-icon v-else>
					mdi-menu-open
				</v-icon>
			</v-app-bar-nav-icon>
			<div class="px-2" />
			<v-card
				flat
				color="transparent"
				height="55"
				width="55"
			>
				<v-img
					contain
					height="55"
					width="55"
					:src="require('@/assets/peace-pegion.png')"
				/>
			</v-card>
			<v-spacer />
			<v-card
				light
				color="transparent"
				class="elevation-12 top-tab-wrapper"
			>
				<profile-header-tab :show-arrows="false" />
			</v-card>
			<v-spacer />
			<div class="px-1" />
			<profile-dropdown />
		</v-app-bar>
		<v-card
			light
			max-width="1000"
			color="tab-blue-gradient"
			class="mx-auto rounded-t-0 aux-profile-tab-card elevation-12"
		>
			<profile-header-tab />
		</v-card>
		<v-main class="mt-0 pt-0">
			<v-container class="mt-0 pt-0">
				<v-row no-gutters>
					<v-col cols="12"
						class="layout-col"
					>
						<the-snackbar />
						<v-card flat
							max-width="1000" class="mx-auto"
							min-height="94vh"
						>
							<v-scale-transition>
								<div v-if="$route.name !== 'ABOUT ME'"
									class="py-6"
								/>
							</v-scale-transition>
							<transition name="view">
								<router-view />
							</transition>
							<div class="py-6" />
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			<scroll-up />
			<v-footer padless>
				<v-col
					class="text-center"
					cols="12"
				>
					©️ {{ new Date().getFullYear() }} — <strong>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</strong>
				</v-col>
			</v-footer>
		</v-main>
	</v-card>
</template>

<script>
import ProfileHeaderTab from "@/components/ProfileHeaderTab";
import SidebarList from "@/views/profile/SidebarList";
import TheSnackbar from "@/components/TheSnackbar";
import ProfileDropdown from "@/views/home/ProfileDropdown";
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "ProfileLayout",
	components: {
		ProfileDropdown,
		TheSnackbar,
		SidebarList,
		ProfileHeaderTab,
		ScrollUp: () => import("@/components/ScrollTop")
	},
	mixins: [Snack],
	data: () => ({
		drawer: true,
		mini: true,
	}),
	computed: {
		...mapGetters({
			currentUser: "user/detail"
		})
	},
	created() {
		this.init()
		this.$bus.on("close-sidebar", () => {
			this.mini = true
		})
		this.$bus.on("refresh-me", this.init)
	},
	beforeUnmount() {
		this.$bus.off("close-sidebar")
		this.$bus.off("refresh-me")
	},
	methods: {
		async init() {
			this.loading = true
			const fetch = await this.$store.dispatch(
				"user/fetchById",
				{ id: this.$helper.getCurrentUser().id }
			)
			if (!fetch) await this.openSnack("Sorry. We're trying to fix the problem soon. Please be with us!")
			this.$helper.setCurrentUser(this.currentUser)
			this.loading = false
		},
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
.nav-gradient
	background-image: linear-gradient( 358.7deg,  rgba(42,136,157,1) 1.7%, rgba(122,197,214,1) 51.1%, rgba(211,232,242,1) 95.5% )
.blue-gradient
	background-image: linear-gradient( 109.6deg,  rgb(113, 192, 238) 11.2%, rgba(93,52,236,1) 100.2% )
.tab-blue-gradient
	background-image: linear-gradient( 109.6deg,  rgba(39,142,255,1) 11.2%, rgba(98,113,255,0.78) 100.2% )
.top-tab-wrapper
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 630px)
		margin: 0
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
.aux-profile-tab-card
	transition: all .5s
	visibility: visible
	opacity: 1
	@media only screen and (min-width: 631px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
	@media only screen and (max-width: 631px)
		margin-top: 80px
.layout-col
	margin: 80px auto 0
	transition: margin-top .5s ease
	@media only screen and (max-width: 631px)
		margin-top: 0
</style>
