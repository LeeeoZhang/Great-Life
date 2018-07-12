import React, {Fragment} from 'react'
import {Form, Field, Input, Button} from '@icedesign/base'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class GoodsNavForm extends React.Component {

  static displayName = 'GoodsNavForm'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this,{
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onAddNav = () => {
    this.field.validate((error,values)=>{
      error || this.props.submitInfo(values,this.clearForm)
    })
  }

  clearForm = () => {
    this.field.reset()
  }

  render () {
    const init = this.field.init
    const {__loading} = this.props
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="导航名称：" {...formItemLayout}>
          <Input placeholder="请输入导航名称" {...init('navTitle', {
            rules: [{required: true, message: '请输入导航名称'}],
          })}/>
        </FormItem>
        <FormItem label=" "  {...formItemLayout}>
          <Button type="primary" size="large" loading={__loading} onClick={this.onAddNav}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }

}
