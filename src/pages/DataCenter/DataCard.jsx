import React, {Component, Fragment} from 'react'
import {Balloon, Grid, Icon} from '@icedesign/base'

const {Row, Col} = Grid

const OtherRow = props => {
  const {numInfo, percentageInfo, searchType} = props
  const unit = {1: '天', 2: '月'}
  return (
    <Fragment>
      <Row wrap style={styles.row}>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            下单人数（人）
          </div>
          <div style={styles.count}>
            {numInfo.orderPeopleNum}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.orderPeopleNum >= 0 ? 'up' : 'down']}>
                {percentageInfo.orderPeopleNum >= 0 ? '上升' : '下降'}
              {percentageInfo.orderPeopleNum}%
            </span>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            下单笔数（笔）
          </div>
          <div style={styles.count}>
            {numInfo.orderNum}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.orderNum >= 0 ? 'up' : 'down']}>
                {percentageInfo.orderNum >= 0 ? '上升' : '下降'}
              {percentageInfo.orderNum}%
            </span>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            下单金额（元）
          </div>
          <div style={styles.count}>
            {numInfo.orderTotalFee}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.orderTotalFee >= 0 ? 'up' : 'down']}>
                {percentageInfo.orderTotalFee >= 0 ? '上升' : '下降'}
              {percentageInfo.orderTotalFee}%
            </span>
          </div>
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
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.tradePeopleNum >= 0 ? 'up' : 'down']}>
                {percentageInfo.tradePeopleNum >= 0 ? '上升' : '下降'}
              {percentageInfo.tradePeopleNum}%
            </span>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            付款订单数（笔）
          </div>
          <div style={styles.count}>
            {numInfo.tradeNum}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.tradeNum >= 0 ? 'up' : 'down']}>
                {percentageInfo.tradeNum >= 0 ? '上升' : '下降'}
              {percentageInfo.tradeNum}%
            </span>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            付款金额（元）
          </div>
          <div style={styles.count}>
            {numInfo.tradeTotalFee}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.tradeTotalFee >= 0 ? 'up' : 'down']}>
                {percentageInfo.tradeTotalFee >= 0 ? '上升' : '下降'}
              {percentageInfo.tradeTotalFee}%
            </span>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6" style={styles.item}>
          <div style={styles.title}>
            付款件数（件）
          </div>
          <div style={styles.count}>
            {numInfo.tradeGoodsNum}
          </div>
          <div style={styles.desc}>
            <span>较前一{unit[searchType]}</span>
            <span style={styles[percentageInfo.tradeGoodsNum >= 0 ? 'up' : 'down']}>
                {percentageInfo.tradeGoodsNum >= 0 ? '上升' : '下降'}
              {percentageInfo.tradeGoodsNum}%
            </span>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
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
            {searchType !== '3' &&
            (<div style={styles.desc}>
              <span>较前一{unit[searchType]}</span>
              <span style={styles[percentageInfo.visitUv >= 0 ? 'up' : 'down']}>
                  {percentageInfo.visitUv >= 0 ? '上升' : '下降'}
                {percentageInfo.visitUv}%
                </span>
            </div>)
            }
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              访客次数（次）
            </div>
            <div style={styles.count}>
              {numInfo.visitPv}
            </div>
            {searchType !== '3' &&
            (<div style={styles.desc}>
              <span>较前一{unit[searchType]}</span>
              <span style={styles[percentageInfo.visitPv >= 0 ? 'up' : 'down']}>
                  {percentageInfo.visitPv >= 0 ? '上升' : '下降'}
                {percentageInfo.visitPv}%
                </span>
            </div>)
            }
          </Col>
        </Row>
        {
          searchType === '3' ?
            null :
            <OtherRow
              searchType={searchType}
              numInfo={numInfo}
              percentageInfo={percentageInfo}/>
        }
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
