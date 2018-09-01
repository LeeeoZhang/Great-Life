import React, {Fragment, Component} from 'react'
import {Form, Field, Button, Input, Grid} from '@icedesign/base'

const {Row, Col} = Grid
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}
const FormItem = Form.Item

const styles = {

  userList: {
    height: '500px',
    overflow: 'auto',
  },
  buttonSpace: {
    margin: '0 3px',
  },
  verifyLabel: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  },
  verifyAvatar: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    marginRight: '5px',
    flexShrink: '0',
  },
  nickname: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}

export default class TemplateForm extends Component {

  static defaultProps = {
    contentList: [],
    userList: [],
    templateId: null,
    __loading: false,
  }

  static displayName = 'TemplateForm'

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onBack = () => {
    this.props.back()
  }

  onSend = () => {
    this.field.validate((error, values) => {
      !error && this.props.sendTemplateMessage(this.formatSendMessage(values),this.clearForm)
    })
  }

  formatSendMessage = values => {
    const len = this.props.contentList.length
    const sendData = {}
    for(let i = 0;i<len;i++) {
      sendData[`keyword${i+1}`] = {value:values[`keyword${i+1}`]}
    }
    return {
      pagePath:values.pagePath,
      templateBaseId:values.templateBaseId,
      sendData:JSON.stringify(sendData),
    }
  }

  clearForm =() => {
    this.field.reset(true)
  }

  render () {

    const init = this.field.init
    const {templateId, contentList, __loading, userList} = this.props

    return (
      <Row>
        <Col span={3} offset={2} style={styles.userList}>
          <h6>发送用户</h6>
          {
            userList.map(user => {
              return (
                <div key={user.id} style={styles.verifyLabel}>
                  <img style={styles.verifyAvatar} src={user.headimg}/>
                  <span style={styles.nickname}>{user.nickname}</span>
                </div>
              )
            })
          }
        </Col>
        <Col>
          <Form direction="ver" field={this.field} size="large">
            <FormItem label="小程序路径" {...formItemLayout}>
              <Input placeholder="请输入小程序路径" {...init('pagePath', {
                rules: [{required: true, message: '请输入小程序路径'}],
              })}/>
            </FormItem>
            <FormItem label="模板ID" {...formItemLayout}>
              <Input readOnly {...init('templateBaseId', {
                initValue: templateId,
              })}/>
            </FormItem>
            {
              contentList.map((content, index) => {
                return (
                  <FormItem key={index} label={content} {...formItemLayout}>
                    <Input {...init(`keyword${index + 1}`, {
                      rules: [{required: true, message: `请填写${content}`}],
                    })}/>
                  </FormItem>
                )
              })
            }
            <FormItem label=" "  {...formItemLayout}>
              <Button style={styles.buttonSpace}
                      type="primary"
                      size="large"
                      loading={__loading}
                      onClick={this.onSend}>
                发送
              </Button>
              <Button style={styles.buttonSpace}
                      onClick={this.onBack}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )

  }

}
