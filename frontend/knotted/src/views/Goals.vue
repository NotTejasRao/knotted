<template>
  <div class="goals">
    <Header />

    <v-content>
      <CalendarBar />

      <Goal
        v-for="goal in goals"
        :key="goal.id"
        :name="goal.name"
        :completed="goal.completed"
        :total="goal.total"
        @clicked="goalClicked(id)"
      ></Goal>
    </v-content>

    <v-btn color="indigo" bottom right fixed dark fab class="mb-12">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <BottomNavbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CalendarBar from "@/components/CalendarBar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

import Goal from "@/components/Goal.vue";

export default {
  name: "Goals",
  components: {
    Header,
    CalendarBar,
    BottomNavbar,
    Goal
  },
  data() {
    return {
      goals: []
    };
  },
  methods: {
    goalClicked(id) {
      // open habits list
    }
  }
};
</script>
