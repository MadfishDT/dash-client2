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
        <c-table :fields="fields" select-mode="single"
        :selectable="true"
        :rowSelected="onRowSelected"
        :clicked="clickedRow"
        :table-data="itemsArray" :per-page=40 hover striped bordered small fixed 
        caption="<i class='fa fa-align-justify'></i>캠페인 리스트"> </c-table>
      </b-col>
    </b-row>
    <b-row>
        <b-col cols="10">
        </b-col>
        <b-col cols="1" class="text-right">
             <b-button @click="editCampaign">수정</b-button>
        </b-col>
        <b-col cols="1" >
             <b-button @click="editCampaign">삭제</b-button>
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
      selected: null,
      cid: -1,
      itemsArray: someData(),
      cNewName: '',
      fields: [
        {key: 'date', label: '생성시간' , sortable: true},
        {key: 'name', label: '캠페인이름'},
        {key: 'uid', label: '아이디'},
        {key: 'template', label: '템플릿'},
        {key: 'portfolio', label: '포트폴리오'},
        {key: 'activated', label: '상태'}
      ],
    }
  },
    mounted: function() {
        this.loadCampaings();
    },
    created: function() {
       
    },
    beforeDestroy: function() {
  
    },
    methods: {
        editCampaign() {
            console.log('item is');
        },
        onRowSelected(items) {
            this.selected = items
        },
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
        showAlert(msg, path) {
            this.$bvModal.msgBoxOk(msg)
                .then(value => {
                    if (path) {
                        this.$router.push(path);
                    }
                })
                .catch(err => {
                    return;
                });
        },
        showConfirm(msg) {
            this.boxTwo = ''
            return this.$bvModal.msgBoxConfirm(msg, {
                    title: '확인',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: '확인',
                    cancelTitle: '취소',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    this.boxTwo = value
                    return true;
                })
                .catch(err => {
                    // An error occurred
                    return false;
                })
        },
        async loadCampaings() {
            let result = await this.contentsService.getCampaigns();
            
            console.log(`result : ${result}`);
            if(result.code === ServiceError.success) {
                this.itemsArray = [];
                result.data.forEach(itemCampaigns => {

                        /*{key: 'date', label: '생성시간' , sortable: true},
                        {key: 'name', label: '캠페인이름'},
                        {key: 'uid', label: '아이디'},
                        {key: 'template', label: '템플릿'},
                        {key: 'portfolio', label: '포트폴리오'},
                        {key: 'active', label: '상태'}*/
                    
                    const dateTime = new Date(itemCampaigns.date);
                    let newItem = {
                        name: itemCampaigns.name,
                        uid: itemCampaigns.uid,
                        date: this.toDateString(dateTime),
                        activated: itemCampaigns.activated ? '활성' : '비활성'
                    }
                    
                    this.itemsArray.push(newItem);
                });
            }
        },
        async handleAddCampaignOk() {
            let result = await this.contentsService.getUIDFromServer();
            if(result) {
                let cData = {
                    name: this.cNewName,
                    uid: result.data,
                    template: '',
                    portfolio: '',
                    active: '비활성'
                }
                 const aResult = await this.showConfirm(`${this.cNewName}을 추가 하시겠습니까?`);
                if(aResult) {
                    const sResult = await this.contentsService.addNewCampaign(cData);
                    if(sResult.code  == ServiceError.success) {
                        this.itemsArray.push(cData);
                        this.showAlert('추가 되었습니다.');
                    } else {
                        this.showAlert('실패');
                    }
                } 
            }
            
        }
    }
}
</script>
