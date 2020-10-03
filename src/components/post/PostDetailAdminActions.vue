<template>
	<v-row
		align="center"
		justify="start"
		class="mx-0 pt-4 pb-2 px-2 alice-blue"
	>
		<v-col cols="12"
			class="py-4"
		>
			<v-btn
				dark
				block
				large
				color="red darken-3"
			>
				<v-icon left>
					mdi-delete
				</v-icon>
				DELETE
			</v-btn>
		</v-col>
		<v-col cols="12"
			class="py-4"
		>
			<v-btn
				dark
				block
				large
				color="green darken-2"
			>
				<v-icon left>
					mdi-check-decagram
				</v-icon>
				APPROVE
			</v-btn>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "PostDetailAdminActionsComponent"
}
</script>
<style lang="sass" scoped>
.alice-blue
	background-color: aliceblue
</style>
