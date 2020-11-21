<template>
	<auth-component
		:top-image="registerPage.image"
		:page-avatar="registerPage.avatar"
		:title="registerPage.title"
		:subtitle="registerPage.subtitle"
		menu-title="Already a follower"
		:menu-items="items"
	>
		<template #form>
			<v-form v-model="valid">
				<v-row justify="center"
					align="center"
					class="ma-0 pa-0 px-6 px-sm-16 px-md-16 px-lg-16 px-xs-16"
				>
					<v-col
						cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="py-0"
					>
						<v-text-field
							v-model="follower.f_name"
							dense
							label="First name"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-form-textbox"
						/>
					</v-col>
					<v-col cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="py-0"
					>
						<v-text-field
							v-model="follower.l_name"
							dense
							label="Last name"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-form-textbox"
						/>
					</v-col>
					<v-col cols="12"
						class="py-0"
					>
						<v-text-field
							v-model="follower.email"
							dense
							label="Email Address"
							type="email"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-email"
						/>
					</v-col>
					<v-col cols="12"
						class="py-0"
					>
						<v-text-field
							v-model="follower.phone"
							dense
							label="Contact Number"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-phone"
							type="number"
						/>
					</v-col>
					<v-col cols="12"
						class="py-0"
					>
						<v-text-field
							v-model="follower.password"
							dense
							label="New password"
							required
							type="password"
							outlined
							clearable
							prepend-inner-icon="mdi-lock"
						/>
					</v-col>
				</v-row>

				<v-card-actions class="d-flex justify-center">
					<v-btn
						dark
						depressed
						large
						color="primary"
						class="px-xl-12 px-lg-8 px-md-6 px-sm-2 px-xs-0"
						@click="registerFollower()"
					>
						REGISTER
					</v-btn>
				</v-card-actions>
				<v-divider class="mx-4" />
				<v-card-text>
					<div id="register-terms">
						By clicking <code>Register</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time.
					</div>
				</v-card-text>
			</v-form>
		</template>
	</auth-component>
</template>
<script>
export default {
	components: {
		AuthComponent: () => import("@/components/AuthComponent")
	},
	data: () => ({
		registerPage: {
			image: require("@/assets/inaguration.jpg"),
			avatar: require("@/assets/dove-solid.svg"),
			title: "Become a follower",
			subtitle: "Let's begin an amazing journey with <b>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</b>."
		},
		loading: false,
		valid: false,
		items: [
			{ icon: "mdi-login-variant", title: "Sign in",  to: "/auth/login"},
			{ icon: "mdi-lock-question", title: "Forget password?", to: "/auth/reset-password"},
			{ icon: "mdi-post", title: "Feed page", to: "/home" },
			{ icon: "mdi-view-dashboard", title: "Showcase", to: "/" },
		],
		follower: {
			f_name: "",
			l_name: "",
			email: "",
			phone: null,
			password: "",
		}
	}),

	methods: {
		registerFollower() {
			this.loading = true

			setTimeout(() => (this.loading = false), 2000)
			console.log(this.follower)
		},
	},
}
</script>
<style lang="sass" scoped>
#register-terms
	font-size: 10px
</style>
