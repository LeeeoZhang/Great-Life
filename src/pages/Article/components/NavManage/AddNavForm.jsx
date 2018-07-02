import React, {Fragment} from 'react'
import {Input, Grid, Button, Form, Field} from '@icedesign/base'

const {Row, Col} = Grid
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

  onAddNewNav = () => {
    this.field.validate((error,values) => {
      console.log(error,values)
    })
  }

  render () {
    const init = this.field.init
    const {__loading} = this.props
    return (
      <Fragment>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label="导航名称：" {...formItemLayout}>
            <Input size="large" placeholder="填写导航名称" {...init('navTitle', {
              rules: [{
                required: true,
                message: '请输入导航名称'
              }]
            })}/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button type="primary" size="large" loading={__loading} onClick={this.onAddNewNav}>提交</Button>
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
