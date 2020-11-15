<template>
	<v-row class="ma-0 pa-0">
		<v-col
			cols="12"
			class="pa-0"
		>
			<slot name="topContent" />
		</v-col>
		<v-col cols="12">
			<slot name="chips" />
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "DetailViewHeaderComponent"
}
</script>
