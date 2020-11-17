<template>
	<div id="profile-container">
		<v-row id="top-row">
			<v-col
				id="cover-column"
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
			<v-col
				id="profile-av-col"
				cols="12"
				class="pa-0 d-flex justify-center"
			>
				<v-avatar id="profile-avatar"
					size="200"
				>
					<v-img src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg" />
				</v-avatar>
			</v-col>
			<v-col cols="12">
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
			<v-col cols="12"
				class="pa-0"
			>
				<div id="divider"
					class="mx-auto"
				/>
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
				<v-card
					flat
					color="transparent"
				>
					<v-toolbar
						max-width="1000"
						color="transparent"
						class="mx-auto elevation-0 "
						:height="
							$vuetify.breakpoint.mdAndUp
								? 72
								: 50
						"
						flat
					>
						<v-app-bar-nav-icon class=" mx-1 mx-xl-0 mx-lg-0 mx-md-2">
							<v-avatar color="grey lighten-2"
								class="elevation-4 mt-2 mt-md-0 mt-lg-0 mt-xl-0"
								style="border: 2px solid #0077cd !important;"
							>
								<v-icon x-large
									color="primary"
								>
									mdi-bird
								</v-icon>
							</v-avatar>
						</v-app-bar-nav-icon>
						<v-spacer />
						<v-card
							flat
							color="transparent"
							class="ma-0 pa-0 mx-auto"
						>
							<v-tabs
								v-show="$vuetify.breakpoint.mdAndUp"
								v-model="currentItem"
								icons-and-text
								background-color="transparent"
								slider-color="grey darken-4"
							>
								<v-tab
									v-for="(tab, index) in profileTabItems"
									:key="index"
									:href="'#tab-' + tab.text"
								>
									{{ tab.text }}
									<v-icon>{{ tab.icon }}</v-icon>
								</v-tab>
							</v-tabs>
						</v-card>
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
					</v-toolbar>
					<v-tabs
						v-show="$vuetify.breakpoint.smAndDown"
						v-model="currentItem"
						show-arrows
						centered
						icons-and-text
						background-color="transparent"
						slider-color="grey darken-4"
					>
						<v-tab
							v-for="(tab, index) in profileTabItems"
							:key="index"
							:href="'#tab-' + tab.text"
						>
							{{ tab.text }}
							<v-icon>{{ tab.icon }}</v-icon>
						</v-tab>
					</v-tabs>
				</v-card>
			</v-col>
		</v-row>
		<v-tabs-items v-model="currentItem">
			<posts-tab />
			<about-tab />
			<photos-tab />
			<multimedia-tab />
		</v-tabs-items>
	</div>
</template>
<script>
export default {
	name: "ProfileView",
	components: {
		PostsTab: () => import("@/views/member/profile/PostsTab"),
		AboutTab: () => import("@/views/member/profile/AboutTab"),
		PhotosTab: () => import("@/views/member/profile/PhotosTab"),
		MultimediaTab: () => import("@/views/member/profile/MultimediaTab"),
		ChangePasswordDialog: () => import("@/views/member/profile/ChangePassword"),
		EditProfileDialog: () => import("@/views/member/profile/EditProfileDialog"),
	},
	data: () => ({
		currentItem: "tab-Posts",
		profileTabItems: [
			{icon: "mdi-post", text: "Posts"},
			{icon: "mdi-information-variant", text: "About"},
			{icon: "mdi-folder-multiple-image", text: "Photos"},
			{icon: "mdi-camcorder", text: "Multimedia"}
		],
		profileActionItems: [
			{icon: "mdi-pencil", text: "Edit profile", functionName: "openEditProfileDialog"},
			{icon: "mdi-arrow-horizontal-lock", text: "Change password", functionName: "openChangePasswordDialog"},
			{icon: "mdi-account-cog", text: "Settings", functionName: "openSettingsDialog"},
		],
	}),
	methods: {
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
#top-row
	transition: all .5s
	background-color: #d3e9fc
	#cover-column
		background: linear-gradient(180deg, #007fd3, #cee7f9)
		#cover-photo
			border-radius: 0 0 10px 10px
	#profile-av-col
		margin-top: -170px
		#profile-avatar
			border: 5px solid white
	#divider
		border-bottom: 1px solid grey
		max-width: 1000px
	#top-info
		text-align: center
		max-width: 1000px
</style>
