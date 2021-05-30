<template>
	<v-col cols="12">
		<v-text-field
			:value="value"
			solo
			clearable
			:label="label.toUpperCase()"
			placeholder="Start typing"
			:type="type"
			:hint="hint"
			hide-details="auto"
			:error-messages="getErrorMessage"
			:prepend-inner-icon="prependInnerIcon"
			@input="$emit('input', $event)"
		/>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";

export default {
	name: "TextField",
	mixins: [AdminFieldErrorMessage],
	props: {
		value: {
			required: true
		},
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true
		},
		hint: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			required: false,
			default: "text"
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
		prependInnerIcon: {
			type: String,
			required: true
		}
	}
}
</script>
