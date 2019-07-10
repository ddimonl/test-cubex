import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import transact from "./transact.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        transact
    }
});