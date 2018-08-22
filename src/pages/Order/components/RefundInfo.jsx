import React,{Component,Fragment} from 'react'
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

const RefundInfo = props => {
  const {refundInfo} = props
  const refundStatus = {
    0:'未知',
    1:'成功',
    2:'异常',
    3:'失败',
  }
  return (
    <Fragment>
      <Row style={styles.rowSpace}>
        <Col span={12}>
          <Row>
            <Col span="6">
              创建时间:
            </Col>
            <Col span="18">
              {refundInfo.ctime}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span="6">
              退款单号:
            </Col>
            <Col span="18">
              {refundInfo.orderNum}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={styles.rowSpace}>
        <Col span={12}>
          <Row>
            <Col span="6">
              退款总金额:
            </Col>
            <Col span="18">
              {refundInfo.refundTotalFee}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span="6">
              状态:
            </Col>
            <Col span="18">
              {refundStatus[refundInfo.status]}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={styles.rowSpace}>
        <Col span={12}>
          <Row>
            <Col span="6">
              总金额:
            </Col>
            <Col span="18">
              {refundInfo.totalFee}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span="6">
              退款成功时间:
            </Col>
            <Col span="18">
              {refundInfo.successTime}
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default RefundInfo
