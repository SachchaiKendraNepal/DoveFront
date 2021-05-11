<template>
	<v-card max-width="1200"
		flat
		class="mx-auto"
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="12">
				<v-card
					color="rgb(23 94 129)"
					dark
					min-height="200"
					max-width="550"
				>
					<v-row class="ma-0 pa-0">
						<v-col cols="12"
							xl="8"
							lg="8"
							md="8"
							sm="8"
							class="my-auto"
							:class="
								$vuetify.breakpoint.smAndUp
									? ''
									: 'text-center'
							"
						>
							<v-card-text
								class="headline"
								:class="
									$vuetify.breakpoint.smAndUp
										? ''
										: 'text-center'
								"
							>
								<b>Administration Dashboard</b>
							</v-card-text>

							<v-card-subtitle>
								Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal
							</v-card-subtitle>

							<div class="admin-welcome-text">
								<i>Welcome Manager</i> <b>{{ currentUser.first_name }}</b> !
							</div>
						</v-col>
						<v-col cols="12"
							xl="4"
							lg="4"
							md="4"
							sm="4"
							class="text-center my-auto"
						>
							<v-avatar
								class="profile-avatar"
								size="130"
							>
								<v-img :src="getCurrentProfileImage" />
							</v-avatar>
							<div class="text-center">
								<v-chip
									class="mt-1"
									color="grey"
									dense
								>
									<v-icon>mdi-account-cog</v-icon>
									<b>Admin</b>
								</v-chip>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
				<v-card-title class="stat-summary">
					Statistics Summary
				</v-card-title>
			</v-col>
			<v-card
				v-for="(item, i) in items"
				:key="i"
				:color="item.color"
				dark
				width="310"
				class="ma-4"
			>
				<div class="d-flex flex-no-wrap justify-space-between">
					<div>
						<v-card-title
							class="headline"
							v-text="item.title"
						/>

						<v-card-subtitle v-text="item.artist" />
						<v-card-actions class="pa-0">
							<v-btn
								fab
								icon
								height="40px"
								width="40px"
								@click.stop="handle_function_call(item.add)"
							>
								<v-icon>mdi-plus</v-icon>
							</v-btn>
							<v-btn
								fab
								icon
								height="40px"
								width="40px"
								:to="item.view"
							>
								<v-icon>mdi-eye</v-icon>
							</v-btn>
						</v-card-actions>
					</div>

					<v-avatar
						class="ma-3 elevation-4"
						:size="
							$vuetify.breakpoint.smAndUp
								? 125
								: 80
						"
						tile
						color="grey"
						style="border-radius:10px !important;"
					>
						<span
							class="white--text display-2"
							:class="
								$vuetify.breakpoint.smAndUp
									? 'display-2'
									: 'display-1'"
						>{{ item.count }}</span>
					</v-avatar>
				</div>
			</v-card>
			<event-form-dialog />
			<branch-form-dialog />
			<follower-form-dialog />
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "SettingsHomeView",
	components: {
		EventFormDialog: () => import("@/views/event/EventFormDialog"),
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog"),
		FollowerFormDialog: () => import("@/views/member/MemberFormDialog")
	},
	data: () => ({
		defaultProfileImage: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
		currentUser: null,
		items: [
			{
				color: "#1F7087",
				count: 500,
				title: "Followers",
				artist: "Manage Sachchai Nepal Followers",
				add: "openAddFollowerFormDialog"
			},
			{
				color: "#952175",
				count: 200,
				title: "Members",
				artist: "Manage Sachchai Nepal Members",
				view: "/admin/follower",
				add: "openAddFollowerFormDialog"
			},
			{
				color: "#cd430a",
				count: 15,
				title: "Branch",
				artist: "Manage Sachchai Nepal Branches",
				view: "/admin/branch",
				add: "openAddBranchFormDialog"
			},
			{
				color: "#057253",
				count: 40,
				title: "Articles",
				artist: "Manage Sachchai Nepal Articles",
				view: "/admin/article"
			},
			{
				color: "#053f72",
				count: 40,
				title: "Multimedia",
				artist: "Manage Sachchai Nepal Multimedia",
				view: "/admin/multimedia"
			},
			{
				color: "rgb(201 44 33)",
				count: 40,
				title: "Events",
				artist: "Manage Sachchai Nepal Events",
				add: "openAddEventFormDialog"
			},
			{
				color: "rgb(69 26 145)",
				count: 40,
				title: "Ads",
				artist: "Sachchai Nepal Advertisements",
				view: "/admin/ad"
			},
		],
	}),
	computed: {
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
		handle_function_call(function_name) {
			this[function_name]()
		},
		openAddBranchFormDialog() {
			this.$bus.emit("open-branch-form-dialog-add-item")
		},
		openAddEventFormDialog() {
			this.$bus.emit("open-event-form-dialog-add-item")
		},
		openAddFollowerFormDialog() {
			this.$bus.emit("open-follower-form-dialog-add-item")
		}
	}
}
</script>
<style lang="sass" scoped>
.admin-welcome-text
	padding: 10px
	font-size: 20px
	color: white
	min-height: 100%
.stat-summary
	margin: 10px 0 0 15px
	padding: 0
	font-size: 22px
	color: darkslategrey
	font-family: "Chilanka", sans-serif
	font-weight: bold
	border-bottom: 1px solid grey
	max-width: 1000px
.profile-avatar
	border: 4px solid gold
</style>
