<template>
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
							<text-field
								v-model="editedItem.name"
								name="name"
								label="Name"
								:errors="addFormErrors"
								icon="mdi-format-title"
							/>
						</v-col>
						<v-col cols="12">
							<country-field
								v-model="editedItem.country"
								:items="countries.results"
								:province="editedItem.province"
								:loading="countriesLoading"
								:errors="addFormErrors"
							/>
						</v-col>
						<v-col cols="12">
							<province-field
								v-model="editedItem.province"
								:items="provinces.results"
								:country="editedItem.country"
								:district="null"
								:loading="provincesLoading"
								:errors="addFormErrors"
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
					@click="closeDialog"
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
</template>

<script>
import CountryAutocomplete from "@/mixins/CountryAutocomplete";
import ProvinceAutocomplete from "@/mixins/ProvinceAutocomplete";
import Snack from "@/mixins/Snack";
const urls = require("@/urls.json")
const util = require("util")
export default {
	name: "AddDistrictFormDialog",
	mixins: [CountryAutocomplete, ProvinceAutocomplete, Snack],
	data: function () {
		return {
			createDialog: false,
			editedItem: {
				name: null,
				province: null,
				country: null
			},
			addFormErrors: {},
		};
	},
	async created() {
		this.$bus.on("open-add-district-form", this.openDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-add-district-form")
	},
	methods: {
		openDialog() {
			this.createDialog = true
			this.addFormErrors = {}
		},
		closeDialog() {
			const defaultData = {
				name: null,
				province: null
			}
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
				this.closeDialog()
				this.$bus.emit("reload")
			} catch (e) {
				const status = parseInt(e.response.status.toString())
				if (status === 400) {
					this.addFormErrors = e.response.data
				} else {
					await this.openSnack("District create failed")
				}
			}
		},
	}
}
</script>
