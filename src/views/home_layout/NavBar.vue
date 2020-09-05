<template>
  <div>
    <v-app-bar
        fixed
        dense
        dark
        color="#1976d27a"
        elevation="3"
        height="60"
    >
      <v-app-bar-nav-icon class="nav-icon"/>
      <v-toolbar-title v-text="$route.name"/>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu
          left
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<style lang="sass">
.v-toolbar__content
  padding: 4px 10px !important
.v-icon.notranslate.fas.fa-bars.theme--dark
  font-size: 18px
.v-toolbar__title
  font-family: 'Acme', sans-serif
  padding: 0 !important
  margin: 0 !important
  padding-top: 1px !important
  font-size: 20px
</style>

<script>
export default {
  name: "HomeNavBar",
  data(){
    return {
      image: require("@/assets/10x3-ft-Sachai-Banner.jpg")
    }
  }
}
</script>
