(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6981ad8"],{"184a":function(t,e,i){},"1e6c":function(t,e,i){"use strict";var n=i("9d65"),s=i("4e82"),r=i("c3f0"),o=i("80d2"),a=i("58df"),l=Object(a["a"])(n["a"],Object(s["a"])("windowGroup","v-window-item","v-window"));e["a"]=l.extend().extend().extend({name:"v-window-item",directives:{Touch:r["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(o["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(o["g"])(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}})},"3e35":function(t,e,i){"use strict";var n=i("f3f3"),s=i("1e6c"),r=i("adda"),o=i("58df"),a=i("80d2"),l=i("1c87"),u=Object(o["a"])(s["a"],l["a"]);e["a"]=u.extend({name:"v-carousel-item",inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(r["a"],{staticClass:"v-carousel__item",props:Object(n["a"])(Object(n["a"])({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(a["s"])(this))]},genWindowItem:function(){var t=this.generateRouteLink(),e=t.tag,i=t.data;return i.staticClass="v-window-item",i.directives.push({name:"show",value:this.isActive}),this.$createElement(e,i,this.genDefaultSlot())}}})},"5e66":function(t,e,i){"use strict";var n=i("f3f3"),s=(i("a9e3"),i("63b7"),i("f665")),r=i("afdd"),o=i("9d26"),a=i("37c6"),l=i("604c"),u=l["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return l["a"].options.computed.classes.call(this)}},methods:{genData:l["a"].options.methods.genData}}),c=i("80d2"),h=i("d9bd");e["a"]=s["a"].extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(t){return t>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(t,e){t!==e&&t&&(this.internalHeight=t)},cycle:function(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(h["a"])("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:s["a"].options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var t=this,e=this.items.length,i=[],n=0;n<e;n++){var s=this.$createElement(r["a"],{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",n+1,e)},props:{icon:!0,small:!0,value:this.getValue(this.items[n],n)}},[this.$createElement(o["a"],{props:{size:18}},this.delimiterIcon)]);i.push(s)}return this.$createElement(u,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(e){t.internalValue=e}}},i)},genProgress:function(){return this.$createElement(a["a"],{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(t){var e=s["a"].options.render.call(this,t);return e.data.style="height: ".concat(Object(c["g"])(this.height),";"),this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}})},"5fc8":function(t,e,i){"use strict";i("184a")},"63b7":function(t,e,i){},"9bbb":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.posts,(function(e){return i("div",{key:e.id,staticClass:"mb-2"},[i("base-post-card",{attrs:{post:e},scopedSlots:t._u([{key:"media",fn:function(){return[i("v-col",{staticClass:"pt-0 px-2",attrs:{cols:"12"}},[i("v-card",{attrs:{height:"40vh",dark:""}},[i("v-carousel",{staticClass:"media-carousel",attrs:{height:"40vh","hide-delimiters":""},scopedSlots:t._u([{key:"prev",fn:function(n){var s=n.on,r=n.attrs;return[i("v-btn",t._g(t._b({directives:[{name:"show",rawName:"v-show",value:t.moreThanOneItem(e),expression:"moreThanOneItem(post)"}],staticClass:"carousel-btn",attrs:{icon:""},on:{click:function(e){return t.pauseAllPlaying()}}},"v-btn",r,!1),s),[i("v-icon",[t._v("mdi-chevron-left")])],1)]}},{key:"next",fn:function(n){var s=n.on,r=n.attrs;return[i("v-btn",t._g(t._b({directives:[{name:"show",rawName:"v-show",value:t.moreThanOneItem(e),expression:"moreThanOneItem(post)"}],staticClass:"carousel-btn",attrs:{icon:""},on:{click:function(e){return t.pauseAllPlaying()}}},"v-btn",r,!1),s),[i("v-icon",[t._v("mdi-chevron-right")])],1)]}}],null,!0)},[t._l(e["multimedia_images"],(function(t){return i("v-carousel-item",{key:t.image,attrs:{src:t.image}})})),t._l(e["multimedia_videos"],(function(e){return i("v-carousel-item",{key:e.video},[i("v-card",{staticClass:"ma-0 pa-0",attrs:{height:"40vh","max-width":"100%",dark:""}},[i("video",{attrs:{poster:e.poster,controls:"",height:"100%",width:"100%",src:e.video},on:{play:t.onPlay}})])],1)})),t._l(e["multimedia_video_urls"],(function(e){return i("v-carousel-item",{key:e.video_url},[i("youtube",{ref:"yt",refInFor:!0,attrs:{height:"100%",width:"100%","video-id":t.$youtube.getIdFromUrl(e.video_url)},on:{playing:t.playing}})],1)}))],2)],1)],1)]},proxy:!0}],null,!0)})],1)})),0)},s=[],r=i("c964"),o=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("99af"),i("a7b3")),a={name:"MultimediaList",components:{BasePostCard:function(){return i.e("chunk-98f29c18").then(i.bind(null,"ebae"))}},mixins:[o["a"]],props:{posts:{type:Array,required:!0}},data:function(){return{dialog:!1}},methods:{pauseAllPlaying:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.pauseAllYt();case 2:return e.next=4,t.pauseAllPlayingHTMLVideos();case 4:case"end":return e.stop()}}),e)})))()},moreThanOneItem:function(t){var e=t["multimedia_images"],i=t["multimedia_videos"],n=t["multimedia_video_urls"],s=[];return s=s.concat(e),s=s.concat(i),s=s.concat(n),s.length>1}}},l=a,u=(i("5fc8"),i("2877")),c=i("6544"),h=i.n(c),d=i("8336"),m=i("b0af"),f=i("5e66"),p=i("3e35"),v=i("62ad"),g=i("132d"),w=Object(u["a"])(l,n,s,!1,null,"d27e1e82",null);e["default"]=w.exports;h()(w,{VBtn:d["a"],VCard:m["a"],VCarousel:f["a"],VCarouselItem:p["a"],VCol:v["a"],VIcon:g["a"]})}}]);
//# sourceMappingURL=chunk-b6981ad8.764139d6.js.map