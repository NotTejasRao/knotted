<template>
  <div class="habits">
    <v-content>
      <Header />

      <Habit
        v-for="habit in habits"
        :key="habit.id"
        :name="habit.name"
        :completed="habit.completed"
        @clicked="habitClicked(id)"
      ></Habit>
    </v-content>

    <v-btn color="indigo" bottom right fixed dark fab class="mb-12">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <BottomNavbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";

import Habit from "@/components/Habit.vue";

export default {
  name: "Habits",
  components: {
    Header,
    BottomNavbar,
    Habit
  },
  data() {
    return {
      habits: []
    };
  },
  methods: {
    habitClicked(id) {
      // open goal list
    }
  }
};
</script>
