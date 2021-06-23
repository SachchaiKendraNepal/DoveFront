<template>
	<v-toolbar
		max-width="1000"
		color="transparent"
		class="mx-auto"
		height="55"
		style="border-radius: 4px;"
	>
		<v-app-bar-nav-icon>
			<v-avatar
				size="36"
				color="grey lighten-2"
				class="elevation-4"
			>
				<v-icon
					color="primary"
				>
					mdi-bird
				</v-icon>
			</v-avatar>
		</v-app-bar-nav-icon>
		<v-toolbar-title class="toolbar-title">
			{{ $route.name }}
		</v-toolbar-title>
		<v-spacer />
	</v-toolbar>
</template>

<script>
export default {
	name: "HeaderToolbar",
	data: () => ({
		profileActionItems: [
			{icon: "mdi-pencil", text: "Edit profile", functionName: "openEditProfileDialog"},
			{icon: "mdi-arrow-horizontal-lock", text: "Change password", functionName: "openChangePasswordDialog"},
			{icon: "mdi-account-cog", text: "Settings", functionName: "openSettingsDialog"},
		],
	}),
	methods: {
		handle_function_call(function_name) {
			this[function_name]()
		},
		openEditProfileDialog() {
			this.$bus.emit("open-edit-profile-dialog")
		},
		openChangePasswordDialog() {
			this.$bus.emit("open-change-password-dialog")
		},
		openSettingsDialog() {
			console.log("here setting")
		}
	}
}
</script>

<style scoped>
.toolbar-title {
	font-family: "Open Sans Condensed", sans-serif;
	color: darkslategrey;
}
</style>
