<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="municipality"
		:value="value"
		:items="municipalities.results"
		:loading="municipalitiesLoading"
		solo
		attach=""
		item-text="name"
		item-value="id"
		:disabled="!selectedDistrict"
		label="Select municipality"
		placeholder="Start typing"
		prepend-inner-icon="mdi-google-maps"
		:error-messages="getErrorMessage"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>municipalities</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import MunicipalityAutocomplete from "@/mixins/MunicipalityAutocomplete";
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "MunicipalityField",
	mixins: [
		MunicipalityAutocomplete,
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
			name: "municipality",
			mixinData: {
				setter: "location/setSelectedMunicipality"
			}
		}
	},
}
</script>
