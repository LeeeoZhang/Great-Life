import React, {Component, Fragment} from 'react'
import {Balloon, Grid, Icon} from '@icedesign/base'

const {Row, Col} = Grid

const PercentDesc = props => {
  const unit = {1:'天',2:'月'}
  const {searchType,percentageInfo,dataKey} = props
  return searchType !== '3' &&
    (<div style={styles.desc}>
      <span>较前一{unit[searchType]}</span>
      <span style={styles[percentageInfo[dataKey] >= 0 ? 'up' : 'down']}>
        {percentageInfo[dataKey] >= 0 ? '上升' : '下降'}
        {percentageInfo[dataKey]}%
      </span>
    </div>)
}

export default class DataCard extends Component {

  static displayName = 'DataCard'

  constructor () {
    super()
    this.state = {
      unit: {
        1: '天',
        2: '月'
      }
    }
  }

  render () {
    const {numInfo, percentageInfo, searchType} = this.props
    const {unit} = this.state
    return (
      <Fragment>
        <Row wrap style={styles.row}>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              访客数（人）
            </div>
            <div style={styles.count}>
              {numInfo.visitUv}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="visitUv"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              访客次数（次）
            </div>
            <div style={styles.count}>
              {numInfo.visitPv}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="visitPv"/>
          </Col>
        </Row>
        <Row wrap style={styles.row}>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              下单人数（人）
            </div>
            <div style={styles.count}>
              {numInfo.orderPeopleNum}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="orderPeopleNum"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              下单笔数（笔）
            </div>
            <div style={styles.count}>
              {numInfo.orderNum}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="orderNum"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              下单金额（元）
            </div>
            <div style={styles.count}>
              {numInfo.orderTotalFee}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="orderTotalFee"/>
          </Col>
        </Row>
        <Row wrap style={styles.row}>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              付款人数（人）
            </div>
            <div style={styles.count}>
              {numInfo.tradePeopleNum}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="tradePeopleNum"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              付款订单数（笔）
            </div>
            <div style={styles.count}>
              {numInfo.tradeNum}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="tradeNum"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              付款金额（元）
            </div>
            <div style={styles.count}>
              {numInfo.tradeTotalFee}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="tradeTotalFee"/>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              付款件数（件）
            </div>
            <div style={styles.count}>
              {numInfo.tradeGoodsNum}
            </div>
            <PercentDesc searchType={searchType} percentageInfo={percentageInfo} dataKey="tradeGoodsNum"/>
          </Col>
        </Row>
      </Fragment>
    )
  }

}
const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  desc: {
    fontSize: '12px',
    color: '#999',
  },
  row: {
    borderBottom: '1px solid #f1f1f1',
    marginBottom: '16px',
  },
  up: {
    color: 'green',
    marginLeft: 5
  },
  down: {
    color: 'red',
    marginLeft: 5
  }
}
