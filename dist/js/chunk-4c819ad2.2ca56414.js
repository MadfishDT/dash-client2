(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c819ad2"],{"47d9":function(e,t,s){"use strict";var r=s("572d"),n=s.n(r);n.a},"572d":function(e,t,s){},e2bc:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{attrs:{id:"surveyContainer"}})])}],i=(s("96cf"),s("3b8d")),a=s("f1fb"),c=s("0c2d"),o=s("1571"),u=s("b038");s("6f49");o["icheck"](u),o["select2"](u),o["inputmask"](u),o["jquerybarrating"](u),o["jqueryuidatepicker"](u),o["nouislider"](u),o["select2tagbox"](u),o["signaturepad"](u),o["sortablejs"](u),o["ckeditor"](u),o["autocomplete"](u),o["bootstrapslider"](u),u["StylesManager"].applyTheme("bootstrap");var l={matrix:{root:"table table-striped card"}},d={completeText:"완료"};u["surveyLocalization"].locales["my"]=d;var h={name:"questionsboardview",components:{Callout:a["d"]},created:function(){var e=this;this.answerSibscription=this.contentsService.userAnswerSelectedSubject.subscribe(function(t){console.log("tihstis sfijwifje"),e.loadValidAnswersQuestions(t.cid,t.aid)})},beforeDestroy:function(){this.answerSibscription&&this.answerSibscription.unsubscribe()},data:function(){return{answerSibscription:null,cid:-1,survey:null,modelSurvey:{},contentsService:this.$service.$contentsservice}},methods:{clickItems:function(){},showAlert:function(e,t){var s=this;this.$bvModal.msgBoxOk(e).then(function(e){t&&s.$router.push(t)}).catch(function(e){s.$router.push("/page/500")})},loadValidAnswersQuestions:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,s){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.contentsService.getCQuestions(t);case 2:if(r=e.sent,r.code!==c["a"].success){e.next=10;break}return e.next=6,this.contentsService.getAnswersById(s);case 6:n=e.sent,n.code===c["a"].success&&this.initSurvey(JSON.parse(r.data.data),JSON.parse(n.data.answers)),e.next=11;break;case 10:result.code===c["a"].authError&&this.showAlert("로그인 후 사용해 주세요","/");case 11:case"end":return e.stop()}},e,this)}));function t(t,s){return e.apply(this,arguments)}return t}(),initSurvey:function(e,t){this.survey=new u["Model"](e,"surveyContainer"),this.survey.css=l,this.survey.locale="ko",this.survey.mode="display",t&&(this.survey.data=t)},loadQuestions:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.contentsService.getCQuestions(t);case 2:s=e.sent,s.code===c["a"].success?s.code==c["a"].success?this.initSurvey(JSON.parse(s.data.data),t,s.data.id):(this.survey=new u["Model"](null,"surveyContainer"),this.survey.css=l,this.survey.locale="ko"):result.code===c["a"].authError?this.showAlert("로그인 후 사용해 주세요","/"):(this.showAlert("질문지를 찾을 수 없습니다."),this.survey=new u["Model"](null,"surveyContainer"),this.survey.css=l);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},v=h,p=(s("47d9"),s("2877")),f=Object(p["a"])(v,r,n,!1,null,null,null);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-4c819ad2.2ca56414.js.map