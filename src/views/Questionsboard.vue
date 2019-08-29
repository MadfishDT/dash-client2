<template>
    <div class="animated fadeIn">
        <b-row>
            <b-card>
                <div slot="header">
                    Card with switch
                    <div class="card-header-actions" style="height: 21px;">
                        <c-switch size="sm" color="info" checked label />
                    </div>
                </div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </b-card>
            <b-card>
                <div slot="header">
                    Card with switch
                    <div class="card-header-actions" style="height: 21px;">
                        <c-switch size="sm" color="info" checked label />
                    </div>
                </div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </b-card>
        </b-row>
    </div>
</template>

<script>
import { Callout } from "@coreui/vue";

export default {
    name: "questionsboard",
    components: {
        Callout
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
`