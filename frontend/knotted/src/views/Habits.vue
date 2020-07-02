<template>
  <div class="habits">
    <Header />

    <v-content>
      <CalendarBar />

      <Habit
        v-for="habit in getHabits"
        :key="habit.id"
        :name="habit.name"
        :completed="habit.completed"
        @checked="postDate(id, getDate)"
      ></Habit>
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

import Habit from "@/components/Habit.vue";

export default {
  name: "Habits",

  computed: mapGetters(["getGoals"]),
  created() {
    this.fetchHabits();
  },
  components: {
    Header,
    CalendarBar,
    BottomNavbar,
    Goal
  },
  methods: {
    ...mapActions([
      "fetchHabits",
      "createHabit",
      "deleteHabit",
      "linkGoal",
      "unlinkGoal",
      "postDate",
      "getDate"
    ])
  }
};
</script>