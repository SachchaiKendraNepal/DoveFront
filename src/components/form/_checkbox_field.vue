<template>
	<v-col
		cols="12"
	>
		<v-card class="d-flex align-center">
			<v-checkbox
				class="checkbox-field"
				:value="value"
				:label="label.toUpperCase()"
				hide-details
				:prepend-icon="icon"
				@change="$emit('input', $event)"
			/>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: "CheckboxField",
	props: {
		value: {
			required: true
		},
		icon: {
			required: true,
			type: String,
		},
		label: {
			required: true,
			type: String,
		}
	},
	emits: ["input"],
}
</script>

<style scoped>
.checkbox-field {
	margin: 10px;
	min-height: 30px;
}
</style>
