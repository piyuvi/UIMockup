webpackJsonp([1],{"7zck":function(t,e){},AqYs:function(t,e,s){t.exports=s.p+"static/img/logo.7586588.svg"},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=s("VU/8")({name:"App"},a,!1,function(t){s("gsu9")},null,null).exports,n=s("/ocq"),o=s("mvHQ"),l=s.n(o),c=s("mtWM"),d=s.n(c),u={name:"Wonder",data:function(){return{items:["Ratings","Likes"],selectedSort:"",isLoading:!0,wonders:[],totalLikes:0,sessionLiked:0,apiHits:0,clicked:!1,searchInput:"",searchedArray:[]}},computed:{sevenWonders:function(){var t=this,e=[];if(this.wonders.filter(function(s){s.id===t.searchInput&&e.push(s)}),this.searchInput)return e;var s=this.selectedSort||this.items[0];return this.sortArray(this.wonders,s.toLowerCase()),this.wonders}},mounted:function(){var t=this;d.a.get("https://www.mocky.io/v2/5bdd28dd32000075008c6227").then(function(e){e.data&&(t.wonders=JSON.parse(sessionStorage.getItem("likedArray"))||e.data.data,t.wonders.map(function(e){t.totalLikes+=e.likes,e.hasOwnProperty("clicked")||(e.clicked=!1)}),t.sessionLiked=sessionStorage.getItem("totalLiked")||t.totalLikes,sessionStorage.setItem("totalLiked",t.sessionLiked),0===t.apiHits?null!==sessionStorage.getItem("apiHits")?t.apiHits=+sessionStorage.getItem("apiHits")+1:t.apiHits=++t.apiHits:t.apiHits++,sessionStorage.setItem("apiHits",t.apiHits),t.isLoading=!1)}).catch(function(t){console.log(t)}).finally(function(){return t.isLoading=!1})},beforeDestroy:function(){},methods:{callLiked:function(t){var e=this;this.wonders.map(function(s){s.id===t.id&&(s.clicked?(s.likes--,s.clicked=!1,e.sessionLiked=+sessionStorage.getItem("totalLiked")-1):(s.likes++,s.clicked=!0,e.sessionLiked=+sessionStorage.getItem("totalLiked")+1),sessionStorage.setItem("totalLiked",e.sessionLiked))}),sessionStorage.setItem("likedArray",l()(this.wonders))},sortArray:function(t,e){t.sort(function(t,s){var i=t[e],a=s[e];return i<a?1:i>a?-1:0})}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("div",{staticClass:"text-xs-center"},[t.isLoading?i("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):t._e()],1),t._v(" "),i("v-toolbar",{staticClass:"topHeader"},[i("v-toolbar-title",[i("img",{attrs:{src:s("AqYs"),height:"120",width:"120"}})]),t._v(" "),i("v-spacer"),t._v(" "),i("v-toolbar-side-icon")],1),t._v(" "),i("v-flex",[i("v-toolbar",{staticClass:"bottomHeader",attrs:{flat:""}},[i("v-toolbar-title",{attrs:{fullscreen:t.$vuetify.breakpoint.xs}},[i("v-autocomplete",{attrs:{flat:"",items:t.wonders,loading:t.isLoading,"search-input":t.search,clearable:"","item-text":"place","item-value":"id",label:"Search by Name","prepend-inner-icon":"search",solo:""},on:{"update:searchInput":function(e){t.search=e}},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}})],1),t._v(" "),i("v-spacer"),t._v(" "),i("v-toolbar-title",{attrs:{fullscreen:t.$vuetify.breakpoint.xs}},[t._v("\n      Total Likes: "+t._s(this.sessionLiked)+"\n    ")]),t._v(" "),i("v-toolbar-title",{attrs:{fullscreen:t.$vuetify.breakpoint.xs}},[t._v("\n      Total API Hits: "+t._s(this.apiHits)+"\n    ")]),t._v(" "),i("v-spacer"),t._v(" "),i("v-toolbar-title",[i("v-select",{attrs:{flat:"",items:t.items,label:"Sort By",solo:""},model:{value:t.selectedSort,callback:function(e){t.selectedSort=e},expression:"selectedSort"}})],1)],1)],1),t._v(" "),i("br"),t._v(" "),i("v-container",{attrs:{fluid:"","grid-list-md":""}},[t.sevenWonders?i("v-layout",{attrs:{row:"",wrap:""}},t._l(t.sevenWonders,function(e,s){return i("v-flex",{key:s,attrs:{xs12:"",sm5:"",md6:""}},[i("v-hover",{scopedSlots:t._u([{key:"default",fn:function(s){var a=s.hover;return i("v-card",{attrs:{color:"gray"}},[i("v-img",{attrs:{src:e.imageURL}},[a?i("v-card",{staticClass:"d-flex transition-fast-in-fast-out white darken-1 v-card--reveal gray--text .title",staticStyle:{"text-align":"justify",height:"100%"},attrs:{fullscreen:t.$vuetify.breakpoint.xsOnly}},[i("v-card-text",[i("v-btn",{staticStyle:{float:"right"},attrs:{icon:""},on:{click:[function(s){t.callLiked(e)},function(t){t.stopPropagation()}]}},[e.clicked?t._e():i("v-icon",[t._v("favorite_border")]),t._v(" "),e.clicked?i("v-icon",{staticStyle:{}},[t._v("favorite")]):t._e(),t._v("\n                    "+t._s(e.likes)+"\n                  ")],1),t._v(" "),i("p",{staticClass:"text-xs-center title mt-5"},[t._v(t._s(e.place))]),t._v(" "),i("p",{staticClass:"text-xs-center subheading"},[t._v(t._s(e.description))])],1)],1):t._e()],1),t._v(" "),i("v-card-title",{attrs:{"primary-title":""}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",[i("h3",{staticStyle:{display:"flex"}},[t._v("Ratings\n                "),i("v-rating",{attrs:{"half-increments":"",color:"orange","background-color":"black",readonly:""},model:{value:e.ratings,callback:function(s){t.$set(e,"ratings",s)},expression:"wonder.ratings"}}),t._v(" "),i("v-spacer"),t._v(" "+t._s(e.place)+"\n                ")],1)])],1)],1)],1)}}])})],1)})):t._e()],1)],1)},staticRenderFns:[]};var p=s("VU/8")(u,v,!1,function(t){s("Um6N")},null,null).exports;i.default.use(n.a);var f=new n.a({routes:[{path:"/",name:"Wonder",component:p}]}),m=s("3EgV"),g=s.n(m);s("7zck");i.default.use(g.a),i.default.config.productionTip=!1,new i.default({el:"#app",router:f,components:{App:r},template:"<App/>"})},Um6N:function(t,e){},gsu9:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c181c88e278b26815364.js.map