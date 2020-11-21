<template>
	<auth-component
		:top-image="loginPage.image"
		:page-icon="loginPage.pageIcon"
		:title="loginPage.title"
		:subtitle="loginPage.subtitle"
		menu-title="Not a follower yet"
		:menu-items="menuItems"
	>
		<template #form>
			<v-form
				class="login-form"
				@submit.prevent="login()"
			>
				<v-row justify="center"
					align="center"
					class="ma-0 pa-0 px-6 px-sm-16 px-md-16 px-lg-16 px-xs-16"
				>
					<v-col
						cols="12"
					>
						<v-text-field
							id="username"
							v-model="user.username"
							hide-details
							outlined
							dense
							label="Username"
							prepend-inner-icon="mdi-account-circle"
							background-color="white"
						/>
					</v-col>
					<v-col
						cols="12"
					>
						<v-text-field
							id="password"
							v-model="user.password"
							dense
							outlined
							hide-details
							label="Password"
							type="password"
							prepend-inner-icon="mdi-lock-question"
							background-color="white"
						/>
					</v-col>
					<v-col class="login-actions"
						cols="12"
					>
						<v-row
							class="pa-0 ma-0"
							align="center"
						>
							<v-col cols="6"
								xl="6" lg="6"
								md="6" sm="6"
								class="d-flex justify-start"
							>
								<router-link
									class="action-link"
									to="/auth/reset-password"
								>
									<span>Forget Password?</span>
								</router-link>
							</v-col>
							<v-col cols="6"
								xl="6" lg="6"
								md="6" sm="6"
								class="d-flex justify-end"
							>
								<router-link
									class="action-link"
									to="/auth/register"
								>
									<span>Become a follower!</span>
								</router-link>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-card-actions class="justify-center my-0 pt-0 pb-3">
					<v-btn
						class="my-0 px-8"
						color="primary"
						@click="login"
					>
						Login
					</v-btn>
				</v-card-actions>
				<v-divider class="mx-4" />
				<v-card-text>
					<div id="login-terms">
						By clicking <code>Login</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time.
					</div>
				</v-card-text>
			</v-form>
		</template>
	</auth-component>
</template>

<script>
export default {
	name: "LoginComponent",
	components: {
		AuthComponent: () => import("@/components/AuthComponent"),
	},
	data() {
		return {
			overlay: false,
			loginPage: {
				image: "https://i.ibb.co/HgJLWqX/IMG-8845.jpg",
				pageIcon: "mdi-login-variant",
				title: "Log in to proceed",
				subtitle: "Let's begin an amazing journey with <b>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</b>."
			},
			menuItems: [
				{ icon: "mdi-account-plus", title: "Become a follower",  to: "/auth/register"},
				{ icon: "mdi-lock-question", title: "Forget password?", to: "/auth/reset-password"},
			],
			user: {
				username: "",
				password: ""
			},
		}
	},
	methods: {
		async login() {
			try {
				this.overlay = true
				// let response = await this.$store.dispatch("Member/login", this.user);
				// if ("access_token" in response && response.access_token !== null) {
				//   sessionStorage.setItem("selectedLocale", "en");
				//   this.$i18n.locale = "en";
				//   if (JSON.parse(localStorage.getItem("currentUser"))) {
				//     // do something
				//   }
				// }
				await this.$router.replace("/")
			} finally {
				this.overlay = false
			}
		}
	}
}
</script>

<style lang="sass">
.action-link
	span
		font-size: 14px
		font-weight: bold
#login-terms
	font-size: 10px
</style>
