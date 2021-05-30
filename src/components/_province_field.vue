<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="province"
		:value="value"
		:items="provinces.results"
		:loading="provincesLoading"
		solo
		item-text="name"
		item-value="id"
		:disabled="!selectedCountry"
		label="Select province"
		prepend-inner-icon="mdi-office-building-marker-outline"
		:error-messages="getErrorMessage"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>province</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import ProvinceAutocomplete from "@/mixins/ProvinceAutocomplete";
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "ProvinceField",
	mixins: [
		ProvinceAutocomplete,
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
			name: "province",
			mixinData: {
				setter: "location/setSelectedProvince"
			}
		}
	},
}
</script>
