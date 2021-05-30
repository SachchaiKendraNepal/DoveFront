import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@fortawesome/fontawesome-free/css/all.css"
import api from "@/handler/axios"
import APlayer from "vue-aplayer"
import "leaflet/dist/leaflet.css"
import $ from "jquery"
import "swiper/swiper-bundle.css"
import VueBus from "vue-bus"
import moment from "moment"
import helper from "@/Helper"
import "video.js/dist/video-js.css"


Vue.use(VueBus)
Vue.use(moment)
Vue.component(APlayer)
Vue.component("AdminTextField", () =>
	import("@/components/_admin_text_field")
);
Vue.component("AdminCountryAutocompleteField", () =>
	import("@/components/_admin_country_autocomplete_field")
);
Vue.component("AdminProvinceAutocompleteField", () =>
	import("@/components/_admin_province_autocomplete_field")
);



Vue.prototype.$api = api
Vue.prototype.$jq = $
Vue.prototype.$moment = moment
Vue.prototype.$helper = helper

Vue.config.productionTip = false

new Vue({
	$,
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app")
