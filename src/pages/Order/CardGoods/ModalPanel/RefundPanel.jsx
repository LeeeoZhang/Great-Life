import React from 'react'
import Panel from '@icedesign/panel'
import {Grid, Input, Button,} from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
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

export default class RefundPanel extends React.Component {

  static displayName = 'RefundPanel'

  constructor (props) {
    super(props)
    this.state = {
      refundReason: {
        reason: '',
      }
    }
  }

  render () {
    const {refundReason} = this.state
    const {tabId} = this.props
    return (
      <Panel style={styles.panelMargin}>
        <Panel.Header>
          退款操作
        </Panel.Header>
        <Panel.Body>
          <IceFormBinderWrapper ref="refundReasonForm" value={refundReason}>
            <Row>
              <Col span={6}>
                <IceFormBinder name="reason">
                  <Input size="large" placeholder="填写退款原因" style={styles.input}/>
                </IceFormBinder>
              </Col>
              <Col offset={1}>
                <Button disabled={tabId === '3'} type="primary" size="large">退款</Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </Panel.Body>
      </Panel>
    )
  }

}
