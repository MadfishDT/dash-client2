(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3e27"],{"5f55":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"wrapper"},[o("div",{staticClass:"animated fadeIn"},[o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Bootstrap Popovers")]),o("div",{staticClass:"card-header-actions"},[o("a",{staticClass:"card-header-action",attrs:{href:"https://bootstrap-vue.js.org/docs/components/popovers",rel:"noreferrer noopener",target:"_blank"}},[o("small",{staticClass:"text-muted"},[t._v("docs")])])])]),o("b-row",[o("b-col",{attrs:{cols:"6"}},[o("div",{staticClass:"my-3 text-center"},[o("b-btn",{directives:[{name:"b-popover",rawName:"v-b-popover.hover",value:"I am popover content!",expression:"'I am popover content!'",modifiers:{hover:!0}}],attrs:{title:"Popover Title"}},[t._v("\n              Hover Me\n            ")])],1)]),o("b-col",{attrs:{cols:"6"}},[o("div",{staticClass:"my-3 text-center"},[o("b-btn",{attrs:{id:"popoverButton-open",variant:"primary"}},[t._v("Button")]),o("b-popover",{attrs:{show:"",target:"popoverButton-open",title:"Popover"}},[t._v("\n              I start "),o("strong",[t._v("open")])])],1)])],1)],1),o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popovers ")]),o("small",[t._v("placement")])]),o("div",{staticClass:"my-3"},[o("b-row",t._l(t.placements,function(e){return o("b-col",{key:e,staticClass:"py-4 text-center",attrs:{md:"4"}},[o("b-btn",{attrs:{id:"exPopover1-"+e,variant:"primary"}},[t._v("\n              "+t._s(e)+"\n            ")]),o("b-popover",{attrs:{target:"exPopover1-"+e,placement:e,title:"Popover!",triggers:"hover focus",content:"Placement "+e}})],1)}),1)],1)]),o("b-card",{staticClass:"d-sm-down-none",attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popovers ")]),o("small",[t._v("via properties or slots")])]),o("b-row",[o("b-col",{staticClass:"py-4 text-center",attrs:{md:"6"}},[o("b-btn",{attrs:{id:"exPopover2",variant:"primary"}},[t._v("Using properties")]),o("b-popover",{attrs:{target:"exPopover2",title:"Prop Examples",triggers:"hover focus",content:"Embedding content using properties is easy"}})],1),o("b-col",{staticClass:"py-4 text-center",attrs:{md:"6"}},[o("b-btn",{attrs:{id:"exPopover3",variant:"primary"}},[t._v("Using slots")]),o("b-popover",{attrs:{target:"exPopover3",triggers:"hover focus"}},[o("template",{slot:"title"},[t._v("Content via Slots")]),t._v("\n            Embedding content "),o("span",{staticClass:"text-danger"},[t._v("using slots")]),t._v("\n            affords you "),o("em",[t._v("greater "),o("strong",[t._v("control.")])]),t._v(" and\n            basic HTML support.\n          ")],2)],1)],1)],1),o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popovers ")]),o("small",[t._v("show")])]),o("div",{staticClass:"d-flex flex-column text-md-center"},[o("div",{staticClass:"p-2"},[o("b-btn",{attrs:{id:"popoverButton-sync",variant:"primary"}},[t._v("I have a popover")])],1),o("div",{staticClass:"p-2"},[o("b-btn",{staticClass:"px-1",on:{click:function(e){t.show=!t.show}}},[t._v("Toggle Popover")]),o("b-popover",{attrs:{show:t.show,target:"popoverButton-sync",title:"Popover"},on:{"update:show":function(e){t.show=e}}},[t._v("\n            Hello "),o("strong",[t._v("World!")])])],1)])]),o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popover ")]),o("small",[t._v("open/close events")])]),o("div",{staticClass:"d-flex flex-column text-md-center"},[o("div",{staticClass:"p-2"},[o("b-btn",{attrs:{id:"popoverButton-event",variant:"primary"}},[t._v("I have a popover")])],1),o("div",{staticClass:"p-2"},[o("b-btn",{staticClass:"px-1",on:{click:t.onOpen}},[t._v("Open")]),o("b-btn",{staticClass:"px-1",on:{click:t.onClose}},[t._v("Close")])],1),o("b-popover",{ref:"popover1",attrs:{target:"popoverButton-event",title:"Popover"}},[t._v("\n          Hello "),o("strong",[t._v("World!")])])],1)]),o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popover ")]),o("small",[t._v("enable/disable events")])]),o("div",{staticClass:"d-flex flex-column text-md-center"},[o("div",{staticClass:"p-2"},[o("b-btn",{attrs:{id:"popoverButton-disableevent",variant:"primary"}},[t._v("I have a popover")])],1),o("div",{staticClass:"p-2"},[o("b-btn",{staticClass:"px-1",on:{click:t.onEnable}},[t._v("Enable")]),o("b-btn",{staticClass:"px-1",on:{click:t.onDisable}},[t._v("Disable")])],1),o("b-popover",{ref:"popover2",attrs:{target:"popoverButton-disableevent",title:"Popover"}},[t._v("\n          Hello "),o("strong",[t._v("World!")])])],1)]),o("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"fa fa-align-justify"}),o("strong",[t._v(" Popover ")]),o("small",[o("code",[t._v("v-b-popover")]),t._v(" directive")])]),o("b-row",[o("b-col",{staticClass:"py-3 text-center",attrs:{md:"3"}},[o("b-btn",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"I am Top",expression:"'I am Top'",modifiers:{hover:!0,top:!0}}],attrs:{title:"Popover!",variant:"primary"}},[t._v("Top")])],1),o("b-col",{staticClass:"py-3 text-center",attrs:{md:"3"}},[o("b-btn",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.left",value:"I am Left",expression:"'I am Left'",modifiers:{hover:!0,left:!0}}],attrs:{title:"Popover!",variant:"primary"}},[t._v("Left")])],1),o("b-col",{staticClass:"py-3 text-center",attrs:{md:"3"}},[o("b-btn",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.right",value:"I am Right",expression:"'I am Right'",modifiers:{hover:!0,right:!0}}],attrs:{title:"Popover!",variant:"primary"}},[t._v("Right")])],1),o("b-col",{staticClass:"py-3 text-center",attrs:{md:"3"}},[o("b-btn",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.bottom",value:"I am Bottom",expression:"'I am Bottom'",modifiers:{hover:!0,bottom:!0}}],attrs:{title:"Popover!",variant:"primary"}},[t._v("Bottom")])],1)],1)],1)],1)])},r=[],s={name:"popovers",data:function(){return{placements:["topright","top","topleft","bottomright","bottom","bottomleft","righttop","right","lefttop","rightbottom","left","leftbottom"],show:!1}},methods:{onOpen:function(){this.$refs.popover1.$emit("open")},onClose:function(){this.$refs.popover1.$emit("close")},onEnable:function(){this.$refs.popover2.$emit("enable")},onDisable:function(){this.$refs.popover2.$emit("disable")}}},i=s,n=o("2877"),v=Object(n["a"])(i,a,r,!1,null,null,null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d0d3e27.de156052.js.map