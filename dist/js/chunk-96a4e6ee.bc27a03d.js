(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-96a4e6ee","chunk-13916bfc","chunk-59fef1ee","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b"],{8063:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card-actions",{staticClass:"pa-2 pt-0 flex-wrap justify-space-between"},[a("v-btn",{staticClass:"ma-1",attrs:{small:t.ifScreenWidthIsLessThanSmall,"x-small":t.ifScreenWidthIsLessThanXSmall,depressed:"",color:"#953b93",dark:""},on:{click:function(e){t.dialog=!0}}},[a("v-icon",{attrs:{small:t.ifScreenWidthIsLessThanSmall}},[t._v(" mdi-pencil ")])],1),a("v-btn",{staticClass:"ma-1",attrs:{depressed:"",small:t.ifScreenWidthIsLessThanSmall,"x-small":t.ifScreenWidthIsLessThanXSmall}},[a("v-icon",{attrs:{small:t.ifScreenWidthIsLessThanSmall}},[t._v(" mdi-heart-outline ")])],1),a("v-btn",{staticClass:"ma-1",attrs:{depressed:"",small:t.ifScreenWidthIsLessThanSmall,"x-small":t.ifScreenWidthIsLessThanXSmall}},[a("v-icon",{attrs:{small:t.ifScreenWidthIsLessThanSmall}},[t._v(" mdi-comment-outline ")])],1),a("v-btn",{staticClass:"ma-1",attrs:{depressed:"",small:t.ifScreenWidthIsLessThanSmall,"x-small":t.ifScreenWidthIsLessThanXSmall}},[a("v-icon",{attrs:{small:t.ifScreenWidthIsLessThanSmall}},[t._v(" mdi-share ")])],1),a("v-spacer"),a("v-btn",{staticClass:"ma-1",attrs:{depressed:"",small:t.ifScreenWidthIsLessThanSmall,"x-small":t.ifScreenWidthIsLessThanXSmall}},[a("v-icon",{attrs:{small:t.ifScreenWidthIsLessThanXSmall}},[t._v(" mdi-bookmark-outline ")])],1)],1)},n=[],s={name:"MultimediaAction",props:{},data:function(){return{}},computed:{ifScreenWidthIsLessThanXSmall:function(){return this.$vuetify.breakpoint.width<330},ifScreenWidthIsLessThanSmall:function(){return this.$vuetify.breakpoint.width<400}},methods:{}},r=s,c=a("2877"),l=a("6544"),o=a.n(l),u=a("8336"),d=a("99d9"),h=a("132d"),f=a("2fa4"),p=Object(c["a"])(r,i,n,!1,null,"6dbd0d4a",null);e["default"]=p.exports;o()(p,{VBtn:u["a"],VCardActions:d["a"],VIcon:h["a"],VSpacer:f["a"]})},"8adc":function(t,e,a){},9640:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-4",attrs:{color:"no-data-gradient"}},[a("div",{staticClass:"d-flex justify-center"},[a("v-chip",{staticClass:"text-center",attrs:{color:"rgba(0, 0, 0, .1)"}},[t._v(" "+t._s(t.text)+" ")])],1),a("v-card-actions",{staticClass:"d-flex justify-center"},[a("v-btn",{attrs:{color:"rgba(0, 0, 0, .1)",to:"/home/multimedia/images"}},[t._v(" Images ")]),a("v-btn",{attrs:{color:"rgba(0, 0, 0, .1)",to:"/home/multimedia/videos"}},[t._v(" Videos ")]),a("v-btn",{attrs:{color:"rgba(0, 0, 0, .1)",to:"/home/multimedia/youtube"}},[t._v(" Youtube ")])],1)],1)},n=[],s={name:"NoMultimediaCard",props:{text:{type:String,required:!0}}},r=s,c=a("2877"),l=a("6544"),o=a.n(l),u=a("8336"),d=a("b0af"),h=a("99d9"),f=a("cc20"),p=Object(c["a"])(r,i,n,!1,null,"609ce2d9",null);e["default"]=p.exports;o()(p,{VBtn:u["a"],VCard:d["a"],VCardActions:h["a"],VChip:f["a"]})},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return c})),a.d(e,"d",(function(){return l}));var i=a("b0af"),n=a("80d2"),s=Object(n["i"])("v-card__actions"),r=Object(n["i"])("v-card__subtitle"),c=Object(n["i"])("v-card__text"),l=Object(n["i"])("v-card__title");i["a"]},a7b3:function(t,e,a){"use strict";var i=a("c964"),n=(a("96cf"),a("159b"),{computed:{player:function(){return this.$refs.youtube.yt}},methods:{onPlay:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.pauseAllYt();case 2:document.querySelectorAll("video").forEach((function(e){e!==t.currentTarget&&(e.paused||e.pause())}));case 3:case"end":return a.stop()}}),a)})))()},pauseAllPlayingHTMLVideos:function(){document.querySelectorAll("video").forEach((function(t){t.paused||t.pause()}))},playing:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=t.getVideoUrl(),e.pauseAllPlayingHTMLVideos(),!Array.isArray(e.$refs.yt)){a.next=5;break}return a.next=5,e.$refs.yt.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.player.getVideoUrl();case 2:if(a=t.sent,a===n){t.next=6;break}return t.next=6,e.player.pauseVideo();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return a.stop()}}),a)})))()},pauseAllYt:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!Array.isArray(t.$refs.yt)){e.next=3;break}return e.next=3,t.$refs.yt.forEach(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.player.pauseVideo();case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})))()}}});e["a"]=n},cc20:function(t,e,a){"use strict";var i=a("d0af"),n=a("f3f3"),s=(a("4de4"),a("8adc"),a("58df")),r=a("0789"),c=a("9d26"),l=a("a9ad"),o=a("4e82"),u=a("7560"),d=a("f2e7"),h=a("1c87"),f=a("af2b"),p=a("d9bd");e["a"]=Object(s["a"])(l["a"],f["a"],h["a"],u["a"],Object(o["a"])("chipGroup"),Object(d["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({"v-chip":!0},h["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(h["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var a=Object(i["a"])(e,2),n=a[0],s=a[1];t.$attrs.hasOwnProperty(n)&&Object(p["a"])(n,s,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(c["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(r["b"],t)},genClose:function(){var t=this;return this.$createElement(c["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],a=this.generateRouteLink(),i=a.tag,s=a.data;s.attrs=Object(n["a"])(Object(n["a"])({},s.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:s.attrs.tabindex}),s.directives.push({name:"show",value:this.active}),s=this.setBackgroundColor(this.color,s);var r=this.textColor||this.outlined&&this.color;return t(i,this.setTextColor(r,s),e)}})},ee84:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{flat:"","min-height":"82vh",color:"transparent"}},[0===t.youtube_medias.length?a("no-multimedia-card",{attrs:{text:"Youtube database is empty."}}):t._e(),a("multimedia-youtube",{staticClass:"mx-1",attrs:{videos:t.youtube_medias}})],1)},n=[],s=a("f3f3"),r=(a("159b"),a("99af"),a("2f62")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.videos,(function(e){return a("v-card",{key:e.id,staticClass:"my-2 pa-0",attrs:{"min-height":"40vh",width:"100%"}},[a("v-card",{attrs:{height:"40vh"}},[a("youtube",{ref:"yt",refInFor:!0,attrs:{height:"100%",width:"100%","video-id":t.$youtube.getIdFromUrl(e.video_url)},on:{playing:t.playing}})],1),a("v-card-title",[t._v(" "+t._s(e.yt_info.title)+" ")]),a("multimedia-action")],1)})),1)},l=[],o=a("8063"),u=a("a7b3"),d={name:"MultimediaYoutube",components:{MultimediaAction:o["default"]},mixins:[u["a"]],props:{videos:{type:Array,required:!0}}},h=d,f=a("2877"),p=a("6544"),m=a.n(p),v=a("b0af"),b=a("99d9"),g=Object(f["a"])(h,c,l,!1,null,"4d68f875",null),y=g.exports;m()(g,{VCard:v["a"],VCardTitle:b["d"]});var C=a("9640"),S={name:"Youtube",components:{NoMultimediaCard:C["default"],MultimediaYoutube:y},computed:Object(s["a"])(Object(s["a"])({},Object(r["b"])({multimedias:"multimedia/list"})),{},{youtube_medias:function(){if(!this.multimedias)return[];if(!this.multimedias.results)return[];var t=[];return this.multimedias.results.forEach((function(e){t=t.concat(e["multimedia_video_urls"])})),t}})},_=S,x=Object(f["a"])(_,i,n,!1,null,null,null);e["default"]=x.exports;m()(x,{VCard:v["a"]})}}]);
//# sourceMappingURL=chunk-96a4e6ee.bc27a03d.js.map