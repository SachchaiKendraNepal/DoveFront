<template>
	<v-list-item two-line
		class="px-2"
		style="height: 70px"
	>
		<v-list-item-avatar v-if="$helper.getCurrentProfileImage()">
			<v-img
				:src="$helper.getCurrentProfileImage()"
			/>
		</v-list-item-avatar>
		<v-list-item-avatar
			v-else
			color="blue"
			class="ma-0 pa-0 d-flex justify-center"
		>
			<span class="headline white--text">
				{{ $helper.getCurrentUserInitials() }}
			</span>
		</v-list-item-avatar>
		<v-list-item-content class="pl-6">
			<v-list-item-title class="full-name">
				{{ currentUser.first_name }} {{ currentUser.last_name }}
			</v-list-item-title>
			<v-list-item-subtitle>
				<v-icon small
					color="orange"
				>
					mdi-account-group
				</v-icon>
				<v-icon small
					color="black"
					class="ml-1"
				>
					mdi-account-cog
				</v-icon>
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>
<script>
export default {
	name: "UserClipComponent",
	data: () => ({
		currentUser: null
	}),
	created() {
		this.currentUser = this.$helper.getCurrentUser()
	},
}
</script>
<style lang="sass" scoped>
.full-name
	font-size: 1rem
	font-weight: 500
</style>
