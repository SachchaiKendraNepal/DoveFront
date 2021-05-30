<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="vdcWard"
		:value="value"
		:items="vdcWards.results"
		:loading="vdcWardsLoading"
		attach=""
		solo
		item-text="name"
		item-value="id"
		:disabled="!selectedVdcWard"
		label="Select vdc ward"
		placeholder="Start typing"
		prepend-inner-icon="mdi-numeric"
		:error-messages="getErrorMessage"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>vdc wards</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";
import VdcWardAutocomplete from "@/mixins/VdcWardAutocomplete";

export default {
	name: "VdcWardField",
	mixins: [
		VdcWardAutocomplete,
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
			name: "vdc_ward",
			mixinData: {
				setter: "location/setSelectedVdcWard"
			}
		}
	},
}
</script>
