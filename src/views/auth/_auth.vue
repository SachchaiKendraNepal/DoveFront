<template>
  <v-card
      class="mx-auto"
      max-width="470"
  >
    <v-img
        class="white--text align-end"
        height="140"
        :src="banner"
    />
    <v-card-title class="display-1 justify-center text-uppercase">Sacchai Kendra Nepal</v-card-title>
    <slot name="authForm"/>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>
<style lang="sass" scoped>
.display-1
  font-family: 'Crimson Text', serif !important
  font-size: 35px !important
  font-weight: 500 !important
  color: #261e1e
#forget-password
  font-size: 14px
  color: #E91E63
  font-weight: 500
</style>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      overlay: false,
      user: {
        username: "",
        password: ""
      },
      banner: require("@/assets/10x3-ft-Sachai-Banner.jpg")
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
};
</script>
