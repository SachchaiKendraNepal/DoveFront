<template>
	<v-col
		id="date-row"
		cols="12"
		class="pa-0"
	>
		<v-card
			id="date-peek-box"
			width="100"
			height="100"
			class="mx-auto"
		>
			<v-card color="red"
				height="25"
			>
				<v-card-text class="date-month">
					{{ $moment(event['start_date']).format("MMM") }}
				</v-card-text>
			</v-card>
			<v-card-text class="text-center display-3 pa-0 pt-1 text--darken-3 blue--text">
				<b>{{ $moment(event['start_date']).format("DD") }}</b>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: "DateColumn",
	props: {
		event: {
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>

</style>
