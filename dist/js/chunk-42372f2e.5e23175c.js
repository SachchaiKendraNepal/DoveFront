(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42372f2e"],{"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var n in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[n]=i.directives[n]||t[n]}},5966:function(e,t,i){"use strict";i("81f1")},"6ca7":function(e,t,i){},"81ab":function(e,t,i){"use strict";var n=i("c964"),a=(i("96cf"),i("ac1f"),i("5319"),{methods:{getCapitalizedModelName:function(){return this.mixinData["modelName"].replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}))},toggleApproval:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(t.mixinData["toggleApprovalAction"]){i.next=2;break}return i.abrupt("return");case 2:return i.next=4,t.$store.dispatch(t.mixinData["toggleApprovalAction"],{id:e.id});case 4:if(n=i.sent,!n){i.next=13;break}return a=t.mixinData["modelName"].replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))})),i.next=9,t.openSnack(a+" approval toggled.","success");case 9:return i.next=11,t.$bus.emit("reload");case 11:i.next=15;break;case 13:return i.next=15,t.openSnack(t.mixinData["modelName"]+"  approval toggle failed. Try again.");case 15:case"end":return i.stop()}}),i)})))()},approve:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n="".concat(t.mixinData["modelName"],"/approve"),i.next=3,t.$store.dispatch(n,{id:e.id});case 3:if(a=i.sent,!a){i.next=11;break}return i.next=7,t.openSnack("".concat(t.getCapitalizedModelName()," approved"),"success");case 7:return i.next=9,t.$bus.emit("reload");case 9:i.next=13;break;case 11:return i.next=13,t.openSnack("".concat(t.getCapitalizedModelName()," approve failed. Try again."),"success");case 13:case"end":return i.stop()}}),i)})))()},revokeApprove:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n="".concat(t.mixinData["modelName"],"/disapprove"),i.next=3,t.$store.dispatch(n,{id:e.id});case 3:if(a=i.sent,!a){i.next=11;break}return i.next=7,t.openSnack("".concat(t.getCapitalizedModelName()," approve revoked"),"success");case 7:return i.next=9,t.$bus.emit("reload");case 9:i.next=13;break;case 11:return i.next=13,t.openSnack("".concat(t.getCapitalizedModelName()," approve revoke failed. Try again."),"success");case 13:case"end":return i.stop()}}),i)})))()}}});t["a"]=a},"81f1":function(e,t,i){},ac7c:function(e,t,i){"use strict";var n=i("f3f3"),a=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),o=i("fe09");t["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},e96e:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-card",[i("div",{staticClass:"py-6"}),i("v-data-table",{staticClass:"elevation-1 mx-4",attrs:{options:e.options,headers:e.headers,items:e.items.results,"server-items-length":e.getTotalPaginationData,"items-per-page":e.getItemsPerPageCount,loading:e.loading,"loading-text":"Loading events...","footer-props":{showFirstLastPage:!0,disableItemsPerPage:!0,itemsPerPageOptions:[1,5,10,50],itemsPerPageText:"Rows per page:",pageText:e.options.page+"-"+e.getTotalPaginationData+" of "+e.getTotalPaginationData}},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:"",color:"grey lighten-2"}},[i("v-avatar",{staticClass:"elevation-2 table-avatar",attrs:{size:"30"}},[i("v-icon",{attrs:{size:"20",color:"white"}},[e._v(" mdi-calendar-text ")])],1),i("v-toolbar-title",{directives:[{name:"show",rawName:"v-show",value:e.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}],staticClass:"pl-1 table-title"},[e._v(" Sachchai Events ")]),i("v-divider",{staticClass:"mx-4 search-event",attrs:{inset:"",vertical:""}}),i("v-text-field",{staticClass:"search-event",attrs:{id:"events-table-search",solo:"",dense:"","hide-details":"",label:"",name:"search","prepend-inner-icon":"mdi-magnify",clearable:"",placeholder:"Search"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),i("v-spacer"),i("v-divider",{staticClass:"mx-4 search-event",attrs:{inset:"",vertical:""}}),i("v-btn",{attrs:{dark:"",color:"primary"},on:{click:function(t){return t.stopPropagation(),e.openAddEventFormDialog(t)}}},[i("v-icon",{class:e.$vuetify.breakpoint.smAndUp?"mr-2":"",attrs:{dark:""}},[e._v(" mdi-plus-circle ")]),e.$vuetify.breakpoint.smAndUp?i("span",[e._v("Event")]):e._e()],1),i("event-form-dialog")],1)]},proxy:!0},{key:"item.title",fn:function(t){var n=t.item;return[i("p",{staticClass:"event-name cursor",on:{click:function(t){return e.routeToEventDetailPage(n.id)}}},[e._v(" "+e._s(n.title)+" ")])]}},{key:"item.duration",fn:function(t){var n=t.item;return[i("v-chip",{attrs:{color:e.getDurationChipColor(n.duration)}},[e._v(" "+e._s(n.duration)+" ")])]}},{key:"item.is_main",fn:function(t){var n=t.item;return[i("v-checkbox",{attrs:{color:"primary",readonly:""},model:{value:n.is_main,callback:function(t){e.$set(n,"is_main",t)},expression:"item.is_main"}})]}},{key:"item.is_approved",fn:function(t){var n=t.item;return[i("v-checkbox",{attrs:{color:"success",readonly:""},model:{value:n.is_approved,callback:function(t){e.$set(n,"is_approved",t)},expression:"item.is_approved"}})]}},{key:"item.location",fn:function(t){var n=t.item;return[i("p",{staticClass:"mb-0 location"},[i("span",[e._v(" "+e._s(e.getWardNameOfItem(n))+", "+e._s(e.getMunicipalityOrVdcName(n))+", ")]),i("i",[e._v(e._s(n.district.name)+", "+e._s(n.province.name)+", ")]),i("b",[e._v(e._s(n.country.name))])])]}},{key:"item.start_date",fn:function(t){var i=t.item;return[e._v(" "+e._s(e.$moment(i.start_date).fromNow())+" ")]}},{key:"item.actions",fn:function(t){var n=t.item;return[i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"mr-2",attrs:{color:"success",size:"22"},on:{click:function(t){return e.toggleApproval(n)}}},[e._v(" mdi-check ")]),i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"mr-2",attrs:{color:"primary",size:"20"},on:{click:function(t){return e.openEditEventFormDialog(n)}}},[e._v(" mdi-pencil ")]),i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{color:"red",size:"20"},on:{click:function(t){return e.openAdminDeleteItemDialog(n.id,n.title)}}},[e._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[i("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}])}),i("admin-delete-item-dialog",{attrs:{"model-name":"event","delete-action":"event/delete"}}),i("div",{staticClass:"py-6"})],1)},a=[],r=i("c964"),o=i("f3f3"),s=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("b0c0"),i("2f62")),c=i("b9ae"),l=i("81ab"),u=i("7400"),p=(i("a43b"),i("3022"),{name:"EventsTableView",components:{EventFormDialog:function(){return Promise.all([i.e("chunk-5f4c070e"),i.e("chunk-2d0e6c6b")]).then(i.bind(null,"454f"))}},mixins:[c["a"],l["a"],u["a"]],data:function(){return{headers:[{text:"ACTIONS",value:"actions",sortable:!1},{text:"TITLE",value:"title"},{text:"Organizer",value:"branch.name"},{text:"MAIN",value:"is_main"},{text:"APPROVED",value:"is_approved"},{text:"LOCATION",value:"location"},{text:"VENUE",value:"venue"},{text:"START DATE",value:"start_date"},{text:"DURATION (days)",value:"duration"}],mixinData:{modelName:"Event",toggleApprovalAction:"event/toggleApproval"}}},computed:Object(o["a"])({},Object(s["b"])({events:"event/list"})),methods:{getDurationChipColor:function(e){var t=e%5;switch(t){case 1:return"red lighten-3";case 2:return"indigo lighten-3";case 3:return"purple lighten-3";case 4:return"teal lighten-3";case 5:return"orange lighten-3";default:return"blue lighten-3"}},getMunicipalityOrVdcName:function(e){return null!==e.vdc?e.vdc.name:e.municipality.name},getWardNameOfItem:function(e){if(e.vdc_ward){if(e.vdc_ward["name"])return e.vdc_ward["name"]}else if(e.municipality_ward&&e.municipality_ward["name"])return e.municipality_ward["name"]},initialize:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.loading=!0,e||(e=1),i.next=4,t.$store.dispatch("event/filter",{page:e});case 4:t.items=t.events,t.totalItems=t.events.count,t.loading=!1;case 7:case"end":return i.stop()}}),i)})))()},openAddEventFormDialog:function(){this.$bus.emit("open-event-form-dialog-add-item")},openEditEventFormDialog:function(e){this.$bus.emit("open-event-form-dialog-edit-item",{editedIndex:this.events.results.indexOf(e),editedItem:Object.assign({},e)})},routeToEventDetailPage:function(e){this.$router.push({name:"EVENT ADMINISTRATION",params:{id:e}})}}}),d=p,v=(i("5966"),i("2877")),m=i("6544"),h=i.n(m),f=i("8212"),g=i("8336"),b=i("b0af"),x=i("ac7c"),k=i("cc20"),y=i("8fea"),C=i("ce7e"),_=i("132d"),w=i("2fa4"),A=i("8654"),V=i("71d9"),I=i("2a7f"),D=i("269a"),O=i.n(D),S=i("5607"),T=Object(v["a"])(d,n,a,!1,null,"509891d8",null);t["default"]=T.exports;h()(T,{VAvatar:f["a"],VBtn:g["a"],VCard:b["a"],VCheckbox:x["a"],VChip:k["a"],VDataTable:y["a"],VDivider:C["a"],VIcon:_["a"],VSpacer:w["a"],VTextField:A["a"],VToolbar:V["a"],VToolbarTitle:I["b"]}),O()(T,{Ripple:S["a"]})},ec29:function(e,t,i){},fe09:function(e,t,i){"use strict";i("d3b7"),i("25f0"),i("4de4");var n=i("c37a"),a=i("5607"),r=i("2b0e"),o=r["default"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}}),s=i("8547"),c=i("58df");function l(e){e.preventDefault()}t["a"]=Object(c["a"])(n["a"],o,s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return e.valueComparator(i,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=n["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:l},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:l},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!e.valueComparator(i,t)})),i.length===n&&i.push(t)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(i,t)?null:t:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})}}]);
//# sourceMappingURL=chunk-42372f2e.5e23175c.js.map