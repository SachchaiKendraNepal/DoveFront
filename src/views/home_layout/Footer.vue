<template>
  <v-footer
      dark
      padless
      fixed
      elevation="3"
  >
    <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center gradient"
    >
      <v-card-text>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut
        risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
        Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices,
        cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Kiran Parajuli</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style lang="sass">
  .gradient
    background: rgb(27,3,250)
    background: linear-gradient(202deg, rgba(27,3,250,0.8407738095238095) 0%, rgba(10,163,231,1) 100%)
</style>

<script>
export default {
  name: "HomeFooter",
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
