<template>
    <div class="app flex-row align-items-center">
          
        <div class="container">

            <b-row class="justify-content-center w-90 mt-5 pb-0">
                <h1>Agreement</h1>
            </b-row>
            <b-row class="justify-content-center w-90 h-100 mt-5 d-flex">
                <b-card class="col-md-8 h-100">
                    <b-row>
                    <textarea
                        readonly="readonly"
                        class="w-100 rounded-0"
                        rows="40"
                        v-model="this.paper"
                    ></textarea>
                    </b-row>
                    <b-row align-h="end" class="mt-3">
                        <b-col cols="5">
                            <div class="col-12 input-group">
                                <b-radio v-model="select" key="Agree" name="agree" value="agree" class="mb-3 ml-3 radio-inline">Agree</b-radio>
                                <b-radio v-model="select" key="Reject" name="reject" value="reject" class="mb-3 ml-3 radio-inline">Reject</b-radio>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row align-h="end" class="mt-3">
                         <b-col cols="3">
                             <b-button block @click="back" class="px-0">Back</b-button>
                        </b-col>
                        <b-col cols="3">
                             <b-button block @click="submit" class="px-0">Submit</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-row>
        </div>
    </div>
</template>

<script>
import agree from "../../service/agreement.service";
import { ServiceError } from '../../service/service.error';

export default {
    name: "Agreement",
    data: function() {
        return {
            paper: agree.agreement,
            select: 'agree',
            darkModal: true
        };
    },
    methods: {
        back() {
            this.$router.push('/');
        },
        async submit() {
            if(this.select === 'agree') {
                const result = await this.$service.$loginservice.updataAgreement();
                if(result === ServiceError.sucess) {
                    this.$router.push('/qboards/questions');
                } else if(result === ServiceError.autherror) {
                    this.$router.push('/');
                }
            } else {
                this.$bvModal.msgBoxOk('Please Check Agreements')
                .then(value => {
                    this.boxOne = value
                })
                .catch(err => {
                    // An error occurred
                })
            }
            
        }
    }
};
</script>
