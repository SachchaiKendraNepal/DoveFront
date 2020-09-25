<template>
  <v-card
    class="mx-auto"
    max-width="300"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Member
        </div>
        <v-list-item-title class="headline mb-1">
          Kiran Parajuli
        </v-list-item-title>
        <v-list-item-subtitle>Wake up. Kick Ass. Repeat!</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      />
    </v-list-item>

    <v-card-actions>
      <v-btn text>
        Button
      </v-btn>
      <v-btn text>
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
	name: "UserClipComponent"
}
</script>
