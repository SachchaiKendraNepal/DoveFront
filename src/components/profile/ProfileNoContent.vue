<template>
	<v-card height="100">
		<div
			class="text-center fill-height d-flex justify-center align-center"
		>
			<v-chip>{{ text }}</v-chip>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "ProfileNoContent",
	props : {
		text: {
			type: String,
			required: true
		},
	}
}
</script>

<style scoped>

</style>
