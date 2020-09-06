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
  </v-card>
</template>
<style lang="sass" scoped>
.display-1
  font-family: 'Crimson Text', serif !important
  font-size: 35px !important
  font-weight: 500 !important
  color: #261e1e
</style>
<script>
export default {
  name: "AuthComponent",
  data() {
    return {
      overlay: false,
      banner: require("@/assets/10x3-ft-Sachai-Banner.jpg")
    }
  }
}
</script>
