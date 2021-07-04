<template>
	<v-tooltip bottom>
		<template #activator="{on, attrs}">
			<v-btn
				class="mx-1"
				fab
				x-small
				:dark="dark"
				:color="color"
				v-bind="attrs"
				v-on="on"
			>
				<v-icon>{{ icon }}</v-icon>
			</v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>

<script>
export default {
	name: "FabTooltipBtn",
	props: {
		dark: {
			type: Boolean,
			default: false
		},
		icon: {
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
	},
}
</script>

<style scoped>

</style>
