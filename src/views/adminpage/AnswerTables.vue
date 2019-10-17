<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <c-table :fields="fields" :clicked="clickedRow" :table-data="itemsArray" :per-page=40 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> 답변자 리스트"></c-table>
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
  name: 'answer-tables',
  components: {
    cTable
  },
  data: function() {
    return {
      contentsService: this.$service.$contentsservice,
      contentSubscription: null,
      cid: -1,
      items: someData,
      itemsArray: someData(),
      fields: [
        {key: 'username', label: '답변자'},
        {key: 'userid', label: '아이디'},
        {key: 'email', label: '이메일'},
        {key: 'registered', label: '등록일', sortable: true}
      ],
    }
  },
   created: function() {
        this.contentSubscription = this.contentsService.categoryChangeSubject.subscribe(cid => {
                this.loadAnswers(cid);
        });
    },
    beforeDestroy: function() {
        if(this.contentSubscription) {
            this.contentSubscription.unsubscribe();
        }
    },
    methods: {
        clickedRow(record, index) {
            console.log(record);
            const aitem = this.itemsArray[index];
            this.$router.push(`/cadminboard/aview?cid=${this.cid}&uid=${aitem.userid}&aid=${aitem.id}`);
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
        async loadAnswers(cid) {
            if(cid != this.cid) {
                this.cid = cid;
                this.itemsArray = [];
                const result = await this.contentsService.getUserAnswers(cid);
                if(result.code == ServiceError.success){
                //console.log(result.data);
                result.data.forEach(userAnswers => {
                    let date = new Date(userAnswers.date);
                    this.itemsArray.push({
                            username: userAnswers.user_name,
                            userid: userAnswers.user_id,
                            email: userAnswers.email,
                            registered: this.toDateString(date),
                            id: userAnswers.id
                        });
                    });
                };
                }
                console.log(`loadAnswers`);
            },
    }
}
</script>
