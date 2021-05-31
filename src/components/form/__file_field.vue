<template>
	<v-col
		cols="12"
	>
		<v-file-input
			:value="value"
			solo
			small-chips
			show-size
			:accept="accept"
			:label="label.toUpperCase()"
			clearable
			multiple
			hide-details="auto"
			prepend-icon=""
			:prepend-inner-icon="prependInnerIcon"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
		/>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "FileField",
	mixins: [AdminFieldErrorMessage, AutocompleteInputChanged],
	props: {
		prependInnerIcon: {
			required: true,
			type: String
		},
		label: {
			required: true,
			type: String
		},
		name: {
			required: true,
			type: String
		},
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		accept: {
			required: true,
			type: String
		}
	},
	emits: ["input"],
}
</script>
