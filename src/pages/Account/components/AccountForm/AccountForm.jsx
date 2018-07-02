import React, {Fragment} from 'react'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import {Input, Grid, Button} from '@icedesign/base'

const {Row, Col} = Grid

export default class AccountForm extends React.Component {

  static displayName = 'AccountForm'

  constructor(props) {
    super(props)
    this.state = {
      formData: {
        accountName: '',
        accountPassword: '',
      }
    }
  }

  onSubmitNewAccount = () => {
    const {addAccount} = this.props
    this.refs.form.validateAll((error, value) => {
      error || addAccount(value)
    })
  }

  render() {
    const {formData} = this.state
    const {__loading} = this.props
    return (
      <IceFormBinderWrapper value={formData} ref="form">
        <Fragment>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>新账号:&nbsp;&nbsp;</Col>
            <Col s="12" l="10">
              <IceFormBinder name="accountName" required message="请输入账号名">
                <Input size="large" placeholder="填写新账号" style={styles.input}/>
              </IceFormBinder>
              <IceFormError name="accountName"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>新账号密码:&nbsp;&nbsp;</Col>
            <Col s="12" l="10">
              <IceFormBinder name="accountPassword" required message="请输入账号密码">
                <Input size="large" placeholder="填写密码" style={styles.input}/>
              </IceFormBinder>
              <IceFormError name="accountPassword"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col offset="3">
              <Button type="primary" size="large" loading={__loading} onClick={this.onSubmitNewAccount}>提交</Button>
            </Col>
          </Row>
        </Fragment>
      </IceFormBinderWrapper>
    )
  }
}

const styles = {
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
    textAlign: 'right',
  }
}
