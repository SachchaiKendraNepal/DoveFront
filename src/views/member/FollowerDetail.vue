<template>
	<v-card
		class="mx-auto"
		max-width="900"
		outlined
	>
		<detail-view-header>
			<template #topContent>
				<v-img
					src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
					height="200"
				/>
				<div class="d-flex justify-center">
					<v-avatar
						id="profile-img-avatar"
						:size="
							$vuetify.breakpoint.smAndUp
								? '180'
								: '135'
						"
					>
						<v-img src="https://www.bigredcloud.com/wp-content/uploads/4-tips-for-taking-professional-profile-pictures.jpg" />
					</v-avatar>
				</div>
				<div class="px-4">
					<div class="overline">
						FOLLOWER MEMBER
					</div>
					<p class="headline">
						{{ follower.f_name }} {{ follower.l_name }}
					</p>
					<p>{{ follower.bio }}</p>
				</div>
			</template>
			<template #chips>
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
			</template>
		</detail-view-header>
		<detail-view-explorer
			id="explore-card"
			toolbar-title="Explore Sachchai Follower"
			toolbar-icon="mdi-account-circle"
			:tab-items="profileTabItems"
		>
			<template #tabContent>
				<v-tab-item>
					<v-card
						id="personal-info-tab-content"
						flat
					>
						<v-card-text class="mt-0 pa-0">
							<v-list class="mt-0 pt-0 alice-blue">
								<v-list-item>
									<v-icon class="mr-2">
										mdi-account-circle
									</v-icon>
									<p class="mb-0 pb-0">
										<b>Full Name:</b> {{ getFollowerFullName }}
									</p>
								</v-list-item>
								<v-list-item
									v-for="(item, index) in personalInfoItems"
									:key="index"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ item.value }}
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
						<v-card-text v-if="follower.member"
							class="mt-0 pa-0"
						>
							<v-list
								v-for="memberBranch in follower.member.member_branches"
								:key="memberBranch.index"
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item>
									<v-icon class="mr-2">
										mdi-city
									</v-icon>
									<p class="ma-0 pa-0">
										<b>Branch :</b>
										{{ memberBranch.branch.name }}
									</p>
								</v-list-item>
								<v-list-item>
									<v-list color="transparent"
										class="ma-0 pa-0"
										width="100%"
									>
										<v-list-item
											v-for="memberBranchRole in memberBranch.member_branch_roles"
											:key="memberBranchRole.id"
										>
											<v-icon class="mr-2">
												mdi-key
											</v-icon>
											<p class="ma-0 pa-0">
												<b>Role :</b>
												{{ memberBranchRole.role_name }}
											</p>
											<v-spacer />
											<span v-if="memberBranchRole">
												<v-avatar
													class="elevation-3"
													size="20"
													color="grey darken-2 ml-1"
												>
													<v-icon dark
														small
													>{{ getRoleIcon(memberBranchRole.role_name) }}</v-icon>
												</v-avatar>
												<v-avatar
													v-if="memberBranchRole.role_name === 'Double Star Leader'"
													class="elevation-3"
													size="20"
													color="grey darken-2 ml-1"
												>
													<v-icon dark
														small
													>{{ getRoleIcon(memberBranchRole.role_name) }}</v-icon>
												</v-avatar>
											</span>
										</v-list-item>
									</v-list>
								</v-list-item>
							</v-list>
							<v-list v-if="follower"
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item v-if="follower.member">
									<v-checkbox
										v-model="follower.member.is_approved"
										color="indigo"
										label="Approved Status"
										readonly
									/>
									<v-spacer />
									<span>
										<v-icon>mdi-marker-check</v-icon>
									</span>
								</v-list-item>
							</v-list>
							<v-list
								v-for="item in memberInfoItems"
								:key="item.index"
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="ma-0 pa-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ item.value }}
									</p>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card
						id="permission-info-tab-content"
						flat
					>
						<v-card-text class="mt-0 pa-0">
							<v-list
								v-for="(item, index) in permissionInfoItems"
								:key="index"
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item>
									<v-checkbox
										v-model="follower[item.field]"
										dense
										:label="item.displayFieldName"
										readonly
									/>
									<v-spacer />
									<span>
										<v-icon>{{ item.icon }}</v-icon>
									</span>
								</v-list-item>
							</v-list>
							<div class="mt-2" />
							<permission-table />
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card
						id="posts-info-tab-content"
						flat
					>
						<v-row
							justify="center"
							align="center"
							class="ma-0 pa-0"
						>
							<v-col class="pa-4 pt-0 pt-4 alice-blue">
								<v-card
									flat
									class="ma-0 pa-0 center-align alice-blue"
									max-width="500"
								>
									<FollowerArticle />
									<FollowerMultimedia />
									<FollowerArticle />
									<FollowerMultimedia />
								</v-card>
							</v-col>
						</v-row>
					</v-card>
				</v-tab-item>
			</template>
		</detail-view-explorer>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "FollowerDetailView",
	components: {
		PermissionTable: () => import("@/components/PermissionTable"),
		FollowerArticle: () => import("@/components/Article"),
		FollowerMultimedia: () => import("@/components/Multimedia"),
		DetailViewHeader: () => import("@/components/DetailViewHeader"),
		DetailViewExplorer: () => import("@/components/DetailViewExplorer")
	},
	data: () => ({
		loading: false,
		now: null,
		tab: null,
		profileTabItems: [
			{icon: "mdi-account-circle", title: "Personal", index: 0, id: "personal-info-tab"},
			{icon: "mdi-city-variant", title: "Branch", index: 1, id: "branch-info-tab"},
			{icon: "mdi-shield-key", title: "Permissions", index: 2, id: "permission-info-tab"},
			{icon: "mdi-post", title: "Posts", index: 3, id: "posts-info-tab"}
		],
		permissionInfoItems: [
			{icon: "mdi-account-tie", field: "is_staff", displayFieldName: "Can View Admin Site"},
			{icon: "mdi-account-cowboy-hat", field: "is_superuser", displayFieldName: "Super User"}
		],
		collapseOnScroll: true,
	}),
	computed: {
		...mapGetters({
			follower: "user/detail"
		}),
		getMemberApprovedAt() {
			if (!this.follower.member.approved_at) return "None"
			return this.formatDate(this.follower.member.approved_at)
		},
		getMemberApprovedBy() {
			if (!this.follower) return "None"
			if (!this.follower.member) return "None"
			if (!this.follower.member.approved_by) return "None"
			else return this.follower.member.approved_by.username
		},
		getFollowerFullName() {
			if(!this.follower) return "None"
			return `${this.follower.first_name} ${this.follower.last_name}`
		},
		memberInfoItems() {
			if (!this.follower.member) return []
			return [
				{icon: "mdi-calendar-check", value: this.getMemberApprovedAt, displayFieldName: "Approved At", index: 2},
				{icon: "mdi-account-check", value: this.getMemberApprovedBy, displayFieldName: "Approved By", index: 3},
			]
		},
		personalInfoItems() {
			if (!this.follower) return []
			if(!this.follower.profile) return []
			return [
				{icon: "mdi-card-account-details-outline", value: this.follower.username, displayFieldName: "Username"},
				{icon: "mdi-at", value: this.follower.email, displayFieldName: "Email Address"},
				{icon: "mdi-phone-classic", value: this.follower.profile.contact, displayFieldName: "Phone"},
				{icon: "mdi-office-building-marker", value: this.follower.profile.home_town, displayFieldName: "Home Town"},
				{icon: "mdi-crosshairs-gps", value: this.follower.profile.current_city, displayFieldName: "Current City"},
				{icon: "mdi-account-tie-outline", value: "Yet to implement", displayFieldName: "Created By"},
				{icon: "mdi-calendar-plus", value: this.formatDate(this.follower.date_joined), displayFieldName: "Date Joined"},
				{icon: "mdi-history", value: this.formatDate(this.follower.last_login), displayFieldName: "Last Logged In"},
				{icon: "mdi-account-tie-outline", value: "Yet to implement", displayFieldName: "Updated By"},
				{icon: "mdi-calendar-edit", value: this.formatDate(this.follower.profile.last_updated), displayFieldName: "Last Updated At"},
			]
		},
	},
	async created() {
		await this.init()
	},
	methods: {
		getRoleIcon(roleName) {
			if(roleName === "Branch Chief") return "mdi-account-cowboy-hat"
			else if(roleName === "Branch Vice Chief") return "mdi-account-heart"
			else if(roleName === "Leader") return "mdi-account-tie"
			else if(roleName === "Double Star Leader") return "mdi-star"
			else if(roleName === "Single Star Leader") return "mdi-star"
			else if(roleName === "Maintainer") return "mdi-account-hard-hat"
			else return "None"
		},
		formatDate(date) {
			return this.$moment(date).format("MMMM Do YYYY")
		},
		async init() {
			this.loading = true
			await this.$store.dispatch("user/fetchById", {id: this.$route.params.id})
			this.loading = false
		}
	}
}
</script>
<style lang="sass" scoped>
::v-deep .v-slide-group__wrapper
	@media only screen and (max-width: 588px)
		width: 60px !important
.alice-blue
	background-color: aliceblue
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
.center-align
	@media only screen and (min-width: 720px)
		margin-left: 40px !important
	@media only screen and (min-width: 800px)
		margin-left: 80px !important
#explore-card
	border-radius: 0
#profile-img-avatar
	margin-top: -60px
	border: 4px solid white
</style>
