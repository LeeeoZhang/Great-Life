import React, {Component, Fragment} from 'react'
import {Tab} from '@icedesign/base'
import IceContainer from '@icedesign/container'
import ChartTypeLine from '../ChartTypeLine'
import './AnalysisChart.scss'

const TabPane = Tab.TabPane

export default class AnalysisChart extends Component {

  static displayName = 'AnalysisChart'

  state = {
    tabKey: '1',
  }

  onTabChange = key => this.setState({tabKey:key})

  get chartData () {
    const {tabKey} = this.state
    const {visitPvInfo, visitUvInfo, sessionCntInfo, stayTimeUvInfo} = this.props
    let chartData
    switch (tabKey) {
      case '1':
        chartData = visitPvInfo
        break
      case '2':
        chartData = visitUvInfo
        break
      case '3':
        chartData = sessionCntInfo
        break
      case '4':
        chartData = stayTimeUvInfo
        break
      default:
        chartData = []
    }
    return chartData
  }

  render () {
    const {tabKey} = this.state
    return (
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>趋势图</h4>
        <Tab onChange={this.onTabChange}>
          <TabPane tab="访问次数（pv）" key="1"/>
          <TabPane tab="访问人数（uv）" key="2"/>
          <TabPane tab="打开小程序次数" key="3"/>
          <TabPane tab="平均在线时长（秒）" key="4"/>
        </Tab>
        <ChartTypeLine chartData={this.chartData} tabKey={tabKey}/>
      </IceContainer>
    )
  }
}

const styles = {
  title: {
    margin: '0',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
  },
}
