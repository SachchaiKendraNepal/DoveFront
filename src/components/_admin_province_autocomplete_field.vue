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
		:label="label"
		:class="name"
		:disabled="disabled"
		placeholder="Start typing"
		:prepend-inner-icon="prependInnerIcon"
		@input="$emit('input', $event)"
	>
		<template #no-data>
			<v-list-item>
				<v-list-item-title>
					No <code>{{ name }}</code> found.
				</v-list-item-title>
			</v-list-item>
		</template>
	</v-autocomplete>
</template>
<script>
import countryAutocomplete from "@/mixins/countryAutocomplete";
import provinceAutocomplete from "@/mixins/provinceAutocomplete";

export default {
	name: "AdminAutocompleteField",
	mixins: [countryAutocomplete, provinceAutocomplete],
	props: {
		value: {
			required: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
		prependInnerIcon: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	computed: {
		getErrorMessage() {
			if (!this.errors) return null
			if (this.errors[this.name]) {
				return this.errors[this.name][0]
			}
			else return null
		}
	}
}
</script>
