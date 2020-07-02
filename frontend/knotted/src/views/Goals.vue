<template>
  <div class="goals">
    <Header />

    <v-content>
      <CalendarBar />

      <Goal
        v-for="goal in getGoals"
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
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header.vue";
import CalendarBar from "@/components/CalendarBar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

import Goal from "@/components/Goal.vue";

export default {
  name: "Goals",
  computed: mapGetters(["getGoals"]),
  created() {
    this.fetchGoals();
  },
  components: {
    Header,
    CalendarBar,
    BottomNavbar,
    Goal
  },
  methods: {
    ...mapActions([
      "fetchGoals",
      "createGoal",
      "deleteGoal",
      "linkHabit",
      "unlinkHabit"
    ]),
    goalClicked(id) {
      // open habits list
      console.log(id);
    }
  }
};
</script>
