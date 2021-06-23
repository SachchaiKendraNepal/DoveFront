<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="vdc"
			:value="value"
			:items="vdcs.results"
			:loading="vdcsLoading"
			attach=""
			solo
			:clearable="(ward === null)"
			item-text="name"
			item-value="id"
			hide-details="auto"
			:disabled="(ward !== null || district === null ||municipality !== null)"
			:label="'Select vdc'.toUpperCase()"
			placeholder="Start typing"
			prepend-inner-icon="mdi-google-maps"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>vdcs</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
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
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		district: {
			required: true
		},
		ward: {
			required: true
		},
		municipality: {
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
			name: "vdc"
		}
	},
	created() {
		if (this.value) {
			this.$store.dispatch("location/filterVdc", {
				search: this.value.name
			})
		}
	}
}
</script>
