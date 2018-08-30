import React, {Component} from 'react'
import {Chart, Axis, Geom, Tooltip} from 'bizcharts'
import {DataSet} from '@antv/data-set'
import IceContainer from '@icedesign/container'


export default class ChartTypeLine extends Component {
  static displayName = 'ChartTypeLine'

  static propTypes = {}

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {}
  }

  get formatChartData () {
    const {chartData, tabKey} = this.props
    const dict =  {
      1:'访问次数',
      2:'访问人数',
      3:'打开小程序次数',
      4:'平均在线时长',
    }
    const formatChartData = []
    chartData.forEach(item=>{
      formatChartData.push({
        date:item.date,
        [dict[tabKey]]:item.value,
      })
    })
    return formatChartData
  }


  render () {
    // 参考：https://alibaba.github.io/BizCharts/
    // 数据源
    const {tabKey} = this.props
    const dict =  {
      1:'访问次数',
      2:'访问人数',
      3:'打开小程序次数',
      4:'平均在线时长',
    }
    // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
    const ds = new DataSet()
    const dv = ds.createView().source(this.formatChartData)
    dv.transform({
      type: 'fold',
      fields: [[dict[tabKey]]],
      key: 'name',
      value: 'value',
    })

    // 定义度量
    const cols = {
      date: {
        range: [0, 1],
        tickCount:30,
      },
    }

    return (

      <Chart height={400} data={dv} scale={cols} forceFit padding={50}>
        <Axis name="date"/>
        <Axis
          name="value"
          label={{formatter: (val) => `${val}`}}
        />
        <Tooltip crosshairs={{type: 'y'}}/>
        <Geom
          type="line"
          position="date*value"
          size={2}
          color="name"
        />
        <Geom
          type="point"
          position="date*value"
          size={4}
          shape="circle"
          color="name"
          style={{stroke: '#fff', lineWidth: 1}}
        />
      </Chart>

    )
  }
}

