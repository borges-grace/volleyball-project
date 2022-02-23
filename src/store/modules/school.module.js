// export the mutations
export let [POST_SCHOOL] = ["postSchool"];

const state = {
  school: { isLoading: false, data: {}, errMsg: null },
};

const actions = {
  postSchool: ({ commit }, school) => {
    // will implement api calls when I build the back end
    commit(POST_SCHOOL, school);
  },
};

const mutations = {
  [POST_SCHOOL]: (state, school) => {
    school.Acronym = helpers.findAcronym(school);
    school.MascotPlural = helpers.makeMascotPlural(school.Mascot);
    school.MascotSingular = helpers.makeMascotSingular(school.Mascot);
    state.data = { ...school };
    localStorage.setItem("school", JSON.stringify(school));
  },
};

const getters = {
  getSchool: (state) => {
    if (state.data) {
      return state.data;
    } else {
      let school = localStorage.getItem("school");
      return JSON.parse(school);
    }
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

  makeMascotPlural: (mascot) => {
    if (mascot.endsWith("s")) {
      return mascot;
    } else {
      return mascot + "s";
    }
  },

  makeMascotSingular: (mascot) => {
    if (mascot.endsWith("s")) {
      return mascot.substring(0, mascot.length - 1);
    } else {
      return mascot + "s";
    }
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
