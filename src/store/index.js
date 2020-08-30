import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "prod";

export default new Vuex.Store({
    modules: {
      // Add modules here
    },
    strict: debug
})
