<template>
  <v-card
      class="mx-auto"
      max-width="300"
      outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-chip
            color="blue lighten-1"
            text-color="white"
            small

        >
          <v-avatar left>
            <v-icon>mdi-account-group</v-icon>
          </v-avatar>
          <span class="text-uppercase"><b>member</b></span>
        </v-chip>
        <v-list-item-title class="headline mb-1">Kiran Parajuli</v-list-item-title>
        <v-list-item-subtitle>Wake up. Kick Ass. Repeat!</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          size="80"
      >
        <v-img src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"/>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text color="primary">Button</v-btn>
      <v-btn text color="red">Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserClipComponent"
}
</script>
