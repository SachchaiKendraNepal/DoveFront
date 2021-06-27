<template>
	<v-list-item
		class="clip-item"
		two-line
	>
		<v-list-item-avatar v-if="$helper.getCurrentProfileImage()"
			class="clip-avatar"
		>
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
		<v-list-item-content class="pl-4">
			<v-list-item-title class="full-name">
				<h4 v-text="getFullName" />
			</v-list-item-title>
			<v-list-item-subtitle>
				<v-icon small
					color="orange"
				>
					mdi-account-group
				</v-icon>
				<v-icon small
					color="grey"
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
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		getFullName() {
			if (this.currentUser.first_name && this.currentUser.last_name) {
				return `${this.currentUser.first_name} ${this.currentUser.last_name}`
			} else {
				return this.currentUser.username
			}
		}
	}
}
</script>
<style lang="sass" scoped>
.clip-item
	padding: 0 8px
	height: 70px
.clip-item:hover
	transition: all .5s ease
	.clip-avatar
		background-color: #efbdee
		border: 2px solid #efbdee
</style>
