// export the mutations
export let [POST_ROSTER] = ["putRoster"];

const state = {
  roster: { isLoading: false, data: new Map(), errMsg: null },
};

const actions = {
  postRoster: ({ commit }, roster) => {
    // will implement api calls when I build the back end
    commit(POST_ROSTER, roster);
  },
};

const mutations = {
  [POST_ROSTER]: (state, roster) => {
    state.roster.data = new Map(
      roster.map((athlete) => [athlete.JerseyNumber, athlete])
    );
  },
};

const helpers = {
  sortByLastName(a, b) {
    if (a.LastName.toLowerCase() < b.LastName.toLowerCase()) {
      return -1;
    } else if (a.LastName.toLowerCase() > b.LastName.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  },
};

const getters = {
  getRoster: (state) => {
    return Array.from(state.roster.data.values()).sort(helpers.sortByLastName);
  },
};

export default {
  name: "roster",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
