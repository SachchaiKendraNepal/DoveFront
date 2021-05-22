<template>
	<v-card
		:loading="loading"
		class="mx-auto pa-0 rounded-0 branch-detail-card"
		max-width="900"
		outlined
		flat
	>
		<detail-view-header v-if="branch">
			<template #topContent>
				<v-img
					class="cover-image"
					:src="getCoverImage"
					height="400"
				/>
				<div class="px-4">
					<div class="overline pt-2">
						<span v-if="branch.is_main"
							class="px-1"
						>MAIN</span>
						<span v-else
							class="px-1"
						>SUB-BRANCH</span>
						<span v-if="branch.country && branch.country.name !== 'Nepal'"
							class="px-1"
						>INTERNATIONAL</span>
					</div>
					<p class="headline">
						{{ branch.name }}
					</p>
					<p>{{ branch.slogan }}</p>
				</div>
			</template>
			<template #chips>
				<div>
					<v-chip
						v-if="branchMembers"
						label
						color="blue lighten-4"
						class="ma-2"
					>
						<p class="ma-0 pa-4 branch-counts">
							{{ branchMembers.count }}
						</p>
						Members
						<v-icon
							class="mx-1"
							color="orange darken-3"
						>
							mdi-account-group
						</v-icon>
					</v-chip>
					<v-chip
						v-if="branchEvents"
						color="green lighten-3"
						label
						class="ma-2"
					>
						<p class="ma-0 pa-0 branch-counts">
							{{ branchEvents.length }}
						</p>
						Events
						<v-icon color="green darken-3">
							mdi-calendar-check
						</v-icon>
					</v-chip>
				</div>
			</template>
		</detail-view-header>
		<detail-view-explorer
			id="explore-card"
			toolbar-title="Explore Sachchai Branch"
			toolbar-icon="mdi-account-circle"
			:tab-items="branchTabItems"
		>
			<template #tabContent>
				<v-tab-item>
					<v-card
						id="general-info-tab-content"
						flat
					>
						<v-card-text class="mt-0 pa-0">
							<v-list class="mt-0 pt-0 alice-blue">
								<v-list-item
									v-for="item in generalInfoItems1"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ branch[item.field] }}
									</p>
								</v-list-item>
								<v-list-item @click="1">
									<v-checkbox
										v-model="branch.is_main"
										dense
										color="indigo"
										label="Is Main Branch"
										hide-details
										readonly
									/>
									<v-spacer />
									<span>
										<v-icon>mdi-map-marker-star</v-icon>
									</span>
								</v-list-item>
								<v-list-item @click="1">
									<v-checkbox
										v-model="branch.is_approved"
										dense
										color="success"
										label="Is Approved"
										hide-details
										readonly
									/>
									<v-spacer />
									<span>
										<v-icon>mdi-marker-check</v-icon>
									</span>
								</v-list-item>
								<v-list-item
									v-for="item in generalInfoItems2"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										<span v-if="['created_by', 'approved_by', 'updated_by'].includes(item.field)"
											class="px-1"
										>
											<span v-if="branch[item.field]">{{ branch[item.field].username }}</span>
											<span v-else>None</span>
										</span>
										<span v-else-if="['created_at', 'approved_at', 'updated_at'].includes(item.field)"
											class="px-1 subtitle-2"
										>{{ $moment(branch[item.field]).fromNow() }}</span>
										<span v-else
											class="px-1"
										>
											{{ branch[item.field] }}
										</span>
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
						<v-card-text class="mt-0 pa-0">
							<v-list
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item
									v-for="item in locationInfoItems"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										<span v-if="branch[item.field]"
											class="px-1"
										>{{ branch[item.field].name }}</span>
										<span v-else
											class="px-1"
										>None</span>
									</p>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card
						v-if="branchMembers"
						id="member-info-tab-content"
						flat
					>
						<div v-if="branchMembers.count > 0">
							<v-card v-for="(branchMember, index) in branchMembers.results"
								:key="branchMember.id"
								:class="((index%2) === 0) ? 'green-gradient-rgba' : 'light-orange-gradient'"
								min-height="70"
								width="70vw"
								class="pa-3 ma-2 branch-member"
							>
								<div class="d-flex align-items-center justify-start">
									<v-icon small
										class="member-branch-icon"
									>
										mdi-account-circle
									</v-icon>
									<div class="px-1 field-name">
										Username:
									</div>
									<div>{{ branchMember.member.user.username }}</div>
								</div>
								<div class="d-flex align-items-center justify-start">
									<v-icon small
										class="member-branch-icon"
									>
										mdi-calendar
									</v-icon>
									<div class="px-1 field-name">
										Date of membership:
									</div>
									<div class="field-value">
										{{ branchMember.date_of_membership }}
									</div>
								</div>
								<div v-if="branchMember.member_branch_roles.length > 0"
									class="pt-2"
								>
									<div
										v-for="member_role in branchMember.member_branch_roles"
										:key="member_role.id"
										class="d-flex align-items-center justify-start"
									>
										<v-icon small
											class="member-branch-icon"
										>
											mdi-key
										</v-icon>
										<div class="field-name px-1">
											Role name:
										</div>
										<div class="field-value">
											{{ member_role.role_name }}
										</div>
										<div class="field-name px-2">
											From:
										</div>
										<div class="field-value">
											{{ member_role.from_date }}
										</div>
										<div class="field-name px-2">
											To:
										</div>
										<div class="field-value">
											{{ member_role.to_date }}
										</div>
									</div>
								</div>
								<div v-else>
									<div class="d-flex align-items-center justify-start pt-2">
										<v-icon class="member-branch-icon">
											mdi-key
										</v-icon>
										<div class="field-name px-2">
											No roles assigned.
										</div>
									</div>
								</div>
							</v-card>
						</div>
						<div v-else
							class="no-members"
						>
							No members
						</div>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card v-if="branchEvents"
						id="event-info-card"
						flat
					>
						<div v-if="branchEvents.length > 0">
							<v-card v-for="(branchEvent, index) in branchEvents"
								:key="branchEvent.id"
								class="pa-4 ma-2 branch-member"
								:class="((index%2) === 0) ? 'green-gradient-rgba' : 'light-orange-gradient'"
							>
								<div class="d-flex align-items-center justify-start">
									<v-icon small
										class="member-branch-icon"
									>
										mdi-text
									</v-icon>
									<div class="field-name px-1">
										Title:
									</div>
									<div class="field-value">
										{{ branchEvent.title }}
									</div>
								</div>
								<div class="d-flex align-items-center justify-start">
									<v-icon small
										class="member-branch-icon"
									>
										mdi-call-merge
									</v-icon>
									<div class="field-name px-1">
										Type:
									</div>
									<div class="field-value">
										{{ branchEvent.type }}
									</div>
								</div>
								<div class="d-flex align-items-center justify-start">
									<v-icon small
										class="member-branch-icon"
									>
										mdi-call-merge
									</v-icon>
									<div class="field-name px-1">
										Start date:
									</div>
									<div class="field-value">
										{{ $moment(branchEvent.start_date).format("MMMM Do YYYY") }} for {{ branchEvent.duration }} days at {{ branchEvent.time_of_day }}
									</div>
								</div>
							</v-card>
						</div>
						<div v-else
							class="no-events"
						>
							No events
						</div>
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
		DetailViewHeader: () => import("@/components/DetailViewHeader"),
		DetailViewExplorer: () => import("@/components/DetailViewExplorer")
	},
	data: () => ({
		tab: null,
		loading: null,
		defaultCoverImage: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
		branchTabItems: [
			{ icon: "mdi-city-variant", title: "General", index: 0, id: "general-info-tab" },
			{ icon: "mdi-google-maps", title: "Location", index: 1, id: "location-info-tab" },
			{ icon: "mdi-account-tie", title: "Members", index: 2, id: "members-info-tab" },
			{ icon: "mdi-calendar-clock", title: "Events", index: 3, id: "event-info-tab" },
		],
		generalInfoItems1: [
			{ index: 0, icon: "mdi-card-account-details-outline", field: "name", displayFieldName: "Name" },
			{ index: 1, icon: "mdi-phone-outline", field: "contact", displayFieldName: "Phone" },
		],
		generalInfoItems2: [
			{ index: 2, icon: "mdi-account-tie-outline", field: "created_by", displayFieldName: "Created By" },
			{ index: 3, icon: "mdi-calendar-plus", field: "created_at", displayFieldName: "Date Created" },
			{ index: 4, icon: "mdi-account-edit-outline", field: "updated_by", displayFieldName: "Updated By" },
			{ index: 5, icon: "mdi-calendar-edit", field: "updated_at", displayFieldName: "Last Updated At" },
			{ index: 6, icon: "mdi-calendar-check", field: "approved_at", displayFieldName: "Approved At" },
		],
		locationInfoItems: [
			{ index: 6, icon: "mdi-web", field: "country", displayFieldName: "Country" },
			{ index: 7, icon: "mdi-office-building-marker-outline", field: "province", displayFieldName: "Province" },
			{ index: 8, icon: "mdi-map-marker-multiple-outline", field: "district", displayFieldName: "District" },
			{ index: 9, icon: "mdi-map-marker", field: "municipality", displayFieldName: "Municipality" },
			{ index: 10, icon: "mdi-numeric", field: "municipality_ward", displayFieldName: "Municipality Ward" },
			{ index: 11, icon: "mdi-home-map-marker", field: "vdc", displayFieldName: "VDC" },
			{ index: 12, icon: "mdi-numeric", field: "vdc_ward", displayFieldName: "VDC Ward" }
		],
		collapseOnScroll: true,
	}),
	computed: {
		...mapGetters({
			branch: "branch/detail",
			branchMembers: "member/branchesList",
			branchEvents: "event/list"
		}),
		getCoverImage() {
			if (this.branch.cover_image) return this.branch.cover_image
			else return this.defaultCoverImage
		}
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			await this.$store.dispatch("event/filterEvents", { organizer: this.$route.params.id})
			await this.$store.dispatch("branch/fetchSingle", {id: this.$route.params.id})
			await this.$store.dispatch("member/fetchMemberBranchesForBranch", {branch: this.$route.params.id})
			this.loading=false
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

.branch-counts
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
.cover-image
	border-radius: 0 0 20px 20px
.branch-detail-card
	border: none
.branch-member
	font-size: .875rem
.field-name
	font-weight: bold
.member-branch-icon
	margin-top: -3px
</style>
<style lang="scss">
.green-gradient-rgba {
	background: linear-gradient(40deg, rgb(153, 208, 117), rgb(16, 157, 105)) !important
}
.light-orange-gradient {
	background: linear-gradient(45deg, #eac290, #c85c09)
}
.no-events {
	display: flex;
	align-items: center;
	justify-content: center;
	background: aliceblue url(./../../assets/event_bg.png) no-repeat;
	background-size: contain;
	margin: 12px;
	width: 77vw;
	height: 180px;
}
.no-members {
	display: flex;
	align-items: center;
	justify-content: center;
	background: aliceblue url(./../../assets/members_bg.png) no-repeat;
	background-size: contain;
	margin: 12px;
	width: 77vw;
	height: 180px;
	text-align: center;
}
</style>
