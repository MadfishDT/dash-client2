(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13b78f2c"],{"0662":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{attrs:{id:"surveyContainer"}})])}],o=(n("96cf"),n("3b8d")),i=n("f1fb"),c=n("0c2d"),a=n("1571"),u=n("b038");n("6f49");a["icheck"](u),a["select2"](u),a["inputmask"](u),a["jquerybarrating"](u),a["jqueryuidatepicker"](u),a["nouislider"](u),a["select2tagbox"](u),a["signaturepad"](u),a["sortablejs"](u),a["ckeditor"](u),a["autocomplete"](u),a["bootstrapslider"](u),u["StylesManager"].applyTheme("bootstrap");var l={matrix:{root:"table table-striped"},navigationButton:"button btn-lg"},d={name:"questionsboard",components:{Callout:i["d"]},created:function(){var e=this;this.contentsService.categoryChangeSubject.subscribe(function(t){console.log("this is sp"),e.cid!==t&&(e.cid=t,e.loadQuestions(t))})},data:function(){return{cid:-1,survey:null,modelSurvey:{},contentsService:this.$service.$contentsservice}},methods:{clickItems:function(){console.log("click items1")},errorAlert:function(e,t){var n=this;this.$bvModal.msgBoxOk(e).then(function(e){t&&n.$router.push(t)}).catch(function(e){n.$router.push("/page/500")})},loadQuestions:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("loadQuestions"),e.next=3,this.contentsService.getCQuestions(t);case 3:n=e.sent,n.code===c["a"].success?(console.log("this is"),n.code==c["a"].success?this.survey=new u["Model"](JSON.parse(n.data.data),"surveyContainer"):(this.survey=new u["Model"](null,"surveyContainer"),this.survey.css=l)):n.code===c["a"].authError?this.errorAlert("로그인 후 사용해 주세요","/"):(this.errorAlert("질문지를 찾을 수 없습니다."),this.survey=new u["Model"](null,"surveyContainer"),this.survey.css=l);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},h=d,v=(n("0771"),n("2877")),p=Object(v["a"])(h,s,r,!1,null,null,null);t["default"]=p.exports},"0771":function(e,t,n){"use strict";var s=n("a96d"),r=n.n(s);r.a},a96d:function(e,t,n){}}]);
//# sourceMappingURL=chunk-13b78f2c.3189fc38.js.map