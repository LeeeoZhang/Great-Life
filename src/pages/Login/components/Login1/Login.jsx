/* eslint react/no-string-refs:0 */
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Input, Button, Checkbox, Grid, Feedback} from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import IceIcon from '@icedesign/icon'
import './Login.scss'
import {login} from '@/service'
import DOMAIN from '@/domain'
import {setAuth} from "@/utils"

const {Row, Col} = Grid
const Toast = Feedback.toast

@withRouter
export default class Login extends Component {
  static displayName = 'Login'

  static propTypes = {}

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {
      value: {
        account: '',
        password: '',
      },
      codeUrl:`${DOMAIN}/admin/user/entry?t=1525365852204`,
    }
  }

  formChange = (value) => {
    this.setState({
      value,
    })
  }

  //点击验证码
  clickCode = ()=>{
    this.setState({
      codeUrl:`${DOMAIN}/admin/user/entry?t=${new Date().getTime()}`
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.refs.form.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors)
      } else {
        const res = await this.login(values).catch(() => false)
        if (res) {
          setAuth({dashboard:{isAuth:0},charts:{isAuth:1}})
          this.props.history.push('/')
          Toast.success('登录成功')
        } else {
          Toast.error('登录错误')
        }
      }
    })
  }

  login = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 3000)
    })
  }

  render () {
    const {codeUrl} = this.state
    return (
      <div style={styles.container} className="user-login">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png"
              alt="logo"
            />
            <span style={styles.title}>Admin</span>
          </a>
          <p style={styles.desc}>预留预留预留预留预留预留</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>登 录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="account" required message="请输入账号">
                    <Input
                      size="large"
                      maxLength={20}
                      placeholder="账号"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account"/>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="lock" size="small" style={styles.inputIcon}/>
                  <IceFormBinder name="password" required message="请输入密码">
                    <Input
                      size="large"
                      htmlType="password"
                      placeholder="密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password"/>
                </Col>
              </Row>
              <Row style={styles.formItemOfCode}>
                <Col span="12">
                  <IceIcon type="lock" size="small" style={styles.inputIcon}/>
                  <IceFormBinder name="code" required message="请输入验证码">
                    <Input
                      placeholder="验证码"
                      style={styles.codeInput}
                    />
                  </IceFormBinder>
                </Col>
                <Col span="10" offset="1">
                  <div style={styles.codeWrap} onClick={this.clickCode}>
                    <img src={codeUrl} alt="验证码" style={styles.codeImg}/>
                  </div>
                </Col>
                <Col>
                  <IceFormError name="code"/>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  登 录
                </Button>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    )
  }
}
const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    fontSize: '33px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif',
    fontWeight: '600',
  },
  desc: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  logo: {
    marginRight: '10px',
    width: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '368px',
    margin: '0 auto',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
    padding: '0',
  },
  formItemCol: {
    position: 'relative',
    padding: '0',
  },
  formTitle: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  submitBtn: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '40px',
    background: '#3080fe',
    borderRadius: '4px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    justifyContent: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
  codeInput: {
    width: '100%'
  },
  codeWrap:{
    width:'100%',
    height:'40px',
  },
  codeImg:{
    width:'100%',
    height:'100%',
  },
  formItemOfCode: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'row',
    padding: '0',
  },
}
