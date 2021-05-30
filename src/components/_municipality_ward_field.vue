<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="municipalityWard"
		:value="value"
		:items="municipalityWards.results"
		:loading="municipalityWardsLoading"
		solo
		attach=""
		item-text="name"
		item-value="id"
		:disabled="!selectedMunicipality"
		label="Select municipality ward"
		placeholder="Start typing"
		prepend-inner-icon="mdi-numeric"
		:error-messages="getErrorMessage"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>municipality ward</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";
import MunicipalityWardAutocomplete from "@/mixins/MunicipalityWardAutocomplete";

export default {
	name: "MunicipalityField",
	mixins: [
		MunicipalityWardAutocomplete,
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
			name: "municipality_ward",
			mixinData: {
				setter: "location/setSelectedMunicipalityWard"
			}
		}
	},
}
</script>
