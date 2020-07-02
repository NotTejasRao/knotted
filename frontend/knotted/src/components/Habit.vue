<template>
  <v-card class="ma-4" to="habits">
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-card-title>{{ name }}</v-card-title>
        </v-col>
        <v-col cols="2">
          <v-checkbox v-model="completed" @mousedown="checked"></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["id", "name", "completed"],
  methods: {
    checked() {
      this.$emit("checked", this.id);
    }
  }
};
</script>
