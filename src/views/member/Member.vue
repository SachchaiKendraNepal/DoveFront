<template>
	<v-data-table
		id="member-d-table"
		v-model="selected"
		multi-sort
		show-select
		calculate-widths
		:single-select="false"
		:items="members"
		:search="search"
		:headers="headers"
		:items-per-page="12"
		:loading="isLoading"
		loading-text="Members Loading..."
		class="elevation-3 mx-2 mx-sm-6 mx-md-6 mx-lg-6 mx-xl-12 my-6"
	>
		<template #top>
			<v-toolbar
				flat
				color="grey lighten-2"
			>
				<v-avatar
					class="elevation-2 mr-2"
					size="40"
				>
					<v-icon size="30">
						mdi-account-supervisor-circle
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
					Sachchai Followers
				</v-toolbar-title>
				<v-divider
					class="mx-4 search-follower"
					inset
					vertical
				/>
				<v-text-field
					v-model="search"
					class="search-follower"
					solo
					dense
					hide-details
					label=""
					name="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					placeholder="Search"
				/>
				<v-spacer />
				<v-divider
					class="mx-4 search-follower"
					inset
					vertical
				/>
				<v-btn
					dark
					color="primary"
					@click.stop="openAddFollowerFormDialog"
				>
					<v-icon
						dark
						:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
					>
						mdi-plus-circle
					</v-icon>
					<span v-if="$vuetify.breakpoint.smAndUp">New Member</span>
				</v-btn>
				<follower-form-dialog />
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.full_name="{ item }">
			<p
				class="ma-0 pa-0 follower-full-name"
				@click="routeToMemberDetailPage(item.id)"
			>
				{{ item.f_name }} {{ item.l_name }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_staff="{ item }">
			<v-simple-checkbox
				v-model="item.is_staff"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_superuser="{ item }">
			<v-simple-checkbox
				v-model="item.is_superuser"
				color="primary"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_approved="{ item }">
			<v-switch
				v-model="item.is_approved"
				color="primary"
				hide-details="auto"
				class="mt-0"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click.stop="openEditFollowerFormDialog(item)"
			>
				mdi-pencil
			</v-icon>
			<v-icon
				v-ripple
				color="red"
				size="20"
				@click="deleteItem(item)"
			>
				mdi-delete
			</v-icon>
		</template>
		<template #no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import router from "@/router";

export default {
	name: "MembersTable",
	components: {
		FollowerFormDialog: () => import("@/views/member/MemberFormDialog")
	},
	data: () => ({
		isLoading: false,
		selected: [],
		search: "",
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "FULL NAME", value: "full_name" },
			{ text: "USERNAME", value: "username" },
			{ text: "BRANCH", value: "branch" },
			{ text: "PHONE", value: "phone" },
			{ text: "SUPERUSER STATUS", value: "is_superuser" },
			{ text: "STAFF STATUS", value: "is_staff" },
			{ text: "APPROVED STATUS", value: "is_approved" },
			{ text: "DATE JOINED", value: "date_joined" }
		],
		members: []
	}),

	created() {
		this.initialize()
	},

	methods: {
		initialize() {
			const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
			this.members = [
				{
					id: 1,
					username: "kiran589",
					email: "kiran589@gmail.com",
					f_name: "Kiran",
					l_name: "Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 2,
					username: "bot25",
					email: "bot25@gmail.com",
					f_name: "Bot",
					l_name: "Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 3,
					username: "skshetry101",
					email: "susant@gmail.com",
					f_name: "Susant",
					l_name: "Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 4,
					username: "1996amrit",
					email: "1996amrit@gmail.com",
					f_name: "Amrit",
					l_name: "Neupane",
					phone: 9843530425,
					branch: "Main Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
			]
		},

		openAddFollowerFormDialog() {
			this.$bus.emit("open-follower-form-dialog-add-item")
		},

		openEditFollowerFormDialog(item) {
			this.$bus.emit("open-follower-form-dialog-edit-item", {
				editedIndex: this.members.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		deleteItem(item) {
			const index = this.members.indexOf(item)
			confirm("Are you sure you want to delete this member?") && this.members.splice(index, 1)
		},

		routeToMemberDetailPage(itemId) {
			router.push({name: "MEMBER ADMINISTRATION", params: { id: itemId }})
		}
	}
}
</script>
<style lang="sass" scoped>
.search-follower
	display: block
	@media only screen and (max-width: 315px)
		display: none
.follower-full-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300
	cursor: pointer
</style>
