<template>
<div >
    <div id="surveyContainer"></div>
</div>
</template>

<script>
import { Callout } from "@coreui/vue";
import { ServiceError } from '../service/service.error';

import * as widgets from "surveyjs-widgets";
import * as Survey from "survey-knockout";

import "inputmask/dist/inputmask/phone-codes/phone.js";
widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);

Survey
    .StylesManager
    .applyTheme("bootstrap");

var myCss = {
    matrix: {
        root: "table table-striped card"
    }
};
var mycustomSurveyStrings = {
            completeText: '완료'
};
Survey.surveyLocalization
    .locales["my"] = mycustomSurveyStrings;

export default {
    name: "questionsboardview",
    components: {
        Callout,
    },
    created: function() {

        this.answerSibscription = this.contentsService.userAnswerSelectedSubject.subscribe((ids) => {
            console.log("tihstis sfijwifje");
            this.loadValidAnswersQuestions(ids.cid,ids.aid);
        });
    },
    beforeDestroy: function() {
        if(this.answerSibscription) {
            this.answerSibscription.unsubscribe();
        }
    },
    data: function() {
        return {
            answerSibscription: null,
            cid: -1,
            survey: null,
            modelSurvey: {},
            contentsService: this.$service.$contentsservice
        };
    },
    methods: {
        clickItems: function() {
        },
        showAlert(msg, path) {
            this.$bvModal.msgBoxOk(msg)
            .then(value => {
                if(path) {
                    this.$router.push(path);
                }
            })
            .catch(err => {
                this.$router.push('/page/500');
            });
        },
       
        async loadValidAnswersQuestions(cid, aid) {
            let qresult = await this.contentsService.getCQuestions(cid);
            if(qresult.code === ServiceError.success) {
                let aresult = await this.contentsService.getAnswersById(aid);
                if(aresult.code === ServiceError.success) {
                    this.initSurvey(JSON.parse(qresult.data.data), JSON.parse(aresult.data.answers));
                }
            } else if(result.code === ServiceError.authError) {
                this.showAlert('로그인 후 사용해 주세요', '/');
            }
        },
        
        initSurvey(questions, oldAnswers) {
            this.survey = new Survey.Model(questions, "surveyContainer");
                this.survey.css = myCss;
                this.survey.locale = 'en';
                this.survey.surveyLocalization.defaultLocale = "ko";
                this.survey.mode = 'display';
                 if(oldAnswers) {
                    this.survey.data = oldAnswers
                };
                this.survey.render();
        },
        async loadQuestions(cid) {
            let qresult = await this.contentsService.getCQuestions(cid);
            if(qresult.code === ServiceError.success) {
                if(qresult.code == ServiceError.success) {
                    this.initSurvey(JSON.parse(qresult.data.data));
                } else {
                    this.survey = new Survey.Model(null, "surveyContainer");
                    this.survey.locale = 'ko';
                }
            } else {
                if(result.code === ServiceError.authError) {
                    this.showAlert('로그인 후 사용해 주세요', '/');
                } else {
                    this.showAlert('질문지를 찾을 수 없습니다.');
                    this.survey = new Survey.Model(null, "surveyContainer");
                    this.survey.css = myCss;
                }
            }
        },
    }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
    width: 100% !important;
}
</style>