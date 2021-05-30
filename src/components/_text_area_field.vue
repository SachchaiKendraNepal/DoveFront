<template>
	<v-col cols="12">
		<v-textarea
			:value="value"
			auto-grow
			solo
			clearable
			hide-details="auto"
			:label="label.toUpperCase()"
			placeholder="Start typing"
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
		}
	}
}
</script>
