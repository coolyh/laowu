<template>
  <div class="chart-container">
    <div id="payChart" style="width: 100%;height:260px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name:'Chart',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      var myChart = echarts.init(document.getElementById("payChart"))

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
  }
}
</script>
