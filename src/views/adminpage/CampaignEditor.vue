<template>
  <div class="animated fadeIn">
    <b-modal centered id="modal-prevent-closing" ref="modal_cate_name" title="새로운 캠페인 이름을 넣으세요"  @ok="handleAddCampaignOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
                <b-form-input id="name-input" v-model="cNewName" required></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
    <b-row class="justify-content-end pb-1">
        <b-col cols="1" >
            <button @click="plusCampaign" style="float: right;" ref='plusButton'><i ref='plusIcons' class='icon-plus'></i> </button>
        </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <c-table :fields="fields" :clicked="clickedRow" :table-data="itemsArray" :per-page=40 hover striped bordered small fixed 
        caption="<i class='fa fa-align-justify'></i>캠페인 리스트"> </c-table>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '@/views/base/Table.vue'
import { ServiceError } from '../../service/service.error';

const someData = () => shuffleArray([]);

export default {
  name: 'campaign-editor',
  components: {
    cTable
  },
  data: function() {
    return {
      contentsService: this.$service.$contentsservice,
      contentSubscription: null,
      cid: -1,
      itemsArray: someData(),
      cNewName: '',
      fields: [
        {key: 'cdate', label: '생성시간'},
        {key: 'campaign', label: '캠페인이름'},
        {key: 'campaingid', label: '아이디'},
        {key: 'template', label: '템플릿'},
        {key: 'portfolio', label: '포트폴리오'}

      ],
    }
  },
    mounted: function() {
      
    },
    created: function() {
       
    },
    beforeDestroy: function() {
  
    },
    methods: {
        clickedRow(record, index) {
            //this.$router.push(`/cadminboard/aview?cid=${this.cid}&uid=${aitem.userid}&aid=${aitem.id}`);
        },
        toDateString(date) {
            const yyyy = date.getFullYear();
            const mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
            const dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
        },
        async loadCampaign(cid) {
            console.log(`loadCampaign`);
        },
        plusCampaign() {
            this.$refs.modal_cate_name.show();
        },
        async handleAddCampaignOk() {
            let result = await this.contentsService.getUIDFromServer();
            if(result) {
                this.itemsArray.push({
                    cdate: this.toDateString(new Date()),
                    campaign: this.cNewName,
                    campaingid: result.data,
                    template: '',
                    portfolio: ''
                });
            }
            
        }
    }
}
</script>
