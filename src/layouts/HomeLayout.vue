<template>
  <div id="home-layout" class="d-flex flex-column">
    <home-header/>
    <home-footer/>
  </div>
</template>

<script>
export default {
  name: "SacchaiHomeLayout",
  components: {
    // HomeParallax: () => import("@/views/home_layout/Parallax"),
    HomeHeader: () => import("@/views/home_layout/HomeHeader"),
    HomeFooter: () => import("@/views/home_layout/Footer")
  },
}
</script>

<style lang="sass">
#home-layout
  height: 100%
</style>
