<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="district"
		:value="value"
		:items="districts.results"
		:loading="districtsLoading"
		attach=""
		solo
		item-text="name"
		item-value="id"
		:disabled="!selectedProvince"
		label="Select district"
		placeholder="Start typing"
		:error-messages="getErrorMessage"
		prepend-inner-icon="mdi-map-marker-multiple-outline"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>districts</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import DistrictAutocomplete from "@/mixins/DistrictAutocomplete";
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "DistrictField",
	mixins: [
		DistrictAutocomplete,
		AdminFieldErrorMessage,
		AutocompleteInputChanged
	],
	props: {
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
	},
	data() {
		return {
			name: "district",
			mixinData: {
				setter: "location/setSelectedDistrict"
			}
		}
	},
}
</script>
