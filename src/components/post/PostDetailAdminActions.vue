<template>
	<v-row class="alice-blue ma-0 pa-2"
		justify="space-around"
		align="center"
	>
		<v-avatar size="30"
			class="elevation-4 mx-2"
			color="primary"
		>
			<v-icon color="white">
				mdi-account-cog
			</v-icon>
		</v-avatar>
		<h4 class="pa-0 ma-0 blue--text text--darken-2 mt-1">
			ADMIN ACTIONS
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
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn
					dark
					icon
					v-bind="attrs"
					color="green darken-3"
					class="elevation-3"
					v-on="on"
				>
					<v-icon>
						mdi-check-decagram
					</v-icon>
				</v-btn>
			</template>
			<span>APPROVE</span>
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
