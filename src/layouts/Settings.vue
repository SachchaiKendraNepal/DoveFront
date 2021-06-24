<template>
	<div id="settings">
		<the-snackbar />
		<v-app-bar
			app
			dark
			color="grey darken-4"
		>
			<v-app-bar-nav-icon @click="mini= !(mini)">
				<v-icon v-if="mini">
					mdi-menu
				</v-icon>
				<v-icon v-else>
					mdi-menu-open
				</v-icon>
			</v-app-bar-nav-icon>
			<v-toolbar-title style="font-size: 1.1rem;">
				{{ $route.name }}
			</v-toolbar-title>
			<v-spacer />
			<div class="px-1" />
			<profile-dropdown />
		</v-app-bar>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-navigation-drawer v-model="adminDrawer" :mini-variant.sync="mini"
			app
			permanent
			dark
		>
			<admin-sidebar />
		</v-navigation-drawer>
		<v-main>
			<v-container fluid
				class="pa-0"
			>
				<v-row no-gutters>
					<v-col cols="12">
						<transition name="setting">
							<router-view />
						</transition>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<small-footer />
	</div>
</template>
<script>
import TheSnackbar from "@/components/TheSnackbar";
import SmallFooter from "@/components/SmallFooter";
import AdminSidebar from "@/views/settings/AdminSidebar";
import ToFeedsPageBtn from "@/components/ToFeedsPageBtn";
import ProfileDropdown from "@/views/home/ProfileDropdown";

export default {
	name: "SettingsLayout",
	components: {
		ProfileDropdown,
		AdminSidebar,
		SmallFooter,
		TheSnackbar
	},
	data() {
		return {
			adminDrawer: false,
			mini: true,
		}
	},
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
.profile-av-nav {
	border: 4px solid aliceblue;
	background: aliceblue;
	margin-top: -50px
}
.table-title {
	font-size: 1rem;
	font-weight: 500;
}
.table-avatar {
	border: 2px solid #2d9494;
	background-color: #2d9494;
}
</style>
