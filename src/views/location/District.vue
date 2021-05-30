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
						@click="openAddNewDialog"
					>
						<v-icon
							dark
							:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
						>
							mdi-plus-circle
						</v-icon>
						<span v-if="$vuetify.breakpoint.smAndUp">District</span>
					</v-btn>


					<v-dialog
						v-model="createDialog"
						dark
						max-width="500px"
					>
						<v-card min-height="700">
							<v-card-title class="grey darken-4 elevation-4">
								<span class="headline">New District</span>
							</v-card-title>
							<div class="py-6" />

							<v-card-text>
								<v-container>
									<v-row class="ma-0 pa-0">
										<v-col cols="12">
											<admin-text-field
												v-model="editedItem.name"
												name="name"
												label="Name"
												:errors="addFormErrors"
												prepend-inner-icon="mdi-format-title"
											/>
										</v-col>
										<v-col cols="12">
											<admin-country-autocomplete-field
												v-model="editedItem.country"
												:items="countries.results"
												:loading="countriesLoading"
												label="Select country"
												name="country"
												prepend-inner-icon="mdi-web"
											/>
										</v-col>
										<v-col cols="12">
											<admin-province-autocomplete-field
												v-model="editedItem.province"
												:items="provinces.results"
												:loading="provincesLoading"
												name="province"
												label="Select province"
												:disabled="!editedItem.country"
												prepend-inner-icon="mdi-office-building-marker-outline"
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions class="mx-6">
								<v-spacer />
								<v-btn
									color="error darken-1"
									text
									@click="closeCreateDialog"
								>
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									@click="createDistrict"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
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
import list from "@/mixins/list";
import provinceAutocomplete from "@/mixins/provinceAutocomplete";
import countryAutocomplete from "@/mixins/countryAutocomplete";
const urls = require("@/urls.json")
const util = require("util")


export default {
	name: "DistrictTable",
	mixins: [list, countryAutocomplete, provinceAutocomplete],
	data() {
		return {
			createDialog: false,
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
			// add form fields
			editedItem: {
				name: null,
				province: null,
				country: null
			},
			addFormErrors: {},
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
		openAddNewDialog() {
			this.createDialog = true
			this.addFormErrors = {}
		},
		async initialize(val) {
			this.loading = true
			await this.$store.dispatch("location/fetchAllDistricts", {page: val})
			this.items = this.districts
			this.totalDesserts = this.districts.count
			this.loading = false
		},
		closeCreateDialog() {
			const defaultData = {
				name: null,
				province: null
			}
			this.provinces = null
			this.countries = null
			this.addFormErrors = defaultData
			this.editedItem = defaultData
			this.createDialog = false
		},
		async createDistrict() {
			try {
				await this.$api.post(urls.location.districtList, {
					name: this.editedItem.name,
					province: this.editedItem.province
				})
				await this.openSnack("District added successfully", "success")
				this.closeCreateDialog()
				await this.initialize(this.options.page)
			} catch (e) {
				const status = parseInt(e.response.status.toString())
				if (status === 400) {
					this.addFormErrors = e.response.data
				} else {
					await this.openSnack("District create failed")
				}
			}
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
