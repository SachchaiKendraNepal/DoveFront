<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="province"
		:value="value"
		:items="items"
		:loading="loading"
		solo
		hide-selected
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
import LocationAutocompleteInputChanged from "@/mixins/LocationAutocompleteInputChanged";

export default {
	name: "AdminAutocompleteField",
	mixins: [ProvinceAutocomplete, AdminFieldErrorMessage, LocationAutocompleteInputChanged],
	props: {
		value: {
			required: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	data() {
		return {
			name: "province",
			mixinData: {
				locationSetter: "location/setSelectedProvince"
			}
		}
	},
}
</script>
