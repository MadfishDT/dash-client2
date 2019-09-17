<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <c-table :fields="fields" :table-data="itemsArray" :per-page=40 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> 답변자 리스트"></c-table>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from './Table.vue'
import { ServiceError } from '../../service/service.error';

const someData = () => shuffleArray([]);

export default {
  name: 'tables',
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
        async loadAnswers(cid) {
          if(cid != this.cid) {
            this.cid = cid;
            this.itemsArray = [];
            const result = await this.contentsService.getUserAnswers(cid);
            if(result.code == ServiceError.success){
              //console.log(result.data);
              result.data.forEach(userAnswers => {
                  this.itemsArray.push({
                        username: userAnswers.user_name,
                        userid: userAnswers.user_id,
                        email: userAnswers.email,
                        registered: userAnswers.date
                      });
                  });
              };
            }
            console.log(`loadAnswers`);
          },
    }
}
</script>
