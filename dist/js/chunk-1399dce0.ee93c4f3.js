(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1399dce0","chunk-2d0e1fc0","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b","chunk-2d0e6c6b"],{"0bc6":function(t,e,n){},1681:function(t,e,n){},"169a":function(t,e,n){"use strict";var i=n("f3f3"),s=n("d0ff"),a=n("fc11"),r=(n("a9e3"),n("498a"),n("caad"),n("2532"),n("7db0"),n("368e"),n("480e")),o=n("4ad4"),c=n("b848"),l=n("75eb"),u=n("e707"),h=n("e4d3"),d=n("21be"),f=n("f2e7"),m=n("a293"),p=n("58df"),v=n("d9bd"),g=n("80d2"),b=Object(p["a"])(o["a"],c["a"],l["a"],u["a"],h["a"],d["a"],f["a"]);e["a"]=b.extend({name:"v-dialog",directives:{ClickOutside:m["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var t;return t={},Object(a["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(a["a"])(t,"v-dialog--active",this.isActive),Object(a["a"])(t,"v-dialog--persistent",this.persistent),Object(a["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(a["a"])(t,"v-dialog--scrollable",this.scrollable),Object(a["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(v["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):u["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){t.previousActiveElement=document.activeElement,t.$refs.content.focus(),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===g["y"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=Object(s["a"])(n).find((function(t){return!t.hasAttribute("disabled")}));i&&i.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(r["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(i["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(i["a"])(Object(i["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"1b2c":function(t,e,n){},"368e":function(t,e,n){},"38cb":function(t,e,n){"use strict";var i=n("0122"),s=(n("a9e3"),n("fb6a"),n("a9ad")),a=n("7560"),r=n("3206"),o=n("80d2"),c=n("d9bd"),l=n("58df"),u=Object(l["a"])(s["a"],Object(r["a"])("form"),a["a"]);e["a"]=u.extend({name:"validatable",props:{disabled:Boolean,error:Boolean,errorCount:{type:[Number,String],default:1},errorMessages:{type:[String,Array],default:function(){return[]}},messages:{type:[String,Array],default:function(){return[]}},readonly:Boolean,rules:{type:Array,default:function(){return[]}},success:Boolean,successMessages:{type:[String,Array],default:function(){return[]}},validateOnBlur:Boolean,value:{required:!1}},data:function(){return{errorBucket:[],hasColor:!1,hasFocused:!1,hasInput:!1,isFocused:!1,isResetting:!1,lazyValue:this.value,valid:!1}},computed:{computedColor:function(){if(!this.isDisabled)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},hasError:function(){return this.internalErrorMessages.length>0||this.errorBucket.length>0||this.error},hasSuccess:function(){return this.internalSuccessMessages.length>0||this.success},externalError:function(){return this.internalErrorMessages.length>0||this.error},hasMessages:function(){return this.validationTarget.length>0},hasState:function(){return!this.isDisabled&&(this.hasSuccess||this.shouldValidate&&this.hasError)},internalErrorMessages:function(){return this.genInternalMessages(this.errorMessages)},internalMessages:function(){return this.genInternalMessages(this.messages)},internalSuccessMessages:function(){return this.genInternalMessages(this.successMessages)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit("input",t)}},isDisabled:function(){return this.disabled||!!this.form&&this.form.disabled},isInteractive:function(){return!this.isDisabled&&!this.isReadonly},isReadonly:function(){return this.readonly||!!this.form&&this.form.readonly},shouldValidate:function(){return!!this.externalError||!this.isResetting&&(this.validateOnBlur?this.hasFocused&&!this.isFocused:this.hasInput||this.hasFocused)},validations:function(){return this.validationTarget.slice(0,Number(this.errorCount))},validationState:function(){if(!this.isDisabled)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":this.hasColor?this.computedColor:void 0},validationTarget:function(){return this.internalErrorMessages.length>0?this.internalErrorMessages:this.successMessages&&this.successMessages.length>0?this.internalSuccessMessages:this.messages&&this.messages.length>0?this.internalMessages:this.shouldValidate?this.errorBucket:[]}},watch:{rules:{handler:function(t,e){Object(o["j"])(t,e)||this.validate()},deep:!0},internalValue:function(){this.hasInput=!0,this.validateOnBlur||this.$nextTick(this.validate)},isFocused:function(t){t||this.isDisabled||(this.hasFocused=!0,this.validateOnBlur&&this.$nextTick(this.validate))},isResetting:function(){var t=this;setTimeout((function(){t.hasInput=!1,t.hasFocused=!1,t.isResetting=!1,t.validate()}),0)},hasError:function(t){this.shouldValidate&&this.$emit("update:error",t)},value:function(t){this.lazyValue=t}},beforeMount:function(){this.validate()},created:function(){this.form&&this.form.register(this)},beforeDestroy:function(){this.form&&this.form.unregister(this)},methods:{genInternalMessages:function(t){return t?Array.isArray(t)?t:[t]:[]},reset:function(){this.isResetting=!0,this.internalValue=Array.isArray(this.internalValue)?[]:null},resetValidation:function(){this.isResetting=!0},validate:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0,n=[];e=e||this.internalValue,t&&(this.hasInput=this.hasFocused=!0);for(var s=0;s<this.rules.length;s++){var a=this.rules[s],r="function"===typeof a?a(e):a;!1===r||"string"===typeof r?n.push(r||""):"boolean"!==typeof r&&Object(c["b"])("Rules should return a string or boolean, received '".concat(Object(i["a"])(r),"' instead"),this)}return this.errorBucket=n,this.valid=0===n.length,this.valid}}})},"583f":function(t,e,n){},"7d85":function(t,e,n){"use strict";var i=n("c964"),s=(n("96cf"),{methods:{openSnack:function(t){var e=arguments,n=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=e.length>1&&void 0!==e[1]?e[1]:"error",i.next=3,n.$store.dispatch("snack/setSnackState",!0);case 3:return i.next=5,n.$store.dispatch("snack/setSnackColor",s);case 5:return i.next=7,n.$store.dispatch("snack/setSnackText",t);case 7:case"end":return i.stop()}}),i)})))()}}});e["a"]=s},"8ff2":function(t,e,n){},"99d9":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return c}));var i=n("b0af"),s=n("80d2"),a=Object(s["i"])("v-card__actions"),r=Object(s["i"])("v-card__subtitle"),o=Object(s["i"])("v-card__text"),c=Object(s["i"])("v-card__title");i["a"]},a844:function(t,e,n){"use strict";var i=n("f3f3"),s=(n("a9e3"),n("1681"),n("8654")),a=n("58df"),r=Object(a["a"])(s["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(i["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},s["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,n=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(n,e)+"px"}},genInput:function(){var t=s["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){s["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ba87:function(t,e,n){"use strict";var i=n("f3f3"),s=(n("a9e3"),n("1b2c"),n("a9ad")),a=n("7560"),r=n("58df"),o=n("80d2"),c=Object(r["a"])(a["a"]).extend({name:"v-label",functional:!0,props:{absolute:Boolean,color:{type:String,default:"primary"},disabled:Boolean,focused:Boolean,for:String,left:{type:[Number,String],default:0},right:{type:[Number,String],default:"auto"},value:Boolean},render:function(t,e){var n=e.children,r=e.listeners,c=e.props,l={staticClass:"v-label",class:Object(i["a"])({"v-label--active":c.value,"v-label--is-disabled":c.disabled},Object(a["b"])(e)),attrs:{for:c.for,"aria-hidden":!c.for},on:r,style:{left:Object(o["g"])(c.left),right:Object(o["g"])(c.right),position:c.absolute?"absolute":"relative"},ref:"label"};return t("label",s["a"].options.methods.setTextColor(c.focused&&c.color,l),n)}});e["a"]=c},bc60:function(t,e,n){"use strict";n("583f")},c37a:function(t,e,n){"use strict";var i=n("f3f3"),s=(n("a9e3"),n("4de4"),n("d81d"),n("ac1f"),n("1276"),n("99af"),n("d191"),n("9d26")),a=n("ba87"),r=(n("8ff2"),n("a9ad")),o=n("7560"),c=n("58df"),l=n("80d2"),u=Object(c["a"])(r["a"],o["a"]).extend({name:"v-messages",props:{value:{type:Array,default:function(){return[]}}},methods:{genChildren:function(){return this.$createElement("transition-group",{staticClass:"v-messages__wrapper",attrs:{name:"message-transition",tag:"div"}},this.value.map(this.genMessage))},genMessage:function(t,e){return this.$createElement("div",{staticClass:"v-messages__message",key:e},Object(l["s"])(this,"default",{message:t,key:e})||[t])}},render:function(t){return t("div",this.setTextColor(this.color,{staticClass:"v-messages",class:this.themeClasses}),[this.genChildren()])}}),h=u,d=n("7e2b"),f=n("38cb"),m=n("d9f7"),p=Object(c["a"])(d["a"],f["a"]),v=p.extend().extend({name:"v-input",inheritAttrs:!1,props:{appendIcon:String,backgroundColor:{type:String,default:""},dense:Boolean,height:[Number,String],hideDetails:[Boolean,String],hint:String,id:String,label:String,loading:Boolean,persistentHint:Boolean,prependIcon:String,value:null},data:function(){return{lazyValue:this.value,hasMouseDown:!1}},computed:{classes:function(){return Object(i["a"])({"v-input--has-state":this.hasState,"v-input--hide-details":!this.showDetails,"v-input--is-label-active":this.isLabelActive,"v-input--is-dirty":this.isDirty,"v-input--is-disabled":this.isDisabled,"v-input--is-focused":this.isFocused,"v-input--is-loading":!1!==this.loading&&null!=this.loading,"v-input--is-readonly":this.isReadonly,"v-input--dense":this.dense},this.themeClasses)},computedId:function(){return this.id||"input-".concat(this._uid)},hasDetails:function(){return this.messagesToDisplay.length>0},hasHint:function(){return!this.hasMessages&&!!this.hint&&(this.persistentHint||this.isFocused)},hasLabel:function(){return!(!this.$slots.label&&!this.label)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit(this.$_modelEvent,t)}},isDirty:function(){return!!this.lazyValue},isLabelActive:function(){return this.isDirty},messagesToDisplay:function(){var t=this;return this.hasHint?[this.hint]:this.hasMessages?this.validations.map((function(e){if("string"===typeof e)return e;var n=e(t.internalValue);return"string"===typeof n?n:""})).filter((function(t){return""!==t})):[]},showDetails:function(){return!1===this.hideDetails||"auto"===this.hideDetails&&this.hasDetails}},watch:{value:function(t){this.lazyValue=t}},beforeCreate:function(){this.$_modelEvent=this.$options.model&&this.$options.model.event||"input"},methods:{genContent:function(){return[this.genPrependSlot(),this.genControl(),this.genAppendSlot()]},genControl:function(){return this.$createElement("div",{staticClass:"v-input__control"},[this.genInputSlot(),this.genMessages()])},genDefaultSlot:function(){return[this.genLabel(),this.$slots.default]},genIcon:function(t,e){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=this["".concat(t,"Icon")],r="click:".concat(Object(l["x"])(t)),o=!(!this.listeners$[r]&&!e),c=Object(m["a"])({attrs:{"aria-label":o?Object(l["x"])(t).split("-")[0]+" icon":void 0,color:this.validationState,dark:this.dark,disabled:this.isDisabled,light:this.light},on:o?{click:function(t){t.preventDefault(),t.stopPropagation(),n.$emit(r,t),e&&e(t)},mouseup:function(t){t.preventDefault(),t.stopPropagation()}}:void 0},i);return this.$createElement("div",{staticClass:"v-input__icon",class:t?"v-input__icon--".concat(Object(l["x"])(t)):void 0},[this.$createElement(s["a"],c,a)])},genInputSlot:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor,{staticClass:"v-input__slot",style:{height:Object(l["g"])(this.height)},on:{click:this.onClick,mousedown:this.onMouseDown,mouseup:this.onMouseUp},ref:"input-slot"}),[this.genDefaultSlot()])},genLabel:function(){return this.hasLabel?this.$createElement(a["a"],{props:{color:this.validationState,dark:this.dark,disabled:this.isDisabled,focused:this.hasState,for:this.computedId,light:this.light}},this.$slots.label||this.label):null},genMessages:function(){var t=this;return this.showDetails?this.$createElement(h,{props:{color:this.hasHint?"":this.validationState,dark:this.dark,light:this.light,value:this.messagesToDisplay},attrs:{role:this.hasMessages?"alert":null},scopedSlots:{default:function(e){return Object(l["s"])(t,"message",e)}}}):null},genSlot:function(t,e,n){if(!n.length)return null;var i="".concat(t,"-").concat(e);return this.$createElement("div",{staticClass:"v-input__".concat(i),ref:i},n)},genPrependSlot:function(){var t=[];return this.$slots.prepend?t.push(this.$slots.prepend):this.prependIcon&&t.push(this.genIcon("prepend")),this.genSlot("prepend","outer",t)},genAppendSlot:function(){var t=[];return this.$slots.append?t.push(this.$slots.append):this.appendIcon&&t.push(this.genIcon("append")),this.genSlot("append","outer",t)},onClick:function(t){this.$emit("click",t)},onMouseDown:function(t){this.hasMouseDown=!0,this.$emit("mousedown",t)},onMouseUp:function(t){this.hasMouseDown=!1,this.$emit("mouseup",t)}},render:function(t){return t("div",this.setTextColor(this.validationState,{staticClass:"v-input",class:this.classes}),this.genContent())}});e["a"]=v},c54f:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{loading:t.loading}},[n("v-toolbar",{attrs:{height:"50"}},[n("v-toolbar-title",{staticClass:"comment-headline"},[t._v(" Comments ")])],1),t.comments.count>0?n("v-list",{attrs:{"two-line":"",color:"grey darken-3"}},[t._l(t.comments.results,(function(e,i){return[e.header?n("v-subheader",{key:i,domProps:{textContent:t._s(e.header)}}):e.divider?n("v-divider",{key:i,attrs:{inset:e.inset}}):n("v-list-item",{key:i,staticClass:"pl-3 pr-1 comment-item"},[t.$helper.ifWriterIsCurrentUser(e.writer.username)?n("div",[n("v-avatar",{staticClass:"d-flex justify-content-center ma-2 elevation-4 comment-avatar",attrs:{size:"45",tile:"",color:t.$constants.pickBackgroundColor()}},[n("span",{staticClass:"white--text headline"},[t._v(" "+t._s(t.$helper.getUsernameInitials(e.writer))+" ")])]),n("v-dialog",{attrs:{"max-width":"500"},model:{value:t.updateCommentDialog,callback:function(e){t.updateCommentDialog=e},expression:"updateCommentDialog"}},[n("v-card",{staticClass:"edit-comment-card"},[n("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(" Update your comment ")]),n("div",{staticClass:"py-4"}),n("v-card-text",[n("v-textarea",{attrs:{filled:"",label:"Comment"},model:{value:t.updateComment.comment,callback:function(e){t.$set(t.updateComment,"comment",e)},expression:"updateComment.comment"}})],1),n("v-divider"),n("v-card-actions",[n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.updateCommentDialog=!1}}},[t._v(" Cancel ")]),n("v-spacer"),n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(n){return t.updateMyComment(e.id)}}},[t._v(" Update ")])],1)],1)],1)],1):t._e(),n("v-list-item-content",[e.writer?n("v-list-item-title",{staticClass:"d-flex align-items-center"},[n("code",{staticClass:"detail-code"},[n("v-icon",{staticClass:"detail-icon",attrs:{size:"16"}},[t._v(" mdi-account-circle ")]),t._v(" "+t._s(e.writer.username)+" ")],1),n("span",{staticClass:"detail-icon px-1"},[n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(n){return t.openUpdateCommentDialog(e.comment)}}},[n("v-icon",{attrs:{color:"primary"}},[t._v(" mdi-pencil ")])],1)],1),n("v-spacer"),n("code",{staticClass:"detail-code"},[n("v-icon",{staticClass:"detail-icon",attrs:{color:"grey darken-4",size:"16"}},[t._v(" mdi-history ")]),t._v(" "+t._s(t.$moment(e.created_at).fromNow())+" ")],1)],1):t._e(),n("v-list-item-subtitle",{staticClass:"comment"},[t._v(" "+t._s(e.comment)+" ")])],1),n("v-list-item-action",{staticClass:"comment-actions"},[t.$helper.ifWriterIsCurrentUser(e.writer.username)||t.$helper.isCurrentUserSuperAdmin()?n("v-btn",{attrs:{icon:""},on:{click:function(n){return t.removeComment(e.id)}}},[n("v-icon",{attrs:{color:"red darken-1"}},[t._v(" mdi-delete ")])],1):t._e()],1)],1)]}))],2):n("div",{staticClass:"fill-height empty-comment-message"},[n("i",[t._v("Be the first to comment.")])])],1)},s=[],a=n("c964"),r=(n("96cf"),n("7d85")),o={name:"CommentsDetailComponent",mixins:[r["a"]],data:function(){return{updateCommentDialog:!1,updateComment:{comment:null},comments:[],loading:!1}},created:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.init();case 2:t.$bus.on("refresh-comment-in-details-page",t.init);case 3:case"end":return e.stop()}}),e)})))()},beforeUnmount:function(){this.$bus.off("refresh-comment-in-details-page")},methods:{openUpdateCommentDialog:function(t){this.updateCommentDialog=!0,this.updateComment.comment=t},closeUpdateCommentDialog:function(){this.updateCommentDialog=!1},init:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,t.postId=parseInt(t.$route.params.id),e.next=4,t.$store.dispatch("multimedia/fetchCommentsForId",{id:t.postId});case 4:n=e.sent,n&&(t.comments=n,t.loading=!1);case 6:case"end":return e.stop()}}),e)})))()},updateMyComment:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("multimedia/updateComment",{id:t,comment:e.updateComment.comment});case 2:if(i=n.sent,!i){n.next=9;break}return e.closeUpdateCommentDialog(),n.next=7,e.init();case 7:n.next=11;break;case 9:return n.next=11,e.openSnack("Failed to comment. Please try again later.");case 11:case"end":return n.stop()}}),n)})))()},removeComment:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("multimedia/deleteComment",{id:t});case 2:if(i=n.sent,!i){n.next=10;break}return n.next=6,e.openSnack("Comment remove success","success");case 6:return n.next=8,e.init();case 8:n.next=12;break;case 10:return n.next=12,e.openSnack("Failed to remove comment. Please try again later.");case 12:case"end":return n.stop()}}),n)})))()}}},c=o,l=(n("bc60"),n("2877")),u=n("6544"),h=n.n(u),d=n("8212"),f=n("8336"),m=n("b0af"),p=n("99d9"),v=n("169a"),g=n("ce7e"),b=n("132d"),C=n("8860"),y=n("da13"),k=n("1800"),w=n("5d23"),x=n("2fa4"),$=n("e0c7"),S=n("a844"),O=n("71d9"),_=n("2a7f"),I=Object(l["a"])(c,i,s,!1,null,"c30b8874",null);e["default"]=I.exports;h()(I,{VAvatar:d["a"],VBtn:f["a"],VCard:m["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VDialog:v["a"],VDivider:g["a"],VIcon:b["a"],VList:C["a"],VListItem:y["a"],VListItemAction:k["a"],VListItemContent:w["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VSpacer:x["a"],VSubheader:$["a"],VTextarea:S["a"],VToolbar:O["a"],VToolbarTitle:_["a"]})},d191:function(t,e,n){},e0c7:function(t,e,n){"use strict";var i=n("f3f3"),s=(n("0bc6"),n("7560")),a=n("58df");e["a"]=Object(a["a"])(s["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(i["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-1399dce0.ee93c4f3.js.map