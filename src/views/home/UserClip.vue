<template>
	<v-card
		id="profile-clip"
		class="mx-auto pb-1"
		flat
		color="transparent"
	>
		<v-list-item>
			<v-list-item-content class="text-center pb-0">
				<v-list-item-subtitle>Happy New Year!</v-list-item-subtitle>
				<v-list-item-title
					id="user-name"
					class="mb-2"
				>
					{{ currentUser.first_name }} {{ currentUser.last_name }}
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<div class="text-center">
			<v-chip
				label
				class="mr-2"
				color="primary"
			>
				<v-icon left>
					mdi-account-group
				</v-icon>
				FOLLOWER
			</v-chip>

			<v-chip
				v-if="currentUser.is_superuser"
				color="grey darken-3"
				label
				text-color="white"
			>
				<v-icon left>
					mdi-account-cog
				</v-icon>
				ADMIN
			</v-chip>
		</div>
	</v-card>
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
#profile-clip
	border-radius: 0
	#cover-image
		border-radius: 0 5px 5px 0
	#user-name
		font-size: 25px !important
		font-weight: 300 !important
</style>
