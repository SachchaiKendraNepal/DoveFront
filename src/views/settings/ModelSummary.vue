<template>
	<v-col cols="12"
		class="pa-0"
	>
		<v-card-title class="stat-summary">
			Statistics Summary
		</v-card-title>
		<v-row class="ma-0 pa-0">
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
				class="summary-card-col"
			>
				<v-card
					:color="item.color"
					dark
					class="summary-card"
				>
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title
								class="summary-card-title"
								v-text="item.title"
							/>

							<v-card-subtitle v-text="item.artist" />
							<v-card-actions class="pa-0">
								<v-btn
									fab
									icon
									height="40px"
									width="40px"
									:disabled="['Articles', 'Multimedia'].includes(item.title)"
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
							class="elevation-4 count-avatar"
							tile
							color="grey"
						>
							<span class="white--text">
								{{ modelStatistics[item.title.toLowerCase()] }}
							</span>
						</v-avatar>
					</div>
				</v-card>
			</v-col>
		</v-row>
		<event-form-dialog />
		<branch-form-dialog />
		<follower-form-dialog />
		<member-form-dialog />
	</v-col>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "ModelSummary",
	components: {
		EventFormDialog: () => import("@/views/event/EventFormDialog"),
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog"),
		FollowerFormDialog: () => import("@/views/member/FollowersFormDialog"),
		MemberFormDialog: () => import("@/views/member/MemberFormDialog"),
	},
	data: () => ({
		items: [
			{
				color: "#1F7087",
				count: 500,
				title: "Followers",
				artist: "Manage Sachchai Nepal Followers",
				view: "/admin/follower",
				add: "openAddFollowerFormDialog"
			},
			{
				color: "#952175",
				count: 200,
				title: "Members",
				artist: "Manage Sachchai Nepal Members",
				view: "/admin/member",
				add: "openAddMemberFormDialog"
			},
			{
				color: "#cd430a",
				count: 15,
				title: "Branches",
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
				title: "Multimedias",
				artist: "Manage Sachchai Nepal Multimedia",
				view: "/admin/multimedia"
			},
			{
				color: "rgb(201 44 33)",
				count: 40,
				title: "Events",
				artist: "Manage Sachchai Nepal Events",
				add: "openAddEventFormDialog",
				view: "/admin/event"
			},
			{
				color: "rgb(69 26 145)",
				count: 40,
				title: "Advertisements",
				artist: "Sachchai Nepal Advertisements",
				view: "/admin/ad"
			},
		]
	}),
	computed: {
		...mapGetters({
			modelStatistics: "status/list"
		}),
	},
	async created() {
		await this.$store.dispatch("status/fetchModelStatus")
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
		},
		openAddMemberFormDialog() {
			this.$bus.emit("open-member-form-dialog-add-item")
		}
	}
}
</script>

<style scoped lang="sass">
.stat-summary
	margin: 10px 0 0 15px
	padding: 0
	font-size: 22px
	color: darkslategrey
	font-family: "Chilanka", sans-serif
	font-weight: bold
	border-bottom: 1px solid grey
	max-width: 1200px
.summary-card-col
	padding: 20px
	animation-name: reverse
	animation-duration: .7s
.summary-card-col:hover
	animation-name: scaleAnimation
	animation-fill-mode: forwards
	animation-duration: .7s

.summary-card-title
	font-size: 1rem

.count-avatar
	margin: 10px
	font-size: 2.4rem !important
	border-radius: 10px !important

.summary-card-col:hover
	.count-avatar
		animation-name: rotateCount
		animation-fill-mode: forwards
		animation-duration: 1s

@keyframes rotateCount
	from
		transform: rotate(0deg) scale(1)
	to
		transform: rotate(360deg) scale(1.1)
@keyframes scaleAnimation
	from
		transform: scale(1)
	to
		transform: scale(1.1)
@keyframes reverse
	from
		transform: scale(1.1)
	to
		transform: scale(1)
</style>
