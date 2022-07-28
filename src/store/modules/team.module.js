const state = {
  roster: { isLoading: false, data: new Map(), errMsg: null },
};

const actions = {
  postTeam: ({ commit }, roster) => {
    commit("postTeam", roster);
  },
};

const mutations = {
  postTeam: (state, team) => {
    state.roster.data = new Map(
      team.map((player) => [player.JerseyNumber, player])
    );
    localStorage.setItem("team", JSON.stringify(team));
  },
};

const getters = {
  getTeam: (state) => {
    if (state.roster.data) {
      return Array.from(state.roster.data.values());
    } else {
      return localStorage.getItem("team");
    }
  },
};

export default {
  name: "team",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
