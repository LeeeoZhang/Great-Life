import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field,CascaderSelect} from '@icedesign/base'
import AreaData from '@/AreaData'

const FormItem = Form.Item
const {ImageUpload} = Upload
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class MerchantForm extends React.Component {

  static displayName = 'MerchantForm'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this, {
    //onChange修改
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  render () {
    const {__loading,merchantDetail}  = this.props
    const init = this.field.init
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="商家名称：" {...formItemLayout}>
          <Input placeholder="请输入商家名称" {...init('merchantTitle', {
            rules: [{required: true, message: '请输入商家名称'}],
            initValue: merchantDetail ? merchantDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="商家所在省市区/县：" {...formItemLayout}>
          <CascaderSelect hasClear style={styles.cascaderSelectWidth} dataSource={AreaData} placeholder="请选择商家所在省市区/县" {...init('merchantArea', {
            rules: [{required: true, message: '请选择商家所在省市区'}],
            initValue: merchantDetail ? merchantDetail.area : '',
          })}/>
        </FormItem>
      </Form>
    )
  }
}

const styles = {
  cascaderSelectWidth :{
    width:'300px'
  }
}
