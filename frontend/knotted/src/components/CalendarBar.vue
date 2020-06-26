<template>
  <v-toolbar dense short color="#2B2D42" dark>
    <v-btn icon @click.native="previousDate()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <v-toolbar-title>{{ getDate().toLocaleDateString() }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click.native="nextDate()">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["getDate"]),
  methods: mapActions(["nextDate", "previousDate"])
};
</script>

<style scoped></style>
