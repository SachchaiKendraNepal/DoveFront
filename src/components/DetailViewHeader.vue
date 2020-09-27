<template>
	<v-row>
		<v-col
			cols="12"
			xl="9"
			lg="9"
			md="9"
			sm="9"
			class="pl-10"
		>
			<slot name="topContent" />
			<slot name="chips" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="3"
			md="3"
			sm="3"
			class="text-center"
		>
			<slot name="image" />
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "DetailViewHeaderComponent",
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data: () => ({

	})
}
</script>
