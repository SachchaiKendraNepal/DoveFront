<template>
	<v-col cols="12">
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			transition="scale-transition"
			offset-y
			:attach="attach"
			min-width="auto"
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					:value="value"
					:label="label.toUpperCase()"
					:prepend-inner-icon="prependInnerIcon"
					:name="name"
					:hint="hint"
					readonly
					solo
					clearable
					v-bind="attrs"
					hide-details="auto"
					placeholder="Select date"
					:error-messages="getErrorMessage"
					:rules="rules"
					v-on="on"
					@input="$emit('input', $event)"
				/>
			</template>
			<v-date-picker
				:value="value"
				@change="save"
				@input="$emit('input', $event)"
			/>
		</v-menu>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";

export default {
	name: "DatePickerField",
	mixins: [AdminFieldErrorMessage],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
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
		prependInnerIcon: {
			type: String,
			required: true
		},
		rules: {
			type: Array,
			default: () => []
		},
		/* eslint-disable vue/require-prop-types */
		attach: {
			default: "",
		}
	},
	emits: ["input"],
	data: () => ({
		menu: false,
	}),
	methods: {
		save(date) {
			this.$refs.menu.save(date)
		},
	},
	emit: ["input"]
}
</script>
