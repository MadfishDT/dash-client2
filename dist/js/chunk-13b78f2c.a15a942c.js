(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13b78f2c"],{"0662":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{attrs:{id:"surveyContainer"}})])}],i=(n("96cf"),n("3b8d")),a=n("f1fb"),c=n("0c2d"),u=n("1571"),o=n("b038");n("6f49");u["icheck"](o),u["select2"](o),u["inputmask"](o),u["jquerybarrating"](o),u["jqueryuidatepicker"](o),u["nouislider"](o),u["select2tagbox"](o),u["signaturepad"](o),u["sortablejs"](o),u["ckeditor"](o),u["autocomplete"](o),u["bootstrapslider"](o),o["StylesManager"].applyTheme("bootstrap");var l={matrix:{root:"table table-striped card"}},d={completeText:"완료"};o["surveyLocalization"].locales["my"]=d;var h={name:"questionsboard",components:{Callout:a["d"]},created:function(){var e=this;this.contentSubscription=this.contentsService.categoryChangeSubject.subscribe(function(t){e.cid!==t&&(e.cid=t,e.loadValidAnswersQuestions(t))})},beforeDestroy:function(){this.contentSubscription&&this.contentSubscription.unsubscribe()},data:function(){return{contentSubscription:null,cid:-1,survey:null,modelSurvey:{},contentsService:this.$service.$contentsservice}},methods:{clickItems:function(){},showAlert:function(e,t){var n=this;this.$bvModal.msgBoxOk(e).then(function(e){t&&n.$router.push(t)}).catch(function(e){n.$router.push("/page/500")})},registerAnswer:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.contentsService.addAnswers(t);case 2:n=e.sent,n.code==c["a"].success?this.showAlert("등록 되었습니다"):this.showAlert("등록 실패");case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),loadValidAnswersQuestions:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.contentsService.getAnswers(t);case 2:n=e.sent,n.code===c["a"].success?this.initSurvey(JSON.parse(n.data.questions),t,n.data.question_id,JSON.parse(n.data.answers)):this.loadQuestions(t);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),initSurvey:function(e,t,n,r){var s=this;this.survey=new o["Model"](e,"surveyContainer"),this.survey.completedHtml="<span>등록중 입니다. 잠시만 기다려 주세요</span>",this.survey.css=l,this.survey.locale="ko",r&&(this.survey.data=r),this.survey.onComplete.add(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(r){var i,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=JSON.stringify(r.data),a={answers:r.data,cid:t,qid:n},e.next=4,s.registerAnswer(a);case 4:r.clear(),r.data=JSON.parse(i),r.render();case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},loadQuestions:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.contentsService.getCQuestions(t);case 2:n=e.sent,n.code===c["a"].success?n.code==c["a"].success?this.initSurvey(JSON.parse(n.data.data),t,n.data.id):(this.survey=new o["Model"](null,"surveyContainer"),this.survey.css=l,this.survey.locale="ko"):result.code===c["a"].authError?this.showAlert("로그인 후 사용해 주세요","/"):(this.showAlert("질문지를 찾을 수 없습니다."),this.survey=new o["Model"](null,"surveyContainer"),this.survey.css=l);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},p=h,v=(n("0771"),n("2877")),f=Object(v["a"])(p,r,s,!1,null,null,null);t["default"]=f.exports},"0771":function(e,t,n){"use strict";var r=n("a96d"),s=n.n(r);s.a},a96d:function(e,t,n){}}]);
//# sourceMappingURL=chunk-13b78f2c.a15a942c.js.map