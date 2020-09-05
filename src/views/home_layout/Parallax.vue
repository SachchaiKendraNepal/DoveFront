<template>
  <v-img
      eager
      id="sacchai-flex-image"
      alt="Sacchai Flex Display"
      :src="image"
      :contain="true"
  />
</template>

<style lang="sass">
#sacchai-flex-image
  top: 60px
</style>

<script>
export default {
  name: "HomeParallax",
  data(){
    return {
      image: require("@/assets/10x3-ft-Sachai-Banner.jpg")
    }
  }
}
</script>
