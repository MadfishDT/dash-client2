<template>
<div class="pt-2">
    <div id="surveyCreatorContainer"></div>
</div>
</template>

<script>

import { ServiceError } from '../../service/service.error';
import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";
import * as widgets from "surveyjs-widgets";

import * as SurveyKo from "survey-knockout";

import "inputmask/dist/inputmask/phone-codes/phone.js";
widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo);
widgets.jqueryuidatepicker(SurveyKo);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo);
widgets.bootstrapslider(SurveyKo);


export default {
    name: "questions-creator",
    data() {
        return {
            contentsService: this.$service.$contentsservice,
            cid: -1
        };
    },
    created: function() {
        this.contentsService.categoryChangeSubject.subscribe(cid => {
            this.loadCQuestions(cid);
        });
    },
    mounted() {
        let options = { showEmbededSurveyTab: false, showJSONEditorTab: false };

        var mainColor = "#747a74";
        var mainHoverColor = "#abb3ab";
        var textColor = "#4a4a4a";
        var headerColor = "#7ff07f";
        var headerBackgroundColor = "#4a4a4a";
        var bodyContainerBackgroundColor = "#f8f8f8";

        SurveyCreator.localization.currentLocale = "ko";
        var defaultThemeColorsEditor =
            SurveyCreator.StylesManager.ThemeColors["default"];
        defaultThemeColorsEditor["$primary-color"] = mainColor;
        defaultThemeColorsEditor["$secondary-color"] = mainColor;
        defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
        defaultThemeColorsEditor["$primary-text-color"] = textColor;
        defaultThemeColorsEditor["$selection-border-color"] = mainColor;
        const selfThis = this;
        this.surveyCreator = new SurveyCreator.SurveyCreator(
            "surveyCreatorContainer",
            options
        );
        this.surveyCreator.saveSurveyFunc = async function() {
            console.log(JSON.stringify(this.text));
            if(this.text && selfThis.cid != -1) {
                console.log('addCQuestions');
                let result = await selfThis.contentsService.addCQuestions(selfThis.cid, JSON.parse(this.text));
                if(result.code == ServiceError.success) {
                    await selfThis.showAlert("저장 성공");
                } else {
                    await selfThis.showAlert("저장 실패");
                }
            }
        };
    },
    methods: {
         async loadCQuestions(cid) {
            console.log('loadQuestions');
            
            if(this.cid != cid) {
                this.cid = cid;
                let result = await this.contentsService.getCQuestions(cid);

                if(result.code == ServiceError.success) {
                    console.log(`${JSON.stringify(result.data)}`);
                    this.surveyCreator.text = result.data.data;
                } else {
                    this.surveyCreator.text = '';
                }
                
            }
        },
        async saveCQuestions(cid) {
            console.log('saveCQuestions');
        },
        showAlert: async function(msg) {
             return this.$bvModal.msgBoxOk(msg);
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
