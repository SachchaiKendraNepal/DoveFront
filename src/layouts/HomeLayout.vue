<template>
  <div id="home-layout" class="d-flex flex-column">
    <home-header/>
    <div class="container">
      <router-view/>
    </div>
    <home-footer/>
  </div>
</template>

<script>
export default {
  name: "SacchaiHomeLayout",
  components: {
    HomeHeader: () => import("@/views/home_layout/NavBar"),
    HomeFooter: () => import("@/views/home_layout/Footer")
  },
}
</script>

<style lang="sass">
#home-layout
  height: 100%
</style>
