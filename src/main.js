import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@fortawesome/fontawesome-free/css/all.css"
import api from "@/handler/axios"
import vuePlayer from "@algoz098/vue-player"
import APlayer from "vue-aplayer"
import "leaflet/dist/leaflet.css"
import $ from "jquery"
import "swiper/swiper-bundle.css"
import VueBus from "vue-bus"

Vue.use(VueBus)
Vue.component(vuePlayer)
Vue.component(APlayer)

Vue.prototype.$api = api
Vue.prototype.$jq = $

Vue.config.productionTip = false

new Vue({
	$,
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app")
