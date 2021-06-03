<template>
	<v-card>
		<div class="py-6" />
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading followers..."
			class="elevation-1 ma-6"
			:footer-props="{
				showFirstLastPage: true,
				disableItemsPerPage: true,
				itemsPerPageOptions: [1, 5, 10, 50],
				itemsPerPageText: 'Rows per page:',
				pageText: `${options.page}-${getTotalPaginationData} of ${getTotalPaginationData}`
			}"
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
						<span v-if="$vuetify.breakpoint.smAndUp">Follower</span>
					</v-btn>
					<follower-form-dialog />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.full_name="{ item }">
				<p class="ma-0 pa-0 cursor"
					@click="routeToFollowerDetail(item)"
				>
					{{ item.first_name }} {{ item.last_name }}
				</p>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_staff="{ item }">
				<v-checkbox
					v-model="item.is_staff"
					color="primary"
					readonly
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.date_joined="{ item }">
				{{ $moment(item.date_joined).fromNow() }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{item}">
				<v-icon
					small
					class="mr-2"
					color="primary"
					@click.stop="openEditFollowerFormDialog(item)"
				>
					mdi-pencil
				</v-icon>
				<v-icon
					small
					color="red"
					@click="openAdminDeleteItemDialog(item.id, item.username)"
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
		<div class="py-6" />
		<admin-delete-item-dialog
			model-name="follower"
			delete-action="user/delete"
		/>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";

export default {
	name: "FollowerListView",
	components: {
		FollowerFormDialog: () => import("@/views/member/FollowersFormDialog")
	},
	mixins: [
		AdminTableList,
		AdminTableDeleteItemMixin
	],
	data() {
		return {
			headers: [
				{ text: "Actions", value: "actions", sortable: false },
				{ text: "Id", value: "id" },
				{ text: "Name", value: "full_name" },
				{ text: "Username", value: "username" },
				{ text: "Contact", value: "profile.contact" },
				{ text: "Staff", value: "is_staff" },
				{ text: "Current City", value: "profile.current_city" },
				{ text: "Date Joined", value: "date_joined" }
			]
		}
	},
	computed: {
		... mapGetters({
			followers: "user/list"
		})
	},
	methods: {
		async initialize(val) {
			this.loading = true
			if (!val) val = 1
			await this.$store.dispatch("user/filter", {
				page: val
			})
			this.items = this.followers
			this.totalItems = this.followers.count
			this.loading = false
		},
		openAddFollowerFormDialog() {
			this.$bus.emit("open-follower-form-dialog-add-item")
		},

		openEditFollowerFormDialog(item) {
			this.$bus.emit("open-follower-form-dialog-edit-item", {
				editedIndex: this.items.results.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		async routeToFollowerDetail(item) {
			await this.$router.push({name: "FOLLOWER ADMINISTRATION", params: {id: item.id}})
		}
	}
}
</script>
<style lang="scss" scoped>
.search-follower {
	display: block;
	@media only screen and (max-width: 315px) {
		display: none;
	}
}
</style>
