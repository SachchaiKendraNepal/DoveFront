<template>
	<v-col cols="12">
		<v-autocomplete
			:value="value"
			class="ma-0"
			attach=""
			solo
			:label="label.toUpperCase()"
			:items="selectItems"
			clearable
			:rules="rules"
			:type="type"
			autocomplete="off"
			hide-details="auto"
			:prepend-inner-icon="icon"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
			@change="inputChanged('change', $event)"
		/>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "SelectField",
	mixins: [
		AdminFieldErrorMessage,
		AutocompleteInputChanged
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		label: {
			type: String,
			required: true
		},
		name:{
			type: String,
			required: true
		},
		type:{
			type: String,
			default: "text"
		},
		selectItems: {
			type: Array,
			required: true,
		},
		icon: {
			type: String,
			required: true
		},
		rules: {
			type: Array,
			required: false,
			default: () => []
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
			selectField: null,
		}
	}
}
</script>
