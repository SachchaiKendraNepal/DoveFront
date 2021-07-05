<template>
	<v-btn fab
		x-small :dark="dark"
		:color="color"
	>
		<v-icon>{{ icon }}</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: "FabButton",
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
		}
	}
}
</script>

<style scoped>

</style>
