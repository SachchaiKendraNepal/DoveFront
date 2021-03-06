<template>
	<div>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading articles..."
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
						<v-avatar class="table-avatar elevation-4"
							size="30"
						>
							<v-icon color="white"
								size="20"
							>
								mdi-bird
							</v-icon>
						</v-avatar>
					</v-app-bar-nav-icon>
					<v-toolbar-title
						v-show="$vuetify.breakpoint.smAndUp"
						class="pl-1 table-title"
					>
						Sachchai Nepal Articles
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
			<template #item.timestamp="{ item }">
				{{ $moment(item.timestamp).fromNow() }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.approval_status="{ item }">
				<v-switch v-model="item['is_approved']"
					color="grey darken-2"
					disabled
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.approver="{ item }">
				{{ (item.approved_by) ? item.approved_by.username : '-' }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-icon
					v-if="!item['is_approved']"
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
				<v-icon
					v-if="!item['is_pinned']"
					small
					color="primary"
					style="transform: rotate(30deg)"
					@click="pin(item)"
				>
					mdi-pin-outline
				</v-icon>
				<v-icon
					v-else
					small
					color="primary"
					style="transform: rotate(30deg)"
					@click="unpin(item)"
				>
					mdi-pin
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
			model-name="article"
			delete-action="article/delete"
			@reload="initialize"
		/>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import ToggleApproval from "@/mixins/ToggleApproval";

export default {
	name: "ArticleListView",
	mixins: [
		AdminTableList,
		AdminTableDeleteItemMixin,
		ToggleApproval
	],
	data() {
		return {
			model: "article",
			headers: [
				{text: "ACTIONS", value: "actions", sortable: false},
				{text: "ID", value: "id"},
				{text: "TITLE", value: "title"},
				{text: "WRITER", value: "created_by.username"},
				{text: "STATUS", value: "approval_status"},
				{text: "APPROVER", value: "approver"},
				{text: "TIMESTAMP", value: "timestamp"}
			]
		}
	},
	computed: {
		... mapGetters({
			articles: "article/list"
		})
	},
	methods: {
		async initialize(val = null) {
			this.loading = true
			if (!val) val = this.options.page
			await this.$store.dispatch("article/filter", {
				page: val,
				completed_writing: true,
			})
			this.items = this.articles
			this.totalItems = this.articles.count
			this.loading = false
		},
		async pin(item) {
			const res = await this.$store.dispatch("article/pin", {id: item.id})
			if (res) {
				await this.initialize(this.options.page)
				await this.openSnack("Article pin success.", "success")
			} else {
				await this.openSnack("Article pin failed. Try again.")
			}
		},
		async unpin(item) {
			const res = await this.$store.dispatch("article/unpin", {id: item.id})
			if (res) {
				await this.initialize(this.options.page)
				await this.openSnack("Article pin revoked.", "success")
			} else {
				await this.openSnack("Article pin revoke failed. Try again.")
			}

		}
	}
}
</script>
