<template>
	<div>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading multimedias..."
			class="elevation-1"
			:footer-props="{
				showFirstLastPage: true,
				disableItemsPerPage: true,
				itemsPerPageOptions: [1, 5, 10, 50],
				itemsPerPageText: 'Rows per page:',
				pageText: `${options.page}-${getTotalPaginationData} of ${getTotalPaginationData}`
			}"
		>
			<template #top>
				<v-toolbar flat
					color="grey lighten-2"
				>
					<v-app-bar-nav-icon>
						<v-avatar
							class="table-avatar elevation-4"
							size="30"
						>
							<v-icon
								color="white"
								size="20"
							>
								mdi-video
							</v-icon>
						</v-avatar>
					</v-app-bar-nav-icon>
					<v-toolbar-title
						v-show="$vuetify.breakpoint.smAndUp"
						class="table-title pl-1"
					>
						Sachchai Nepal Multimedias
					</v-toolbar-title>
					<v-spacer />
					<v-text-field v-model="search"
						solo
						label="Search..."
						dense
						hide-details
						prepend-inner-icon="mdi-magnify"
						color="primary"
						class="mx-2"
					/>
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.approval_status="{ item }">
				<v-switch v-model="item.is_approved"
					color="grey darken-2"
					disabled
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.timestamp="{ item }">
				{{ $moment(item.timestamp).fromNow() }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.approver="{ item }">
				{{ (item.approved_by) ? item.approved_by.username : '-' }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-icon
					v-if="!item.is_approved"
					small
					color="green"
					class="mr-2"
					@click="approve(item)"
				>
					mdi-check
				</v-icon>
				<v-icon
					v-if="item.is_approved"
					small
					color="red"
					class="mr-2"
					@click="revokeApprove(item)"
				>
					mdi-close
				</v-icon>
				<v-icon
					small
					color="red"
					@click="openAdminDeleteItemDialog(item.id, item.title)"
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
		<admin-delete-item-dialog
			model-name="multimedia"
			delete-action="multimedia/delete"
		/>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import ToggleApproval from "@/mixins/ToggleApproval";
import AdminTableList from "@/mixins/AdminTableList";
import multimedia from "@/store/modules/multimedia";

export default {
	name: "MultimediaView",
	mixins: [
		AdminTableList,
		AdminTableDeleteItemMixin,
		ToggleApproval
	],
	data() {
		return {
			headers: [
				{ text: "ACTIONS", value: "actions", sortable: false },
				{ text: "ID", value: "id" },
				{ text: "TITLE", value: "title" },
				{ text: "WRITER", value: "uploaded_by.username" },
				{ text: "STATUS", value: "approval_status" },
				{ text: "APPROVER", value: "approver" },
				{ text: "TIMESTAMP", value: "timestamp" },
			],
			mixinData: {
				modelName: "multimedia"
			}
		}
	},
	computed: {
		... mapGetters({
			multimedias: "multimedia/list"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize(val) {
			this.loading = true
			if (!val) val = 1
			await this.$store.dispatch("multimedia/filter", {
				page: val
			})
			this.items = this.multimedias
			this.totalItems = this.multimedias.count
			this.loading = false
		},
	}
}
</script>
<style lang="sass" scoped>

</style>
