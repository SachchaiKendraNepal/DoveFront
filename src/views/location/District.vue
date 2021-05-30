<template>
	<v-card v-if="items"
		max-width="1000"
		class="mx-auto"
		flat
	>
		<div class="py-6" />
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading districts..."
			class="elevation-1 mx-2"
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
							mdi-map-marker-multiple-outline
						</v-icon>
					</v-avatar>
					<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
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
					@click="deleteItemConfirm(item.id)"
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
		<v-dialog v-model="dialogDelete" dark
			max-width="530px"
		>
			<v-card>
				<v-card-title class="headline">
					Are you sure you want to delete this district?
				</v-card-title>
				<v-card-actions>
					<v-spacer />
					<v-btn color="error darken-1"
						text @click="closeDelete"
					>
						Cancel
					</v-btn>
					<v-btn color="blue darken-1"
						text @click="deleteItem"
					>
						OK
					</v-btn>
					<v-spacer />
				</v-card-actions>
			</v-card>
		</v-dialog>
		<div class="py-6" />
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import ProvinceAutocomplete from "@/mixins/ProvinceAutocomplete";
import CountryAutocomplete from "@/mixins/CountryAutocomplete";
import AddDistrictFormDialog from "@/views/location/AddDistrictFormDialog";
const urls = require("@/urls.json")
const util = require("util")


export default {
	name: "DistrictTable",
	components: {AddDistrictFormDialog},
	mixins: [AdminTableList],
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
				{ text: "PROVINCE", value: "province.name" },
				{ text: "COUNTRY", value: "province.country.name" },
				{ text: "CREATED AT", value: "created_at" },
				{ text: "UPDATED AT", value: "updated_at" }
			],
			//edit dialog for field
			nameToUpdate: null,
			mixinData: {
				modelName: "District",
				deleteAction: "location/deleteDistrict",
				fetchAction: "location/fetchAllDistricts"
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
			this.totalDesserts = this.districts.count
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
