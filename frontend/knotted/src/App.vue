<template>
  <v-app>
    <v-content>
      <Knotted />
    </v-content>
  </v-app>
</template>

<script>
import Knotted from "./components/Knotted";

export default {
  name: "App",

  components: {
    Knotted,
  },

  data: () => ({
    //
  }),
};
</script>
