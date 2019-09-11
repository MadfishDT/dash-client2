<template>
    <div id="surveyCreatorContainer"></div>
</template>

<script>
import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import * as SurveyKo from "survey-knockout";
import * as widgets from "surveyjs-widgets";

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
            contentsService: this.$service.$contentsservice
        };
    },
    created: function() {
        this.contentsService.categoryChangeSubject.subscribe(cid => {
            this.loadCQuestions(cid);
        });
    },
    mounted() {
        let options = { showEmbededSurveyTab: false };

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
        this.surveyCreator = new SurveyCreator.SurveyCreator(
            "surveyCreatorContainer",
            options
        );
        this.surveyCreator.saveSurveyFunc = function() {
            console.log(JSON.stringify(this.text));
        };
    },
    methods: {
         async loadCQuestions(cid) {
            console.log('loadQuestions');
          
        },
        async saveCQuestions(cid) {
            console.log('saveCQuestions');
         
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
