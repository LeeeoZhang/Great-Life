import React from 'react'
import Panel from '@icedesign/panel'
import RefundForm from '../../components/RefundForm'
import RefundInfo from '../../components/RefundInfo'

export default class RefundPanel extends React.Component {

  static displayName = 'RefundPanel'

  render () {
    const {refundInfo, refund} = this.props
    return (
      <Panel style={styles.panelMargin}>
        <Panel.Header>
          退款操作/信息
        </Panel.Header>
        <Panel.Body>
          {
            refundInfo ?
              refundInfo.map(info=>(<RefundInfo refundInfo={info}/>)) :
              (<RefundForm refund={refund}/>)
          }
        </Panel.Body>
      </Panel>
    )
  }
}

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
