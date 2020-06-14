<template>
  <div class="bottom-navbar">
    <v-bottom-navigation app v-model="bottomNav">
      <v-btn to="goals" value="goals">
        <span>Goals</span>
        <v-icon>mdi-biathlon</v-icon>
      </v-btn>

      <v-btn to="habits" value="habits">
        <span>Habits</span>
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>

      <v-btn to="account" value="account">
        <span>Account</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "recent",
    };
  },
};
</script>

<style scoped></style>
