import React from 'react'
import {Grid, Input, Button,} from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder'

const {Row, Col} = Grid
const styles = {
  rowSpace: {
    marginBottom: '10px',
  },
  panelMargin: {
    marginBottom: '10px'
  },
  input: {
    width: '100%'
  },
  formItem: {
    marginBottom: '20px',
    alignItems: 'center'
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'left',
  },
}

export default class RefundForm extends React.Component {

  static displayName = 'RefundForm'

  constructor (props) {
    super(props)
    this.state = {
      refundReason: {
        reason: '',
      }
    }
  }

  onRefund = () => {
    const {reason} = this.state.refundReason
    this.props.refund(reason)
  }

  render () {
    const {refundReason} = this.state
    return (
      <IceFormBinderWrapper ref="refundReasonForm" value={refundReason}>
            <Row>
              <Col span={6}>
                <IceFormBinder name="reason">
                  <Input size="large" placeholder="填写退款原因" style={styles.input}/>
                </IceFormBinder>
              </Col>
              <Col offset={1}>
                <Button onClick={this.onRefund} type="primary" size="large">退款</Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
    )
  }

}
