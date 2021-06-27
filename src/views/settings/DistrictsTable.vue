<template>
	<div>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading districts..."
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
				<v-toolbar
					flat
					color="grey lighten-2"
				>
					<v-avatar
						class="elevation-2 table-avatar"
						size="30"
					>
						<v-icon color="white"
							size="20"
						>
							mdi-map-marker-multiple-outline
						</v-icon>
					</v-avatar>
					<v-toolbar-title
						v-show="$vuetify.breakpoint.smAndUp"
						class="table-title pl-1"
					>
						Districts
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
						@click.prevent="openCreateFormDialog"
					>
						<v-icon
							dark
							:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
						>
							mdi-plus-circle
						</v-icon>
						<span v-if="$vuetify.breakpoint.smAndUp">District</span>
					</v-btn>


					<add-district-form-dialog />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.name="props">
				<v-edit-dialog
					v-model:return-value="props.item.name"
					dark
					@save="updateName(props.item)"
					@open="openNameUpdate(props.item.name)"
				>
					{{ props.item.name }}
					<template #input>
						<v-text-field
							v-model="nameToUpdate"
							label="District Name"
							single-line
							counter
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.created_at="{item}">
				{{ formatDate(item.created_at) }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.updated_at="{item}">
				{{ formatDate(item.updated_at) }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{item}">
				<v-icon
					small
					color="red"
					@click="openAdminDeleteItemDialog(item.id, item.name)"
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
		<admin-delete-item-dialog
			model-name="district"
			delete-action="location/deleteDistrict"
		/>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import AddDistrictFormDialog from "@/views/location/AddDistrictFormDialog";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
const urls = require("@/urls.json")
const util = require("util")


export default {
	name: "DistrictTable",
	components: {AddDistrictFormDialog},
	mixins: [AdminTableList, AdminTableDeleteItemMixin],
	data() {
		return {
			headers: [
				{
					text: "actions",
					sortable: false,
					value: "actions",
				},
				{ text: "ID", value: "id" },
				{ text: "NAME", value: "name" },
				{ text: "CREATED AT", value: "created_at" },
				{ text: "UPDATED AT", value: "updated_at" }
			],
			//edit dialog for field
			nameToUpdate: null,
			mixinData: {
				modelName: "District",
				deleteAction: "location/deleteDistrict",
			}
		}
	},
	computed: {
		...mapGetters({
			districts: "location/districtsList"
		}),
	},
	methods: {
		openCreateFormDialog() {
			this.$bus.emit("open-add-district-form")
		},
		async initialize(val) {
			this.loading = true
			if (!val) val = 1
			await this.$store.dispatch("location/fetchAllDistricts", {page: val})
			this.items = this.districts
			this.totalItems = this.districts.count
			this.loading = false
		},
		async updateName(item) {
			try {
				await this.$api.patch(util.format(urls.location.districtDetail, item.id), {name: this.nameToUpdate})
				await this.openSnack("District updated successfully", "success")
			} catch (e) {
				const status = parseInt(e.response.status.toString())
				if (status === 400) {
					await this.openSnack(e.response.data["name"][0])
				} else {
					await this.openSnack("District update failed")
				}
			}
			await this.initialize(this.options.page)
		},
		openNameUpdate(name) {
			this.nameToUpdate = name
		},
	},
}
</script>

<style scoped>

</style>
