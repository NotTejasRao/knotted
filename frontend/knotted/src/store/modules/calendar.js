const state = {
  date: new Date(),
};

const getters = {
  getDate({ state }) {
    return state.date;
  },
};

const actions = {};

const mutations = {
  nextDate: (state) => state.date.setDate(state.date.getDate() + 1),
  previousDate: (state) => state.date.setDate(state.date.getDate() - 1),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
