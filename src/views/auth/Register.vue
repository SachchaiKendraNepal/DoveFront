<template>
	<div class="register-container">
		<v-card
			:loading="loading"
			class="mx-auto my-auto"
			max-width="700"
		>
			<v-toolbar
				class="elevation-12"
				color="orange lighten-3"
			>
				<v-btn icon
					@click="$router.go(-1)"
				>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<v-spacer />
				<v-menu offset-y>
					<template #activator="{ on, attrs }">
						<v-btn
							color="primary"
							dark
							v-bind="attrs"
							v-on="on"
						>
							<div v-show="$vuetify.breakpoint.smAndUp">
								Already a follower
							</div>
							<v-icon>mdi-help</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(item, index) in items"
							:key="index"
							:to="item.to"
						>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar>
			<v-progress-linear
				:active="loading"
				:indeterminate="loading"
				absolute
				bottom
				color="grey darken-2"
			/>

			<v-img
				height="350"
				src="@/assets/inaguration.jpg"
			/>

			<div id=""
				class="d-flex justify-start align-center pl-4 pt-4"
			>
				<v-avatar
					id="logo"
					tile
					size="50"
				>
					<v-img src="@/assets/dove-solid.svg" />
				</v-avatar>
				<span id="org-title">Become a follower</span>
			</div>

			<v-card-text>
				<div class="subtitle-2">
					Let's begin an amazing journey with <b>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</b>.
				</div>
			</v-card-text>
			<v-divider class="mb-4" />
			<v-form v-model="valid">
				<v-row justify="center"
					align="center"
					class="px-6 px-sm-16 px-md-16 px-lg-16 px-xs-16"
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

				<v-divider class="mx-4" />

				<v-card-text>
					<div id="register-terms">
						By clicking <code>Register</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time.
					</div>
				</v-card-text>
				<v-card-actions class="d-flex justify-center">
					<v-btn
						dark
						depressed
						x-large
						color="primary"
						class="px-xl-12 px-lg-8 px-md-6 px-sm-2 px-xs-0"
						@click="registerFollower()"
					>
						REGISTER
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</div>
</template>
<script>
export default {
	data: () => ({
		loading: false,
		valid: false,
		selection: 1,
		items: [
			{ title: "Sign in",  to: "/auth/login"},
			{ title: "Forget password?", to: "/auth/reset-password"},
			{ title: "Feed page", to: "/home" },
			{ title: "Showcase", to: "/" },
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
.register-container
	height: 100%
	background: linear-gradient(45deg, rgb(37, 158, 239), rgb(184, 204, 234), rgb(16, 123, 207))
	padding: 20px 0
#register-terms
	font-size: 10px
#org-title
	font-size: 48px
	padding-left: 10px
	transition: all .5s
	font-family: "Abril Fatface", cursive
	@media only screen and (max-width: 500px)
		font-size: 32px
	@media only screen and (max-width: 320px)
		font-size: 20px
#logo
	transition: all .5s
	@media only screen and (max-width:320px)
		height: 30px !important
		min-width: 30px !important
		width: 30px !important
</style>
