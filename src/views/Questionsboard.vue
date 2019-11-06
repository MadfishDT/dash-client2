<template>
<div >

        <b-modal
            centered
            id="modal_campaign"
            ref="modal_campaign"
            title="캠페인 선택하기"
            ok-title="확인"
            cancel-title="취소"
            @ok="handleSelectCampaignOk"
        >
            <b-row>
                <b-col cols="12">
                    <b-form-select
                        value-field="ccode"
                        text-field="name"
                        v-model="selectCampaign"
                        :options="selectCampaigns"
                        :select-size="6"
                    ></b-form-select>

                    <div class="mt-3">
                        선택(ID):
                        <strong>{{ selectCampaign }}</strong>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
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
    name: "questionsboard",
    components: {
        Callout,
    },
    created: function() {

        this.contentSubscription = this.contentsService.categoryChangeSubject.subscribe((cid) => {
                if(this.cid !== cid) {
                    this.cid = cid;
                    this.loadValidAnswersQuestions(cid);
                }
        });
    },
    async mounted() {
        await this.loadCampaigns();
        this.$refs.modal_campaign.show();
    },
    beforeDestroy: function() {
        if(this.contentSubscription) {
            this.contentSubscription.unsubscribe();
        }
    },
    data: function() {
        return {
            contentSubscription: null,
            cid: -1,
            survey: null,
            modelSurvey: {},
            contentsService: this.$service.$contentsservice,
            selectCampaign: '',
            selectCampaigns: [],
        };
    },
    methods: {
        clickItems: function() {
        },
        handleSelectCampaignOk() {

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
        async loadCampaigns() {
            const result = await this.contentsService.getCampaignsbyCCode();
            if(result.code === ServiceError.success) {
                this.selectCampaigns = result.data;
            }
        },
        async registerAnswer(answers) {
            const result = await this.contentsService.addAnswers(answers);
            if(result.code == ServiceError.success) {
                this.showAlert('등록 되었습니다');
            } else {
                 this.showAlert('등록 실패');
            }
        },
        async loadValidAnswersQuestions(cid) {
            let qresult = await this.contentsService.getAnswers(cid);
             if(qresult.code === ServiceError.success) {
                 this.initSurvey(JSON.parse(qresult.data.questions), cid,
                  qresult.data.question_id, JSON.parse(qresult.data.answers));
             } else {
                 this.loadQuestions(cid);
             }
        },
        initSurvey(questions, cid, qid , oldAnswers) {
             if(questions.locale) {
                    delete questions.locale;
                }
            this.survey = new Survey.Model(questions, "surveyContainer");

               
                this.survey.completedHtml = `<span>등록중 입니다. 잠시만 기다려 주세요</span>`;
                this.survey.css = myCss;
                this.survey.locale = 'ko';
                 if(oldAnswers) {
                    this.survey.data = oldAnswers
                };
                this.survey.render();
                this.survey
                .onComplete
                .add( async (answers) => {
                    const answersData = JSON.stringify(answers.data);
                    let answerResult = {
                        answers: answers.data,
                        cid: cid,
                        qid: qid
                    }
                    await this.registerAnswer(answerResult);
                    answers.clear();
                    answers.data = JSON.parse(answersData);
                    answers.render();
                });
        },
        async loadQuestions(cid) {
            let qresult = await this.contentsService.getCQuestions(cid);
            if(qresult.code === ServiceError.success) {
                if(qresult.code == ServiceError.success) {
                    this.initSurvey(JSON.parse(qresult.data.data), cid, qresult.data.id );
                } else {
                    this.survey = new Survey.Model(null, "surveyContainer");
                    this.survey.css = myCss;
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