<template>
	<auth-component
		:top-image="registerPage.image"
		:page-avatar="registerPage.avatar"
		:title="registerPage.title"
		:subtitle="registerPage.subtitle"
		menu-title="Already a follower"
		:menu-items="items"
		height="40vh"
	>
		<template #form>
			<v-form v-model="valid">
				<v-row justify="center"
					align="center"
					class="ma-0 pa-0"
				>
					<v-col
						cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="ma-0 pa-0"
					>
						<text-field
							v-model="follower.first_name"
							label="First name"
							icon="mdi-form-textbox"
							name="first_name"
							:errors="registerFormErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="ma-0 pa-0"
					>
						<text-field
							v-model="follower.last_name"
							label="Last name"
							name="last_name"
							icon="mdi-form-textbox"
							:errors="registerFormErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="ma-0 pa-0"
					>
						<text-field
							v-model="follower.username"
							name="username"
							label="Username"
							autocomplete="username"
							icon="mdi-account-circle"
							:errors="registerFormErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="ma-0 pa-0"
					>
						<text-field
							v-model="follower.contact"
							label="Contact"
							name="contact"
							icon="mdi-phone"
							type="number"
							:errors="registerFormErrors"
						/>
					</v-col>
					<text-field
						v-model="follower.email"
						label="Email Address"
						type="email"
						name="email"
						icon="mdi-email"
						:errors="registerFormErrors"
					/>
					<text-field
						v-model="follower.password"
						label="New password"
						name="password"
						type="password"
						icon="mdi-lock"
						autocomplete="new-password"
						:errors="registerFormErrors"
					/>
					<text-field
						v-model="follower.confirm_password"
						label="Confirm password"
						name="confirm_password"
						type="password"
						autocomplete="confirm-password"
						icon="mdi-lock-open-check"
						:errors="registerFormErrors"
					/>
					<country-field
						id="country"
						v-model="follower.country"
						:province="follower.province"
						:errors="registerFormErrors"
					/>
					<province-field
						id="province"
						v-model="follower.province"
						:country="follower.country"
						:district="follower.district"
						:errors="registerFormErrors"
					/>
					<district-field
						id="district"
						v-model="follower.district"
						:province="follower.province"
						:municipality="null"
						:vdc="null"
						:errors="registerFormErrors"
					/>
				</v-row>

				<v-card-actions class="d-flex justify-center">
					<v-btn
						:loading="loading"
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
					<div class="register-terms">
						By clicking <code>Register</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time.
					</div>
				</v-card-text>
			</v-form>
		</template>
	</auth-component>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	components: {
		AuthComponent: () => import("@/components/AuthComponent")
	},
	data: () => ({
		loadingCountries: false,
		loadingProvinces: false,
		loadingDistricts: false,
		loading: false,
		valid: false,
		registerPage: {
			image: require("@/assets/inaguration.jpg"),
			avatar: require("@/assets/dove-solid.svg"),
			title: "Become a follower",
			subtitle: "Let's begin an amazing journey with <b>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</b>."
		},
		items: [
			{ icon: "mdi-login-variant", title: "Sign in",  to: "/auth/login"},
			{ icon: "mdi-lock-question", title: "Forget password?", to: "/auth/reset-password"}
		],
		follower: {
			first_name: null,
			last_name: null,
			username: null,
			email: null,
			contact: null,
			password: null,
			confirm_password: null,
			birth_date: null,
			current_city: null,
			home_town: null,
			country: null,
			province: null,
			district: null,
		},
	}),

	computed: {
		...mapGetters({
			registerFormErrors: "user/formErrors"
		}),
	},

	async created() {
		await this.$store.dispatch("user/clearFormErrors")
	},

	methods: {
		async registerFollower() {
			this.loading = true
			const state = await this.$store.dispatch("user/registerFollower", {body: this.follower})
			this.loading = false
			if (state) await this.$router.push({name: "LOG IN"})
		},
	},
}
</script>
<style lang="sass" scoped>
.register-terms
	font-size: 10px !important
</style>
