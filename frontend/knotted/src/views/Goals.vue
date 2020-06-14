<template>
  <div class="goals">
    <Header />

    <BottomNavbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

export default {
  name: "Goals",
  components: {
    Header,
    BottomNavbar,
  },
};
</script>
