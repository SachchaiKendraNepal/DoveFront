(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a1768a6"],{"0b35":function(e,t,i){"use strict";i("45c2")},"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var a in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[a]=i.directives[a]||t[a]}},"45c2":function(e,t,i){},6936:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("v-data-table",{staticClass:"elevation-1",attrs:{options:e.options,headers:e.headers,items:e.items.results,"server-items-length":e.getTotalPaginationData,"items-per-page":e.getItemsPerPageCount,loading:e.loading,"loading-text":"Loading members...","footer-props":{showFirstLastPage:!0,disableItemsPerPage:!0,itemsPerPageOptions:[1,5,10,50],itemsPerPageText:"Rows per page:",pageText:e.options.page+"-"+e.getTotalPaginationData+" of "+e.getTotalPaginationData}},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:"",color:"grey lighten-2"}},[i("v-avatar",{staticClass:"elevation-2 table-avatar",attrs:{size:"30"}},[i("v-icon",{attrs:{size:"20",color:"white"}},[e._v(" mdi-account-supervisor-circle ")])],1),i("v-toolbar-title",{directives:[{name:"show",rawName:"v-show",value:e.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}],staticClass:"table-title pl-1"},[e._v(" Sachchai Members ")]),i("v-divider",{staticClass:"mx-4 search-member",attrs:{inset:"",vertical:""}}),i("v-text-field",{staticClass:"search-member",attrs:{solo:"",dense:"","hide-details":"",label:"",name:"search","prepend-inner-icon":"mdi-magnify",clearable:"",placeholder:"Search"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),i("v-spacer"),i("v-divider",{staticClass:"mx-4 search-member",attrs:{inset:"",vertical:""}}),i("v-btn",{attrs:{dark:"",color:"primary"},on:{click:function(t){return t.stopPropagation(),e.openAddMemberFormDialog(t)}}},[i("v-icon",{attrs:{dark:""}},[e._v(" mdi-plus-circle ")])],1),i("member-form-dialog",{on:{reload:e.initialize}})],1)]},proxy:!0},{key:"item.branch",fn:function(t){var i=t.item;return[e._v(" "+e._s(e.getCurrentMemberBranchName(i))+" ")]}},{key:"item.role",fn:function(t){var i=t.item;return[e._v(" "+e._s(e.getCurrentRole(i))+" ")]}},{key:"item.is_approved",fn:function(t){var a=t.item;return[i("v-checkbox",{attrs:{color:"success",readonly:""},model:{value:a.is_approved,callback:function(t){e.$set(a,"is_approved",t)},expression:"item.is_approved"}})]}},{key:"item.created_at",fn:function(t){var i=t.item;return[e._v(" "+e._s(e.$moment(i.created_at).format("MMMM Do YYYY"))+" ")]}},{key:"item.actions",fn:function(t){var a=t.item;return[a.is_approved?i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"ma-1",attrs:{color:"error",small:""},on:{click:function(t){return t.stopPropagation(),e.revokeApprove(a)}}},[e._v(" mdi-close ")]):i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"ma-1",attrs:{color:"green",small:""},on:{click:function(t){return t.stopPropagation(),e.approve(a)}}},[e._v(" mdi-check ")]),i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"ma-1",attrs:{color:"primary",small:""},on:{click:function(t){return t.stopPropagation(),e.openEditMemberFormDialog(a)}}},[e._v(" mdi-pencil ")]),i("v-icon",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"ma-1",attrs:{color:"red",small:""},on:{click:function(t){return e.openAdminDeleteItemDialog(a.id,a.user.username)}}},[e._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[i("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}])}),i("admin-delete-item-dialog",{attrs:{"model-name":"member","delete-action":"member/delete"}})],1)},n=[],r=i("c964"),o=i("f3f3"),s=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("b0c0"),i("2f62")),c=i("b9ae"),l=i("7400"),u=i("81ab"),p={name:"MembersTable",components:{MemberFormDialog:function(){return Promise.all([i.e("chunk-2451ea70"),i.e("chunk-2d0e6c6b")]).then(i.bind(null,"b482"))}},mixins:[c["a"],u["a"],l["a"]],data:function(){return{model:"member",headers:[{text:"Actions",value:"actions",sortable:!1},{text:"Id",value:"id"},{text:"User",value:"user.username"},{text:"Branch",value:"branch"},{text:"Role",value:"role"},{text:"Approval",value:"is_approved"},{text:"Created at",value:"created_at"}],mixinData:{modelName:"member",toggleApprovalAction:"member/toggleApprovalStatus"}}},computed:Object(o["a"])({},Object(s["b"])({members:"member/list"})),methods:{getCurrentMemberBranch:function(e){return 0!==e.member_branches.length&&e.member_branches[0]},getCurrentMemberBranchName:function(e){var t=this.getCurrentMemberBranch(e);return t?t.branch.name:"None"},getCurrentRole:function(e){var t=this.getCurrentMemberBranch(e);return t?0===t["member_branch_roles"].length?"None":t["member_branch_roles"][0].role_name:"None"},initialize:function(){var e=arguments,t=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=e.length>0&&void 0!==e[0]?e[0]:null,t.loading=!0,a||(a=t.options.page),i.next=5,t.$store.dispatch("member/filter",{page:a});case 5:t.items=t.members,t.totalItems=t.members.count,t.loading=!1;case 8:case"end":return i.stop()}}),i)})))()},openAddMemberFormDialog:function(){this.$bus.emit("open-member-form-dialog-add-item")},openEditMemberFormDialog:function(e){this.$bus.emit("open-member-form-dialog-edit-item",{editedIndex:this.items.results.indexOf(e),editedItem:Object.assign({},e)})},routeToMemberDetailPage:function(e){this.$router.push({name:"MEMBER ADMINISTRATION",params:{id:e}})}}},d=p,m=(i("0b35"),i("2877")),h=i("6544"),v=i.n(h),f=i("8212"),b=i("8336"),g=i("ac7c"),k=i("8fea"),x=i("ce7e"),C=i("132d"),y=i("2fa4"),_=i("8654"),w=i("71d9"),I=i("2a7f"),V=i("269a"),A=i.n(V),M=i("5607"),S=Object(m["a"])(d,a,n,!1,null,"0ba03c9c",null);t["default"]=S.exports;v()(S,{VAvatar:f["a"],VBtn:b["a"],VCheckbox:g["a"],VDataTable:k["a"],VDivider:x["a"],VIcon:C["a"],VSpacer:y["a"],VTextField:_["a"],VToolbar:w["a"],VToolbarTitle:I["a"]}),A()(S,{Ripple:M["a"]})},"6ca7":function(e,t,i){},"81ab":function(e,t,i){"use strict";var a=i("c964"),n=(i("96cf"),i("ac1f"),i("5319"),{methods:{getCapitalizedModelName:function(){return this.model.replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}))},approve:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var a,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a="".concat(t.model,"/approve"),i.next=3,t.$store.dispatch(a,{id:e.id});case 3:if(n=i.sent,!n){i.next=11;break}return i.next=7,t.openSnack("".concat(t.getCapitalizedModelName()," approved"),"success");case 7:return i.next=9,t.initialize();case 9:i.next=13;break;case 11:return i.next=13,t.openSnack("".concat(t.getCapitalizedModelName()," approve failed. Try again."),"success");case 13:case"end":return i.stop()}}),i)})))()},revokeApprove:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var a,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a="".concat(t.model,"/disapprove"),i.next=3,t.$store.dispatch(a,{id:e.id});case 3:if(n=i.sent,!n){i.next=11;break}return i.next=7,t.openSnack("".concat(t.getCapitalizedModelName()," approve revoked"),"success");case 7:return i.next=9,t.initialize();case 9:i.next=13;break;case 11:return i.next=13,t.openSnack("".concat(t.getCapitalizedModelName()," approve revoke failed. Try again."),"success");case 13:case"end":return i.stop()}}),i)})))()}}});t["a"]=n},ac7c:function(e,t,i){"use strict";var a=i("f3f3"),n=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),o=i("fe09");t["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(n["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(a["a"])(Object(a["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},ec29:function(e,t,i){},fe09:function(e,t,i){"use strict";i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),n=i("5607"),r=i("2b0e"),o=r["default"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}}),s=i("8547"),c=i("58df");function l(e){e.preventDefault()}t["a"]=Object(c["a"])(a["a"],o,s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return e.valueComparator(i,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=a["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:l},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:l},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!e.valueComparator(i,t)})),i.length===a&&i.push(t)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(i,t)?null:t:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})}}]);
//# sourceMappingURL=chunk-8a1768a6.22077fa9.js.map