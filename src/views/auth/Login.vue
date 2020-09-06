<template>
  <base-auth-card :item="item">
    <template v-slot:authForm>
      <v-card-subtitle class="text-uppercase text-center my-1 py-0" dark>{{subtitle}}</v-card-subtitle>
      <v-form
          class="login-form"
          @submit.prevent="login()"
      >
        <v-container class="py-0">
          <v-row align="center" justify="center" class="mx-6">
            <v-col cols="12">
              <v-text-field
                  v-model="user.username"
                  hide-details
                  placeholder="example125"
                  id="username"
                  label="Username"
                  outlined
                  dense
                  prepend-inner-icon="mdi-account-circle"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="user.password"
                  hide-details
                  placeholder="password"
                  id="password"
                  label="Password"
                  outlined
                  dense
                  type="password"
                  prepend-inner-icon="mdi-lock-question"
              />
            </v-col>
            <v-col cols="12" class="py-0 my-0">
              <div class="remember_forgot_container my-0 pt-0 pb-2">
                <router-link to="/auth/reset-password" id="forget-password">
                  <span>Forget Password?</span>
                </router-link>
              </div>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center my-0 pt-0 pb-3">
            <v-btn
                class="my-0"
                color="primary"
                v-on:click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </template>
  </base-auth-card>
</template>
<style lang="sass">
#forget-password
  span
    font-size: 12px
</style>
<script>
export default {
  name: "LoginComponent",
  components: {
    BaseAuthCard: () => import("@/views/auth/_auth")
  },
  data() {
    return {
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
        // let response = await this.$store.dispatch("Member/login", this.user);
        // if ("access_token" in response && response.access_token !== null) {
        //   sessionStorage.setItem("selectedLocale", "en");
        //   this.$i18n.locale = "en";
        //   if (JSON.parse(localStorage.getItem("currentUser"))) {
        //     // do something
        //   }
        // }
        await this.$router.replace("/");
      } finally {
        this.overlay = false;
      }
    }
  }
}
</script>
