<template>
	<v-text-field
		:value="value"
		solo
		:class="name"
		clearable
		:label="label"
		placeholder="Start typing"
		:error-messages="getErrorMessage"
		:prepend-inner-icon="prependInnerIcon"
		@input="$emit('input', $event)"
	/>
</template>
<script>
export default {
	name: "AdminTextField",
	props: {
		value: {
			required: true
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
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
