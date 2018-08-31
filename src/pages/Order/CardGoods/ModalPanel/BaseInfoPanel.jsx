import React from 'react'
import Panel from '@icedesign/panel'
import { Grid } from '@icedesign/base'

const {Row, Col} = Grid
const styles = {
  rowSpace: {
    marginBottom: '10px',
  },
  panelMargin:{
    marginBottom: '10px'
  }
}

const BaseInfoPanel = props => {
  const {baseInfo,tabId} = props
  const status = {
    1: {0: '未消费', 1: '已消费', 2: '已过期'},
    2: {0: '未发货', 1: '已发货', 2: '已过期'},
  }
  const isRefund = baseInfo.orderPayStatus === 2
  const timeNode = {
    1:(<Col span="12">
      <Row>
        <Col span="6">
          消费时间:
        </Col>
        <Col span="18">
          {baseInfo.verifyTime}
        </Col>
      </Row>
    </Col>),
    3:(<Col span="12">
      <Row>
        <Col span="6">
          退款时间:
        </Col>
        <Col span="18">
          {baseInfo.refundSuccessTime}
        </Col>
      </Row>
    </Col>),
  }

  return (
    <Panel style={styles.panelMargin}>
      <Panel.Header>
        基本信息
      </Panel.Header>
      <Panel.Body>
        <Row style={styles.rowSpace}>
          <Col span="12">
            <Row>
              <Col span="6">
                订单号:
              </Col>
              <Col span="18">
                {baseInfo.orderNum}
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Row>
              <Col span="6">
                创建时间:
              </Col>
              <Col span="18">
                {baseInfo.ctime}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={styles.rowSpace}>
          <Col span="12">
            <Row>
              <Col span="6">
                订单状态:
              </Col>
              <Col span="18">
                {isRefund ? '已退款' : status[baseInfo.orderType][baseInfo.orderStatus]}
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Row>
              <Col span="6">
                支付时间:
              </Col>
              <Col span="18">
                {baseInfo.payTime}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={styles.rowSpace}>
          <Col span="12">
            <Row>
              <Col span="6">
                下单用户昵称:
              </Col>
              <Col span="18">
                {baseInfo.nickname}
              </Col>
            </Row>
          </Col>
          {timeNode[tabId]  || null}
        </Row>
        <Row style={styles.rowSpace}>
          <Col span="12">
            <Row>
              <Col span="6">
                联系方式:
              </Col>
              <Col span="18">
                {baseInfo.mobile}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={styles.rowSpace}>
          <Col span="12">
            <Row>
              <Col span="6">
                订单备注:
              </Col>
              <Col span="18">
                {baseInfo.remark}
              </Col>
            </Row>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
}

export default BaseInfoPanel
