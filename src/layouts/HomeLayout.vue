<template>
  <div id="home-layout" class="d-flex flex-column">
    <home-header/>
    <home-parallax/>
    <home-tabs/>
    <home-footer/>
  </div>
</template>

<script>
export default {
  name: "SacchaiHomeLayout",
  components: {
    HomeHeader: () => import("@/views/home_layout/NavBar"),
    HomeParallax: () => import("@/views/home_layout/Parallax"),
    HomeTabs: () => import("@/views/home_layout/Tabs"),
    HomeFooter: () => import("@/views/home_layout/Footer")
  },
}
</script>

<style lang="sass">
#home-layout
  height: 100%
</style>
