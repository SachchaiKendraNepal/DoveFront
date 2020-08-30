<template>
  <div>
    <v-app-bar
        class="nav-background"
        dense
        dark
        elevation="3"
        height="55px"
    >
      <v-app-bar-nav-icon/>
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
  .nav-background
    background: rgb(0,0,0)
    background: linear-gradient(202deg, rgba(0,0,0,1) 38%, rgba(39,10,231,1) 100%)
</style>

<script>
export default {
  name: "HomeNavBar"
}
</script>
