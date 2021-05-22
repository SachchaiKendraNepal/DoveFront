import Vue from "vue"
import Vuex from "vuex"
import user from "@/store/modules/user"
import event from "@/store/modules/event"
import location from "@/store/modules/location"
import branch from "@/store/modules/branch"
import article from "@/store/modules/article"
import multimedia from "@/store/modules/multimedia"
import snack from "@/store/modules/snack"
import post from "@/store/modules/post"
import profile from "@/store/modules/profile"
import auth from "@/store/modules/auth"
import member from "@/store/modules/member"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "prod"

export default new Vuex.Store({
	modules: {
		user,
		profile,
		auth,
		event,
		location,
		branch,
		article,
		multimedia,
		snack,
		post,
		member,
	},
	strict: debug
})
