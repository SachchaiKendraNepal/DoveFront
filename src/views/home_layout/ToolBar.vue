<template>
  <v-toolbar
    color="blue lighten-5"
  >
    <v-avatar>
      <v-img
          :src="logo"
          alt="SacchaiLogo"
      />
    </v-avatar>
    <v-toolbar-title class="text-uppercase">Sacchai Nepal</v-toolbar-title>
    <v-spacer/>
    <v-text-field
        hide-details
        append-icon="search"
        placeholder="Search Members, Branch, Articles, Multimedia..."
        solo
    ></v-text-field>
    <v-spacer/>
    <profile-dropdown/>
  </v-toolbar>
</template>
<style lang="sass">
.v-toolbar__title
  padding-left: 8px
  font-family: 'Fira Sans Condensed', sans-serif
  font-size: 22px
</style>
<script>
import ProfileDropdown from "@/views/home_layout/ProfileDropdown";

export default {
  name: "TopNavToolBarComponent",
  components: {
    ProfileDropdown
  },
  data(){
    return {
      logo: require("@/assets/sacchai_logo.jpg"),
    }
  }
}
</script>
