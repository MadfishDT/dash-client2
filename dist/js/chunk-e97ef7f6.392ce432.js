(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e97ef7f6"],{"072d":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"app bg-white"},[s("AppHeader",{attrs:{fixed:""}},[s("SidebarToggler",{staticClass:"d-lg-none",attrs:{display:"md",mobile:""}}),s("div",{staticClass:"navbar-brand",attrs:{to:"#"}},[s("h2",[t._v("Quantified")])]),s("SidebarToggler",{staticClass:"d-md-down-none",attrs:{display:"lg",defaultOpen:!0}}),s("b-navbar-nav",{staticClass:"ml-auto"},[s("DefaultCQHeaderDropdownAccnt")],1)],1),s("div",{staticClass:"app-body"},[s("AppSidebar",{attrs:{fixed:""}},[s("SidebarHeader"),s("SidebarForm"),s("div",{staticClass:"brand-card-header bg-gray-700"},[s("img",{staticClass:"img-avatar font-2xl mr-0 float-left",attrs:{id:"img_profile",width:"65",alt:"No Image",src:this.user.imageUrl}})]),s("div",{staticClass:"brand-card-body bg-dark mb-0 pb-0"},[s("div",[s("div",{staticClass:"text-muted small"},[t._v(t._s(this.user.fullname))]),s("div",{staticClass:"text-muted small font-weight-bold"},[t._v(t._s(this.user.company))])])]),s("div",{staticClass:"dropdown-divider mt-0 mb-0",staticStyle:{"border-color":"gray"}}),s("b-tooltip",{attrs:{target:"img_profile",title:this.user.fullname}}),s("SidebarNav",{staticClass:"ml-0 pl-0",attrs:{navItems:this.categories.items},on:{click:function(a){return t.clickItems()}}}),s("SidebarFooter"),s("SidebarMinimizer")],1),s("main",{staticClass:"main"},[s("b-breadcrumb",[s("div",[t._v("\n                    "+t._s(this.questionsTitle)+"\n                ")])]),s("div",{staticClass:"container-fluid mt-2"},[s("router-view")],1)],1),s("AppAside",{attrs:{fixed:""}},[s("DefaultAside")],1)],1),s("TheFooter",[s("div",[s("a",{attrs:{href:"https://www.korea.com"}}),s("span",{staticClass:"ml-1"},[t._v("© 2019 Quantified")])])])],1)},i=[],r=(s("7f7f"),s("96cf"),s("3b8d")),o=s("530d"),n=s("f1fb"),l=s("c44e"),c=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("AppHeaderDropdown",{attrs:{right:"","no-caret":""}},[s("template",{slot:"header"},[s("i",{staticClass:"cui-cog icons font-2xl d-block mt-0"})]),s("template",{slot:"dropdown"},[s("b-dropdown-header",{staticClass:"text-center",attrs:{tag:"div"}},[s("strong",[t._v("설문지")])]),s("b-dropdown-item",{on:{click:t.goquestions}},[s("i",{staticClass:"icon-book-open icons"}),t._v(" 설문화면으로 가기\n        ")]),s("b-dropdown-header",{staticClass:"text-center",attrs:{tag:"div"}},[s("strong",[t._v("계정")])]),s("b-dropdown-item",{on:{click:t.logout}},[s("i",{staticClass:"fa fa-lock"}),t._v(" 로그 아웃\n        ")]),s("b-dropdown-item",[s("i",{staticClass:"fa fa-user"}),t._v(" 프로필\n        ")]),s("b-dropdown-header",{staticClass:"text-center",attrs:{tag:"div"}},[s("strong",[t._v("설정들")])]),s("b-dropdown-item",[s("i",{staticClass:"fa fa-wrench"}),t._v(" 설정\n        ")])],1)],2)},m=[],d={name:"DefaultCQHeaderDropdownAccnt",components:{AppHeaderDropdown:n["g"]},data:function(){return{itemsCount:42}},methods:{showAlert:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.$bvModal.msgBoxOk(a));case 1:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}(),logout:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$service.$loginservice.logout();case 2:if(a=t.sent,!a){t.next=9;break}return t.next=6,this.showAlert("로그 아웃 성공");case 6:this.$router.push("/"),t.next=11;break;case 9:return t.next=11,this.showAlert("로그 아웃 실패");case 11:this.adjustLoginFormUI();case 12:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),goquestions:function(){this.$router.push("/qboards/questions")}}},u=d,v=s("2877"),g=Object(v["a"])(u,c,m,!1,null,null,null),p=g.exports,b=(s("ac4d"),s("ac6a"),s("d225")),C=s("b0b4"),h=function(){function t(){Object(b["a"])(this,t)}return Object(C["a"])(t,null,[{key:"getFirstValidCategoryFromItems",value:function(t){if(t){var a=!0,s=!1,e=void 0;try{for(var i,r=t[Symbol.iterator]();!(a=(i=r.next()).done);a=!0){var o=i.value;o.name;if(!o.children)return o.id;if(o.children&&o.children.length>0){var n=!0,l=!1,c=void 0;try{for(var m,d=o.children[Symbol.iterator]();!(n=(m=d.next()).done);n=!0){var u=m.value;return u.id}}catch(v){l=!0,c=v}finally{try{n||null==d.return||d.return()}finally{if(l)throw c}}}}}catch(v){s=!0,e=v}finally{try{a||null==r.return||r.return()}finally{if(s)throw e}}}return-1}},{key:"genMakeCategoryItemsDisplayName",value:function(t,a){if(t){var s=!0,e=!1,i=void 0;try{for(var r,o=t[Symbol.iterator]();!(s=(r=o.next()).done);s=!0){var n=r.value,l=n.name;if(n.id===a)return n.name;if(n.children&&n.children.length>0){var c=!0,m=!1,d=void 0;try{for(var u,v=n.children[Symbol.iterator]();!(c=(u=v.next()).done);c=!0){var g=u.value;if(g.id===a)return"".concat(l,"/").concat(g.name)}}catch(p){m=!0,d=p}finally{try{c||null==v.return||v.return()}finally{if(m)throw d}}}}}catch(p){e=!0,i=p}finally{try{s||null==o.return||o.return()}finally{if(e)throw i}}return"not found data"}return""}},{key:"genMakeSidebarCategoryItems",value:function(t){var a={items:[{title:!0,name:"분류",class:"font-lg bg-dark",wrapper:{element:"",attributes:{}}}]};return t&&t.forEach(function(t){var s={name:t.name,url:"/cqboards/cquestions?div".concat(t.id,"=q&cid=").concat(t.id),icon:"icon-doc"};t.children&&t.children.length>0&&(s.url="qboards",s["children"]=[],t.children.forEach(function(t,a){var e={name:t.name,url:"/cqboards/cquestions?div".concat(t.id,"=q&cid=").concat(t.id),icon:"icon-arrow-right-circle",attributes:{class:"ml-3"}};s["children"].push(e)})),a.items.push(s)}),a}}]),t}(),f=h,x={name:"QCDefaultContainer",components:{AsideToggler:n["b"],AppHeader:n["f"],AppSidebar:n["h"],AppAside:n["a"],TheFooter:n["e"],Breadcrumb:n["c"],DefaultAside:l["a"],DefaultCQHeaderDropdownAccnt:p,SidebarForm:n["j"],SidebarFooter:n["i"],SidebarToggler:n["n"],SidebarHeader:n["k"],SidebarNav:n["m"],SidebarMinimizer:n["l"],AppHeaderDropdown:n["g"]},data:function(){return{nav:o["a"].items,user:{name:"empty",company:"empty",imageUrl:"empty",fullname:"empty"},questionsTitle:"",categories:[],cid:-1,rawCategoriesDatas:null,contentsService:this.$service.$contentsservice}},created:function(){var t=this,a=this.$service.$loginservice.getUser();a&&(console.log("user direct set url is: ".concat(JSON.stringify(a))),this.setUserInfo(a)),this.$service.$loginservice.userChangeSubject.subscribe(function(a){console.log("user subscribe url is: ".concat(JSON.stringify(a))),t.setUserInfo(a)}),this.loadCategories()},updated:function(){if(this.$route.query&&this.$route.query.cid){var t=parseInt(this.$route.query.cid);console.log("page router update cid is ".concat(this.cid,"-").concat(t)),this.cid!==t&&(this.cid=t,this.contentsService.categoryChangeSubject.next(t),this.questionsTitle=f.genMakeCategoryItemsDisplayName(this.rawCategoriesDatas,t))}else if(-1==this.cid){var a=f.getFirstValidCategoryFromItems(this.rawCategoriesDatas);a&&-1!=a&&(this.cid=a,this.questionsTitle=f.genMakeCategoryItemsDisplayName(this.rawCategoriesDatas,a),this.contentsService.categoryChangeSubject.next(a))}},mounted:function(){},methods:{clickItems:function(){console.log("click items1")},loadCategories:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.contentsService.getCategories();case 2:this.result=t.sent,this.result.code===this.$eservice.success&&(this.rawCategoriesDatas=this.result.data,this.categories=f.genMakeSidebarCategoryItems(this.result.data));case 4:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),setUserInfo:function(t){this.user.fullname=t.user_name;var a="".concat(t.user_name);t.user_name.length>7&&(a=t.user_name.slice(0,6)+".."),this.user.name=a,this.user.company=t.company_name,console.log("user.photo url is: ".concat(t.photo));var s=this.$service.$loginservice.getImageUrl(t.photo);console.log("image url is: ".concat(s)),s&&(this.user.imageUrl=s)}},computed:{name:function(){return this.$route.name}}},_=x,w=Object(v["a"])(_,e,i,!1,null,null,null);a["default"]=w.exports},"530d":function(t,a,s){"use strict";a["a"]={items:[{title:!0,name:"Categories",class:"",wrapper:{element:"",attributes:{}}},{name:"Base",url:"/base",icon:"icon-puzzle",children:[{name:"Breadcrumbs",url:"/base/breadcrumbs",icon:"icon-puzzle"},{name:"Cards",url:"/base/cards",icon:"icon-puzzle"},{name:"Carousels",url:"/base/carousels",icon:"icon-puzzle"},{name:"Collapses",url:"/base/collapses",icon:"icon-puzzle"},{name:"Forms",url:"/base/forms",icon:"icon-puzzle"},{name:"Jumbotrons",url:"/base/jumbotrons",icon:"icon-puzzle"},{name:"List Groups",url:"/base/list-groups",icon:"icon-puzzle"},{name:"Navs",url:"/base/navs",icon:"icon-puzzle"},{name:"Navbars",url:"/base/navbars",icon:"icon-puzzle"},{name:"Paginations",url:"/base/paginations",icon:"icon-puzzle"},{name:"Popovers",url:"/base/popovers",icon:"icon-puzzle"},{name:"Progress Bars",url:"/base/progress-bars",icon:"icon-puzzle"},{name:"Switches",url:"/base/switches",icon:"icon-puzzle"},{name:"Tables",url:"/base/tables",icon:"icon-puzzle"},{name:"Tabs",url:"/base/tabs",icon:"icon-puzzle"},{name:"Tooltips",url:"/base/tooltips",icon:"icon-puzzle"}]},{name:"Buttons",url:"/buttons",icon:"icon-cursor",children:[{name:"Buttons",url:"/buttons/standard-buttons",icon:"icon-cursor"},{name:"Button Dropdowns",url:"/buttons/dropdowns",icon:"icon-cursor"},{name:"Button Groups",url:"/buttons/button-groups",icon:"icon-cursor"},{name:"Brand Buttons",url:"/buttons/brand-buttons",icon:"icon-cursor"}]},{name:"Charts",url:"/charts",icon:"icon-pie-chart"},{name:"Icons",url:"/icons",icon:"icon-star",children:[{name:"CoreUI Icons",url:"/icons/coreui-icons",icon:"icon-star",badge:{variant:"info",text:"NEW"}},{name:"Flags",url:"/icons/flags",icon:"icon-star"},{name:"Font Awesome",url:"/icons/font-awesome",icon:"icon-star",badge:{variant:"secondary",text:"4.7"}},{name:"Simple Line Icons",url:"/icons/simple-line-icons",icon:"icon-star"}]},{name:"Notifications",url:"/notifications",icon:"icon-bell",children:[{name:"Alerts",url:"/notifications/alerts",icon:"icon-bell"},{name:"Badges",url:"/notifications/badges",icon:"icon-bell"},{name:"Modals",url:"/notifications/modals",icon:"icon-bell"}]},{name:"Widgets",url:"/widgets",icon:"icon-calculator",badge:{variant:"primary",text:"NEW"}},{divider:!0},{title:!0,name:"Extras"},{name:"Pages",url:"/pages",icon:"icon-star",children:[{name:"Login",url:"/pages/login",icon:"icon-star"},{name:"Register",url:"/pages/register",icon:"icon-star"},{name:"Error 404",url:"/pages/404",icon:"icon-star"},{name:"Error 500",url:"/pages/500",icon:"icon-star"}]},{name:"Disabled",url:"/dashboard",icon:"icon-ban",badge:{variant:"secondary",text:"NEW"},attributes:{disabled:!0}},{name:"Download CoreUI",url:"http://coreui.io/vue/",icon:"icon-cloud-download",class:"mt-auto",variant:"success",attributes:{target:"_blank",rel:"noopener"}},{name:"Try CoreUI PRO",url:"http://coreui.io/pro/vue/",icon:"icon-layers",variant:"danger",attributes:{target:"_blank",rel:"noopener"}}]}},"7f7f":function(t,a,s){var e=s("86cc").f,i=Function.prototype,r=/^\s*function ([^ (]*)/,o="name";o in i||s("9e1e")&&e(i,o,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},ac4d:function(t,a,s){s("3a72")("asyncIterator")},c44e:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("b-tabs",[s("b-tab",[s("template",{slot:"title"},[s("i",{staticClass:"icon-list"})]),s("b-list-group",{staticClass:"list-group-accent"},[s("b-list-group-item",{staticClass:"list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"},[t._v("\n        Today\n      ")]),s("b-list-group-item",{staticClass:"list-group-item-accent-warning list-group-item-divider",attrs:{href:"#"}},[s("div",{staticClass:"avatar float-right"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",[t._v("Meeting with\n          "),s("strong",[t._v("Lucas")])]),s("small",{staticClass:"text-muted mr-3"},[s("i",{staticClass:"icon-calendar"}),t._v("  1 - 3pm\n        ")]),s("small",{staticClass:"text-muted"},[s("i",{staticClass:"icon-location-pin"}),t._v("  Palo Alto, CA\n        ")])]),s("b-list-group-item",{staticClass:"list-group-item-accent-info",attrs:{href:"#"}},[s("div",{staticClass:"avatar float-right"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/4.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",[t._v("Skype with "),s("strong",[t._v("Megan")])]),s("small",{staticClass:"text-muted mr-3"},[s("i",{staticClass:"icon-calendar"}),t._v("  4 - 5pm")]),s("small",{staticClass:"text-muted"},[s("i",{staticClass:"icon-social-skype"}),t._v("  On-line")])]),s("hr",{staticClass:"transparent mx-3 my-0"}),s("b-list-group-item",{staticClass:"list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"},[t._v("\n        Tomorrow\n      ")]),s("b-list-group-item",{staticClass:"list-group-item-accent-danger list-group-item-divider",attrs:{href:"#"}},[s("div",[t._v("New UI Project - "),s("strong",[t._v("deadline")])]),s("small",{staticClass:"text-muted mr-3"},[s("i",{staticClass:"icon-calendar"}),t._v("  10 - 11pm")]),s("small",{staticClass:"text-muted"},[s("i",{staticClass:"icon-home"}),t._v("  creativeLabs HQ")]),s("div",{staticClass:"avatars-stack mt-2"},[s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/2.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/3.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/4.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/5.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/6.jpg",alt:"admin@bootstrapmaster.com"}})])])]),s("b-list-group-item",{staticClass:"list-group-item-accent-success list-group-item-divider",attrs:{href:"#"}},[s("div",[s("strong",[t._v("#10 Startups.Garden")]),t._v(" Meetup")]),s("small",{staticClass:"text-muted mr-3"},[s("i",{staticClass:"icon-calendar"}),t._v("  1 - 3pm")]),s("small",{staticClass:"text-muted"},[s("i",{staticClass:"icon-location-pin"}),t._v("  Palo Alto, CA")])]),s("b-list-group-item",{staticClass:"list-group-item-accent-primary list-group-item-divider",attrs:{href:"#"}},[s("div",[s("strong",[t._v("Team meeting")])]),s("small",{staticClass:"text-muted mr-3"},[s("i",{staticClass:"icon-calendar"}),t._v("  4 - 6pm")]),s("small",{staticClass:"text-muted"},[s("i",{staticClass:"icon-home"}),t._v("  creativeLabs HQ")]),s("div",{staticClass:"avatars-stack mt-2"},[s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/2.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/3.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/4.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/5.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/6.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}})]),s("div",{staticClass:"avatar avatar-xs"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/8.jpg",alt:"admin@bootstrapmaster.com"}})])])])],1)],2),s("b-tab",[s("template",{slot:"title"},[s("i",{staticClass:"icon-speech"})]),s("div",{staticClass:"p-3"},[s("div",{staticClass:"message"},[s("div",{staticClass:"py-3 pb-5 mr-3 float-left"},[s("div",{staticClass:"avatar"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}}),s("b-badge",{staticClass:"avatar-status",attrs:{variant:"success"}})],1)]),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lukasz Holeczek")]),s("small",{staticClass:"text-muted float-right mt-1"},[t._v("1:52 PM")])]),s("div",{staticClass:"text-truncate font-weight-bold"},[t._v("Lorem ipsum dolor sit amet")]),s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")])]),s("hr"),s("div",{staticClass:"message"},[s("div",{staticClass:"py-3 pb-5 mr-3 float-left"},[s("div",{staticClass:"avatar"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}}),s("b-badge",{staticClass:"avatar-status",attrs:{variant:"danger"}})],1)]),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lukasz Holeczek")]),s("small",{staticClass:"text-muted float-right mt-1"},[t._v("1:52 PM")])]),s("div",{staticClass:"text-truncate font-weight-bold"},[t._v("Lorem ipsum dolor sit amet")]),s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")])]),s("hr"),s("div",{staticClass:"message"},[s("div",{staticClass:"py-3 pb-5 mr-3 float-left"},[s("div",{staticClass:"avatar"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}}),s("b-badge",{staticClass:"avatar-status",attrs:{variant:"info"}})],1)]),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lukasz Holeczek")]),s("small",{staticClass:"text-muted float-right mt-1"},[t._v("1:52 PM")])]),s("div",{staticClass:"text-truncate font-weight-bold"},[t._v("Lorem ipsum dolor sit amet")]),s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")])]),s("hr"),s("div",{staticClass:"message"},[s("div",{staticClass:"py-3 pb-5 mr-3 float-left"},[s("div",{staticClass:"avatar"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}}),s("b-badge",{staticClass:"avatar-status",attrs:{variant:"warning"}})],1)]),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lukasz Holeczek")]),s("small",{staticClass:"text-muted float-right mt-1"},[t._v("1:52 PM")])]),s("div",{staticClass:"text-truncate font-weight-bold"},[t._v("Lorem ipsum dolor sit amet")]),s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")])]),s("hr"),s("div",{staticClass:"message"},[s("div",{staticClass:"py-3 pb-5 mr-3 float-left"},[s("div",{staticClass:"avatar"},[s("img",{staticClass:"img-avatar",attrs:{src:"img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"}}),s("b-badge",{staticClass:"avatar-status",attrs:{variant:"dark"}})],1)]),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lukasz Holeczek")]),s("small",{staticClass:"text-muted float-right mt-1"},[t._v("1:52 PM")])]),s("div",{staticClass:"text-truncate font-weight-bold"},[t._v("Lorem ipsum dolor sit amet")]),s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")])])])],2),s("b-tab",[s("template",{slot:"title"},[s("i",{staticClass:"icon-settings"})]),s("div",{staticClass:"p-3"},[s("h6",[t._v("Settings")]),s("div",{staticClass:"aside-options"},[s("div",{staticClass:"clearfix mt-4"},[s("small",[s("b",[t._v("Option 1")])]),s("c-switch",{staticClass:"float-right",attrs:{color:"success",label:"",variant:"pill",size:"sm",checked:""}})],1),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")])])]),s("div",{staticClass:"aside-options"},[s("div",{staticClass:"clearfix mt-3"},[s("small",[s("b",[t._v("Option 2")])]),s("c-switch",{staticClass:"float-right",attrs:{color:"success",label:"",variant:"pill",size:"sm"}})],1),s("div",[s("small",{staticClass:"text-muted"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")])])]),s("div",{staticClass:"aside-options"},[s("div",{staticClass:"clearfix mt-3"},[s("small",[s("b",[t._v("Option 3")])]),s("c-switch",{staticClass:"float-right",attrs:{color:"success",label:"",variant:"pill",size:"sm",disabled:"",defaultChecked:""}})],1),s("div",[s("small",{staticClass:"text-muted"},[t._v("Disabled option.")])])]),s("div",{staticClass:"aside-options"},[s("div",{staticClass:"clearfix mt-3"},[s("small",[s("b",[t._v("Option 4")])]),s("c-switch",{staticClass:"float-right",attrs:{color:"success",label:"",variant:"pill",size:"sm",checked:""}})],1)]),s("hr"),s("h6",[t._v("System Utilization")]),s("div",{staticClass:"text-uppercase mb-1 mt-4"},[s("small",[s("b",[t._v("CPU Usage")])])]),s("b-progress",{staticClass:"progress-xs",attrs:{height:"{}",variant:"info",value:25}}),s("small",{staticClass:"text-muted"},[t._v("348 Processes. 1/4 Cores.")]),s("div",{staticClass:"text-uppercase mb-1 mt-2"},[s("small",[s("b",[t._v("Memory Usage")])])]),s("b-progress",{staticClass:"progress-xs",attrs:{height:"{}",variant:"warning",value:70}}),s("small",{staticClass:"text-muted"},[t._v("11444GB/16384MB")]),s("div",{staticClass:"text-uppercase mb-1 mt-2"},[s("small",[s("b",[t._v("SSD 1 Usage")])])]),s("b-progress",{staticClass:"progress-xs",attrs:{height:"{}",variant:"danger",value:95}}),s("small",{staticClass:"text-muted"},[t._v("243GB/256GB")]),s("div",{staticClass:"text-uppercase mb-1 mt-2"},[s("small",[s("b",[t._v("SSD 2 Usage")])])]),s("b-progress",{staticClass:"progress-xs",attrs:{height:"{}",variant:"success",value:10}}),s("small",{staticClass:"text-muted"},[t._v("25GB/256GB")])],1)],2)],1)},i=[],r=s("f1fb"),o={name:"DefaultAside",components:{cSwitch:r["o"]}},n=o,l=s("2877"),c=Object(l["a"])(n,e,i,!1,null,null,null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-e97ef7f6.392ce432.js.map