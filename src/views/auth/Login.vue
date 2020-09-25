<template>
  <base-auth-card :item="item">
    <template #authForm>
      <v-card-subtitle
        class="text-uppercase text-center my-1 py-0"
        dark
      >
        {{
          subtitle
        }}
      </v-card-subtitle>
      <v-form
        class="login-form"
        @submit.prevent="login()"
      >
        <v-container class="py-0">
          <v-row
            align="center"
            justify="center"
            class="mx-6"
          >
            <v-col
              cols="12"
              lg="8"
              md="7"
              sm="8"
            >
              <v-text-field
                hide-details
                outlined
                dense
                id="username"
                label="Username"
                prepend-inner-icon="mdi-account-circle"
                background-color="white"
                v-model="user.username"
              />
            </v-col>
            <v-col
              cols="12"
              lg="8"
              md="7"
              sm="8"
            >
              <v-text-field
                dense
                outlined
                hide-details
                id="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock-question"
                background-color="white"
                v-model="user.password"
              />
            </v-col>
            <v-col
              cols="12"
              lg="8"
              md="7"
              sm="8"
              class="pt-0"
            >
              <div class="my-0 pt-0 pb-2">
                <router-link
                  to="/auth/reset-password"
                  id="forget-password"
                >
                  <span>Forget Password?</span>
                </router-link>
              </div>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center my-0 pt-0 pb-3">
            <v-btn
              class="my-0"
              color="primary"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
    </template>
  </base-auth-card>
</template>
<style lang="sass">
#forget-password
  span
    font-size: 14px
    font-weight: bold
</style>
<script>
export default {
	name: "LoginComponent",
	components: {
		BaseAuthCard: () => import("@/views/auth/_auth")
	},
	data() {
		return {
			overlay: false,
			subtitle: "Login to proceed",
			user: {
				username: "",
				password: ""
			},
			item: {
				subtitle: "Login to proceed"
			}
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
