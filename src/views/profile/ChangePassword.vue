<template>
	<v-row justify="center">
		<v-dialog
			v-model="changePasswordDialog"
			fullscreen
			hide-overlay
			close-delay="500"
			transition="dialog-bottom-transition"
		>
			<v-card flat
				class="no-radius"
			>
				<v-toolbar
					dark
					color="primary"
				>
					<v-btn
						icon
						dark
						@click="closeDialog"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-spacer />
					<v-toolbar-items>
						<v-btn
							dark
							text
							@click="closeDialog"
						>
							Save
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-card
					class="mx-auto"
					flat
				>
					<v-card-text class="pa-3">
						<v-row align="start">
							<v-col cols="1">
								<v-icon x-large
									class="pt-3"
								>
									mdi-shield-key
								</v-icon>
							</v-col>
							<v-col cols="11">
								<v-list-item two-line>
									<v-list-item-content>
										<v-list-item-title class="headline">
											Change Password
										</v-list-item-title>
										<v-list-item-subtitle>
											Fill up the form to change your
											password.
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-col>
						</v-row>
					</v-card-text>

					<v-divider />

					<v-card
						max-width="600"
						class="mx-auto pa-3 my-3"
						flat
					>
						<v-form>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="changePassword.password"
										prepend-inner-icon="mdi-lock-open"
										required
										outlined
										label="Current password"
										type="password"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="changePassword.new_password"
										prepend-inner-icon="mdi-lock-question"
										required
										outlined
										label="New password"
										type="password"
										hide-details="auto"
									/>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="
											changePassword.new_password_confirmation
										"
										prepend-inner-icon="mdi-lock-check"
										required
										outlined
										label="Confirm new password"
										type="password"
										hide-details="auto"
									/>
								</v-col>
							</v-row>
						</v-form>
					</v-card>
				</v-card>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import $ from "jquery"
export default {
	name: "ChangePasswordDialog",
	props: {
		value: Boolean
	},
	data: () => ({
		changePasswordDialog: false,
		notifications: false,
		sound: true,
		widgets: false,
		changePassword: {
			password: "",
			new_password: "",
			new_password_confirmation: ""
		},
	}),
	created() {
		this.$bus.on("open-change-password-dialog", this.openDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-change-password-dialog", this.closeDialog)
	},
	methods: {
		openDialog() {
			this.changePasswordDialog = true
		},
		closeDialog() {
			$("#profile-actions-btn").click()
			this.changePasswordDialog = false
		},
		submitChangePassword() {
			console.log(this.changePassword)
		}
	}
}
</script>
<style lang="sass" scoped>
.no-radius
	border-radius: 0
</style>
