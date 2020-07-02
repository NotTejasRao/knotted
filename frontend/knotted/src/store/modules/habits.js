import axios from "axios";

const state = {
  habits: [],
};

const getters = {
  getHabits({ state }) {
    datedHabits: [];
    state.habits.forEach((habit) => {
      datedHabit = {};
      datedHabit.id = habit.id;
      datedHabit.name = habit.name;
      datedHabit.completed = habit.dates.some(
        (habitDate) => habitDate === rootState.calendar.date
      );
      datedHabits.push(datedHabit);
    });
    return datedHabits;
  },
  getCompletedHabits() {
    return this.getHabits(date).filter((habit) =>
      habit.dates.some((completedDate) => completedDate === date)
    );
  },
};

const actions = {
  async fetchHabits({ commit }) {
    const response = await axios.get("https://localhost:5000/habits");
    commit("setHabits", response.data);
  },
  async createHabit(name) {
    const response = await axios.post("https://localhost:5000/habits", {
      name: name,
    });

    this.fetchHabits();
  },
  async deleteHabit(id) {
    await axios.delete(`https://localhost:5000/habits/${id}`);

    this.fetchHabits();
  },
  async postDate(id, date) {
    const response = await axios.post(
      `hhttps://localhost:5000/habits/${id}/dates`,
      {
        date: JSON.stringify(date),
      }
    );

    this.fetchHabits();
  },
  async linkGoal(id, goalID) {
    const response = await axios.post(
      `hhttps://localhost:5000/habits/${id}/goals`,
      {
        goal_id: goalID,
      }
    );

    this.fetchHabits();
  },
  async unlinkGoal(id, goalID) {
    const response = await axios.delete(
      `hhttps://localhost:5000/habits/${id}/goals`,
      {
        goal_id: goalID,
      }
    );

    this.fetchHabits();
  },
};

const mutations = {
  setHabits: (state, habits) => (state.habits = habits),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
