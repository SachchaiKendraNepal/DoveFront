<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="vdcWard"
			:value="value"
			:items="vdcWards.results"
			:loading="vdcWardsLoading"
			attach=""
			solo
			clearable
			item-text="name"
			item-value="id"
			hide-details="auto"
			:disabled="(vdc === null)"
			:label="'Select vdc ward'.toUpperCase()"
			placeholder="Start typing"
			prepend-inner-icon="mdi-numeric"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>vdc wards</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
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
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		vdc: {
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
			name: "vdc_ward"
		}
	}
}
</script>
