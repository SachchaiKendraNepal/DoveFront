<template>
	<div>
		<v-card
			class="mx-auto"
			max-width="600"
			flat
		>
			<header-toolbar />
			<v-divider />
			<v-form>
				<div class="py-2" />
				<v-row no-gutters>
					<v-col cols="12"
						class="py-4 px-1"
					>
						<v-text-field
							v-model="changePassword.password"
							prepend-inner-icon="mdi-lock-open"
							outlined
							autocomplete="current-password"
							label="Current password"
							type="password"
							hide-details="auto"
						/>
					</v-col>
					<v-col cols="12"
						class="py-4 px-1"
					>
						<v-text-field
							v-model="changePassword.new_password"
							prepend-inner-icon="mdi-lock-question"
							outlined
							autocomplete="new-password"
							label="New password"
							type="password"
							hide-details="auto"
						/>
					</v-col>
					<v-col cols="12"
						class="py-4 px-1"
					>
						<v-text-field
							v-model="
								changePassword.new_password_confirmation
							"
							prepend-inner-icon="mdi-lock-check"
							outlined
							autocomplete="confirm-new-password"
							label="Confirm new password"
							type="password"
							hide-details="auto"
						/>
					</v-col>
					<v-col cols="12"
						class="d-flex justify-center pa-4"
					>
						<v-btn depressed>
							Update Password
						</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card>
	</div>
</template>
<script>
import HeaderToolbar from "@/views/profile/HeaderToolbar.vue";
export default {
	name: "ChangePasswordDialog",
	components: {HeaderToolbar},
	props: {
		value: Boolean
	},
	data: () => ({
		notifications: false,
		sound: true,
		widgets: false,
		changePassword: {
			password: "",
			new_password: "",
			new_password_confirmation: ""
		},
	}),
	methods: {}
}
</script>
<style lang="sass" scoped>
.no-radius
	border-radius: 0
</style>
