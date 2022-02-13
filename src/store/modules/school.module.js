// export the mutations
export let [PUT_SCHOOL] = ["putSchool"];

const state = {
  school: { isLoading: false, data: {}, errMsg: null },
};

const actions = {
  putSchool: ({ commit }, school) => {
    commit(PUT_SCHOOL, school);
  },
};

const mutations = {
  [PUT_SCHOOL](state, school) {
    school.Acronym = helpers.findAcronym(school);
    state.data = { ...school };
  },
};

const getters = {
  getSchool: (state) => {
    return state.data;
  },
};

const helpers = {
  /**
   * Will find the acronym of the school name and
   * make sure it is all uppercase
   * @param {Object} school
   * @returns {String}
   */
  findAcronym: (school) => {
    let acronym = "";
    let words = school.Name.split(" ");
    words.forEach((word) => {
      acronym = acronym + word[0];
    });
    acronym = acronym.toUpperCase();
    return acronym;
  },
};

export default {
  name: "school",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
