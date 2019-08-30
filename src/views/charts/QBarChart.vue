<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
    extends: Bar,
    name: "q-bar-chart", 
    inheritAttrs: false,
    data: function () {
        return {
            datasets: this.datas
        }
    },
    props: {
        datas: {
            type: [Object],
            default: () => {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                        label: 'GitHub Commits',
                        backgroundColor: '#f87979',
                        data: [50, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                        }
                    ]
                }
            }
        },
    },
    beforeUpdate() {
        console.log(`this is beforeUpdate ${this.datas}`);
    },
    updated() {
        console.log(`this is upate ${this.datas}`);
    },
    created() {
        console.log(`this is created ${JSON.stringify(this.datas)}`);
    },
    mounted () {
        // Overwriting base render method with actual data.
        this.$nextTick(function () {      
           console.log(`this is next ${JSON.stringify(this.datas.labels)}`);
        });
        console.log(this.datas);
          this.renderChart(
            this.datasets,
            {
                responsive: true,
                maintainAspectRatio: true,
                tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
                    }
                }
            }
        });
        }
    }
</script>
