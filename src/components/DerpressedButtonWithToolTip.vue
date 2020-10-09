<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-btn
				class="my-2"
				depressed
				v-bind="attrs"
				v-on="on"
			>
				<v-icon
					:size="size"
					:color="color"
				>
					{{ icon }}
				</v-icon>
				<span class="btn-text">{{ text }}</span>
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
			required: true
		},
		size: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: true
		},
		tooltip: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="sass" scoped>
</style>
