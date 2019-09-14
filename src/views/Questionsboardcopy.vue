<template>
    <div class="animated fadeIn">
        <b-row v-for="(item, index) in paper" :key="index">
            <b-card class="w-100">
                <div  slot="header" class="mb-0 pb-2">
                    <div class="mb-0 pb-0" :key="'q'-index-sindex" v-for="(qitem, sindex) in item.question">
                        <div class="mb-0 pb-0 font-weight-bold" v-if="qitem.type == 'text'">
                            * {{qitem.datas}}
                        </div>
                        <div class="d-flex justify-content-center mb-0 mt-2 pr-0 pb-2 centered" v-if="qitem.type == 'table'">
                            <c-table class="mb-0 ml-0 pl-0 mr-0 pr-0 
                            pb-0 col-12 col-md-8 bg-light" :table-data="qitem.datas.datas" :fields="qitem.datas.fields" :caption="qitem.datas.caption"></c-table>
                        </div>
                        <div class="d-flex justify-content-center mb-0 mt-2 pr-0 pb-2 centered" 
                            v-if="qitem.type == 'chart'">
                            <div class="chart-wrapper">
                            <q-bar-chart :char-datas="qitem.datas"></q-bar-chart>
                            </div>
                        </div>
                    </div>
                </div>
                 <div v-if="item.articles.type=='select'" class="input-group">
                    <b-radio v-for="(article, aindex) in item.articles.form" :key="index + 's-e' + aindex" :name="aindex + 's-a' + index" 
                    class="mb-3 ml-3 radio-inline" v-model="item.answer">{{article}}</b-radio>
                </div>

                 <div v-if="item.articles.type=='check'" class="input-group">
                   <b-checkbox v-for="(article, aindex) in item.articles.form" :key="index + 's-e' + aindex" :name="aindex + 's-a' + index" 
                    class="mb-3 ml-3 radio-inline" v-model="item.answer">{{article}}</b-checkbox>
                </div>
                <div v-if="item.articles.type=='input'" class="input-group">
                    <b-input class="mb-3" v-model="item.answer"></b-input>
                </div>
                <span v-if="item.articles.type=='select-file'">
                 <div class="input-group">
                  <b-radio v-for="(article, aindex) in item.articles.form" :key="index + 's-e' + aindex" :name="aindex + 's-a' + index" 
                    class="mb-3 ml-3 radio-inline" v-model="item.answer">{{article}}</b-radio>
                </div>
                <div>
                    <b-input class="mb-3" v-model="item.answer"></b-input>
                </div>
                </span>
            </b-card>
        </b-row>
    </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import cTable from './base/Table';
import QBarChart from './charts/QBarChart'
import sample from "../service/sample.questions";
export default {
    name: "questionsboard",
    components: {
        Callout,
        cTable,
        QBarChart
    },
   
    mounted: function () {
 
     
    },
    created: function() {
        this.contentsService.categoryChangeSubject.subscribe((cid) => {
                console.log('this is sp')
                this.loadQuestions(cid);
        });
    },
    data: function() {
        return {
            paper: [],
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
            let result = await this.contentsService.getQuestions(cid);
            if(result.code === this.$eservice.success) {
                console.log(`sucess load questin fail ${result}`); 
                const questions = result.data.map( (item) => {
                    return JSON.parse(item.data);
                })
                this.paper = questions;    
            } else {
                if(result.code === this.$eservice.authError) {
                    this.errorAlert('Not Logined, Please Check your account', '/');
                } else {
                    this.errorAlert('Unknown Error')
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