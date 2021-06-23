<template>
	<v-col
		cols="12"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="country"
			:value="value"
			:items="countries.results"
			:loading="countriesLoading"
			solo
			:clearable="(province === null)"
			:disabled="(province !== null)"
			item-text="name"
			item-value="id"
			:label="'Select country'.toUpperCase()"
			class="country"
			hide-details="auto"
			prepend-inner-icon="mdi-web"
			placeholder="Start typing"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>country</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import CountryAutocomplete from "@/mixins/CountryAutocomplete";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "CountryField",
	mixins: [
		AdminFieldErrorMessage,
		CountryAutocomplete,
		AutocompleteInputChanged
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		province: {
			required: true,
			type: Object
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
			name: "country"
		}
	},
	created() {
		if (this.value) {
			this.$store.dispatch("location/filterCountries", {
				search: this.value.name
			})
		}
	},
}
</script>
