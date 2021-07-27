<template>
  <div>
    <p class="title">销量</p>
    <div id="myChart4" :style="{width: chartWidth + 'px', height: chartHeight + 'px'}" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'BIgCharts',
  data() {
    return {
      chartWidth: 0,
      chartHeight: 0
    }
  },
  mounted() {
    this.chartWidth = (document.body.clientWidth - 300) / 2
    this.chartHeight = 400
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      const myChart = echarts.init(document.getElementById('myChart4'))
      const scale = 1
      const echartData = [{
        value: 4154,
        name: '华东地区'
      }, {
        value: 3854,
        name: '华南地区'
      }, {
        value: 1515,
        name: '华西地区'
      }, {
        value: 2515,
        name: '华北地区'
      }, {
        value: 2854,
        name: '华中地区'
      }, {
        value: 2154,
        name: '海外'
      }]
      const rich = {
        yellow: {
          color: '#ffc72b',
          fontSize: 30 * scale,
          padding: [5, 4],
          align: 'center'
        },
        total: {
          color: '#ffc72b',
          fontSize: 40 * scale,
          align: 'center'
        },
        white: {
          color: '#fff',
          align: 'center',
          fontSize: 14 * scale,
          padding: [21, 0]
        },
        blue: {
          color: '#49dff0',
          fontSize: 16 * scale,
          align: 'center'
        },
        hr: {
          borderColor: '#0b5263',
          width: '100%',
          borderWidth: 1,
          height: 0
        }
      }
      const option = {
        backgroundColor: '#031f2d',
        title: {
          text: '总销量',
          left: 'center',
          top: '53%',
          padding: [24, 0],
          textStyle: {
            color: '#fff',
            fontSize: 18 * scale,
            align: 'center'
          }
        },
        legend: {
          selectedMode: false,
          formatter: function(name) {
            var total = 0 // 各科正确率总和
            var averagePercent // 综合正确率
            echartData.forEach(function(value, index, array) {
              total += value.value
            })
            return '{total|' + total + '}'
          },
          data: [echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: 'center',
          top: 'center',
          icon: 'none',
          align: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16 * scale,
            rich: rich
          }
        },
        series: [{
          name: '总考生数量',
          type: 'pie',
          radius: ['22%', '50%'],
          hoverAnimation: false,
          color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
          label: {
            normal: {
              formatter: function(params, ticket, callback) {
                var total = 0 // 考生总数量
                var percent = 0 // 考生占比
                echartData.forEach(function(value, index, array) {
                  total += value.value
                })
                percent = ((params.value / total) * 100).toFixed(1)
                return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}'
              },
              rich: rich
            }
          },
          labelLine: {
            normal: {
              length: 55 * scale,
              length2: 0,
              lineStyle: {
                color: '#0b5263'
              }
            }
          },
          data: echartData
        }]
      }
      myChart.setOption(option)
    },
    resize() {

    }
  }
}
</script>

<style scoped>
    .title {
        background: #999999;
        margin: 0;
        line-height: 30px;
    }
</style>
