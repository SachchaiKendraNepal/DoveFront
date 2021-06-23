<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="municipalityWard"
			:value="value"
			:items="municipalityWards.results"
			:loading="municipalityWardsLoading"
			solo
			clearable
			attach=""
			item-text="name"
			item-value="id"
			hide-details="auto"
			:disabled="(vdc !== null || municipality === null)"
			:label="'Select municipality ward'.toUpperCase()"
			placeholder="Start typing"
			prepend-inner-icon="mdi-numeric"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>municipality ward</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
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
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		municipality: {
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
	emits: ["input"],
	data() {
		return {
			name: "municipality_ward"
		}
	},
	created() {
		if (this.value) {
			this.$store.dispatch("location/filterMunicipalityWard", {
				search: this.value.name,
				municipality: (this.municipality) ? this.municipality.id : ""
			})
		}
	}
}
</script>
