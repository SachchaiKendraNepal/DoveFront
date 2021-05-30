<template>
	<v-col
		cols="12"
	>
		<p class="heading ma-0 pa-0">
			<v-icon class="pb-1"
				size="30"
			>
				{{ icon }}
			</v-icon>
			{{ text }}
		</p>
		<v-divider />
	</v-col>
</template>

<script>
export default {
	name: "AdminFormGroupTitle",
	props: {
		icon: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>

</style>
