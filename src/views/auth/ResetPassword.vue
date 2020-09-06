<template>
  <base-auth-card :item="item">
    <template v-slot:authForm>
      <v-card-subtitle class="text-center my-1 py-0" dark>{{subtitle}}</v-card-subtitle>
      <v-form
          class="reset-password-form"
          @submit.prevent="requestReset()"
      >
        <v-container class="py-0">
          <v-row align="center" justify="center" class="mx-6">
            <v-col cols="12">
              <v-text-field
                  v-model="user.username"
                  hide-details
                  placeholder="kiran589"
                  id="username"
                  outlined
                  dense
                  prepend-inner-icon="mdi-account-circle"
                  label="Username/Email"
              />
            </v-col>
          </v-row>
          <v-card-actions class="justify-center my-0 pt-0 pb-3">
            <v-btn
                class="my-0"
                color="primary"
                v-on:click="requestReset()"
            >
              Forget Password
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </template>
  </base-auth-card>
</template>
<script>
export default {
  name: "LoginComponent",
  components: {
    BaseAuthCard: () => import("@/views/auth/_auth")
  },
  data() {
    return {
      subtitle: "Provide username / email to reset your password...",
      user: {
        username: "",
      },
      item: {
        subtitle: "Reset your password"
      }
    }
  },
  methods: {
    async requestReset() {
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
