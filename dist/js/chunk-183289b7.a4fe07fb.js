(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-183289b7"],{"0ccb2":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header-toolbar"),t.isApprovedMember?i("v-list",{attrs:{"two-line":""}},[0===t.currentUser["member"]["member_branches"].length?i("v-card",[i("v-list-item",[i("v-list-item-content",[i("v-chip",{staticClass:"d-flex justify-center"},[t._v(" You are not connected to any "),i("strong",{staticClass:"px-1"},[t._v("Branch")]),t._v(" yet. Please contact "),i("strong",{staticClass:"px-1"},[t._v("Kendra Administrators")]),t._v(" for a branch membership. ")])],1)],1)],1):t._l(t.currentUser["member"]["member_branches"],(function(e,a){return i("v-list-item-group",{key:a},[i("v-chip",{staticClass:"ma-2",attrs:{label:"",color:"indigo lighten-4"}},[t._v(" Branch ("+t._s(a+1)+") "),i("span",[i("v-icon",{attrs:{right:""}},[t._v("mdi-chevron-right")])],1)]),i("v-divider",{staticClass:"mx-2"}),i("v-list-item-group",[i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"indigo"}},[t._v(" mdi-city ")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(t._s(e["branch"]["name"]))]),i("v-list-item-subtitle",[t._v(t._s("Branch".toUpperCase()))])],1)],1),i("v-divider",{attrs:{inset:""}}),i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"indigo"}},[t._v(" mdi-calendar-start ")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" "+t._s(t.$moment(e["date_of_membership"]).format("Do MMM YYYY"))+" ")]),i("v-list-item-subtitle",[t._v(t._s("Date of membership".toUpperCase()))])],1)],1),i("v-divider",{attrs:{inset:""}})],1),i("v-list-item-group",[0===e["member_branch_roles"].length?i("v-list-item",[i("v-list-item-content",[i("v-chip",[t._v(" No any "),i("strong",{staticClass:"px-1"},[t._v("Roles")]),t._v(" assigned yet for this "),i("strong",{staticClass:"px-1"},[t._v("Branch")]),t._v(". Please contact "),i("strong",{staticClass:"px-1"},[t._v("Kendra Administrators")]),t._v(" for Branch Role assignment. ")])],1)],1):t._l(e["member_branch_roles"],(function(e,a){return i("v-list-item",{key:parseInt(e)},[i("v-list-item-group",[i("v-chip",{staticClass:"ma-2",attrs:{label:"",color:"teal lighten-4"}},[t._v(" Role ("+t._s(a+1)+") "),i("span",[i("v-icon",{attrs:{right:""}},[t._v("mdi-chevron-right")])],1)]),i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"teal"}},[t._v(" mdi-key ")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" "+t._s(e.role_name)+" ")]),i("v-list-item-subtitle",[t._v(" "+t._s("Role Name".toUpperCase())+" ")])],1)],1),i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"teal"}},[t._v(" mdi-calendar-start ")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" "+t._s(t.$moment(e.from_date).format("Do MMM YYYY"))+" ")]),i("v-list-item-subtitle",[t._v(" FROM DATE ")])],1)],1),i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"teal"}},[t._v(" mdi-calendar-end ")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" "+t._s(t.$moment(e.to_date).format("Do MMM YYYY"))+" ")]),i("v-list-item-subtitle",[t._v(" "+t._s("To Date".toUpperCase())+" ")])],1)],1)],1)],1)}))],2)],1)}))],2):t.isMember?i("v-card",{staticClass:"ma-2 pa-4 d-flex justify-center"},[i("v-chip",[t._v("You approval status is under review. You can see your branch information after approval.")])],1):i("v-card",{staticClass:"ma-2 pa-4 d-flex justify-center"},[i("v-chip",[t._v("Not a member yet. Please contact sachchai leaders or administration for a membership.")])],1)],1)},s=[],r=i("6a9b"),o={name:"MyBranchInfo",components:{HeaderToolbar:r["a"]},data:function(){return{actionItems:[{icon:"mdi-pencil",text:"Edit",color:"primary"},{icon:"mdi-delete",text:"Reset",color:"red"}]}},computed:{currentUser:function(){return this.$helper.getCurrentUser()},isMember:function(){return null!==this.currentUser.member},isApprovedMember:function(){return!!this.currentUser.member&&this.currentUser.member.is_approved}},methods:{getValue:function(t){return t||"Not Set"}}},n=o,l=i("2877"),c=i("6544"),v=i.n(c),m=i("b0af"),u=i("cc20"),h=i("ce7e"),d=i("132d"),p=i("8860"),b=i("da13"),f=i("5d23"),_=i("1baa"),g=i("34c3"),C=Object(l["a"])(n,a,s,!1,null,"dec891fe",null);e["default"]=C.exports;v()(C,{VCard:m["a"],VChip:u["a"],VDivider:h["a"],VIcon:d["a"],VList:p["a"],VListItem:b["a"],VListItemContent:f["a"],VListItemGroup:_["a"],VListItemIcon:g["a"],VListItemSubtitle:f["b"],VListItemTitle:f["c"]})},"1d40":function(t,e,i){"use strict";i("88dd")},"2a7f":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var a=i("71d9"),s=i("80d2"),r=Object(s["i"])("v-toolbar__title"),o=Object(s["i"])("v-toolbar__items");a["a"]},"6a9b":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-toolbar",{staticClass:"mx-auto",staticStyle:{"border-radius":"4px"},attrs:{"max-width":"1000",color:"transparent",height:"55"}},[i("v-app-bar-nav-icon",[i("v-avatar",{staticClass:"elevation-4",attrs:{size:"36",color:"grey lighten-2"}},[i("v-icon",{attrs:{color:"primary"}},[t._v(" mdi-bird ")])],1)],1),i("v-toolbar-title",{staticClass:"toolbar-title"},[t._v(" "+t._s(t.$route.name)+" ")]),i("v-spacer")],1)},s=[],r={name:"HeaderToolbar"},o=r,n=(i("1d40"),i("2877")),l=i("6544"),c=i.n(l),v=i("5bc1"),m=i("8212"),u=i("132d"),h=i("2fa4"),d=i("71d9"),p=i("2a7f"),b=Object(n["a"])(o,a,s,!1,null,"5671d4ca",null);e["a"]=b.exports;c()(b,{VAppBarNavIcon:v["a"],VAvatar:m["a"],VIcon:u["a"],VSpacer:h["a"],VToolbar:d["a"],VToolbarTitle:p["a"]})},"88dd":function(t,e,i){},"8adc":function(t,e,i){},cc20:function(t,e,i){"use strict";var a=i("d0af"),s=i("f3f3"),r=(i("4de4"),i("8adc"),i("58df")),o=i("0789"),n=i("9d26"),l=i("a9ad"),c=i("4e82"),v=i("7560"),m=i("f2e7"),u=i("1c87"),h=i("af2b"),d=i("d9bd");e["a"]=Object(r["a"])(l["a"],h["a"],u["a"],v["a"],Object(c["a"])("chipGroup"),Object(m["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({"v-chip":!0},u["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(u["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var i=Object(a["a"])(e,2),s=i[0],r=i[1];t.$attrs.hasOwnProperty(s)&&Object(d["a"])(s,r,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(n["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(o["b"],t)},genClose:function(){var t=this;return this.$createElement(n["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],i=this.generateRouteLink(),a=i.tag,r=i.data;r.attrs=Object(s["a"])(Object(s["a"])({},r.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:r.attrs.tabindex}),r.directives.push({name:"show",value:this.active}),r=this.setBackgroundColor(this.color,r);var o=this.textColor||this.outlined&&this.color;return t(a,this.setTextColor(o,r),e)}})}}]);
//# sourceMappingURL=chunk-183289b7.a4fe07fb.js.map