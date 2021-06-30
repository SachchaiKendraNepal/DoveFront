(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a05e51e","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b"],{1062:function(e,t,r){"use strict";r("eee1")},3408:function(e,t,r){},"4bd4":function(e,t,r){"use strict";var i=r("f3f3"),n=(r("caad"),r("2532"),r("07ac"),r("4de4"),r("159b"),r("7db0"),r("58df")),a=r("7e2b"),o=r("3206");t["a"]=Object(n["a"])(a["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,r=function(e){return e.$watch("hasError",(function(r){t.$set(t.errorBag,e._uid,r)}),{immediate:!0})},i={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(e._uid)||(i.valid=r(e)))})):i.valid=r(e),i},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var r=this.watchers.find((function(e){return e._uid===t._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},8212:function(e,t,r){"use strict";var i=r("f3f3"),n=(r("a9e3"),r("3408"),r("a9ad")),a=r("24b2"),o=r("a236"),s=r("80d2"),l=r("58df");t["a"]=Object(l["a"])(n["a"],a["a"],o["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes:function(){return Object(i["a"])({"v-avatar--left":this.left,"v-avatar--right":this.right},this.roundedClasses)},styles:function(){return Object(i["a"])({height:Object(s["g"])(this.size),minWidth:Object(s["g"])(this.size),width:Object(s["g"])(this.size)},this.measurableStyles)}},render:function(e){var t={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return e("div",this.setBackgroundColor(this.color,t),this.$slots.default)}})},"8ce9":function(e,t,r){},"935e":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("auth-component",{attrs:{"top-image":e.registerPage.image,"page-avatar":e.registerPage.avatar,title:e.registerPage.title,subtitle:e.registerPage.subtitle,"menu-title":"Already a follower","menu-items":e.items},scopedSlots:e._u([{key:"form",fn:function(){return[r("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-row",{staticClass:"ma-0 pa-0 px-6 px-sm-16 px-md-16 px-lg-16 px-xs-16",attrs:{justify:"center",align:"center"}},[r("v-col",{staticClass:"py-0",attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[r("v-text-field",{attrs:{dense:"",label:"First name",required:"",outlined:"",clearable:"","prepend-inner-icon":"mdi-form-textbox"},model:{value:e.follower.first_name,callback:function(t){e.$set(e.follower,"first_name",t)},expression:"follower.first_name"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[r("v-text-field",{attrs:{dense:"",label:"Last name",required:"",outlined:"",clearable:"","prepend-inner-icon":"mdi-form-textbox"},model:{value:e.follower.last_name,callback:function(t){e.$set(e.follower,"last_name",t)},expression:"follower.last_name"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[r("v-text-field",{attrs:{dense:"",autocomplete:"username",label:"Username",required:"",outlined:"",clearable:"","prepend-inner-icon":"mdi-account-circle","error-messages":e.registerFormErrors.username},model:{value:e.follower.username,callback:function(t){e.$set(e.follower,"username",t)},expression:"follower.username"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[r("v-text-field",{attrs:{dense:"",label:"Contact Number",required:"",outlined:"",clearable:"","prepend-inner-icon":"mdi-phone",type:"number","error-messages":e.registerFormErrors.contact},model:{value:e.follower.contact,callback:function(t){e.$set(e.follower,"contact",t)},expression:"follower.contact"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("v-text-field",{attrs:{dense:"",label:"Email Address",type:"email",required:"",outlined:"",clearable:"","prepend-inner-icon":"mdi-email","error-messages":e.registerFormErrors.email},model:{value:e.follower.email,callback:function(t){e.$set(e.follower,"email",t)},expression:"follower.email"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("v-text-field",{attrs:{dense:"",label:"New password",required:"",type:"password",outlined:"",clearable:"",autocomplete:"new-password","prepend-inner-icon":"mdi-lock","error-messages":e.registerFormErrors.password},model:{value:e.follower.password,callback:function(t){e.$set(e.follower,"password",t)},expression:"follower.password"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("v-text-field",{attrs:{dense:"",label:"Confirm password",required:"",type:"password",outlined:"",clearable:"",autocomplete:"confirm-password","prepend-inner-icon":"mdi-lock-open-check","error-messages":e.registerFormErrors.confirm_password},model:{value:e.follower.confirm_password,callback:function(t){e.$set(e.follower,"confirm_password",t)},expression:"follower.confirm_password"}})],1),r("v-col",{staticClass:"py-0",attrs:{id:"country-input-column",cols:"12"}},[r("v-autocomplete",{staticClass:"ma-0",attrs:{id:"event-country",loading:e.loadingCountries,"allow-overflow":"",dense:"","item-text":"name","item-value":"id",items:e.countries,attach:"",outlined:"",label:"Country",clearable:"","prepend-inner-icon":"mdi-web","error-messages":e.registerFormErrors.country},scopedSlots:e._u([{key:"no-data",fn:function(){return[r("v-list-item",[r("v-list-item-title",[e._v(" No "),r("code",[e._v("country")]),e._v(" found. ")])],1)]},proxy:!0}]),model:{value:e.follower.country,callback:function(t){e.$set(e.follower,"country",t)},expression:"follower.country"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("v-autocomplete",{staticClass:"ma-0",attrs:{id:"event-province",loading:e.loadingProvinces,"allow-overflow":"",dense:"",outlined:"",attach:"",label:"Province","item-text":"name","item-value":"id",items:e.provinces,clearable:"","prepend-inner-icon":"mdi-office-building-marker-outline","error-messages":e.registerFormErrors.province},scopedSlots:e._u([{key:"no-data",fn:function(){return[r("v-list-item",[r("v-list-item-title",[e._v(" No "),r("code",[e._v("provinces")]),e._v(" found. ")])],1)]},proxy:!0}]),model:{value:e.follower.province,callback:function(t){e.$set(e.follower,"province",t)},expression:"follower.province"}})],1),r("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[r("v-autocomplete",{staticClass:"ma-0",attrs:{id:"event-districts",loading:e.loadingDistricts,"item-text":"name","item-value":"id","allow-overflow":"",dense:"",outlined:"",attach:"",items:e.districts,label:"District",clearable:"","prepend-inner-icon":"mdi-map-marker-multiple-outline","error-messages":e.registerFormErrors.district},scopedSlots:e._u([{key:"no-data",fn:function(){return[r("v-list-item",[r("v-list-item-title",[e._v(" No "),r("code",[e._v("district")]),e._v(" found. ")])],1)]},proxy:!0}]),model:{value:e.follower.district,callback:function(t){e.$set(e.follower,"district",t)},expression:"follower.district"}})],1)],1),r("v-card-actions",{staticClass:"d-flex justify-center"},[r("v-btn",{staticClass:"px-xl-12 px-lg-8 px-md-6 px-sm-2 px-xs-0",attrs:{loading:e.loading,dark:"",depressed:"",large:"",color:"primary"},on:{click:function(t){return e.registerFollower()}}},[e._v(" REGISTER ")])],1),r("v-divider",{staticClass:"mx-4"}),r("v-card-text",[r("div",{attrs:{id:"register-terms"}},[e._v(" By clicking "),r("code",[e._v("Register")]),e._v(", you agree to our "),r("code",[e._v("Terms")]),e._v(", "),r("code",[e._v("Data Policy")]),e._v(" and "),r("code",[e._v("Cookies Policy")]),e._v(". You may receive "),r("i",[e._v("Email Notifications")]),e._v(" from us and can opt out any time. ")])])],1)]},proxy:!0}])})},n=[],a=r("c964"),o=r("f3f3"),s=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("2f62")),l={components:{AuthComponent:function(){return r.e("chunk-5c31bdb3").then(r.bind(null,"6f14"))}},data:function(){return{loadingCountries:!1,loadingProvinces:!1,loadingDistricts:!1,loading:!1,valid:!1,registerPage:{image:r("e821"),avatar:r("df43"),title:"Become a follower",subtitle:"Let's begin an amazing journey with <b>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</b>."},items:[{icon:"mdi-login-variant",title:"Sign in",to:"/auth/login"},{icon:"mdi-lock-question",title:"Forget password?",to:"/auth/reset-password"}],follower:{first_name:null,last_name:null,username:null,email:null,contact:null,password:null,confirm_password:null,birth_date:null,current_city:null,home_town:null,country:null,province:null,district:null}}},computed:Object(o["a"])({},Object(s["b"])({registerFormErrors:"user/registerFormErrors",countries:"location/countriesList",provinces:"location/provincesList",districts:"location/districtsList"})),created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.initCountries();case 2:return t.next=4,e.initProvinces();case 4:return t.next=6,e.initDistricts();case 6:return t.next=8,e.$store.dispatch("user/clearRegisterFormErrors");case 8:case"end":return t.stop()}}),t)})))()},methods:{initCountries:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadingCountries=!0,t.next=3,e.$store.dispatch("location/fetchAllCountries");case 3:e.loadingCountries=!1;case 4:case"end":return t.stop()}}),t)})))()},initProvinces:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadingProvinces=!0,t.next=3,e.$store.dispatch("location/fetchAllProvinces");case 3:e.loadingProvinces=!1;case 4:case"end":return t.stop()}}),t)})))()},initDistricts:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadingDistricts=!0,t.next=3,e.$store.dispatch("location/fetchAllDistricts");case 3:e.loadingDistricts=!1;case 4:case"end":return t.stop()}}),t)})))()},registerFollower:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.dispatch("user/registerFollower",{body:e.follower});case 3:if(r=t.sent,e.loading=!1,!r){t.next=8;break}return t.next=8,e.$router.push({name:"LOG IN"});case 8:case"end":return t.stop()}}),t)})))()}}},c=l,u=(r("1062"),r("2877")),d=r("6544"),m=r.n(d),f=r("c6a6"),p=r("8336"),v=r("99d9"),h=r("62ad"),g=r("ce7e"),w=r("4bd4"),b=r("da13"),x=r("5d23"),_=r("0fd9"),y=r("8654"),k=Object(u["a"])(c,i,n,!1,null,"c5d743e4",null);t["default"]=k.exports;m()(k,{VAutocomplete:f["a"],VBtn:p["a"],VCardActions:v["a"],VCardText:v["c"],VCol:h["a"],VDivider:g["a"],VForm:w["a"],VListItem:b["a"],VListItemTitle:x["c"],VRow:_["a"],VTextField:y["a"]})},"99d9":function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return l}));var i=r("b0af"),n=r("80d2"),a=Object(n["i"])("v-card__actions"),o=Object(n["i"])("v-card__subtitle"),s=Object(n["i"])("v-card__text"),l=Object(n["i"])("v-card__title");i["a"]},ce7e:function(e,t,r){"use strict";var i=r("f3f3"),n=(r("8ce9"),r("7560"));t["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(e){var t;return this.$attrs.role&&"separator"!==this.$attrs.role||(t=this.vertical?"vertical":"horizontal"),e("hr",{class:Object(i["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(i["a"])({role:"separator","aria-orientation":t},this.$attrs),on:this.$listeners})}})},df43:function(e,t,r){e.exports=r.p+"img/dove-solid.9acaeb86.svg"},e821:function(e,t,r){e.exports=r.p+"img/inaguration.043067ab.jpg"},eee1:function(e,t,r){}}]);
//# sourceMappingURL=chunk-8a05e51e.614c5e18.js.map