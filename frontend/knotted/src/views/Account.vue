<template>
  <div class="account">
    <Header />
    <v-content>
      <v-container class="pt-0">
        <v-row>
          <v-btn height="50" block color="warning">Logout</v-btn>
        </v-row>
        <v-row>
          <v-btn height="50" block color="error">Delete Account</v-btn>
        </v-row>
      </v-container>
    </v-content>
    <BottomNavbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

export default {
  name: "Account",
  components: {
    Header,
    BottomNavbar
  }
};
</script>
