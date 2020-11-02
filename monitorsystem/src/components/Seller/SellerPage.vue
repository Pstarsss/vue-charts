/* eslint-disable space-before-blocks */
<template>
   <div class='com-container'>
     <div class="com-charts" ref="sellers">
     </div>
   </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      d1: null,
      chartInstance: null,
      currentIndex: 1,
      totalIndex: null,
      timer: null
    }
  },
  computed: {
  },
  methods: {
    // 初始化图标
    initCharts () {
      this.chartInstance = this.$echarts.init(this.$refs.sellers, 'chalk')
      const option = {
        title: {
          text: '▍商家销售统计',
          textStyle: {
            fontSize: 60
          },
          left: 40,
          top: 20
        },
        grid: {
          top: '15%',
          left: '3%',
          bottom: '6%',
          right: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 66,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              barBorderRadius: [0, 33, 33, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
      window.addEventListener('resize', this.adapteScreeen)
      this.adapteScreeen()
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.chartInstance.on('mouseout', () => {
        this.setTime()
      })
    },
    // 获取seller的数据;
    async getData () {
      const { data: ret } = await this.$http.get('seller')
      this.totalIndex = ret.length % 5 === 0 ? ret.length / 5 : ret.length / 5 + 1
      this.d1 = ret.sort((a, b) => a.value - b.value)
      this.updateOption()
      this.setTime()
    },
    // 图标的配置
    updateOption () {
      const Dataname = (this.d1).map(i => i.name)
      const Datavalue = (this.d1).map(i => i.value)
      const start = (this.currentIndex - 1) * 5
      const end = (this.currentIndex) * 5
      const tempname = Dataname.slice(start, end)
      const tempvalue = Datavalue.slice(start, end)
      const DataOption = {
        yAxis: {
          data: tempname
        },
        series: [
          {
            data: tempvalue
          }
        ]
      }
      this.chartInstance.setOption(DataOption)
    },
    setTime () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.currentIndex >= this.totalIndex) {
          this.currentIndex = 1
        }
        this.currentIndex++
        this.updateOption()
      }, 3000)
    },
    adapteScreeen () {
      const titleFontSize = this.$refs.sellers.offsetWidth / 100 * 3.6
      const WidthOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(WidthOption)
      this.chartInstance.resize()
    }
  },
  created () {
  },
  mounted () {
    this.initCharts()
    this.getData()
  },
  destroyed () {
    this.chartInstance.off('mouseover')
    this.chartInstance.off('mouseout')
    window.removeEventListener('resize')
  }
}
</script>
<style lang='less' scoped>

</style>
