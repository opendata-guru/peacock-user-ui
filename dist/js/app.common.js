(self.webpackChunkpeacock_user_ui=self.webpackChunkpeacock_user_ui||[]).push([[592],{85642:function(){},72846:function(){},29091:function(){},84197:function(){},58308:function(){},1110:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return i}});var s={name:"Unauthorized"},i=(0,a(51900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-1 mb-3"},[a("div",{staticClass:"col-10 offset-1"},[a("p",[t._v(t._s(t.$t("message.error.http401")))]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-secondary",on:{click:function(e){return t.$router.go(-1)}}},[t._v(t._s(t.$t("message.error.goBack")))])])])}),[],!1,null,"5a4fbae7",null).exports},66509:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return i}});var s={name:"NotFound"},i=(0,a(51900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-1 mb-3"},[a("div",{staticClass:"col-10 offset-1"},[a("p",[t._v(t._s(t.$t("message.error.http404")))]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-secondary",on:{click:function(e){return t.$router.go(-1)}}},[t._v(t._s(t.$t("message.error.goBack")))])])])}),[],!1,null,"4b8db097",null).exports},86519:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return T}});var s=a(59713),i=a.n(s),n=a(319),o=a.n(n),r=a(60693),c=a.n(r),l=a(18721),u=a.n(l),d=a(23279),g=a.n(d),p=a(20629),f=a(79320),m=a(14293),h=a.n(m),v=a(51584),b=a.n(v),y=a(41609),_=a.n(y),C=a(47191),w=a(74305),k=Object.freeze({or:"OR",and:"AND"}),D=Object.freeze({or:"OR",and:"AND"}),$={name:"peacockCatalogueFacets",components:{},data:function(){return{limits:{min:25,max:100},facetOperators:k,expanded:[],showCatalogueDetails:!1,showOperator:w.Z.enable.filter.operator,catalogue:{},browser:{isIE:!!document.documentMode}}},computed:c()({},(0,p.Se)("catalogues",["getAvailableFacets","getCataloguesCount","getFacetOperator","getFacetGroupOperator","getLimit","getPage"]),{facetOperatorWatcher:function(){return this.getFacetOperator},facetGroupOperatorWatcher:function(){return this.getFacetGroupOperator}}),methods:c()({isEmpty:_(),isBoolean:b(),has:u(),isNil:h(),getCountryFlagImg:C.xw,getTranslationFor:C.mE},(0,p.nv)("catalogues",["toggleFacet","addFacet","removeFacet","setFacetOperator","setFacetGroupOperator","setPage","setPageCount"]),{sortByCount:function(t){return t.slice().sort((function(t,e){return 0!==e.count-t.count?e.count-t.count:t.name<e.name?-1:1}))},isExpanded:function(t){return this.expanded.indexOf(t)>-1},toggleExpanded:function(t){var e=this.expanded.indexOf(t);e>-1?this.expanded.splice(e):this.expanded.push(t)},facetIsSelected:function(t,e){if(!Object.prototype.hasOwnProperty.call(this.$route.query,t))return!1;var a=this.$route.query[t];return Array.isArray(a)||(a=[a]),a.indexOf(e)>-1},facetClicked:function(t,e){this.toggleFacet(t,e),this.resetPage()},toggleFacet:function(t,e){Object.prototype.hasOwnProperty.call(this.$route.query,[t])||this.$router.push({query:Object.assign({},this.$route.query,i()({},t,[]))});var a=this.$route.query[t].slice();Array.isArray(a)||(a=[a]);var s=a.indexOf(e);s>-1?a.splice(s,1):a.push(e),this.$router.push({query:Object.assign({},this.$route.query,i()({},t,a))})},toggleFacetOperator:function(){var t=this.getFacetOperator;t=t===k.and?k.or:k.and,this.setFacetOperator(t),this.setFacetGroupOperator(t)},toggleFacetGroupOperator:function(){var t=this.getFacetGroupOperator;t=t===D.and?D.or:D.and,this.setFacetGroupOperator(t)},resetPage:function(){this.$router.replace({query:Object.assign({},this.$route.query,{page:1})})},triggerResize:function(){setTimeout((function(){window.dispatchEvent(new Event("resize"))}),200)}}),watch:{facetOperatorWatcher:{handler:function(t){this.$router.replace({query:Object.assign({},this.$route.query,{facetOperator:t})})}},facetGroupOperatorWatcher:{handler:function(t){this.$router.replace({query:Object.assign({},this.$route.query,{facetGroupOperator:t})})}}},created:function(){},mounted:function(){}},F=(a(85642),a(51900)),S=(0,F.Z)($,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container catalogue-facets"},[a("div",{staticClass:"row mx-3 mr-md-0"},[a("div",{staticClass:"col"},[t.showOperator?a("div",{staticClass:"row facet-field mb-3"},[a("div",{staticClass:"col list-group pr-0"},[a("a",{staticClass:"list-group-item facet-header-item list-group-item-secondary"},[a("span",{staticClass:"facet-title text-secondary fw-bold"},[t._v(t._s(t.$t("message.datasetFacets.settings")))])]),t._v(" "),a("div",{staticClass:"form-group list-group-item list-group-item-action d-flex justify-content-between align-items-center"},[t._v("\n            "+t._s(t.$t("message.datasetFacets.operator"))+"\n            "),t.browser.isIE?t._e():a("span",{staticClass:"switch switch-sm"},[a("label",{staticClass:"mr-1",attrs:{for:"switch-facet-operator"}},[t._v(t._s(t.$t("message.datasetFacets.and")))]),t._v(" "),a("input",{staticClass:"switch-sm",attrs:{type:"checkbox",id:"switch-facet-operator"},domProps:{checked:"OR"===t.getFacetOperator},on:{click:t.toggleFacetOperator}}),t._v(" "),a("label",{attrs:{for:"switch-facet-operator"}},[t._v(t._s(t.$t("message.datasetFacets.or")))])]),t._v(" "),t.browser.isIE?a("span",[a("div",{staticClass:"form-check form-check-inline"},[a("input",{staticClass:"form-check-input",attrs:{type:"radio",name:"radio-facet-operator",id:"radio-and"},domProps:{checked:t.getFacetOperator===t.facetOperators.and},on:{click:function(e){return t.changeFacetOperator(t.facetOperators.and)}}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"radio-and"}},[t._v(t._s(t.$t("message.datasetFacets.and")))])]),t._v(" "),a("div",{staticClass:"form-check form-check-inline"},[a("input",{staticClass:"form-check-input",attrs:{type:"radio",name:"radio-facet-operator",id:"radio-or"},domProps:{checked:t.getFacetOperator===t.facetOperators.or},on:{click:function(e){return t.changeFacetOperator(t.facetOperators.or)}}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"radio-or"}},[t._v(t._s(t.$t("message.datasetFacets.or")))])])]):t._e()])])]):t._e(),t._v(" "),t._l(t.getAvailableFacets,(function(e,s){return e.items.length>0&&"Countries"===e.title?a("div",{key:s,staticClass:"row facet-field mb-3",class:{"mt-3":s>0}},[a("div",{staticClass:"col list-group pr-0"},[a("a",{staticClass:"list-group-item facet-header-item list-group-item-secondary"},[a("span",{staticClass:"facet-title text-secondary fw-bold"},[t._v(t._s(t.$t("message.datasetFacets.facets."+e.title.toLowerCase())))])]),t._v(" "),t._l(t.sortByCount(e.items),(function(s,i){return(t.isExpanded(e.title)?i<=t.limits.max:i<=t.limits.min)?a("button",{key:i,staticClass:"facet list-group-item list-group-item-action d-flex justify-content-between align-items-center",class:{active:t.facetIsSelected(e.id,s.id),"list-group-item-secondary":t.facetIsSelected(e.id,s.id)},on:{click:function(a){return t.facetClicked(e.id,s.id)}}},[t._v("\n            "+t._s(s.title)+"\n            "),a("span",{staticClass:"facet-count badge bg-light text-secondary border border-secondary"},[t._v(t._s(s.count))])]):t._e()})),t._v(" "),e.items.length>t.limits.min?a("button",{staticClass:"btn btn-secondary",on:{click:function(a){return t.toggleExpanded(e.title)}}},[t.isExpanded(e.title)?t._e():a("font-awesome-icon",{staticClass:"fa fs-5",attrs:{icon:{prefix:"fas",iconName:"angle-down"}}}),t._v(" "),t.isExpanded(e.title)?a("font-awesome-icon",{staticClass:"fa fs-5",attrs:{icon:{prefix:"fas",iconName:"angle-up"}}}):t._e()],1):t._e()],2)]):t._e()}))],2)])])}),[],!1,null,"3f553609",null).exports,x=a(68982),O=a(22259),P=a(43941),L={name:"peacockCatalogues",dependencies:["CatalogueService"],components:{selectedFacetsOverview:a(54993).Z,dataInfoBox:x.Z,catalogueFacets:S,pagination:O.Z},props:{infiniteScrolling:{type:Boolean,default:!1},pagination:{type:Boolean,default:!0}},data:function(){return{autocompleteData:{suggestions:{},show:!0},datasetCounts:{},debouncedOnBottomScroll:g()(this.onBottomScroll,500),facetFields:[],lang:this.locale,query:"",sortSelected:"relevance desc, modification_date desc, title.en asc",sortSelectedLabel:this.$t("message.sort.relevance")}},head:{meta:[{property:"robots",content:"follow,noindex"}]},computed:c()({},(0,p.Se)("catalogues",["getCatalogues","getCataloguesCount","getFacets","getLimit","getLoading","getOffset","getPage","getPageCount","getAvailableFacets"]),{page:function(){return this.$route.query.page},facets:function(){var t={},e=!0,a=!1,s=void 0;try{for(var i,n=this.facetFields[Symbol.iterator]();!(e=(i=n.next()).done);e=!0){var o=i.value,r=this.$route.query[o];r?Array.isArray(r)||(r=[r]):r=[],t[o]=r}}catch(t){a=!0,s=t}finally{try{e||null==n.return||n.return()}finally{if(a)throw s}}return t}}),methods:c()({},(0,p.nv)("catalogues",["autocompleteQuery","loadCatalogues","loadAdditionalCatalogues","setQuery","setPage","useService","addFacet","setFacets","setFacetOperator","setFacetGroupOperator","setPageCount","setSort","setLoading"]),{has:u(),getTranslationFor:C.mE,getCountryFlagImg:C.xw,autocomplete:function(t){var e=this;this.autocompleteQuery(t).then((function(a){e.autocompleteData.suggestions=[];var s=a.data.result,i=[],n=!0,o=!1,r=void 0;try{for(var c,l=s.results[Symbol.iterator]();!(n=(c=l.next()).done);n=!0){var u=c.value;i.push(u)}}catch(t){o=!0,r=t}finally{try{n||null==l.return||l.return()}finally{if(o)throw r}}e.autocompleteData.suggestions=i,e.autocompleteData.show=0!==t.length})).catch((function(){}))},handleSuggestionSelection:function(t){this.$router.push({path:"/"===this.$route.path.slice(-1)?"".concat(this.$route.path).concat(t.idName):"".concat(this.$route.path,"/").concat(t.idName)})},changePageTo:function(t){this.$router.replace({query:Object.assign({},this.$route.query,{page:t})}),this.scrollTo(0,0)},onScroll:function(){var t=this.$el.querySelectorAll(".catalogue"),e=t[t.length-1];e&&(e.getBoundingClientRect().bottom-window.innerHeight<=0&&this.debouncedOnBottomScroll())},onBottomScroll:function(){var t=this;this.$nextTick((function(){t.$Progress.start(),t.setLoading(!0),t.loadAdditionalCatalogues().then((function(){t.$Progress.finish(),t.setLoading(!1)})).catch((function(){t.$Progress.fail(),t.setLoading(!1)}))}))},scrollTo:function(t,e){window.scrollTo(t,e)},removeDuplicatesOf:function(t){return o()(new Set(t))},initPage:function(){var t=parseInt(this.$route.query.page,10);t>0?this.setPage(t):this.setPage(1)},initQuery:function(){var t=this.$route.query.query;t?(this.query=t,this.setQuery(t)):(t="",this.setQuery(""))},initFacets:function(){for(var t=0,e=["country","catalog","categories","keywords","format","licence"];t<e.length;t++){var a=e[t];if(this.facetFields.push(a),Object.prototype.hasOwnProperty.call(this.$route.query,[a])){var s=!0,n=!1,o=void 0;try{for(var r,c=this.$route.query[a][Symbol.iterator]();!(s=(r=c.next()).done);s=!0){var l=r.value;this.addFacet({field:a,facet:l})}}catch(t){n=!0,o=t}finally{try{s||null==c.return||c.return()}finally{if(n)throw o}}}else this.$router.replace({query:Object.assign({},this.$route.query,i()({},a,[]))})}},initFacetOperator:function(){var t=this.$route.query.facetOperator;"AND"!==t&&"OR"!==t||this.setFacetOperator(t)},initFacetGroupOperator:function(){var t=this.$route.query.facetOperator;"AND"!==t&&"OR"!==t||this.setFacetGroupOperator(t)},initSort:function(){var t=this.$route.query.sort;t&&("relevance+desc"===(t=t.split(",")[0].toLowerCase())&&(this.sortSelectedLabel=this.$t("message.sort.relevance")),t.includes("title")&&t.includes("asc")&&(this.sortSelectedLabel=this.$t("message.sort.nameAZ")),t.includes("title")&&t.includes("desc")&&(this.sortSelectedLabel=this.$t("message.sort.nameZA")),"modification_date+desc"===t&&(this.sortSelectedLabel=this.$t("message.sort.lastUpdated")),"release_date+desc"===t&&(this.sortSelectedLabel=this.$t("message.sort.lastCreated")),this.sortSelected=t)},getFileTypeColor:function(t){return f.Z.getFileTypeColor(t)},filterDateFormatUS:function(t){return P.Z.formatUS(t)},filterDateFormatEU:function(t){return P.Z.formatEU(t)},filterDateFromNow:function(t){return P.Z.fromNow(t)},setSortMethod:function(t,e,a){this.sortSelectedLabel=a,this.sortSelected="".concat(t,"+").concat(e)},changeQuery:function(t){this.$router.replace({query:Object.assign({},this.$route.query,{query:t})}),this.setQuery(t)}}),watch:{facets:{handler:function(t){this.setFacets(t)},deep:!0},page:function(t){var e=parseInt(t,10);e>0?this.setPage(e):this.setPage(1)},sortSelected:{handler:function(t){this.$router.replace({query:Object.assign({},this.$route.query,{sort:t})}),this.setSort(t)},deep:!0}},created:function(){var t=this;this.useService(this.CatalogueService),this.initPage(),this.initQuery(),this.initSort(),this.initFacetOperator(),this.initFacetGroupOperator(),this.initFacets(),this.$nextTick((function(){t.$Progress.start(),t.loadCatalogues({}).then((function(){t.setPageCount(Math.ceil(t.getCataloguesCount/t.getLimit)),t.$Progress.finish()})).catch((function(){return t.$Progress.fail()}))})),this.infiniteScrolling&&window.addEventListener("scroll",this.onScroll)},mounted:function(){},beforeDestroy:function(){this.infiniteScrolling&&window.removeEventListener("scroll",this.onScroll)}},T=(a(72846),(0,F.Z)(L,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid catalogues"},[a("div",{staticClass:"row"},[a("catalogue-facets",{staticClass:"col-md-3 col-12 mb-3 mb-md-0 px-0"}),t._v(" "),a("section",{staticClass:"col-md col-12"},[a("div",{staticClass:"filters-group"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dropdown d-inline-block"},[a("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{type:"button",id:"dropdown-sort-by","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("\n                "+t._s(t.$t("message.sort.sortBy")+": "+t.sortSelectedLabel)+"\n              ")]),t._v(" "),a("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdown-sort-by"}},[a("button",{staticClass:"dropdown-item",on:{click:function(e){t.setSortMethod("relevance","desc",t.$t("message.sort.relevance"))}}},[t._v(t._s(t.$t("message.sort.relevance")))]),t._v(" "),a("button",{staticClass:"dropdown-item",on:{click:function(e){t.setSortMethod("title."+t.$i18n.locale,"asc",t.$t("message.sort.nameAZ"))}}},[t._v("\n                  "+t._s(t.$t("message.sort.nameAZ")))]),t._v(" "),a("button",{staticClass:"dropdown-item",on:{click:function(e){t.setSortMethod("title."+t.$i18n.locale,"desc",t.$t("message.sort.nameZA"))}}},[t._v("\n                  "+t._s(t.$t("message.sort.nameZA")))]),t._v(" "),a("button",{staticClass:"dropdown-item",on:{click:function(e){t.setSortMethod("modification_date","desc",t.$t("message.sort.lastUpdated"))}}},[t._v("\n                  "+t._s(t.$t("message.sort.lastUpdated")))]),t._v(" "),a("button",{staticClass:"dropdown-item",on:{click:function(e){t.setSortMethod("release_date","desc",t.$t("message.sort.lastCreated"))}}},[t._v("\n                  "+t._s(t.$t("message.sort.lastCreated")))])])])])]),t._v(" "),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"form-control",attrs:{type:"text","aria-label":t.$t("message.catalogues.searchBar.placeholder"),placeholder:t.$t("message.catalogues.searchBar.placeholder")},domProps:{value:t.query},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.changeQuery(t.query)},click:function(e){t.autocompleteData.show=t.autocompleteData.suggestions.length>0&&0!=t.query.length&&!t.autocompleteData.show},input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-sm btn-secondary",attrs:{type:"button"},on:{click:function(e){return t.changeQuery(t.query)}}},[a("font-awesome-icon",{staticClass:"fa fs-5 my-1",attrs:{icon:{prefix:"fas",iconName:"search"}}})],1)]),t._v(" "),t.autocompleteData.show?a("div",{staticClass:"suggestion-list-group"},[a("ul",{staticClass:"list-group suggestion-list"},t._l(t.autocompleteData.suggestions,(function(e){return a("button",{key:e.id,staticClass:"list-group-item list-group-item-action",on:{click:function(a){return t.handleSuggestionSelection(e)}}},[t._v("\n                    "+t._s(t.getTranslationFor(e.title,t.$i18n.locale,[e.country.id].concat(e.languages)))+"\n                  ")])})),0)]):t._e()])])])]),t._v(" "),a("div",{staticClass:"alert alert-secondary mt-3 d-flex flex-row"},[a("div",[t._v("\n          "+t._s(t.getLoading?t.$t("message.catalogues.loadingMessage"):t.getCataloguesCount+"\n          "+t.$t("message.catalogues.countMessage"))+"\n        ")]),t._v(" "),t.getLoading?a("div",{staticClass:"text-center ml-3"},[t._m(0)]):t._e()]),t._v(" "),a("selectedFacetsOverview",{attrs:{"selected-facets":t.getFacets}}),t._v(" "),t._l(t.getCatalogues,(function(e){return a("data-info-box",{key:e.idName,ref:"catalogueBox",refInFor:!0,staticClass:"catalogue",attrs:{"link-to":"datasets?catalog="+e.idName+"&showcataloguedetails=true",title:t.getTranslationFor(e.title,t.$i18n.locale,t.has(e,"country.id")?[e.country.id].concat(e.languages):e.languages)||e.id,description:t.getTranslationFor(e.description,t.$i18n.locale,t.has(e,"country.id")?[e.country.id].concat(e.languages):e.languages),"body-img":t.getCountryFlagImg(t.has(e,"country.id")?e.country.id:"eu"),"footer-tags":[""+(t.has(e,"count")?e.count:0)]}})})),t._v(" "),t.getLoading?a("div",{staticClass:"text-center mt-3 mb-3"},[t._m(1)]):t._e()],2)],1),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"column col-12 col-md-8 offset-md-4"},[a("div",{staticClass:"d-flex flex-row justify-content-center"},[t.pagination?a("pagination",{staticClass:"mt-3",attrs:{"items-count":t.getCataloguesCount,"items-per-page":t.getLimit,"click-handler":t.changePageTo,"get-page":this.getPage,"next-button-text":t.$t("message.pagination.nextPage"),"prev-button-text":t.$t("message.pagination.previousPage")}}):t._e()],1)])])])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner-border text-secondary",attrs:{role:"status"}},[a("span",{staticClass:"visually-hidden"},[t._v("Loading...")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner-border text-secondary",attrs:{role:"status"}},[a("span",{staticClass:"visually-hidden"},[t._v("Loading...")])])}],!1,null,"49e96ae0",null).exports)},9694:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return j}});var s=a(60693),i=a.n(s),n=a(20629),o=a(42180),r=a(74305),c={name:"peacockDatasetDetailsNavigation",components:{appLink:o.Z},data:function(){return{navbarCollapsed:!1,showDataset:!0,showCategories:r.Z.enable.dataset.categories,showSimilarDatasets:r.Z.enable.dataset.similarDatasets,showActivityStream:r.Z.enable.dataset.activityStream}},computed:i()({},(0,n.Se)("datasetDetails",["getActiveNavigationTab","getID"])),methods:i()({},(0,n.nv)("datasetDetails",["setActiveNavigationTab"]),{isPath:function(t){var e="/datasets/".concat(this.getID).concat(t),a=this.$router.currentRoute.path.indexOf(e);return a>=0&&a+e.length===this.$router.currentRoute.path.length}})},l=(a(84197),a(51900)),u=(0,l.Z)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return[t.showDataset,t.showCategories,t.showSimilarDatasets,t.showActivityStream].filter(Boolean).length>1?a("nav",{key:t.getActiveNavigationTab},[a("ul",{staticClass:"nav nav-tabs"},[t.showDataset?a("li",{staticClass:"nav-item",on:{click:function(e){return t.setActiveNavigationTab(0)}}},[a("app-link",{class:{"nav-link":!0,active:t.isPath("")||t.isPath("/"),"link-dark":!t.isPath("")&&!t.isPath("/")},attrs:{to:{path:"/datasets/"+t.getID+"/",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.dataset"))+"\n      ")])],1):t._e(),t._v(" "),t.showCategories?a("li",{staticClass:"nav-item",on:{click:function(e){return t.setActiveNavigationTab(1)}}},[a("app-link",{class:{"nav-link":!0,active:t.isPath("/categories"),"link-dark":!t.isPath("/categories")},attrs:{to:{path:"/datasets/"+t.getID+"/categories",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.categories"))+"\n      ")])],1):t._e(),t._v(" "),t.showSimilarDatasets?a("li",{staticClass:"nav-item",on:{click:function(e){return t.setActiveNavigationTab(2)}}},[a("app-link",{class:{"nav-link":!0,active:t.isPath("/similarDatasets"),"link-dark":!t.isPath("/similarDatasets")},attrs:{to:{path:"/datasets/"+t.getID+"/similarDatasets",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.similarDatasets"))+"\n      ")])],1):t._e(),t._v(" "),t.showActivityStream?a("li",{staticClass:"nav-item",on:{click:function(e){return t.setActiveNavigationTab(3)}}},[a("app-link",{class:{"nav-link":!0,active:t.isPath("/activityStream"),"link-dark":!t.isPath("/activityStream")},attrs:{to:{path:"/datasets/"+t.getID+"/activityStream",query:Object.assign({},t.$route.query)}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.activityStream"))+"\n      ")])],1):t._e()])]):t._e()}),[],!1,null,"616c8bca",null).exports,d=a(50008),g=a.n(d),p=a(18721),f=a.n(p),m=a(47191),h={name:"peacockDatasetDetailsFeedbackButton",components:{appLink:o.Z},data:function(){return{rootURL:"https://www.europeandataportal.eu/"}},computed:i()({},(0,n.Se)("datasetDetails",["getID","getLanguages","getTitle"])),methods:{has:f(),getTranslationFor:m.mE,getFeedbackQuery:function(t,e){if(!r.Z.enable.dataset.feedback)return!1;if(!t||!e||"object"!==g()(e))return!1;var a=this.getTranslationFor(e,this.$i18n.locale,this.getLanguages);if(!a)return!1;a=a.replace(/ /g,"+");var s="".concat(this.$t("message.datasetDetails.subnav.dataset"),"+URL:+").concat(this.rootURL,"data/%23/datasets/").concat(t),i="".concat(this.$t("message.datasetDetails.feedback"),"+").concat(this.$t("message.datasetDetails.about"),"+").concat(this.$t("message.datasetDetails.subnav.dataset"),":+").concat(a);return"?type=".concat("3","&description=").concat(s,"&summary=").concat(i)}}},v=(0,l.Z)(h,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.getFeedbackQuery(t.getID,t.getTitle)?a("app-link",{attrs:{path:"/"+this.$i18n.locale+"/feedback/form",query:t.getFeedbackQuery(t.getID,t.getTitle),target:"_blank"},on:{click:function(e){t.$emit("trackLink","/"+this.$i18n.locale+"/feedback/form"+t.getFeedbackQuery(t.getID,t.getTitle),"link")}}},[a("button",{staticClass:"mt-1 btn btn-sm btn-secondary feedback"},[t._v("\n    "+t._s(t.$t("message.datasetDetails.feedback"))+"\n  ")])]):t._e()}),[],!1,null,"04f85128",null).exports,b={name:"PeacockDatasetDetailsShareButton",components:{appLink:o.Z},data:function(){return{}},props:{to:{type:String,default:"",required:!0},icon:{type:Object,default:"",required:!0}},computed:{url:function(){return window.location.href}},methods:{}},y=(0,l.Z)(b,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-link",{staticClass:"text-dark text-decoration-none",attrs:{to:t.to,target:"_blank"}},[a("button",{staticClass:"btn btn-block text-left"},[t._v("\n    "+t._s(t.$t("message.datasetDetails.share.on"))+"\n    "),a("font-awesome-icon",{staticClass:"ml-1 fa",attrs:{icon:t.icon}})],1)])}),[],!1,null,"660d096b",null).exports,_=a(14293),C=a.n(_),w=a(16200),k=a(43941),D={name:"peacockDatasetDetailsHeader",components:{DatasetDate:w.Z},dependencies:"DatasetService",data:function(){return{}},computed:i()({},(0,n.Se)("datasetDetails",["getCatalog","getCountry","getLanguages","getModificationDate","getTitle"])),methods:{has:f(),isNil:C(),getTranslationFor:m.mE,getCountryFlagImg:m.xw,filterDateFormatUS:function(t){return k.Z.formatUS(t)},filterDateFormatEU:function(t){return k.Z.formatEU(t)},filterDateFromNow:function(t){return k.Z.fromNow(t)},showCountryFlag:function(t){return f()(t,"id")&&!C()(t.id)}}},$=(0,l.Z)(D,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("h3",[t._v(t._s(t.getTranslationFor(t.getTitle,t.$i18n.locale,t.getLanguages)))])])]),t._v(" "),a("div",{staticClass:"row mt-1 pb-3 border-bottom"},[a("div",{staticClass:"col-6"},[t.showCountryFlag(t.getCountry)?a("img",{staticClass:"mr-1 border border-dark",attrs:{width:"30",alt:"Catalog Flag",src:t.getCountryFlagImg(t.getCountry.id)}}):t._e(),t._v(" "),a("span",[t._v(t._s(t.getTranslationFor(t.getCatalog.title,t.$i18n.locale,t.getLanguages)))])]),t._v(" "),a("div",{staticClass:"col-6 text-end text-break"},[a("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$t("message.metadata.updated"))+":")]),t._v(" "),a("dataset-date",{attrs:{date:t.getModificationDate}})],1)])])}),[],!1,null,"5ce72c3b",null).exports,F={name:"peacockDatasetDetailsDeleteButton",dependencies:["uploadService","authService"],components:{appLink:o.Z},data:function(){return{error:"",catalog:""}},computed:i()({},(0,n.Se)("datasetDetails",["getID","getLanguages","getTitle","getCatalog"]),(0,n.Se)("auth",["securityAuth"])),methods:{deleteDataSet:function(){var t=this,e=this.normalize(this.getID);this.$Progress.start(),this.authService.refreshToken(this.securityAuth).then((function(a){t.authService.getRTPToken(a).then((function(a){t.uploadService.deleteDistribution(e,t.getCatalog.id,a.data.access_token).then((function(e){t.$router.push({name:"Catalogues"}),t.$Progress.finish()})).catch((function(e){t.error="error : ".concat(e.response.status," ").concat(e.response.statusText),t.$Progress.fail()}))}))}))},normalize:m.Fv}},S=(0,l.Z)(F,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-link",[a("div",{staticClass:"modal fade",attrs:{id:"deleteModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title text-dark",attrs:{id:"deleteModalLabel"}},[t._v("Are you sure you want to delete this item?")]),t._v(" "),a("button",{staticClass:"close btn btn-secondary",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),t.error?a("div",{staticClass:"modal-body"},[a("div",{staticClass:"alert alert-danger w-100",attrs:{role:"alert"}},[t._v("\n              "+t._s(t.error)+"\n            ")])]):t._e(),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary btn-no",attrs:{type:"button","data-bs-dismiss":"modal"}},[t._v("No")]),t._v(" "),a("button",{staticClass:"btn btn-secondary btn-yes",attrs:{type:"button","data-bs-dismiss":"modal"},on:{click:t.deleteDataSet}},[t._v("Yes")])])])])]),t._v(" "),a("button",{staticClass:"mt-1 btn btn-sm btn-outline-secondary delete",attrs:{"data-bs-toggle":"modal","data-bs-target":"#deleteModal"}},[t._v("\n    "+t._s(t.$t("message.datasetDetails.delete"))+"\n  ")])])}),[],!1,null,"76a4165c",null).exports,x={name:"peacockDatasetDetailsEditButton",components:{appLink:o.Z},data:function(){return{error:"",catalog:""}},computed:i()({},(0,n.Se)("datasetDetails",["getID","getLanguages","getTitle","getCatalog","getCategories","getContactPoints","getDescription","getDistributions","getDistributionFormats","getLandingPages","getLicences","getPublisher","getKeywords"])),methods:{}},O=(0,l.Z)(x,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-link",{attrs:{to:{name:"upload",params:{id:t.getID,title:t.getTitle,description:t.getDescription,keywords:t.getKeywords,catalog:t.getCatalog.id,catagory:t.getCategories,contact_point:t.getContactPoints,publisher:t.getPublisher,distributions:t.getDistributions}}}},[a("button",{staticClass:"mt-1 btn btn-sm btn-outline-secondary edit"},[t._v("\n    "+t._s(t.$t("message.datasetDetails.edit"))+"\n  ")])])}),[],!1,null,"9534cc14",null).exports,P=a(21351),L={name:"peacockDatasetDetailsMetadataButton",components:{appLink:o.Z},data:function(){return{error:"",catalog:""}},computed:i()({},(0,n.Se)("datasetDetails",["getCatalog","getCategories","getConformsTo","getContactPoints","getCountry","getDescription","getDistributions","getDistributionFormats","getDocumentations","getFrequency","getIdentifiers","getID","getIdName","getLandingPages","getLanguages","getLicences","getLoading","getModificationDate","getOriginalLanguage","getOtherIdentifiers","getProvenances","getPublisher","getRelatedResources","getReleaseDate","getKeywords","getService","getSimilarDatasets","getSources","getSpatial","getTranslationMetaData","getTitle"])),methods:{metadataLink:function(){if(this.matomoTrackPageView)return window._paq.push(["setCustomUrl","".concat(window.location.origin).concat(this.path)]),void window._paq.push(["trackPageView"]);this.matomoTrackDownload?window._paq.push(["metadataLink",this.url,"download"]):window._paq.push(["metadataLink",this.url,"link"]),this.onClick()},onClick:function(){this.copyToClipboard((0,P.C)(this))},copyToClipboard:function(t){var e=document.createElement("INPUT");e.value=JSON.stringify(t),document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}},T=(0,l.Z)(L,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{staticClass:"mt-1 btn btn-sm btn-outline-secondary metadata",attrs:{href:"#"},on:{click:t.metadataLink,mousedown:function(e){return"button"in e&&1!==e.button?null:t.metadataLink(e)}}},[t._v("\n  "+t._s(t.$t("message.datasetDetails.metadata"))+"\n")])}),[],!1,null,"741d4b69",null).exports,q=a(86469),Z={name:"peacockDatasetDetailsTop",dependencies:["authService","DatasetService"],components:{datasetDetailsNavigation:u,datasetDetailsFeedbackButton:v,datasetDetailsShareButton:y,datasetDetailsDeleteButton:S,datasetDetailsEditButton:O,datasetDetailsMetadataButton:T,datasetDetailsHeader:$,appLink:o.Z},data:function(){return{rtpToken:"",catalogId:"",favorite:!1,showFavorites:r.Z.enable.favorites.enable}},computed:i()({},(0,n.Se)("auth",["securityAuth","getRTPToken"]),(0,n.Se)("datasetDetails",["getCatalog"]),{authenticated:function(){var t=this;return!!this.getRTPToken&&(!!this.getCatalog.id&&!!this.decode(this.getRTPToken).authorization.permissions.find((function(e){return t.getCatalog.id===e.rsname.replace("https://europeandataportal.eu/id/catalogue/","")&&e.scopes.find((function(t){return"update"===t}))})))},url:function(){return window.location.href}}),created:function(){},props:{activeTab:{type:Number,default:0}},methods:i()({},(0,n.nv)("datasetDetails",["loadDatasetDetails","useService"]),{decode:q.J,onFavorites:function(t){t.preventDefault()}})},N=(a(58308),(0,l.Z)(Z,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mt-1 mb-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 text-end"},[t.authenticated?a("datasetDetailsEditButton"):t._e(),t._v(" "),t.authenticated?a("datasetDetailsDeleteButton"):t._e(),t._v(" "),t.showFavorites?a("datasetDetailsMetadataButton"):t._e(),t._v(" "),t.showFavorites?a("button",{staticClass:"btn btn-sm btn-secondary mt-1",attrs:{type:"button"},on:{click:t.onFavorites}},[!0===t.favorite?a("font-awesome-icon",{staticClass:"fa fs-6",attrs:{icon:{prefix:"fas",iconName:"heart"}}}):a("font-awesome-icon",{staticClass:"fa fs-6",attrs:{icon:{prefix:"far",iconName:"heart"}}})],1):t._e(),t._v(" "),a("datasetDetailsFeedbackButton"),t._v(" "),a("div",{staticClass:"d-inline dropdown"},[a("a",{staticClass:"mt-1 btn btn-sm btn-secondary dropdown-toggle",attrs:{href:"#",role:"button",id:"dropdownMenuLink","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[a("font-awesome-icon",{staticClass:"me-1 fa",attrs:{icon:{prefix:"fas",iconName:"share-alt"}}}),t._v("\n          "+t._s(t.$t("message.datasetDetails.share.dataset"))+"\n        ")],1),t._v(" "),a("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},[a("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://www.facebook.com/sharer.php?u="+t.url,icon:{prefix:"fab",iconName:"facebook-f"}}}),t._v(" "),a("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://twitter.com/intent/tweet?url="+t.url,icon:{prefix:"fab",iconName:"twitter"}}}),t._v(" "),a("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://www.linkedin.com/shareArticle?mini=true&url="+t.url,icon:{prefix:"fab",iconName:"linkedin-in"}}})],1)])],1)]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("datasetDetailsNavigation")],1)]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 mt-3"},[a("datasetDetailsHeader")],1)])])}),[],!1,null,"7a5dabe7",null).exports),E=a(79800),A=a(6933),I=a(59576),B={name:"peacockDatasetDetails",components:{datasetDetailsTop:N,datasetDetailsDataset:E.Z,datasetDetailsCategories:A.Z,datasetDetailsSimilarDatasets:I.Z},data:function(){return{}},props:{activeTab:{type:Number,default:0}},computed:i()({},(0,n.Se)("datasetDetails",["getActiveNavigationTab","getID"])),methods:i()({},(0,n.nv)("datasetDetails",["setActiveNavigationTab"])),created:function(){},mounted:function(){}},j=(a(29091),(0,l.Z)(B,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mb-5",attrs:{about:"/datasets/"+t.getID,typeof:"dcat:Dataset"}},[a("datasetDetailsTop"),t._v(" "),a("router-view",{attrs:{name:"datasetDetailsSubpages"}})],1)}),[],!1,null,"6c23ac43",null).exports)},58056:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return n}});var s=a(78421),i={name:"peacockFooter",components:{AppLink:a(42180).Z},data:function(){var t=this;return{images:s.b.images.footerLogos,links:s.b.navigation.topnav.sub.append.map((function(e){return{title:t.$t(e.title),href:e.href,web:0===e.href.indexOf("http://")||0===e.href.indexOf("https://")}}))}}},n=(0,a(51900).Z)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"bg-light text-center text-lg-start border-top mt-3"},[a("div",{staticClass:"container-fluid navbar-expand-sm"},[a("ul",{staticClass:"navbar-nav"},[a("li",{staticClass:"nav-item"},t._l(t.images,(function(e,s){return a("app-link",{key:s,staticClass:"nav-link link-secondary",attrs:{to:0===e.href.indexOf("http://")||0===e.href.indexOf("https://")?e.href:{path:e.href}}},[a("div",{staticClass:"project-title-container"},[e.src?a("img",{key:s,staticClass:"footer-logo",attrs:{src:e.src,height:"40",title:e.description}}):t._e(),t._v(" "),e.text?a("span",[t._v(t._s(e.text))]):t._e()])])})),1),t._v(" "),t._l(t.links,(function(e,s){return a("li",{key:s,staticClass:"nav-item"},[a("app-link",{staticClass:"nav-link link-secondary",attrs:{to:e.web?e.href:{path:e.href}}},[t._v("\n          "+t._s(e.title)+"\n        ")])],1)}))],2)])])}),[],!1,null,"581239d8",null).exports},73486:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return o}});var s=a(9669),i=a.n(s),n={name:"StaticPage",props:{fileName:{type:String,default:"/"}},data:function(){return{input:""}},computed:{compiledHtml:function(){return this.input}},created:function(){this.loadFile()},methods:{loadFile:function(){var t=this;i()({method:"get",url:this.fileName}).then((function(e){t.input=e.data})).catch((function(){t.$router.push({name:"NotFound"})}))}}},o=(0,a(51900).Z)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-1 mb-3"},[a("div",{staticClass:"col-12",domProps:{innerHTML:t._s(t.compiledHtml)}})])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=app.common.js.map