<template>
    <div class="animated fadeIn">
        <b-row v-for="(item, index) in paper" :key="index">
            <b-card class="w-100">
                <div  slot="header" class="mb-0 pb-2">
                    <div class="mb-0 pb-0" :key="'q'-index" v-for="(qitem, index) in item.question">
                       <div class="mb-0 pb-0" v-if="qitem.type == 'text'">
                            * {{qitem.datas}}
                       </div>
                        <div class="d-flex justify-content-center mb-0 mt-2 pr-0 pb-2 centered" v-if="qitem.type == 'table'">
                            <c-table class="mb-0 ml-0 pl-0 mr-0 pr-0 pb-0 col-12 col-md-8 bg-light" :table-data="qitem.datas.datas" :fields="qitem.datas.fields" :caption="qitem.datas.caption"></c-table>
                       </div>
                    </div>
                </div>

                 <b-form-group>
                    <b-form-radio-group id="basicRadios"
                    :plain="true"
                    :options="[
                        {text: 'Option 1 ',value: '1'},
                        {text: 'Option 2 ',value: '2'},
                        {text: 'Option 3 ',value: '3'}
                    ]"
                    checked="2"
                    stacked>
                    </b-form-radio-group>
                </b-form-group>
            </b-card>
        </b-row>
        <b-row>
            <!--select template-->
            <b-card>
                <div slot="header">
                    Card with switch
                    <div class="card-header-actions" style="height: 21px;">
                   
                    </div>
                </div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </b-card>
            <b-card>
                <div slot="header">
                    Card with switch
                    <div class="card-header-actions" style="height: 21px;">
                   
                    </div>
                </div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </b-card>
        </b-row>
    </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import cTable from './base/Table';
import sample from "../service/sample.questions";
export default {
    name: "questionsboard",
    components: {
        Callout,
        cTable
    },
     updated() {
          if (this.$route.query && this.$route.query.cid) {
                const cid = parseInt(this.$route.query.cid);
                console.log(`page22222 router update cid is ${this.cid}-${cid}`);
                
                if(this.cid !== cid ) {
                    this.cid = cid;
                }
           }
    },
    mounted: function () {
        if (this.$route.query && this.$route.query.cid) {
                console.log("enter page cid loaded");
                console.log(`dashboard cid is: ${this.cid}`);
        }
    },
    data: function() {
        return {
            paper: sample.items,
        };
    },
    methods: {
        clickItems: function() {
           console.log('click items1');
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