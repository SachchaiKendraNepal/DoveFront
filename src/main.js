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
Vue.component("TextField", () =>
	import("@/components/_text_field")
);
Vue.component("CountryField", () =>
	import("@/components/_country_field")
);
Vue.component("ProvinceField", () =>
	import("@/components/_province_field")
);
Vue.component("DistrictField", () =>
	import("@/components/_district_field")
);
Vue.component("MunicipalityField", () =>
	import("@/components/_municipality_field")
);
Vue.component("MunicipalityWardField", () =>
	import("@/components/_municipality_ward_field")
);
Vue.component("VdcField", () =>
	import("@/components/_vdc_field")
);
Vue.component("VdcWardField", () =>
	import("@/components/_vdc_ward_field")
);
Vue.component("TextArea", () =>
	import("@/components/_text_area_field")
);
Vue.component("BranchField", () =>
	import("@/components/_branch_field")
);
Vue.component("SelectField", () =>
	import("@/components/_select_field")
);
Vue.component("DatePickerField", () =>
	import("@/components/_date_picker")
);
Vue.component("AdminFormGroupTitle", () =>
	import("@/components/_admin_form_group_title")
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
