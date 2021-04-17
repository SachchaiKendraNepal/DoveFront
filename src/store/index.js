import Vue from "vue"
import Vuex from "vuex"
import user from "@/store/modules/user"
import event from "@/store/modules/event"
import location from "@/store/modules/location"
import branch from "@/store/modules/branch"
import article from "@/store/modules/article"
import multimedia from "@/store/modules/multimedia"
import snack from "@/store/modules/snack"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "prod"

export default new Vuex.Store({
	modules: {
		user,
		event,
		location,
		branch,
		article,
		multimedia,
		snack
	},
	strict: debug
})
