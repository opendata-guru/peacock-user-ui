(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{597:function(t,a,e){t.exports={primary:"$primary"}},598:function(t,a,e){},599:function(t,a,e){},600:function(t,a,e){t.exports={primary:"$primary"}},601:function(t,a,e){t.exports={primary:"$primary"}},609:function(t,a,e){"use strict";var s=e(597);e.n(s).a},610:function(t,a,e){"use strict";var s=e(598);e.n(s).a},611:function(t,a,e){"use strict";var s=e(599);e.n(s).a},612:function(t,a,e){"use strict";var s=e(600);e.n(s).a},613:function(t,a,e){"use strict";var s=e(601);e.n(s).a},623:function(t,a,e){"use strict";e.r(a);var s=e(11),i=e.n(s),n=e(3),o=e(32),r=e(12),l={name:"datasetDetailsNavigation",components:{appLink:o.a},data:function(){return{navbarCollapsed:!1,showDataset:!0,showCategories:r.a.enable.dataset.categories,showSimilarDatasets:r.a.enable.dataset.similarDatasets,showActivityStream:r.a.enable.dataset.activityStream}},computed:i()({},Object(n.c)("datasetDetails",["getActiveNavigationTab","getID"])),methods:i()({},Object(n.b)("datasetDetails",["setActiveNavigationTab"]))},c=(e(609),e(4)),d=Object(c.a)(l,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return[t.showDataset,t.showCategories,t.showSimilarDatasets,t.showActivityStream].filter(Boolean).length>1?e("nav",{key:t.getActiveNavigationTab},[e("ul",{staticClass:"menu m-0 list-inline list-unstyled"},[t.showDataset?e("li",{staticClass:"my-2 mr-5 list-inline-item",on:{click:function(a){return t.setActiveNavigationTab(0)}}},[e("app-link",{staticClass:"text-dark",attrs:{to:{path:"/datasets/"+t.getID+"/",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.dataset"))+"\n      ")])],1):t._e(),t._v(" "),t.showCategories?e("li",{staticClass:"my-2 mr-5 list-inline-item",on:{click:function(a){return t.setActiveNavigationTab(1)}}},[e("app-link",{staticClass:"text-dark",attrs:{to:{path:"/datasets/"+t.getID+"/categories",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.categories"))+"\n      ")])],1):t._e(),t._v(" "),t.showSimilarDatasets?e("li",{staticClass:"my-2 mr-5 list-inline-item",on:{click:function(a){return t.setActiveNavigationTab(2)}}},[e("app-link",{staticClass:"text-dark",attrs:{to:{path:"/datasets/"+t.getID+"/similarDatasets",query:Object.assign({},{locale:t.$route.query.locale})}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.similarDatasets"))+"\n      ")])],1):t._e(),t._v(" "),t.showActivityStream?e("li",{staticClass:"my-2 mr-5 list-inline-item",on:{click:function(a){return t.setActiveNavigationTab(3)}}},[e("app-link",{staticClass:"text-dark",attrs:{to:{path:"/datasets/"+t.getID+"/activityStream",query:Object.assign({},t.$route.query)}}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.subnav.activityStream"))+"\n      ")])],1):t._e()])]):t._e()}),[],!1,null,"69df4e00",null).exports,u=e(78),g=e.n(u),m=e(1),p=e.n(m),b=e(23),v={name:"EDP2-datasetDetailsFeedbackButton",components:{appLink:o.a},data:function(){return{rootURL:"https://www.europeandataportal.eu/"}},computed:i()({},Object(n.c)("datasetDetails",["getID","getLanguages","getTitle"])),methods:{has:p.a,getTranslationFor:b.b,getFeedbackQuery:function(t,a){if(!r.a.enable.dataset.feedback)return!1;if(!t||!a||"object"!==g()(a))return!1;var e=this.getTranslationFor(a,this.$i18n.locale,this.getLanguages);if(!e)return!1;e=e.replace(/ /g,"+");var s="".concat(this.$t("message.datasetDetails.subnav.dataset"),"+URL:+").concat(this.rootURL,"data/%23/datasets/").concat(t),i="".concat(this.$t("message.datasetDetails.feedback"),"+").concat(this.$t("message.datasetDetails.about"),"+").concat(this.$t("message.datasetDetails.subnav.dataset"),":+").concat(e);return"?type=".concat("3","&description=").concat(s,"&summary=").concat(i)}}},h=Object(c.a)(v,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.getFeedbackQuery(t.getID,t.getTitle)?e("app-link",{attrs:{path:"/"+this.$i18n.locale+"/feedback/form",query:t.getFeedbackQuery(t.getID,t.getTitle),target:"_blank"},on:{click:function(a){t.$emit("trackLink","/"+this.$i18n.locale+"/feedback/form"+t.getFeedbackQuery(t.getID,t.getTitle),"link")}}},[e("button",{staticClass:"mt-1 btn btn-sm btn-light"},[t._v("\n    "+t._s(t.$t("message.datasetDetails.feedback"))+"\n  ")])]):t._e()}),[],!1,null,"6db9c345",null).exports,f={name:"EDP2-datasetDetailsShareButton",components:{appLink:o.a},data:function(){return{}},props:{to:{type:String,default:"",required:!0},icon:{type:Object,default:"",required:!0}},computed:{url:function(){return window.location.href}},methods:{}},D=Object(c.a)(f,(function(){var t=this.$createElement,a=this._self._c||t;return a("app-link",{staticClass:"text-dark text-decoration-none",attrs:{to:this.to,target:"_blank"}},[a("button",{staticClass:"btn btn-block text-left"},[this._v("\n    Share on\n    "),a("font-awesome-icon",{staticClass:"ml-1 fa",attrs:{icon:this.icon}})],1)])}),[],!1,null,"6eef7ee8",null).exports,_=e(0),C=e.n(_),y=e(222),k=e(37),w={name:"datasetDetailsDataset",components:{DatasetDate:y.a},dependencies:"DatasetService",data:function(){return{}},computed:i()({},Object(n.c)("datasetDetails",["getCatalog","getCountry","getLanguages","getModificationDate","getTitle"])),methods:{has:p.a,isNil:C.a,getTranslationFor:b.b,getCountryFlagImg:b.a,filterDateFormatUS:function(t){return k.a.formatUS(t)},filterDateFormatEU:function(t){return k.a.formatEU(t)},filterDateFromNow:function(t){return k.a.fromNow(t)},showCountryFlag:function(t){return p()(t,"id")&&!C()(t.id)}}},T=Object(c.a)(w,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-10 offset-1"},[e("h3",[t._v(t._s(t.getTranslationFor(t.getTitle,t.$i18n.locale,t.getLanguages)))])])]),t._v(" "),e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col-6 offset-1"},[t.showCountryFlag(t.getCountry)?e("img",{staticClass:"mr-1 border border-dark",attrs:{width:"30",alt:"Catalog Flag",src:t.getCountryFlagImg(t.getCountry.id)}}):t._e(),t._v(" "),e("span",[t._v(t._s(t.getTranslationFor(t.getCatalog.title,t.$i18n.locale,t.getLanguages)))])]),t._v(" "),e("div",{staticClass:"col-4 px-1 text-right text-break"},[e("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.$t("message.metadata.updated"))+":")]),t._v(" "),e("dataset-date",{attrs:{date:t.getModificationDate}})],1)]),t._v(" "),e("hr")])}),[],!1,null,"3d9ba4f6",null).exports,$={name:"EDP2-datasetDetailsDeleteButton",dependencies:["uploadService","authService"],components:{appLink:o.a},data:function(){return{error:"",catalog:""}},computed:i()({},Object(n.c)("datasetDetails",["getID","getLanguages","getTitle","getCatalog"]),Object(n.c)("auth",["securityAuth"])),methods:{deleteDataSet:function(){var t=this,a=this.normalize(this.getID);this.$Progress.start(),this.authService.refreshToken(this.securityAuth).then((function(e){t.authService.getRTPToken(e).then((function(e){t.uploadService.deleteDistribution(a,t.getCatalog.id,e.data.access_token).then((function(a){t.$router.push({name:"Catalogues"}),t.$Progress.finish()})).catch((function(a){t.error="error : ".concat(a.response.status," ").concat(a.response.statusText),t.$Progress.fail()}))}))}))},normalize:b.c}},S=(e(610),Object(c.a)($,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("app-link",[e("div",{staticClass:"modal fade",attrs:{id:"deleteModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"deleteModalLabel"}},[t._v("Are you sure you want to delete this item?")]),t._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),t.error?e("div",{staticClass:"modal-body"},[e("div",{staticClass:"alert alert-danger w-100",attrs:{role:"alert"}},[t._v("\n                        "+t._s(t.error)+"\n                      ")])]):t._e(),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("No")]),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-dismiss":"modal"},on:{click:t.deleteDataSet}},[t._v("Yes")])])])])]),t._v(" "),e("button",{staticClass:"mt-1 btn btn-sm btn-danger",attrs:{"data-toggle":"modal","data-target":"#deleteModal"}},[t._v("\n        "+t._s(t.$t("message.datasetDetails.delete"))+"\n      ")])])}),[],!1,null,"7cf4ca99",null).exports),x={name:"EDP2-datasetDetailsEditButton",components:{appLink:o.a},data:function(){return{error:"",catalog:""}},computed:i()({},Object(n.c)("datasetDetails",["getID","getLanguages","getTitle","getCatalog","getCategories","getContactPoints","getDescription","getDistributions","getDistributionFormats","getLandingPages","getLicences","getPublisher","getKeywords"])),methods:{}},j=(e(611),Object(c.a)(x,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("app-link",{attrs:{to:{name:"upload",params:{id:t.getID,title:t.getTitle,description:t.getDescription,keywords:t.getKeywords,catalog:t.getCatalog.id,catagory:t.getCategories,contact_point:t.getContactPoints,publisher:t.getPublisher,distributions:t.getDistributions}}}},[e("button",{staticClass:"mt-1 btn btn-sm btn-primary"},[t._v("\n        "+t._s(t.$t("message.datasetDetails.edit"))+"\n      ")])])}),[],!1,null,"78640fec",null).exports),O=e(94),L={name:"datasetDetailsTop",dependencies:["authService","DatasetService"],components:{datasetDetailsNavigation:d,datasetDetailsFeedbackButton:h,datasetDetailsShareButton:D,datasetDetailsDeleteButton:S,datasetDetailsEditButton:j,datasetDetailsHeader:T,appLink:o.a},data:function(){return{rtpToken:"",catalogId:""}},computed:i()({},Object(n.c)("auth",["securityAuth","getRTPToken"]),Object(n.c)("datasetDetails",["getCatalog"]),{authenticated:function(){var t=this;return!!this.getRTPToken&&(!!this.getCatalog.id&&!!this.decode(this.getRTPToken).authorization.permissions.find((function(a){return t.getCatalog.id===a.rsname.replace("https://europeandataportal.eu/id/catalogue/","")&&a.scopes.find((function(t){return"update"===t}))})))},url:function(){return window.location.href}}),created:function(){},props:{activeTab:{type:Number,default:0}},methods:i()({},Object(n.b)("datasetDetails",["loadDatasetDetails","useService"]),{decode:O.a})},F=(e(612),Object(c.a)(L,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mt-1 mb-4"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6 offset-1"},[e("datasetDetailsNavigation")],1),t._v(" "),e("div",{staticClass:"col-4 text-right"},[e("datasetDetailsFeedbackButton"),t._v(" "),e("div",{staticClass:"d-inline dropdown"},[e("a",{staticClass:"mt-1 btn btn-sm btn-light dropdown-toggle",attrs:{href:"#",role:"button",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("\n          Share Dataset\n        ")]),t._v(" "),e("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},[e("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://www.facebook.com/sharer.php?u="+t.url,icon:{prefix:"fab",iconName:"facebook-f"}}}),t._v(" "),e("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://twitter.com/intent/tweet?url="+t.url,icon:{prefix:"fab",iconName:"twitter"}}}),t._v(" "),e("datasetDetailsShareButton",{staticClass:"dropdown-item",attrs:{to:"https://www.linkedin.com/shareArticle?mini=true&url="+t.url,icon:{prefix:"fab",iconName:"linkedin-in"}}})],1)])],1),t._v(" "),t.authenticated?e("div",{staticClass:"col-12 text-right"},[e("datasetDetailsEditButton"),t._v(" "),e("datasetDetailsDeleteButton")],1):t._e(),t._v(" "),e("div",{staticClass:"col-12 mt-3"},[e("datasetDetailsHeader")],1)])])}),[],!1,null,"0ef00e07",null).exports),N=e(217),I=e(218),A=e(219),E={name:"datasetDetails",components:{datasetDetailsTop:F,datasetDetailsDataset:N.a,datasetDetailsCategories:I.a,datasetDetailsSimilarDatasets:A.a},data:function(){return{}},props:{activeTab:{type:Number,default:0}},computed:i()({},Object(n.c)("datasetDetails",["getActiveNavigationTab","getID"])),methods:i()({},Object(n.b)("datasetDetails",["setActiveNavigationTab"])),created:function(){},mounted:function(){}},P=(e(613),Object(c.a)(E,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"mb-5",attrs:{about:"/datasets/"+this.getID,typeof:"dcat:Dataset"}},[a("datasetDetailsTop"),this._v(" "),a("router-view",{attrs:{name:"datasetDetailsSubpages"}})],1)}),[],!1,null,"a41a438a",null));a.default=P.exports}}]);
//# sourceMappingURL=app.datasetDetails.js.map