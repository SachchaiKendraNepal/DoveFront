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
							v-model="follower.first_name"
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
							v-model="follower.last_name"
							dense
							label="Last name"
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
							v-model="follower.username"
							dense
							autocomplete="username"
							label="Username"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-account-circle"
							:error-messages="registerFormErrors.username"
						/>
					</v-col>
					<v-col cols="12"
						xl="6" lg="6"
						md="6" sm="6"
						class="py-0"
					>
						<v-text-field
							v-model="follower.contact"
							dense
							label="Contact Number"
							required
							outlined
							clearable
							prepend-inner-icon="mdi-phone"
							type="number"
							:error-messages="registerFormErrors.contact"
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
							:error-messages="registerFormErrors.email"
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
							autocomplete="new-password"
							prepend-inner-icon="mdi-lock"
							:error-messages="registerFormErrors.password"
						/>
					</v-col>
					<v-col cols="12"
						class="py-0"
					>
						<v-text-field
							v-model="follower.confirm_password"
							dense
							label="Confirm password"
							required
							type="password"
							outlined
							clearable
							autocomplete="confirm-password"
							prepend-inner-icon="mdi-lock-open-check"
							:error-messages="registerFormErrors.confirm_password"
						/>
					</v-col>

					<v-col
						id="country-input-column"
						cols="12"
						class="py-0"
					>
						<v-autocomplete
							id="event-country"
							v-model="follower.country"
							:loading="loadingCountries"
							class="ma-0"
							allow-overflow
							dense
							item-text="name"
							item-value="id"
							:items="countries"
							attach=""
							outlined
							label="Country"
							clearable
							prepend-inner-icon="mdi-web"
							:error-messages="registerFormErrors.country"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>country</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="py-0"
					>
						<v-autocomplete
							id="event-province"
							v-model="follower.province"
							:loading="loadingProvinces"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							label="Province"
							item-text="name"
							item-value="id"
							:items="provinces"
							clearable
							prepend-inner-icon="mdi-office-building-marker-outline"
							:error-messages="registerFormErrors.province"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>provinces</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="py-0"
					>
						<v-autocomplete
							id="event-districts"
							v-model="follower.district"
							:loading="loadingDistricts"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							:items="districts"
							label="District"
							clearable
							prepend-inner-icon="mdi-map-marker-multiple-outline"
							:error-messages="registerFormErrors.district"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>district</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
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
			registerFormErrors: "user/registerFormErrors",
			countries: "location/allCountries",
			provinces: "location/allProvinces",
			districts: "location/allDistricts"
		}),
	},

	async created() {
		await this.initCountries()
		await this.initProvinces()
		await this.initDistricts()
		await this.$store.dispatch("user/clearRegisterFormErrors")
	},

	methods: {
		async initCountries() {
			this.loadingCountries = true
			await this.$store.dispatch("location/getAllCountries")
			this.loadingCountries = false
		},
		async initProvinces() {
			this.loadingProvinces = true
			await this.$store.dispatch("location/getAllProvinces")
			this.loadingProvinces = false
		},
		async initDistricts() {
			this.loadingDistricts = true
			await this.$store.dispatch("location/getAllDistricts")
			this.loadingDistricts = false
		},
		async registerFollower() {
			this.loading = true
			const state = await this.$store.dispatch("user/registerFollower", this.follower)
			this.loading = false
			if (state) await this.$router.push({name: "LOG IN"})
		},
	},
}
</script>
<style lang="sass" scoped>
#register-terms
	font-size: 10px
</style>
