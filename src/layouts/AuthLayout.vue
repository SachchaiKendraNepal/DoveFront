<template>
  <v-row align="center" justify="center" class="mx-1">
    <v-col>
      <router-view/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'KhelKudDashboardLayout',
  components: {
    // maybe appbar
  },
  data: () => ({
    expandOnHover: false,
  }),
}
</script>
