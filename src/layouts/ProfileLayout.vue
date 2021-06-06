<template>
	<v-card
		class="overflow-hidden rounded-0"
	>
		<v-app-bar
			id="home-app-bar"
			dark
			fixed
			height="auto"
			color="rgb(43 112 167)"
		>
			<v-avatar
				color="#1e6cab"
				class="homo-logo elevation-4"
				size="70"
			>
				<v-img :src="require('@/assets/showcase_logo_v1.png')" />
			</v-avatar>

			<v-spacer />

			<v-card
				light
				color="rgb(88 171 237)"
				class="elevation-12 top-tab-wrapper"
			>
				<v-tabs
					background-color="transparent"
					centered
					center-active
					icons-and-text
					slider-size="3"
					active-class="profile-tab-active"
					slider-color="rgb(8 40 57)"
				>
					<v-tab
						v-for="item in profileTabItems"
						:key="item.text"
						:to="item.to"
					>
						{{ item.text }}
						<v-icon
							size="30"
						>
							{{ item.icon }}
						</v-icon>
					</v-tab>
				</v-tabs>
			</v-card>

			<div class="d-flex align-center">
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-avatar
							class="bar-router-link elevation-4 mx-2"
							color="rgb(0 81 145)"
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
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-avatar
							class="bar-router-link elevation-4 mx-2"
							color="#2a71a9"
							v-bind="attrs"
							v-on="on"
							@click="routeToFeedsPage()"
						>
							<v-icon size="24"
								color="grey lighten-3"
							>
								mdi-post
							</v-icon>
						</v-avatar>
					</template>
					<span>Feeds Page</span>
				</v-tooltip>
			</div>
		</v-app-bar>
		<v-card
			light
			max-width="1000"
			color="rgb(209 196 233)"
			class="mx-auto rounded-t-0 aux-profile-tab-card elevation-12"
		>
			<v-tabs
				background-color="rgb(8 153 219)"
				centered
				show-arrows
				icons-and-text
				slider-size="3"
				active-class="profile-tab-active-down"
				slider-color="white"
			>
				<v-tab
					v-for="item in profileTabItems"
					:key="item.text"
					:to="item.to"
				>
					<v-icon size="30">
						{{ item.icon }}
					</v-icon>
				</v-tab>
			</v-tabs>
		</v-card>
		<v-row id="top-row"
			class="ma-0 pa-0"
		>
			<v-col id="cover-column"
				cols="12"
				class="pa-0"
			>
				<v-img
					id="cover-photo"
					src="https://media.nature.com/lw800/magazine-assets/d41586-020-01390-w/d41586-020-01390-w_17974388.jpg"
					height="300"
					max-width="1000"
					class="mx-auto"
				/>
			</v-col>
			<v-col id="profile-av-col"
				cols="12"
				class="pa-0 d-flex justify-center"
			>
				<v-avatar id="profile-avatar"
					size="200"
				>
					<v-img src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg" />
				</v-avatar>
			</v-col>
			<v-col id="top-info-column"
				cols="12"
			>
				<div id="top-info"
					class="mx-auto"
				>
					<h1>Kiran Parajuli</h1>
					<p class="mb-0">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
						totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
						quasi architecto beatae vitae dicta sunt explicabo.
					</p>
				</div>
			</v-col>
			<v-col id="divider-column"
				cols="12"
				class="pa-0"
			>
				<div id="divider"
					class="mx-auto"
				/>
			</v-col>
			<v-col id="toolbar-column"
				cols="12"
				class="pa-0"
			>
				<v-card
					flat
					color="transparent"
				>
					<v-app-bar
						max-width="1000"
						color="transparent"
						class="mx-auto elevation-0"
						height="auto"
						flat
					>
						<v-app-bar-nav-icon>
							<v-avatar
								id="bird-avatar"
								color="grey lighten-2"
								class="elevation-4"
							>
								<v-icon x-large
									color="primary"
								>
									mdi-bird
								</v-icon>
							</v-avatar>
						</v-app-bar-nav-icon>
						<v-toolbar-title class="toolbar-title">
							{{ $route.name }}
						</v-toolbar-title>
						<v-spacer />
						<v-menu
							max-width="220"
							rounded
							bottom
							nudge-bottom="5"
							nudge-left="160"
							offset-y
							transition="slide-y-transition"
							close-on-click
							close-on-content-click
							internal-activator
						>
							<template #activator="{ on, attrs }">
								<v-btn
									id="profile-actions-btn"
									class="action-dropdown mr-1"
									color="grey darken-3"
									icon
									v-bind="attrs"
									v-on="on"
								>
									<v-icon>
										mdi-dots-vertical
									</v-icon>
								</v-btn>
							</template>
							<v-list
								dense
								rounded
								color="red lighten-5"
							>
								<v-list-item
									v-for="(action, actionKey) in profileActionItems"
									:key="actionKey"
									@click.stop="handle_function_call(action.functionName)"
								>
									<v-list-item-icon>
										<v-icon medium
											:color="action.color"
										>
											{{ action.icon }}
										</v-icon>
									</v-list-item-icon>
									<v-list-item-title>{{ action.text }}</v-list-item-title>
								</v-list-item>
							</v-list>
							<change-password-dialog />
							<edit-profile-dialog />
						</v-menu>
					</v-app-bar>
				</v-card>
			</v-col>
		</v-row>

		<v-main>
			<v-container
				fluid
				class="profile-router-container"
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
import router from "@/router"

export default {
	name: "ProfileLayout",
	components: {
		ScrollUp: () => import("@/components/ScrollTop"),
		ChangePasswordDialog: () => import("@/views/profile/ChangePassword"),
		EditProfileDialog: () => import("@/views/profile/EditProfileDialog"),
	},
	data: () => ({
		profileDrawer: false,
		group: null,
		currentItem: "About",
		logo: require("@/assets/sacchai_logo.jpg"),
		profileTabItems: [
			{icon: "mdi-information-variant", text: "About", to: "/profile/about"},
			{icon: "mdi-post", text: "Posts", to: "/profile/post"},
			{icon: "mdi-folder-multiple-image", text: "Photos", to: "/profile/photo"},
			{icon: "mdi-camcorder", text: "Multimedia", to: "/profile/multimedia"}
		],
		profileActionItems: [
			{icon: "mdi-pencil", text: "Edit profile", functionName: "openEditProfileDialog"},
			{icon: "mdi-arrow-horizontal-lock", text: "Change password", functionName: "openChangePasswordDialog"},
			{icon: "mdi-account-cog", text: "Settings", functionName: "openSettingsDialog"},
		],
	}),
	methods: {
		routeToShowcase() {
			router.push({name: "SACHCHAI SHOWCASE"})
		},
		routeToFeedsPage() {
			router.push({name: "HOME"})
		},
		toggleHomeDrawer() {
			this.profileDrawer = !this.profileDrawer
		},
		handle_function_call(function_name) {
			this[function_name]()
		},
		openEditProfileDialog() {
			this.$bus.emit("open-edit-profile-dialog")
		},
		openChangePasswordDialog() {
			this.$bus.emit("open-change-password-dialog")
		},
		openSettingsDialog() {
			console.log("here setting")
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
	@media only screen and (max-width: 360px) and (min-width: 201px)
		height: 45px !important
		min-width: 45px !important
		width: 45px !important
		span
			font-size: 42px !important
	@media only screen and (max-width: 200px)
		height: 30px !important
		min-width: 30px !important
		width: 30px !important
		margin: 0
		span
			font-size: 28px !important
.bar-router-link
	transition: all .2s ease-in-out
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 200px) and (min-width: 101px)
		height: 30px !important
		min-width: 30px !important
		width: 30px !important
		i
			font-size: 20px !important
.profile-router-container
	padding: 0
	margin: 0
	background-color: aliceblue
#top-row
	transition: all .5s
	background-color: #d3e9fc
	#cover-column
		background: linear-gradient(180deg, #007fd3, #cee7f9)
		#cover-photo
			border-radius: 0 0 10px 10px
	#profile-av-col
		transition: all .3s
		margin-top: -170px
		@media only screen and (max-width: 600px) and (min-width: 176px)
			margin-top: -120px
		@media only screen and (max-width: 175px) and (min-width: 111px)
			margin-top: -60px
		@media only screen and (max-width: 110px)
			margin-top: -30px
		#profile-avatar
			background-color: white
			transition: all .3s
			border: 5px solid white
			@media only screen and (max-width: 600px) and (min-width: 176px)
				border: 4px solid white
				height: 150px !important
				min-width: 150px !important
				width: 150px !important
			@media only screen and (max-width: 175px) and (min-width: 111px)
				border: 2px solid white
				height: 100px !important
				min-width: 100px !important
				width: 100px !important
			@media only screen and (max-width: 110px)
				border: 2px solid white
				height: 60px !important
				min-width: 60px !important
				width: 60px !important
	#divider
		border-bottom: 1px solid grey
		max-width: 1000px
	#top-info
		text-align: center
		max-width: 1000px
#bird-avatar
	border: 2px solid #0077cd !important
	margin: 0 0 0 25px !important
.top-tab-wrapper
	transition: all .5s
	visibility: visible
	opacity: 1
	margin: 0 50px 0 0
	@media only screen and (max-width: 710px) and (min-width: 631px)
		margin: 0
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
	@media only screen and (min-width: 630px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		height: 0 !important
		max-width: 0 !important
	@media only screen and (min-width: 361px) and (max-width: 631px)
		margin-top: 78px
	@media only screen and (max-width: 360px) and (min-width: 201px)
		margin-top: 56px
	@media only screen and (max-width: 200px)
		margin-top: 38px
.profile-tab-active
	color: rgb(8 40 57) !important
.profile-tab-active-down
	color: rgb(8 40 57) !important
.toolbar-title
	font-weight: bold !important
	color: darkslategrey
</style>
