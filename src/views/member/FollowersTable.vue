<template>
	<v-data-table
		:search="search"
		:loading="loading"
		loading-text="Fetching followers from server"
		:headers="followersListHeaders"
		:items="followers"
		item-key="name"
		class="elevation-3 mx-12 my-6"
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
			<p class="ma-0 pa-0 follower-full-name">
				{{ item.first_name }} {{ item.last_name }}
			</p>
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
import {mapGetters} from "vuex";
import router from "@/router";

export default {
	name: "FollowerListView",
	components: {
		FollowerFormDialog: () => import("@/views/member/FollowersFormDialog")
	},
	data() {
		return {
			followers: [],
			search: null,
			loading: false,
			followersListHeaders: [
				{ text: "Actions", value: "actions", sortable: false },
				{ text: "Id", value: "id" },
				{ text: "Name", value: "full_name" },
				{ text: "Username", value: "username" },
				{ text: "Contact", value: "profile.contact" },
				{ text: "Admin", value: "is_superuser" },
				{ text: "Current City", value: "profile.current_city" },
				{ text: "Date Joined", value: "date_joined" }
			]
		}
	},
	computed: {
		... mapGetters({
			users: "user/usersList"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.loading = true
			await this.$store.dispatch("user/list")
			if (Array.isArray(this.users)) this.followers = this.users
			this.loading = false
		},
		openAddFollowerFormDialog() {
			this.$bus.emit("open-follower-form-dialog-add-item")
		},

		openEditFollowerFormDialog(item) {
			this.$bus.emit("open-follower-form-dialog-edit-item", {
				editedIndex: this.followers.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		async openSnack(text, color = "error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async deleteItem(item) {
			const response = await this.$store.dispatch("user/delete", {id: item.id})
			if (response) {
				await this.openSnack(`${item.username} deleted successfully.`, "success")
				await this.initialize()
			}
			else await this.openSnack("Internal server error. Try again.")
		},
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
	font-size: 1rem
	font-weight: 300
	cursor: pointer
</style>
