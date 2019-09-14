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
        root: "table table-striped"
    },
    navigationButton: "button btn-lg"
};


/*Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
Survey.StylesManager.applyTheme("bootstrapmaterial");
import sample from "../service/sample.questions";*/
export default {
    name: "questionsboard",
    components: {
        Callout,
    },
    created: function() {
        this.contentsService.categoryChangeSubject.subscribe((cid) => {
                console.log('this is sp')
                if(this.cid !== cid) {
                    this.cid = cid;
                    this.loadQuestions(cid);
                }
        });
    },
    data: function() {
        return {
            cid: -1,
            survey: null,
            modelSurvey: {},
            contentsService: this.$service.$contentsservice
        };
    },
    methods: {
        clickItems: function() {
           console.log('click items1');
        },
        errorAlert(msg, path) {
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
        async loadQuestions(cid) {
            console.log('loadQuestions');
            let result = await this.contentsService.getCQuestions(cid);
            if(result.code === ServiceError.success) {
                console.log("this is");
                if(result.code == ServiceError.success) {
                    this.survey = new Survey.Model(JSON.parse(result.data.data), "surveyContainer");
                } else {
                    this.survey = new Survey.Model(null, "surveyContainer");
                    this.survey.css = myCss;
                }
                
            } else {
                if(result.code === ServiceError.authError) {
                    this.errorAlert('로그인 후 사용해 주세요', '/');
                } else {
                    this.errorAlert('질문지를 찾을 수 없습니다.');
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