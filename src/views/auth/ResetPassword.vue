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
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </template>
  </base-auth-card>
</template>
<script>
export default {
  name: "ResetPasswordComponent",
  components: {
    BaseAuthCard: () => import("@/views/auth/_auth")
  },
  data() {
    return {
      subtitle: "Provide username / email to reset your password...",
      user: {
        username: "",
      }
    }
  },
  methods: {
    async requestReset() {
      try {
        this.overlay = true
        await this.$router.replace("login");
      } finally {
        this.overlay = false;
      }
    }
  }
}
</script>
