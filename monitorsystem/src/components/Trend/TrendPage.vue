<template>
   <div class='com-container'>
     <div class="com-charts" ref="trend"></div>
   </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      chartInstance: null
    }
  },
  methods: {
    initCharts () {
      this.chartInstance = this.$echarts.init(this.$refs.trend, 'chalk')
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: '30%',
          left: '3%',
          right: '1%',
          bottom: '2%',
          containLabel: true
        },
        series: [
          {
            type: 'line'
          }
        ]
      }
      this.chartInstance.setOption(option)
      window.addEventListener('resize', this.adaptEcharts)
      this.adaptEcharts()
    },
    async getData () {
      const { data: ret } = await this.$http.get('trend')
      this.d1 = ret
      this.updateChart()
    },
    adaptEcharts () {
      const titleSize = (this.$refs.trend.offsetWidth / 100) * 3.6
      const option = {
        legend: {
          itemWidth: titleSize,
          itemHeight: titleSize,
          textStyle: {
            fontSize: titleSize
          }
        }
      }
      this.chartInstance.setOption(option)
      this.chartInstance.resize()
    },
    updateChart () {
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      console.log(this.d1)
      const XmonthArr = this.d1.common
      const seriesArr = this.d1.map.data
      const seriesData = seriesArr.map(i => {
        return {
          type: 'line',
          stack: '总量',
          name: i.name,
          data: i.data,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1
              },
              {
                offset: 1,
                color: colorArr2
              }
            ])
          }
        }
      })
      const options = {
        xAxis: {
          data: XmonthArr
        },
        legend: {
          left: 20,
          top: '10%',
          icon: 'circle',
          itemWidth: 60,
          itemHeight: 60,
          textStyle: {
            fontSize: 60
          }
        },
        series: seriesData
      }
      this.chartInstance.setOption(options)
    }
  },
  mounted () {
    this.initCharts()
    this.getData()
  }
}
</script>
<style lang='less' scoped>
</style>
