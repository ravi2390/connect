<template>
<!--    <canvas :id="name" :ref="name" :width="width" :height="height"></canvas>-->
    <Line :data="data" :options="options"></Line>
</template>

<script>
import {
    Chart as ChartJS,
    LinearScale,
    TimeScale,
    LineElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(TimeScale, LinearScale, LineElement)

export default {
    name: 'ChartComponent',
    components: { Line },
    props: {
        name: { type: String, default: 'myChart' },
        label: { type: String, default: 'My Chart' },
        width: { type: [Number, String], default: 'auto' },
        height: { type: [Number, String], default: 'auto' },
        labels: { type: Array },
        data: { type: Array, required: true },
    },
    data() {
        return {
            data: {
                labels: this.labels,
                datasets: [{
                    spanGaps: false,
                    label: this.label,
                    data: this.data,
                    backgroundColor: 'rgba(24, 103, 192, 0.5)'
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        type: TimeScale,
                    }],
                    yAxes: [{
                        type: LinearScale,
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 0.0,
                            suggestedMax: 1.0,
                        },
                    }]
                },
            }
        }
    },
}
</script>
