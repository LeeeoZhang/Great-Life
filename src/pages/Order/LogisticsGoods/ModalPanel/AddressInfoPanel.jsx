import React from 'react'
import Panel from '@icedesign/panel'
import {Grid, Input, Button,Select} from '@icedesign/base'
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
const expressStatusOptions = [
  {label:'未发货',value:'0'},
  {label:'已发货',value:'1'},
]
const expressCompanyOptions = [
  {label:'暂无',value:'0'},
  {label:'韵达快递',value:'1'},
]

export default class AddressInfoPanel extends React.Component {

  static displayName = 'AddressInfoPanel'

  constructor (props) {
    super(props)
    this.state = {
      addressInfo: {
        name: '',
        mobile: '',
        address: '',
      },
      expressInfo: {
        status: '',
        expressNum: '',
        expressCompany: '',
      },
    }
  }

  componentWillReceiveProps (nextProps) {
    const {additionalInfo} = nextProps
    this.setState({
      addressInfo: this.createAddressInfo(additionalInfo),
      expressInfo: this.createExpressInfo(additionalInfo),
    })
  }

  createAddressInfo = additionalInfo => {
    return {
      name: additionalInfo.name,
      mobile: additionalInfo.mobile,
      address: additionalInfo.address,
    }
  }

  createExpressInfo = additionalInfo => {
    return {
      status: String(additionalInfo.status),
      expressNum: additionalInfo.expressNum,
      expressCompany: String(additionalInfo.expressCompany),
    }
  }

  render () {
    const {addressInfo, expressInfo} = this.state
    return (
      <Panel style={styles.panelMargin}>
        <Panel.Header>
          收货信息
        </Panel.Header>
        <Panel.Body>
          <Row>
            <IceFormBinderWrapper value={addressInfo} ref="addressForm">
              <Col span={12}>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>收件人:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="name">
                      <Input size="large" placeholder="填写新账号" style={styles.input}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>联系方式:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="mobile">
                      <Input size="large" placeholder="请输入联系方式" style={styles.input}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>收货地址:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="address">
                      <Input size="large" placeholder="请输入收货地址" style={styles.input}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col offset="6">
                    <Button type="primary" size="large">更新</Button>
                  </Col>
                </Row>
              </Col>
            </IceFormBinderWrapper>
            <IceFormBinderWrapper value={expressInfo} ref="expressForm">
              <Col span={12}>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>发货状态:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="status">
                      <Select style={styles.input} dataSource={expressStatusOptions}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>快递公司:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="expressCompany">
                      <Select dataSource={expressCompanyOptions} style={styles.input}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="6" l="6" style={styles.formLabel}>快递单号:&nbsp;&nbsp;</Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="expressNum">
                      <Input size="large" placeholder="请输入快递单号" style={styles.input}/>
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col offset="6">
                    <Button type="primary" size="large">更新(短信通知)</Button>
                  </Col>
                </Row>
              </Col>
            </IceFormBinderWrapper>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

