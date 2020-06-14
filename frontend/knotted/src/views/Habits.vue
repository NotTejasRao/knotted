<template>
  <div class="habits">
    <Header />
    <BottomNavbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

export default {
  name: "Habits",
  components: {
    Header,
    BottomNavbar,
  },
};
</script>
