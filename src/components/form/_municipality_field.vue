<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="municipality"
			:value="value"
			:items="municipalities.results"
			:loading="municipalitiesLoading"
			solo
			clearable
			attach=""
			item-text="name"
			item-value="id"
			:disabled="!selectedDistrict"
			:label="'Select municipality'.toUpperCase()"
			placeholder="Start typing"
			hide-details="auto"
			prepend-inner-icon="mdi-google-maps"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>municipalities</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
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
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
	},
	emits: ["input"],
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
