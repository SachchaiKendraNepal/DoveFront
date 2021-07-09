(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d0a3039"],{"1e6c":function(t,e,i){"use strict";var n=i("9d65"),s=i("4e82"),o=i("c3f0"),r=i("80d2"),a=i("58df"),l=Object(a["a"])(n["a"],Object(s["a"])("windowGroup","v-window-item","v-window"));e["a"]=l.extend().extend().extend({name:"v-window-item",directives:{Touch:o["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(r["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(r["g"])(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}})},"3e35":function(t,e,i){"use strict";var n=i("f3f3"),s=i("1e6c"),o=i("adda"),r=i("58df"),a=i("80d2"),l=i("1c87"),u=Object(r["a"])(s["a"],l["a"]);e["a"]=u.extend({name:"v-carousel-item",inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(o["a"],{staticClass:"v-carousel__item",props:Object(n["a"])(Object(n["a"])({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(a["s"])(this))]},genWindowItem:function(){var t=this.generateRouteLink(),e=t.tag,i=t.data;return i.staticClass="v-window-item",i.directives.push({name:"show",value:this.isActive}),this.$createElement(e,i,this.genDefaultSlot())}}})},"5e66":function(t,e,i){"use strict";var n=i("f3f3"),s=(i("a9e3"),i("63b7"),i("f665")),o=i("afdd"),r=i("9d26"),a=i("37c6"),l=i("604c"),u=l["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return l["a"].options.computed.classes.call(this)}},methods:{genData:l["a"].options.methods.genData}}),c=i("80d2"),h=i("d9bd");e["a"]=s["a"].extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(t){return t>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(t,e){t!==e&&t&&(this.internalHeight=t)},cycle:function(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(h["a"])("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:s["a"].options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var t=this,e=this.items.length,i=[],n=0;n<e;n++){var s=this.$createElement(o["a"],{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",n+1,e)},props:{icon:!0,small:!0,value:this.getValue(this.items[n],n)}},[this.$createElement(r["a"],{props:{size:18}},this.delimiterIcon)]);i.push(s)}return this.$createElement(u,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(e){t.internalValue=e}}},i)},genProgress:function(){return this.$createElement(a["a"],{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(t){var e=s["a"].options.render.call(this,t);return e.data.style="height: ".concat(Object(c["g"])(this.height),";"),this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}})},"63b7":function(t,e,i){},"9bbb":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.posts,(function(e){return i("div",{key:e.id,staticClass:"mb-2"},[i("base-post-card",{attrs:{post:e},scopedSlots:t._u([{key:"media",fn:function(){return[i("v-row",{staticClass:"ma-0 pa-0"},[i("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[i("v-card",{attrs:{height:"40vh",dark:""}},[i("v-carousel",{attrs:{height:"40vh","hide-delimiters":"","show-arrows-on-hover":""},scopedSlots:t._u([{key:"prev",fn:function(e){var n=e.on,s=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(e){return t.pauseAllPlaying()}}},"v-btn",s,!1),n),[i("v-icon",[t._v("mdi-chevron-left")])],1)]}},{key:"next",fn:function(e){var n=e.on,s=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(e){return t.pauseAllPlaying()}}},"v-btn",s,!1),n),[i("v-icon",[t._v("mdi-chevron-right")])],1)]}}],null,!0)},[t._l(e["multimedia_images"],(function(t){return i("v-carousel-item",{key:t.image,attrs:{src:t.image}})})),t._l(e["multimedia_videos"],(function(e){return i("v-carousel-item",{key:e.video},[i("v-card",{staticClass:"ma-0 pa-0",attrs:{height:"40vh","max-width":"100%",dark:""}},[i("video",{attrs:{poster:e.poster,controls:"",height:"100%",width:"100%",src:e.video},on:{play:t.onPlay}})])],1)})),t._l(e["multimedia_video_urls"],(function(e){return i("v-carousel-item",{key:e.video_url},[i("youtube",{ref:"yt",refInFor:!0,attrs:{height:"100%",width:"100%","video-id":t.$youtube.getIdFromUrl(e.video_url)},on:{playing:t.playing}})],1)}))],2)],1)],1)],1)]},proxy:!0}],null,!0)})],1)})),0)},s=[],o=i("c964"),r=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("a7b3")),a={name:"MultimediaList",components:{BasePostCard:function(){return i.e("chunk-183793b0").then(i.bind(null,"ebae"))}},mixins:[r["a"]],props:{posts:{type:Array,required:!0}},data:function(){return{dialog:!1}},methods:{pauseAllPlaying:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.pauseAllYt();case 2:return e.next=4,t.pauseAllPlayingHTMLVideos();case 4:case"end":return e.stop()}}),e)})))()}}},l=a,u=(i("9ec0"),i("2877")),c=i("6544"),h=i.n(c),d=i("8336"),m=i("b0af"),f=i("5e66"),p=i("3e35"),v=i("62ad"),g=i("132d"),w=i("0fd9"),b=Object(u["a"])(l,n,s,!1,null,"d2efaac8",null);e["default"]=b.exports;h()(b,{VBtn:d["a"],VCard:m["a"],VCarousel:f["a"],VCarouselItem:p["a"],VCol:v["a"],VIcon:g["a"],VRow:w["a"]})},"9d65":function(t,e,i){"use strict";var n=i("d9bd"),s=i("2b0e");e["a"]=s["default"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(n["e"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},"9ec0":function(t,e,i){"use strict";i("c88b")},c88b:function(t,e,i){}}]);
//# sourceMappingURL=chunk-5d0a3039.d72e452f.js.map