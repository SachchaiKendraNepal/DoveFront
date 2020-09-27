<template>
	<v-card
		class="mx-auto my-6"
		max-width="900"
		outlined
	>
		<v-row class="">
			<v-col
				cols="12"
				xl="9"
				lg="9"
				md="9"
				sm="9"
				class="pl-10"
			>
				<div class="overline">
					FOLLOWER MEMBER
				</div>
				<p class="headline">
					{{ follower.f_name }} {{ follower.l_name }}
				</p>
				<p>{{ follower.bio }}</p>
				<div>
					<v-chip
						class="mr-2 mb-3"
						label
						color="orange lighten-4"
					>
						<p class="ma-0 pa-0 follower-counts">
							123
						</p>
						Posts
						<v-icon color="orange darken-3">
							mdi-post
						</v-icon>
					</v-chip>
					<v-chip
						color="blue lighten-4"
						class="mr-2 mb-3"
						label
					>
						<p class="ma-0 pa-0 follower-counts">
							123
						</p>
						Bookmarks
						<v-icon color="blue darken-3">
							mdi-bookmark
						</v-icon>
					</v-chip>
					<v-chip
						color="red lighten-4"
						class="mr-2 mb-3"
						label
					>
						<p class="ma-0 pa-0 follower-counts">
							123
						</p>
						Loves
						<v-icon style="color: darkred">
							mdi-heart
						</v-icon>
					</v-chip>
					<v-chip
						color="green lighten-3"
						class="mr-2 mb-3"
						label
					>
						<p class="ma-0 pa-0 follower-counts">
							123
						</p>
						Events
						<v-icon style="color: darkgreen">
							mdi-calendar-check
						</v-icon>
					</v-chip>
				</div>
			</v-col>
			<v-col
				cols="12"
				xl="3"
				lg="3"
				md="3"
				sm="3"
				class="text-center"
			>
				<v-avatar
					:size="
						$vuetify.breakpoint.sm
							? '135'
							: '180'
					"
					color="grey"
				>
					<v-img
						:src="follower.image"
					/>
				</v-avatar>
			</v-col>
		</v-row>
		<v-divider />

		<v-tabs vertical>
			<v-tab
				v-for="item in profileTabItems"
				:id="item.id"
				:key="item.index"
				class="text-start"
			>
				<v-icon left>
					{{ item.icon }}
				</v-icon>
				<span v-show="$vuetify.breakpoint.smAndUp">{{ item.title }}</span>
			</v-tab>

			<v-tab-item>
				<v-card
					id="personal-info-tab-content"
					flat
				>
					<v-card-text class="mt-0 pt-0">
						<v-list class="mt-0 pt-0">
							<v-list-item @click="1">
								<v-icon class="mr-2">
									mdi-account-circle
								</v-icon>
								<p class="mb-0 pb-0">
									<b>Full Name:</b> {{ follower.f_name }} {{ follower.l_name }}
								</p>
							</v-list-item>
							<v-list-item
								v-for="(item, index) in personalInfoItems"
								:key="index"
								@click="1"
							>
								<v-icon class="mr-2">
									{{ item.icon }}
								</v-icon>
								<p class="mb-0 pb-0">
									<b>{{ item.displayFieldName }} :</b>
									{{ follower[item.field] }}
								</p>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					id="branch-info-tab-content"
					flat
				>
					<v-card-text class="mt-0 pt-0">
						<v-row>
							<v-col
								v-for="item in memberInfoItems1"
								:key="item.index"
								cols="8"
								class="my-0 py-0"
							>
								<v-list class="ma-0 pa-0">
									<v-list-item @click="1">
										<v-icon class="mr-2">
											{{ item.icon }}
										</v-icon>
										<p class="ma-0 pa-0">
											<b>{{ item.displayFieldName }} :</b>
											{{ follower[item.field] }}
										</p>
										<v-spacer />
										<span v-if="item.field === 'position'">
											<v-avatar v-for="i in 2"
												:key="i"
												class="elevation-3"
												size="20"
												color="grey darken-2 ml-1"
											>
												<v-icon dark
													small
												>mdi-star</v-icon>
											</v-avatar>
										</span>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col
								cols="8"
								class="my-0 py-0"
							>
								<v-list class="ma-0 pa-0">
									<v-list-item @click="1">
										<v-checkbox
											v-model="follower.is_approved"
											color="indigo"
											label="Approved Status"
										/>
										<v-spacer />
										<span>
											<v-icon>mdi-marker-check</v-icon>
										</span>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col
								v-for="item in memberInfoItems2"
								:key="item.index"
								cols="8"
								class="my-0 py-0"
							>
								<v-list class="ma-0 pa-0">
									<v-list-item @click="1">
										<v-icon class="mr-2">
											{{ item.icon }}
										</v-icon>
										<p class="ma-0 pa-0">
											<b>{{ item.displayFieldName }} :</b>
											{{ follower[item.field] }}
										</p>
									</v-list-item>
								</v-list>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					id="permission-info-tab-content"
					flat
				>
					<v-card-text class="mt-0 pt-0">
						<v-row>
							<v-col
								v-for="(item, index) in permissionInfoItems"
								:key="index"
								cols="10"
								class="ma-0 pa-0"
							>
								<v-list class="ma-0 pa-0">
									<v-list-item @click="1">
										<v-checkbox
											v-model="follower[item.field]"
											color="indigo"
											:label="item.displayFieldName"
										/>
										<v-spacer />
										<span>
											<v-icon>{{ item.icon }}</v-icon>
										</span>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col cols="12">
								<permission-table />
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					id="posts-info-tab-content"
					flat
				>
					<v-row>
						<v-col class="ma-4 mt-1">
							<FollowerArticle />
							<FollowerMultimedia />
							<FollowerArticle />
							<FollowerMultimedia />
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
		</v-tabs>

		<v-card-actions>
			<v-spacer />
			<v-btn
				color="red lighten-5"
				class="red--text"
				depressed
			>
				<v-icon small>
					mdi-delete
				</v-icon>
				Delete
			</v-btn>
			<v-btn
				color="blue lighten-5"
				class="blue--text"
				depressed
			>
				<v-icon small>
					mdi-content-save-edit
				</v-icon>
				Save
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "FollowerDetailView",
	components: {
		PermissionTable: () => import("@/components/PermissionTable"),
		FollowerArticle: () => import("@/views/home/article/Article"),
		FollowerMultimedia: () => import("@/views/home/multimedia/Multimedia")
	},
	data: () => ({
		now: null,
		tab: null,
		profileTabItems: [
			{icon: "mdi-account-circle", title: "Personal", index: 0, id: "personal-info-tab"},
			{icon: "mdi-city-variant", title: "Branch", index: 1, id: "branch-info-tab"},
			{icon: "mdi-shield-key", title: "Permissions", index: 2, id: "permission-info-tab"},
			{icon: "mdi-post", title: "Posts", index: 3, id: "posts-info-tab"}
		],
		personalInfoItems: [
			{icon: "mdi-card-account-details-outline", field: "username", displayFieldName: "Username"},
			{icon: "mdi-at", field: "email", displayFieldName: "Email Address"},
			{icon: "mdi-phone-classic", field: "phone", displayFieldName: "Phone"},
			{icon: "mdi-office-building-marker", field: "temporary_address", displayFieldName: "Temporary Address"},
			{icon: "mdi-crosshairs-gps", field: "permanent_address", displayFieldName: "Permanent Address"},
			{icon: "mdi-account-tie-outline", field: "created_by", displayFieldName: "Created By"},
			{icon: "mdi-calendar-plus", field: "created_at", displayFieldName: "Date Joined"},
			{icon: "mdi-history", field: "last_login", displayFieldName: "Last Logged In"},
			{icon: "mdi-account-tie-outline", field: "updated_by", displayFieldName: "Updated By"},
			{icon: "mdi-calendar-edit", field: "updated_at", displayFieldName: "Last Updated At"},
		],
		memberInfoItems1: [
			{icon: "mdi-home-city", field: "branch", displayFieldName: "Branch", index: 0},
			{icon: "mdi-account-tie", field: "position", displayFieldName: "Position", index: 1}
		],
		memberInfoItems2: [
			// {icon: "mdi-marker-check", field: "is_approved", displayFieldName: "Approved Status"},
			{icon: "mdi-calendar-check", field: "approved_at", displayFieldName: "Approved At", index: 2},
			{icon: "mdi-account-check", field: "approved_by", displayFieldName: "Approved By", index: 3},
		],
		permissionInfoItems: [
			{icon: "mdi-account-tie", field: "is_staff", displayFieldName: "Can View Admin Site"},
			{icon: "mdi-account-cowboy-hat", field: "is_superuser", displayFieldName: "Super User"}
		],
		follower: {
			id: 1,
			username: "kiran589",
			email: "kiran589@gmail.com",
			f_name: "Kiran",
			l_name: "Parajuli",
			phone: 9843530425,
			branch: "Polar Branch",
			position: "Leader",
			sub_position: "Double Star",
			is_approved: true,
			approved_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			approved_by: "John Doe",
			date_joined: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			is_superuser: true,
			is_staff: true,
			temporary_address: "ABC, XYZ",
			permanent_address: "DAC, YML",
			last_login: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			image:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
			bio: "Greyhound divisely hello coldly fonwderfully",
			created_by: "John Doe",
			created_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			updated_by: "Kiran Parajuli",
			updated_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
		},
	}),
	methods: {}
}
</script>
<style lang="sass" scoped>
.headline
	padding-top: 10px
	font-size: 36px !important
	font-weight: 30
.follower-counts
	margin-right: 4px !important
	padding: 2px !important
	background-color: #706f6f63
	border-radius: 5px
	color: #f8f8d9
	font-weight: bold
.text-start
	align-self: start
.personal-info-tab-content-card

	margin-right: 10px
</style>
