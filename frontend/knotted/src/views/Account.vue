<template>
  <div class="account">
    <Header />
    <v-btn block color="warning">Logout</v-btn>
    <v-btn block color="error">Delete Account</v-btn>
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
    BottomNavbar,
  },
};
</script>
