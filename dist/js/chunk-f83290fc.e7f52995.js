(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f83290fc"],{"74d6":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.multimedias?n("v-card",{staticClass:"mx-auto rounded-0",attrs:{loading:t.loading,flat:"","max-width":"650",color:"transparent"}},[n("div",{staticClass:"library-title"},[n("v-icon",{attrs:{size:"40",color:"red lighten-1"}},[t._v(" mdi-video ")]),t._v(" Multimedia Library ")],1),t._l(t.posts,(function(t){return n("multimedia-post",{key:t.id,staticClass:"mb-3",attrs:{post:t,"is-article":!1}})}))],2):t._e()},i=[],r=n("c964"),s=n("f3f3"),c=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("99af"),n("2f62")),o={name:"Multimedias",components:{MultimediaPost:function(){return n.e("chunk-0c7ec014").then(n.bind(null,"55e8"))}},data:function(){return{posts:[],loading:!1}},computed:Object(s["a"])({},Object(c["b"])({multimedias:"multimedia/list"})),created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$store.dispatch("multimedia/getAllApproved");case 3:t.posts=t.posts.concat(t.multimedias.results),t.loading=!1;case 5:case"end":return e.stop()}}),e)})))()}},u=o,d=(n("98e5"),n("2877")),l=n("6544"),m=n.n(l),f=n("b0af"),p=n("132d"),b=Object(d["a"])(u,a,i,!1,null,"85098460",null);e["default"]=b.exports;m()(b,{VCard:f["a"],VIcon:p["a"]})},"98e5":function(t,e,n){"use strict";n("ff18")},ff18:function(t,e,n){}}]);
//# sourceMappingURL=chunk-f83290fc.e7f52995.js.map