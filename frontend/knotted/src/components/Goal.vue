<template>
  <v-card class="ma-4" @click="clicked()">
    <v-container>
      <v-row>
        <v-col cols="9">
          <v-card-title>{{ name }}</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-progress-circular :size="64" :value="progress()">{{completed}}/{{total}}</v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
export default {
  props: ["id", "name", "completed", "total"],
  methods: {
    progress() {
      return (this.completed / this.total) * 100;
    },
    clicked() {
      this.$emit("clicked", this.id);
    }
  }
};
</script>