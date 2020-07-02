import axios from "axios";

const state = {
  goals: [],
};

const getters = {
  getGoals({ state, rootState }) {
    datedGoals: [];
    state.goals.forEach((goal) => {
      datedGoal = {};
      datedGoal.id = goal.id;
      datedGoal.name = goal.name;
      allCompletedHabits = rootState.habits.getCompletedHabits();
      relatedHabits = rootState.habits.getHabits(goal.id);
      allCompletedHabits.filter((habit) => relatedHabits.includes(habit));
      datedGoal.completed = relatedHabits.length;
      datedGoal.total = goal.habits.length;
      datedGoals.push(datedGoal);
    });
    return datedGoals;
  },
};

const actions = {
  async fetchGoals({ commit }) {
    const response = await axios.get("https://localhost:5000/goals");
    commit("setGoals", response.data);
  },
  async createGoal(name) {
    const response = await axios.post("https://localhost:5000/goals", {
      name: name,
    });

    this.fetchGoals();
  },
  async deleteGoal(id) {
    await axios.delete(`https://localhost:5000/goals/${id}`);

    this.fetchHabits();
  },
  async linkHabit(id, habitID) {
    const response = await axios.post(
      `hhttps://localhost:5000/goals/${id}/habits`,
      {
        habit_id: habitID,
      }
    );

    this.fetchHabits();
  },
  async unlinkHabit(id, habitID) {
    const response = await axios.delete(
      `hhttps://localhost:5000/goals/${id}/habits`,
      {
        habit_id: habitID,
      }
    );

    this.fetchHabits();
  },
};

const mutations = {
  setGoals: (state, goals) => (state.goals = goals),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
