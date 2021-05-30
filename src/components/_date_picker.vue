<template>
	<v-col cols="12">
		<div class="mb-6">
			Active picker: <code>{{ activePicker || 'null' }}</code>
		</div>
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			transition="scale-transition"
			offset-y
			attach=""
			:nudge-top="20"
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
					v-on="on"
					@input="$emit('input', $event)"
				/>
			</template>
			<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
			<v-date-picker :value="value" :active-picker.sync="activePicker"
				:max="new Date().toISOString().substr(0, 10)"
				min="1950-01-01"
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
		}
	},
	data: () => ({
		activePicker: null,
		date: null,
		menu: false,
	}),
	watch: {
		menu(val) {
			val && setTimeout(() => (this.activePicker = "YEAR"))
			console.log(this.activePicker)
		},
	},
	methods: {
		save(date) {
			console.log(this.$refs)
			this.$refs.menu.save(date)
		},
	},
	emit: ["input"]
}
</script>
