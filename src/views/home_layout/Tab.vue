<template>
  <v-tabs
      v-model="tab"
      background-color="blue lighten-5"
      color="darkblue"
      icons-and-text
      centered
      center-active
      show-arrows
      slider-size="4"
  >
    <v-tab
        v-for="item in items"
        :key="item.name"
        :to="item.to"
    >
      {{ item.name }}
      <v-icon>{{item.icon}}</v-icon>
    </v-tab>
  </v-tabs>
</template>
<style lang="sass">
a[role="tab"]
  font-size: 12px
  font-weight: bold
</style>
<script>
export default {
  name: "HomeTabComponent",
  data () {
    return {
      tab: null,
      items: [
        {name: 'Home', icon: "mdi-home", to: "/"},
        {name: 'Branches', icon: "mdi-home-group", to: "/branch"},
        {name: 'Members', icon: "mdi-account-group", to: "/member"},
        {name: 'Articles', icon: "mdi-post", to: "/article"},
        {name: 'Multimedia', icon: "mdi-video-vintage", to: "/multimedia"},
      ],
    }
  },
}
</script>
