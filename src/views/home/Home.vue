<template>
  <div
    id="sacchai-home-container"
    class="px-2"
  >
    <v-row justify="center">
      <v-col
        class="mb-0 pb-0"
        v-show="$route.name === 'SACHCHAI NEPAL'"
        sm="3"
        md="3"
        lg="4"
        xl="4"
      >
        <div class="float-lg-right float-md-right">
          <user-clip />
        </div>
      </v-col>
      <v-col
        class="mb-0 pb-0"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <add-post-box />
        <article-post />
        <article-post />
        <multimedia />
        <multimedia />
      </v-col>
      <v-col
        class="mb-0 pb-0"
        v-show="$route.name === 'SACHCHAI NEPAL'"
        sm="3"
        md="3"
        lg="4"
        xl="4"
      >
        <div class="float-lg-left float-md-left">
          <user-clip />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
	name: "HomeComponent",
	components: {
		ArticlePost: () => import("@/views/home/article/Article"),
		Multimedia: () => import("@/views/home/multimedia/Multimedia"),
		AddPostBox: () => import("@/views/home_layout/AddPostBox"),
		UserClip: () => import("@/views/home_layout/UserClip")
	},
	data: () => ({
		loading: false
	})
}
</script>
