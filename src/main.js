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
	import("@/components/form/_text_field")
);
Vue.component("CountryField", () =>
	import("@/components/form/_country_field")
);
Vue.component("ProvinceField", () =>
	import("@/components/form/_province_field")
);
Vue.component("DistrictField", () =>
	import("@/components/form/_district_field")
);
Vue.component("MunicipalityField", () =>
	import("@/components/form/_municipality_field")
);
Vue.component("MunicipalityWardField", () =>
	import("@/components/form/_municipality_ward_field")
);
Vue.component("VdcField", () =>
	import("@/components/form/_vdc_field")
);
Vue.component("VdcWardField", () =>
	import("@/components/form/_vdc_ward_field")
);
Vue.component("TextArea", () =>
	import("@/components/form/_text_area_field")
);
Vue.component("BranchField", () =>
	import("@/components/form/_branch_field")
);
Vue.component("FollowerField", () =>
	import("@/components/form/_follower_field")
);
Vue.component("SelectField", () =>
	import("@/components/form/_select_field")
);
Vue.component("DatePickerField", () =>
	import("@/components/form/_date_picker")
);
Vue.component("AdminFormGroupTitle", () =>
	import("@/components/adminForm/_admin_form_group_title")
);
Vue.component("FileField", () =>
	import("@/components/form/__file_field")
);
Vue.component("AdminDeleteItemDialog", () =>
	import("@/components/adminForm/_admin_table_delete_item_dialog")
);
Vue.component("CheckboxField", () =>
	import("@/components/form/_checkbox_field")
);
Vue.component("AdminFormDetailItem", () =>
	import("@/components/adminForm/_admin_form_detail_item")
);
Vue.component("NotFound", () =>
	import("@/components/404NotFound")
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
