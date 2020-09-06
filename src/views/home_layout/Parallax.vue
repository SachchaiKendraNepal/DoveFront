<template>
<!--  <v-parallax-->
<!--      id="banner"-->
<!--  >-->
    <div id="banner">
      <v-img
          eager
          id="sacchai-flex-image"
          alt="Sacchai Flex Display"
          :src="image"
          :contain="true"
          height="400px"
      />
    </div>
<!--  </v-parallax>-->
</template>

<style lang="sass">
//#sacchai-flex-image
  //top: 60px
  height: 300px
  //width:

#banner
  background-color: #abd7f1
  //background-size: 700px 200px !important
  //background: url('../../assets/10x3-ft-Sachai-Banner.jpg') no-repeat fixed center
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
