import Vue from "vue";
import Vuex from "vuex";
import school from "@/store/modules/school.module.js";
import team from "@/store/modules/team.module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    school,
    team,
  },
});
