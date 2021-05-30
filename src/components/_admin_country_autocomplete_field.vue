<template>
	<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
	<v-autocomplete :search-input.sync="country"
		:value="value"
		:items="items"
		:loading="loading"
		solo
		hide-selected
		item-text="name"
		item-value="id"
		label="Select country"
		name="country"
		prepend-inner-icon="mdi-web"
		placeholder="Start typing"
		@input="inputChanged('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>country</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import CountryAutocomplete from "@/mixins/CountryAutocomplete";

export default {
	name: "AdminAutocompleteField",
	mixins: [AdminFieldErrorMessage, CountryAutocomplete],
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
	emits: ["input"],
	data() {
		return {
			name: "country",
			mixinData: {
				locationSetter: "location/setSelectedCountry"
			}
		}
	},
}
</script>
