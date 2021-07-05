<template>
	<auth-component
		height="35vh"
		:top-image="resetPwPage.image"
		:page-icon="resetPwPage.pageIcon"
		:title="resetPwPage.title"
		:subtitle="resetPwPage.subtitle"
		menu-title="Not a follower yet"
		:menu-items="menuItems"
	>
		<template #form>
			<v-form
				class="reset-password-form"
				@submit.prevent="requestReset()"
			>
				<v-row justify="center"
					align="center"
					class="ma-0 pa-0 px-6 px-sm-16 px-md-16 px-lg-16 px-xs-16"
				>
					<v-col
						cols="12"
						lg="8"
						md="7"
						sm="8"
						class="py-8"
					>
						<v-text-field
							id="username"
							v-model="user.username"
							solo
							clearable
							hide-details
							label="Username/Email"
							prepend-inner-icon="mdi-account-circle"
							background-color="white"
							@keyup="submitIfEnter"
						/>
					</v-col>
				</v-row>
				<v-card-actions class="justify-center my-0 pt-0 pb-3">
					<v-btn
						class="my-0"
						color="primary"
						@click="requestReset()"
					>
						Forget Password
					</v-btn>
				</v-card-actions>
				<v-divider class="mx-4" />
				<v-card-text>
					<div class="reset-terms">
						By clicking <code>Forget Password</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time.
					</div>
				</v-card-text>
			</v-form>
			<v-overlay :value="overlay">
				<v-progress-circular
					indeterminate
					size="64"
				/>
			</v-overlay>
		</template>
	</auth-component>
</template>
<script>
export default {
	name: "ResetPasswordComponent",
	components: {
		AuthComponent: () => import("@/components/AuthComponent"),
	},
	data() {
		return {
			overlay: false,
			resetPwPage: {
				image: require("@/assets/forget_password.png"),
				pageIcon: "mdi-lock-reset",
				title: "Reset your password",
				subtitle: "Provide <b>username / email</b> to reset your password. <br/> Reset password link will be sent to your email address."
			},
			menuItems: [
				{ icon: "mdi-lock-question", title: "Login", to: "/auth/login"},
				{ icon: "mdi-account-plus", title: "Become a follower",  to: "/auth/register"},
			],
			user: {
				username: ""
			}
		}
	},
	methods: {
		async submitIfEnter(e) {
			if (e.keyCode === 13) await this.requestReset()
		},
		async requestReset() {
			try {
				this.overlay = true
				await this.$router.replace("login")
			} finally {
				this.overlay = false
			}
		}
	}
}
</script>
<style>
.reset-terms {
	font-size: 10px;
}
</style>
