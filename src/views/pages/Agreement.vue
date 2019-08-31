<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center w-90 mt-5 ml-5">
           <b-card class="w-100">
               {{this.paper}}
           </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import agree from "../../service/agreement.service";
export default {
    name: 'Agreement',
    data: function() {
        return {
            paper: agree.agreement,
        };
    },
}
</script>
