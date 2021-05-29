<template>
	<v-row class="alice-blue ma-0 pa-2"
		justify="space-around"
		align="center"
	>
		<h4 class="pa-0 ma-0 blue--text text--darken-2 mt-1 text-uppercase">
			Sachchai Nepal Post
		</h4>
		<v-spacer />
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn
					dark
					icon
					v-bind="attrs"
					color="red darken-3"
					class="elevation-3 mr-1"
					v-on="on"
				>
					<v-icon>
						mdi-delete
					</v-icon>
				</v-btn>
			</template>
			<span>DELETE</span>
		</v-tooltip>
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
