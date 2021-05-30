<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="vdc"
		:value="value"
		:items="vdcs.results"
		:loading="vdcsLoading"
		attach=""
		solo
		item-text="name"
		item-value="id"
		:disabled="!selectedDistrict"
		label="Select vdc"
		placeholder="Start typing"
		prepend-inner-icon="mdi-google-maps"
		:error-messages="getErrorMessage"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>vdcs</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";
import VdcAutocomplete from "@/mixins/VdcAutocomplete";

export default {
	name: "VdcField",
	mixins: [
		VdcAutocomplete,
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
			name: "vdc",
			mixinData: {
				setter: "location/setSelectedVdc"
			}
		}
	},
}
</script>
