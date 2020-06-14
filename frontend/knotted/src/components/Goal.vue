<template>
  <v-card class="ma-4" to="habits">
    <v-container>
      <v-row>
        <v-col cols="9">
          <v-card-title>Morning Routine</v-card-title>
        </v-col>
        <v-col cols="3">
          <v-progress-circular :size="64" :value="40">1/30</v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
export default {};
</script>