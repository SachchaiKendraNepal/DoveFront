(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3819bd17","chunk-2d0e1fc0","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b"],{"1cff":function(t,e,n){},"3a2f":function(t,e,n){"use strict";var a=n("fc11"),i=(n("a9e3"),n("9734"),n("4ad4")),r=n("a9ad"),s=n("16b7"),o=n("b848"),c=n("75eb"),l=n("f573"),u=n("f2e7"),d=n("80d2"),v=n("d9bd"),p=n("58df");e["a"]=Object(p["a"])(r["a"],s["a"],o["a"],c["a"],l["a"],u["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,n=t.content,a=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||a?r=i+e.width/2-n.width/2:(this.left||this.right)&&(r=i+(this.right?e.width:-n.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,n=t.content,a=!1!==this.attach?e.offsetTop:e.top,i=0;return this.top||this.bottom?i=a+(this.bottom?e.height:-n.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=a+e.height/2-n.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(i+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(d["g"])(this.maxWidth),minWidth:Object(d["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(d["t"])(this,"activator",!0)&&Object(v["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=i["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===d["y"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(a["a"])(t,this.contentClass,!0),Object(a["a"])(t,"menuable__content__active",this.isActive),Object(a["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"4bab":function(t,e,n){},"4c1b":function(t,e,n){"use strict";n("be74")},"5ef0":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.event?n("div",{attrs:{id:"event-detail-container"}},[n("v-row",{staticClass:"ma-0 pa-0",attrs:{id:"event-top-row"}},[n("banner-column",{attrs:{event:t.event},on:{"refresh-event":t.init}}),n("date-column",{attrs:{event:t.event}}),n("top-info-column",{attrs:{event:t.event}}),n("actions",{attrs:{event:t.event}}),n("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[n("v-divider",{staticClass:"mx-auto"})],1),n("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[n("v-toolbar",{staticClass:"mx-auto",attrs:{"max-width":"1000",color:"transparent",rounded:""}},[t.$vuetify.breakpoint.smAndUp?n("v-avatar",{staticClass:"detail-toolbar-avatar",attrs:{color:"primary",size:"42"}},[n("v-icon",{attrs:{color:"white",size:"24"}},[t._v(" mdi-calendar-clock ")])],1):t._e(),n("v-spacer"),n("v-tabs",{attrs:{"background-color":"transparent",centered:"","icons-and-text":"","slider-size":"3","slider-color":"primary","show-arrows":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.eventTabItems,(function(e,a){return n("v-tab",{key:a,attrs:{to:e.to}},[n("span",[t._v(t._s(e.title))]),t.$vuetify.breakpoint.smAndUp?n("v-icon",[t._v(" "+t._s(e.icon)+" ")]):t._e()],1)})),1),n("v-spacer")],1)],1),n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"mx-auto",attrs:{"max-width":"1000",color:"transparent"}},[n("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("router-view")],1)],1)],1)],1)],1):t._e()},i=[],r=n("c964"),s=n("f3f3"),o=(n("96cf"),n("2f62")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{staticClass:"pa-0",attrs:{id:"cover-column",cols:"12"}},[a("v-fade-transition",[t.banners?a("v-img",{staticClass:"mx-auto event-banner",attrs:{src:t.banners["image"],height:"60vh","max-width":"1000"}},[t.$helper.ifWriterIsCurrentUser(t.event["created_by"]["username"])?a("div",{staticClass:"banner-action"},[a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ma-2",attrs:{fab:"","x-small":"",dark:""},on:{click:function(e){return t.deleteBannerImage(t.banners[0]["id"])}}},"v-btn",i,!1),n),[a("v-icon",{attrs:{color:"red lighten-1"}},[t._v(" mdi-delete ")])],1)]}}],null,!1,957951631)},[a("span",[t._v("Remove banner")])])],1):t._e()]):a("div",[t.bannerImageToUpload?a("v-img",{staticClass:"mx-auto event-banner",attrs:{id:"event-banner-to-upload",src:t.bannerImageUrl,height:"60vh","max-width":"1000"}},[a("div",{staticClass:"d-flex align-center justify-space-between"},[a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ma-2",attrs:{fab:"","x-small":"",dark:""},on:{click:function(e){return e.stopPropagation(),t.cancelBannerUpdate(e)}}},"v-btn",i,!1),n),[a("v-icon",{attrs:{color:"red lighten-1"}},[t._v(" mdi-close ")])],1)]}}],null,!1,962873593)},[a("span",[t._v("Cancel")])]),a("v-tooltip",{attrs:{left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ma-2",attrs:{fab:"","x-small":"",dark:""},on:{click:function(e){return e.stopPropagation(),t.uploadBanner(e)}}},"v-btn",i,!1),n),[a("v-icon",{attrs:{color:"green lighten-1"}},[t._v(" mdi-check-circle ")])],1)]}}],null,!1,546219594)},[a("span",[t._v("Set Banner")])])],1)]):a("v-img",{staticClass:"mx-auto event-banner cursor",attrs:{src:n("f451"),height:"60vh","max-width":"1000"},on:{click:function(e){return t.$refs.bannerInput.click()}}},[a("div",{staticClass:"fill-height d-flex justify-center align-center white--text"},[a("h2",{staticClass:"text-center"},[t._v(" Set banner image for your event! ")])])]),a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"bannerInput",staticClass:"file-input",attrs:{id:"banner-input",type:"file",accept:"image/*"},on:{change:t.bannerImageInputChanged}})],1)],1)],1)},l=[],u=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("25f0"),n("7d85")),d={name:"BannerColumn",mixins:[u["a"]],props:{event:{type:Object,required:!0}},emits:["refresh-event"],data:function(){return{bannerImageToUpload:null,imageURLs:[],bannerImageUrl:null}},computed:{banners:function(){return this.event["banner_images"]}},methods:{cancelBannerUpdate:function(){this.bannerImageToUpload=null},bannerImageInputChanged:function(t){if("banner-input"===t.target.getAttribute("id")){this.bannerImageToUpload=t.target.files[0];var e=window.URL||window.webkitURL;this.bannerImageUrl=e.createObjectURL(t.target.files[0])}},uploadBanner:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.$helper.getFormData({event:t.event.id,image:t.bannerImageToUpload}),e.prev=1,e.next=4,t.$api.post("/event-banner/",n);case 4:return e.next=6,t.$emit("refresh-event");case 6:return e.next=8,t.openSnack("Event banner added successfully.","success");case 8:e.next=20;break;case 10:if(e.prev=10,e.t0=e["catch"](1),400!==parseInt(e.t0.response.status.toString())){e.next=18;break}if(!e.t0.response.data["image"]){e.next=16;break}return e.next=16,t.openSnack(e.t0.response.data["image"][0]);case 16:e.next=20;break;case 18:return e.next=20,t.openSnack("Event banner upload failed. Please try again.");case 20:case"end":return e.stop()}}),e,null,[[1,10]])})))()},deleteBannerImage:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$api.delete("/event-banner/"+t+"/");case 3:return n.next=5,e.openSnack("Event banner removed.","success");case 5:return n.next=7,e.$emit("refresh-event");case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n["catch"](0),n.next=13,e.openSnack("Event banner remove failed.");case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()}}},v=d,p=(n("ae11"),n("2877")),h=n("6544"),m=n.n(h),f=n("8336"),b=n("62ad"),g=n("0789"),x=n("132d"),k=n("adda"),_=n("3a2f"),C=Object(p["a"])(v,c,l,!1,null,"786261cd",null),w=C.exports;m()(C,{VBtn:f["a"],VCol:b["a"],VFadeTransition:g["d"],VIcon:x["a"],VImg:k["a"],VTooltip:_["a"]});var y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-col",{staticClass:"pa-0",attrs:{id:"date-row",cols:"12"}},[n("v-card",{staticClass:"mx-auto",attrs:{id:"date-peek-box",width:"100",height:"100"}},[n("v-card",{attrs:{color:"red",height:"25"}},[n("v-card-text",{staticClass:"date-month"},[t._v(" "+t._s(t.$moment(t.event["start_date"]).format("MMM"))+" ")])],1),n("v-card-text",{staticClass:"text-center display-3 pa-0 pt-1 text--darken-3 blue--text"},[n("b",[t._v(t._s(t.$moment(t.event["start_date"]).format("DD")))])])],1)],1)},$=[],I={name:"DateColumn",props:{event:{type:Object,required:!0}}},O=I,A=n("b0af"),j=n("99d9"),S=Object(p["a"])(O,y,$,!1,null,"4cc0495a",null),V=S.exports;m()(S,{VCard:A["a"],VCardText:j["c"],VCol:b["a"]});var L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"mx-auto",attrs:{loading:t.loading,"max-width":"1000",flat:"",color:"transparent"}},[n("v-card-title",{staticClass:"event-title"},[t._v(" "+t._s(t.event.title)+" "),n("span",[n("v-card-actions",[t.event.is_main?n("v-chip",{staticClass:"mr-2 mb-1",attrs:{label:"",dark:"",color:"blue"}},[n("v-icon",{attrs:{left:""}},[t._v(" mdi-map-marker-star ")]),n("b",{directives:[{name:"show",rawName:"v-show",value:t.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}]},[t._v("Main Event")]),n("v-icon",{attrs:{right:""}},[t._v(" mdi-church ")])],1):t._e(),"General Meeting"===t.event.type?n("v-chip",{staticClass:"mb-1",attrs:{label:"",dark:"",color:"green lighten-1"}},[n("v-icon",{attrs:{left:"",color:"white"}},[t._v(" mdi-clipboard-account ")]),n("b",{directives:[{name:"show",rawName:"v-show",value:t.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}]},[t._v("General Meeting")]),n("v-icon",{attrs:{right:""}},[t._v(" mdi-city ")])],1):t._e(),"Board Meeting"===t.event.type?n("v-chip",{staticClass:"mb-1",attrs:{label:"",dark:"",color:"indigo lighten-1"}},[n("v-icon",{attrs:{left:"",color:"white"}},[t._v(" mdi-clock-time-eleven ")]),n("b",{directives:[{name:"show",rawName:"v-show",value:t.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}]},[t._v("Board Meeting")]),n("v-icon",{attrs:{right:""}},[t._v(" mdi-city ")])],1):t._e(),"Satsang"===t.event.type?n("v-chip",{staticClass:"mb-1",attrs:{label:"",dark:""}},[n("v-icon",{attrs:{left:"",color:"white"}},[t._v(" mdi-dove ")]),n("b",{directives:[{name:"show",rawName:"v-show",value:t.$vuetify.breakpoint.smAndUp,expression:"$vuetify.breakpoint.smAndUp"}]},[t._v("Satsang")]),n("v-icon",{attrs:{right:""}},[t._v(" mdi-city ")])],1):t._e()],1)],1)]),t.event.description?n("v-card-subtitle",{staticClass:"event-description"},[t._v(" "+t._s(t.event.description)+" ")]):t._e(),n("v-card-subtitle",{staticClass:"event-subtitle"},[t._v(" "+t._s(t.$moment(t.event.start_date).format("MMMM Do YYYY"))+" ● "+t._s(t.event.timeOfDay)+" ● "+t._s(t.event.duration)+" days ● "+t._s(t.event.venue)+" ")])],1)],1)},U=[],T={name:"TopInfoColumn",props:{event:{type:Object,required:!0}},data:function(){return{loading:!0}}},B=T,R=n("cc20"),D=Object(p["a"])(B,L,U,!1,null,"6ce10fce",null),E=D.exports;m()(D,{VCard:A["a"],VCardActions:j["a"],VCardSubtitle:j["b"],VCardTitle:j["d"],VChip:R["a"],VCol:b["a"],VIcon:x["a"]});var M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"mx-auto",attrs:{flat:"","max-width":"1000",color:"transparent"}},[n("v-card-actions",{staticClass:"event-detail-actions"},[n("v-btn",{attrs:{loading:t.interestedLoading,depressed:t.$vuetify.breakpoint.mdAndUp,icon:!t.$vuetify.breakpoint.mdAndUp},on:{click:t.toggleInterestedStatus}},[n("v-icon",{staticClass:"px-1",attrs:{small:"",color:"purple"}},[t._v(" mdi-star-circle ")]),t.$vuetify.breakpoint.mdAndUp?n("span",[t.statistics["interested"]?n("span",{staticClass:"button-span red--text text--lighten-1"},[t._v(" Remove Interest ")]):n("span",{staticClass:"purple--text button-span"},[t._v(" Add Interest ")])]):t._e()],1),t.event.is_approved?n("v-btn",{attrs:{loading:t.approvalLoading,depressed:t.$vuetify.breakpoint.mdAndUp,icon:!t.$vuetify.breakpoint.mdAndUp},on:{click:t.revokeApproval}},[n("v-icon",{staticClass:"px-1",attrs:{color:"error",small:""}},[t._v(" mdi-check-circle ")]),t.$vuetify.breakpoint.mdAndUp?n("span",{staticClass:"red--text text--lighten-1 button-span"},[t._v("Dis-approve")]):t._e()],1):n("v-btn",{attrs:{loading:t.approvalLoading,icon:!t.$vuetify.breakpoint.mdAndUp,depressed:t.$vuetify.breakpoint.mdAndUp},on:{click:t.approve}},[n("v-icon",{staticClass:"px-1",attrs:{color:"green",small:""}},[t._v(" mdi-check-circle ")]),t.$vuetify.breakpoint.mdAndUp?n("span",{staticClass:"green--text text-darken-2 button-span"},[t._v("Approve")]):t._e()],1),n("v-btn",{attrs:{loading:t.goingLoading,icon:!t.$vuetify.breakpoint.mdAndUp,depressed:t.$vuetify.breakpoint.mdAndUp},on:{click:t.toggleGoingStatus}},[n("v-icon",{attrs:{color:"indigo",small:""}},[t._v(" mdi-walk ")]),t.$vuetify.breakpoint.mdAndUp?n("span",[t.statistics["going"]?n("span",{staticClass:"button-span red--text text--lighten-1"},[t._v(" Not Going ")]):n("span",{staticClass:"indigo--text button-span"},[t._v(" I Am Going ")])]):t._e()],1),n("v-spacer"),n("v-menu",{attrs:{"close-on-click":"","offset-y":"","nudge-bottom":"5",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[n("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",i,!1),a),[n("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[n("v-list",{attrs:{dense:"",color:"#ef93b3"}},t._l(t.menuItems,(function(e,a){return n("v-list-item-group",{key:e.icon},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[t._v(" "+t._s(e.text)+" ")])],1)],1),a!==t.menuItems.length-1?n("v-divider",{staticClass:"mx-1"}):t._e()],1)})),1)],1)],1)],1)],1)},G=[],z={name:"Actions",mixins:[u["a"]],props:{event:{type:Object,required:!0}},data:function(){return{interestedLoading:!1,goingLoading:!1,approvalLoading:!1}},computed:Object(s["a"])(Object(s["a"])({},Object(o["b"])({statistics:"event/statisticsDetail"})),{},{menuItems:function(){return[{icon:"mdi-pencil",text:"Edit"},{icon:"mdi-delete",text:"Delete"}]}}),methods:{toggleInterestedStatus:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.interestedLoading=!0,e.next=3,t.$store.dispatch("event/toggleInterestedStatus",{id:t.event.id});case 3:if(n=e.sent,!n){e.next=9;break}return e.next=7,t.$store.dispatch("event/fetchStatistics",{id:t.$route.params.id});case 7:e.next=11;break;case 9:return e.next=11,t.openSnack("Added interest to event failed.");case 11:t.interestedLoading=!1;case 12:case"end":return e.stop()}}),e)})))()},toggleGoingStatus:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.goingLoading=!0,e.next=3,t.$store.dispatch("event/toggleGoingStatus",{id:t.event.id});case 3:if(n=e.sent,!n){e.next=9;break}return e.next=7,t.$store.dispatch("event/fetchStatistics",{id:t.$route.params.id});case 7:e.next=11;break;case 9:return e.next=11,t.openSnack("Added interest to event failed.");case 11:t.goingLoading=!1;case 12:case"end":return e.stop()}}),e)})))()},approve:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.approvalLoading=!0,e.next=3,t.$store.dispatch("event/approve",{id:t.event.id});case 3:if(n=e.sent,!n){e.next=9;break}return e.next=7,t.$store.dispatch("event/fetchSingle",{id:t.$route.params.id});case 7:e.next=11;break;case 9:return e.next=11,t.openSnack("Event approval failed.");case 11:t.approvalLoading=!1;case 12:case"end":return e.stop()}}),e)})))()},revokeApproval:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.approvalLoading=!0,e.next=3,t.$store.dispatch("event/disapprove",{id:t.event.id});case 3:if(n=e.sent,!n){e.next=9;break}return e.next=7,t.$store.dispatch("event/fetchSingle",{id:t.$route.params.id});case 7:e.next=11;break;case 9:return e.next=11,t.openSnack("Event approval revoke failed.");case 11:t.approvalLoading=!1;case 12:case"end":return e.stop()}}),e)})))()}}},N=z,F=(n("fe4c"),n("ce7e")),Y=n("8860"),W=n("da13"),q=n("5d23"),P=n("1baa"),J=n("34c3"),X=n("e449"),H=n("2fa4"),Z=Object(p["a"])(N,M,G,!1,null,"df0e339e",null),K=Z.exports;m()(Z,{VBtn:f["a"],VCard:A["a"],VCardActions:j["a"],VCol:b["a"],VDivider:F["a"],VIcon:x["a"],VList:Y["a"],VListItem:W["a"],VListItemContent:q["a"],VListItemGroup:P["a"],VListItemIcon:J["a"],VListItemTitle:q["c"],VMenu:X["a"],VSpacer:H["a"]});var Q={name:"EventDetailView",components:{Actions:K,TopInfoColumn:E,DateColumn:V,BannerColumn:w},data:function(){return{loading:!0,tab:null}},computed:Object(s["a"])(Object(s["a"])({},Object(o["b"])({event:"event/detail",comments:"event/commentsList"})),{},{eventTabItems:function(){return this.$route&&this.$route.params&&this.$route.params.id?[{title:"about",icon:"mdi-information-variant",to:"/home/event/".concat(this.$route.params.id,"/about")},{title:"discussion",icon:"mdi-account-multiple",to:"/home/event/".concat(this.$route.params.id,"/discussion")},{title:"photos",icon:"mdi-image",to:"/home/event/".concat(this.$route.params.id,"/images")},{title:"multimedia",icon:"mdi-video-vintage",to:"/home/event/".concat(this.$route.params.id,"/multimedias")}]:[]}}),created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$bus.on("reload",Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.init();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),e.next=3,t.init();case 3:case"end":return e.stop()}}),e)})))()},beforeUnmount:function(){this.$bus.off("reload")},methods:{init:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.loading=!0,!t.$route.params){e.next=10;break}return n=t.$route.params.id,e.next=5,t.$store.dispatch("event/fetchSingle",{id:n});case 5:return e.next=7,t.$store.dispatch("event/fetchStatistics",{id:n});case 7:return e.next=9,t.$store.dispatch("event/fetchCommentsFor",{id:n});case 9:t.loading=!1;case 10:case"end":return e.stop()}}),e)})))()}}},tt=Q,et=(n("e22c"),n("4c1b"),n("8212")),nt=n("0fd9"),at=n("71a3"),it=n("fe57"),rt=n("aac8"),st=n("71d9"),ot=Object(p["a"])(tt,a,i,!1,null,null,null);e["default"]=ot.exports;m()(ot,{VAvatar:et["a"],VCard:A["a"],VCol:b["a"],VDivider:F["a"],VIcon:x["a"],VRow:nt["a"],VSpacer:H["a"],VTab:at["a"],VTabs:it["a"],VTabsItems:rt["a"],VToolbar:st["a"]})},"7d85":function(t,e,n){"use strict";var a=n("c964"),i=(n("96cf"),{methods:{openSnack:function(t){var e=arguments,n=this;return Object(a["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:"error",a.next=3,n.$store.dispatch("snack/setSnackState",!0);case 3:return a.next=5,n.$store.dispatch("snack/setSnackColor",i);case 5:return a.next=7,n.$store.dispatch("snack/setSnackText",t);case 7:case"end":return a.stop()}}),a)})))()}}});e["a"]=i},"8adc":function(t,e,n){},9734:function(t,e,n){},"99d9":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return c}));var a=n("b0af"),i=n("80d2"),r=Object(i["i"])("v-card__actions"),s=Object(i["i"])("v-card__subtitle"),o=Object(i["i"])("v-card__text"),c=Object(i["i"])("v-card__title");a["a"]},ae11:function(t,e,n){"use strict";n("4bab")},be74:function(t,e,n){},cc20:function(t,e,n){"use strict";var a=n("d0af"),i=n("f3f3"),r=(n("4de4"),n("8adc"),n("58df")),s=n("0789"),o=n("9d26"),c=n("a9ad"),l=n("4e82"),u=n("7560"),d=n("f2e7"),v=n("1c87"),p=n("af2b"),h=n("d9bd");e["a"]=Object(r["a"])(c["a"],p["a"],v["a"],u["a"],Object(l["a"])("chipGroup"),Object(d["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])(Object(i["a"])(Object(i["a"])({"v-chip":!0},v["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(v["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var n=Object(a["a"])(e,2),i=n[0],r=n[1];t.$attrs.hasOwnProperty(i)&&Object(h["a"])(i,r,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(o["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(s["b"],t)},genClose:function(){var t=this;return this.$createElement(o["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],n=this.generateRouteLink(),a=n.tag,r=n.data;r.attrs=Object(i["a"])(Object(i["a"])({},r.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:r.attrs.tabindex}),r.directives.push({name:"show",value:this.active}),r=this.setBackgroundColor(this.color,r);var s=this.textColor||this.outlined&&this.color;return t(a,this.setTextColor(s,r),e)}})},d955:function(t,e,n){},e22c:function(t,e,n){"use strict";n("d955")},f451:function(t,e,n){t.exports=n.p+"img/default_event_banner.ae2bcee0.png"},fe4c:function(t,e,n){"use strict";n("1cff")}}]);
//# sourceMappingURL=chunk-3819bd17.86cb15fe.js.map