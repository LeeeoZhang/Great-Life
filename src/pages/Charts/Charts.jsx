import React, {Component} from 'react'
import {Grid} from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import './Charts.scss'
import DOMAIN from '@/domain'
import axios from '@/service'

import KeyData from './components/KeyData/'
import AnalysisChart from './components/AnalysisChart'
import DailyRemain from './components/DailyRemain'
import HeatMap from './components/HeatMap'

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
  mapData: {
    url: `${DOMAIN}/admin/index/shopHotSale`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
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
    this.getMapData()
  }

  getKeyData () {
    this.props.updateBindingData('keyData')
  }

  getAnalysisData () {
    this.props.updateBindingData('analysisData')
  }

  getRemainData =  (type = '0') => {
    this.props.updateBindingData('remainData',{
      params:{
        type,
      }
    })
  }

  getMapData(){
    this.props.updateBindingData('mapData')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {keyData, analysisData, remainData,mapData} = this.props.bindingData
    const {todayInfo, yesterdayInfo, beforedayInfo} = keyData
    const {visitPvInfo, visitUvInfo, sessionCntInfo, stayTimeUvInfo} = analysisData
    const remainList = remainData.lists
    const mapDataList = mapData.lists

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
        <Row justify="space-between">
          <Col span={12} style={{marginRight:'20px'}}>
            <DailyRemain getRemainData={this.getRemainData} remainList={remainList}/>
          </Col>
          <Col>
            <HeatMap mapDataList={mapDataList}/>
          </Col>
        </Row>
      </div>
    )
  }
}
