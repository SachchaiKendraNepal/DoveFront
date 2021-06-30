<template>
	<v-dialog v-model="locationUpdateDialog"
		max-width="600"
	>
		<v-card class="pa-4"
			:loading="loadingForm"
		>
			<v-row class="ma-0 pa-0">
				<v-col cols="12">
					<v-card-title class="form-heading">
						Update location details
					</v-card-title>
					<v-divider />
				</v-col>
				<country-field
					id="country"
					v-model="locationFields.country"
					:province="locationFields.province"
					:errors="formErrors"
					@change="patchLocation({country: locationFields.country})"
				/>
				<province-field
					id="province"
					v-model="locationFields.province"
					:country="locationFields.country"
					:district="locationFields.district"
					:errors="formErrors"
					@change="patchLocation({province: locationFields.province})"
				/>
				<district-field
					id="district"
					v-model="locationFields.district"
					:province="locationFields.province"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					:errors="formErrors"
					@change="patchLocation({district: locationFields.district})"
				/>
				<municipality-field
					id="municipality"
					v-model="locationFields.municipality"
					:district="locationFields.district"
					:ward="locationFields.municipality_ward"
					:vdc="locationFields.vdc"
					:errors="formErrors"
					@change="patchLocation({municipality: locationFields.municipality})"
				/>
				<municipality-ward-field
					id="municipality-ward"
					v-model="locationFields.municipality_ward"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					:errors="formErrors"
					@change="patchLocation({municipality_ward: locationFields.municipality_ward})"
				/>
				<vdc-field
					id="vdc"
					v-model="locationFields.vdc"
					:district="locationFields.district"
					:ward="locationFields.vdc_ward"
					:municipality="locationFields.municipality"
					:errors="formErrors"
					@change="patchLocation({vdc: locationFields.vdc})"
				/>
				<vdc-ward-field
					id="vdc-ward"
					v-model="locationFields.vdc_ward"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					:errors="formErrors"
					@change="patchLocation({vdc_ward: locationFields.vdc_ward})"
				/>
			</v-row>
		</v-card>
	</v-dialog>
</template>

<script>
import LocationUpdateMixin from "@/mixins/LocationUpdateMixin.js";
import PatchMixin from "@/mixins/PatchMixin.js";
import {mapGetters} from "vuex";

export default {
	name: "LocationPatchForm",
	mixins: [LocationUpdateMixin, PatchMixin],
	computed: {
		...mapGetters({
			formErrors: "branch/formErrors"
		})
	},
	created() {
		this.$bus.on("open-location-edit-form", this.loadFormWithExistingData)
	},
	beforeUnmount() {
		this.$bus.off("open-location-edit-form")
	}
}
</script>

<style scoped lang="sass">
.form-heading
	font-size: 1rem
	text-transform: uppercase
	padding: 4px
	color: #747474
</style>
