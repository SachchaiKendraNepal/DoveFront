<template>
  <v-card id="sacchai-tab-card">
    <v-tabs
        id="sacchai-tab"
        v-model="tab"
        color="#9e9e9e"
        centered
        center-active
        icons-and-text
        show-arrows
        height="60px"
        background-color="rgb(177 222 243)"
    >
      <v-tabs-slider/>

      <v-tab
          href="#tab-0"
          to="/"
      >
        Home
        <v-icon>mdi-home</v-icon>
      </v-tab>

      <v-tab
          href="#tab-1"
          to="/branch"
      >
        Branches
        <v-icon>mdi-home-group</v-icon>
      </v-tab>

      <v-tab
          href="#tab-2"
          to="/member"
      >
        Members
        <v-icon>mdi-account-group</v-icon>
      </v-tab>

      <v-tab
          href="#tab-3"
          to="/article"
      >
        Articles
        <v-icon>mdi-post</v-icon>
      </v-tab>
      <v-tab
          href="#tab-4"
          to="/multimedia"
      >
        Multimedia
        <v-icon>mdi-video-vintage</v-icon>
      </v-tab>
    </v-tabs>

    <div id="sacchai-home-container">
      <v-row>
        <v-col
        sm="3"
        md="4"
        lg="4"
        xl="4"
        >
          <div class="float-lg-right float-md-right">
            <user-clip/>
          </div>
        </v-col>
        <v-col
          sm="6"
          md="4"
          lg="4"
          xl="4"
        >
          <router-view/>
        </v-col>
        <v-col
          sm="3"
          md="4"
          lg="4"
          xl="4"
        >
          <div class="float-lg-left float-md-left">
            <user-clip/>
          </div>
        </v-col>
      </v-row>
    </div>

  </v-card>
</template>

<style lang="sass">
a[role='tab']
  font-size: 11px
  font-weight: bold
#sacchai-home-container
  padding-right: 10px
  padding-left: 10px

.v-tab--active
  color: #194dd2 !important

#sacchai-tab
  position: -webkit-sticky
  position: sticky
  top: 59px
  z-index: 2
</style>

<script>
export default {
  name: "TabComponent",
  components: {
    UserClip: () => import("@/views/home_layout/UserClip")
  }
}
</script>
