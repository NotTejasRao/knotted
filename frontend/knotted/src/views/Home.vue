<template>
  <div class="home">
    <Header />

    <v-container class="grey lighten-5">
      <v-row no-gutters style="height: 150px;">
        <v-col v-for="align in alignments" :key="align" :align-self="align">
          <v-card class="pa-2" outlined tile>One of three columns</v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  },
  passwordErrors: ["Error"],
  valid: false,
  email: "",
  password: ""
};
</script>
