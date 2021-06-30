<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="province"
			:value="value"
			:items="provinces.results"
			:loading="provincesLoading"
			solo
			:clearable="(district === null)"
			:disabled="(district !== null || country === null)"
			item-text="name"
			item-value="id"
			hide-details="auto"
			:label="'Select province'.toUpperCase()"
			:error-messages="getErrorMessage"
			prepend-inner-icon="mdi-office-building-marker-outline"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>province</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
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
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		country: {
			required: true
		},
		district: {
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
			name: "province",
		}
	}
}
</script>
