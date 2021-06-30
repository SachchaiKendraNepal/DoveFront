<template>
	<v-col cols="12">
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="district"
			:value="value"
			:items="districts.results"
			:loading="districtsLoading"
			attach=""
			solo
			:clearable="((municipality === null) && (vdc === null))"
			:disabled="((municipality !== null) || (vdc !== null) || (province === null))"
			item-text="name"
			item-value="id"
			hide-details="auto"
			label="SELECT DISTRICT"
			placeholder="Start typing"
			:error-messages="getErrorMessage"
			prepend-inner-icon="mdi-map-marker-multiple-outline"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>districts</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import DistrictAutocomplete from "@/mixins/DistrictAutocomplete";
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "DistrictField",
	mixins: [
		DistrictAutocomplete,
		AdminFieldErrorMessage,
		AutocompleteInputChanged
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		province: {
			required: true,
		},
		municipality: {
			required: true,
		},
		vdc: {
			required: true,
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
			name: "district"
		}
	}
}
</script>
