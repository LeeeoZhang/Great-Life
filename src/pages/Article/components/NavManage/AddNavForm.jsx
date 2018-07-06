import React, {Fragment} from 'react'
import {Input, Grid, Button, Form, Field} from '@icedesign/base'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class AddNavForm extends React.Component {

  static displayName = 'AddNavForm'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  onAddNav = () => {
    this.field.validate((error, values) => {
      error || this.props.addNav(values,this.clearForm)
    })
  }

  clearForm = () => {
    this.field.reset()
  }

  render () {
    const init = this.field.init
    const {__loading} = this.props
    return (
      <Fragment>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label="导航名称：" {...formItemLayout}>
            <Input maxLength={4} hasLimitHint size="large" placeholder="填写导航名称" {...init('navTitle', {
              rules: [{
                required: true,
                message: '请输入导航名称'
              }]
            })}/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button type="primary" size="large" loading={__loading} onClick={this.onAddNav}>提交</Button>
          </FormItem>
        </Form>
      </Fragment>
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
