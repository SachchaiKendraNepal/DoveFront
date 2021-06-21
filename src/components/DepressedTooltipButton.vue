<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-btn
				class="my-2"
				:depressed="depressed"
				:icon="iconTypeBtn"
				v-bind="attrs"
				:disabled="isDisabled"
				:to="to"
				v-on="on"
			>
				<v-icon
					:size="size"
					:color="color"
				>
					{{ icon }}
				</v-icon>
				<span v-if="text"
					class="btn-text"
				>{{ text }}</span>
			</v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>
<script>
export default {
	name: "DepressedButtonComponent",
	props: {
		icon: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: false,
			default: null
		},
		size: {
			type: String,
			required: false,
			default: "20"
		},
		color: {
			type: String,
			required: false,
			default: "white"
		},
		tooltip: {
			type: String,
			required: true
		},
		depressed: {
			type: Boolean,
			default: true
		},
		iconTypeBtn: {
			type: Boolean,
			default: false
		},
		isDisabled: {
			type: Boolean,
			default: false
		},
		to: {
			type: String,
			default: ""
		}
	}
}
</script>
<style lang="sass" scoped>
</style>
