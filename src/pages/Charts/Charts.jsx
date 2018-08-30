import React, {Component} from 'react'
import {Grid} from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import './Charts.scss'
import DOMAIN from '@/domain'
import axios from '@/service'

import KeyData from './components/KeyData/'
import AnalysisChart from './components/AnalysisChart'
import DailyRemain from './components/DailyRemain'

const {Row, Col} = Grid


@DataBinder({
  keyData: {
    url: `${DOMAIN}/admin/index/keyIndicators`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      todayInfo: {},
      yesterdayInfo: {},
      beforedayInfo: {},
    },
  },
  analysisData: {
    url: `${DOMAIN}/admin/index/weanalysisDailyVisit`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      visitPvInfo: [],
      visitUvInfo: [],
      sessionCntInfo: [],
      stayTimeUvInfo: [],
    },
  },
  remainData: {
    url: `${DOMAIN}/admin/index/dailyRetain`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [
        {item:[]},
        {item:[]},
        {item:[]},
        {item:[]},
        {item:[]},
        {item:[]},
        {item:[]},
      ],
    },
  },
})
export default class Charts extends Component {

  static displayName = 'Charts'

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getKeyData()
    this.getAnalysisData()
    this.getRemainData()
  }

  getKeyData () {
    this.props.updateBindingData('keyData')
  }

  getAnalysisData () {
    this.props.updateBindingData('analysisData')
  }

  getRemainData () {
    this.props.updateBindingData('remainData')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {keyData, analysisData, remainData} = this.props.bindingData
    const {todayInfo, yesterdayInfo, beforedayInfo} = keyData
    const {visitPvInfo, visitUvInfo, sessionCntInfo, stayTimeUvInfo} = analysisData
    const remainList = remainData.lists

    return (
      <div className="charts-page">
        <KeyData
          todayInfo={todayInfo}
          yesterdayInfo={yesterdayInfo}
          beforedayInfo={beforedayInfo}
        />
        <AnalysisChart
          visitPvInfo={visitPvInfo}
          visitUvInfo={visitUvInfo}
          sessionCntInfo={sessionCntInfo}
          stayTimeUvInfo={stayTimeUvInfo}
        />
        <Row>
          <Col span={12}>
            <DailyRemain remainList={remainList}/>
          </Col>
          <Col span={12}></Col>
        </Row>
      </div>
    )
  }
}
