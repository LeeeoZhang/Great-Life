import React, {Fragment} from 'react'
import {Form, Input, Button, Field} from '@icedesign/base'
import DOMAIN from '@/domain'
import './StepForm.scss'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class Step2Form extends React.Component {

  static displayName = 'Step2Form'

  constructor (props) {
    super(props)
    this.state = {
      styleFormCount:[],
      styleList : [],
    }
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  //格式化上传图片的值
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  //格式化上传图片的服务器响应
  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? String(res.data.id) : ''
    }
  }


  createInitFileList = step1Data => {

  }

  nextStep = ()=> {
    this.props.nextStep()
  }

  preStep = ()=> {
    this.props.preStep()
  }

  render () {
    const init = this.field.init
    const {step2Data, step1Data, __loading} = this.props
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    return (
      <Form Form direction="ver" field={this.field} size="large">
        <FormItem label="商品价格单位：" {...formItemLayout}>
          <Input placeholder="请输入商品价格单位" {...init('goodsUnit', {
            rules: [{required: true, message: '请输入商品价格单位'}],
            initValue: step2Data ? step2Data.goodsUnit : '',
          })}/>
        </FormItem>
        <FormItem label="商品限购数量：" {...formItemLayout}>
          <Input placeholder="请输入商品限购数量" {...init('goodsPurchase', {
            initValue: step2Data ? step2Data.goodsPurchase : '',
          })}/>
        </FormItem>
        <FormItem label=" "  {...formItemLayout}>
          <Button style={styles.buttonSpace} size="large" loading={__loading}>
            新增款式
          </Button>
        </FormItem>
        <FormItem  {...formItemLayout} style={styles.nextFormItem}>
          <Button  onClick={this.preStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            上一步
          </Button>
          <Button  onClick={this.nextStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            下一步
          </Button>
        </FormItem>
      </Form>
    )

  }
}

const styles = {
  buttonSpace: {
    margin: '0 3px'
  },
  tipsContent: {
    margin: '5px 0',
    fontSize: '12px',
  },
  input: {
    width: '100%'
  },
  nextFormItem:{
    justifyContent:'flex-end'
  }
}
