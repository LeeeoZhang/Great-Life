import React, {Fragment} from 'react'
import {Form, Input, Button, Field, Select, Upload} from '@icedesign/base'
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
const {ImageUpload} = Upload
const styles = {
  formBackground: {
    background: '#f7f7f7',
    padding: '10px 0',
    marginBottom: '20px',
  },
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
  nextFormItem: {
    justifyContent: 'flex-end'
  }
}
const styleImageTips = (
  <div style={styles.tipsContent}>建议大小:750*490</div>
)

export default class StyleForm extends React.Component {

  static displayName = 'StyleForm'

  constructor (props) {
    super(props)
    this.state = {}
  }


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

  createInitFileList = styleData => {
    const initFileList = []
    const file = {}
    if (styleData && Object.keys(styleData).includes('compressHttpUrl')) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = styleData.compressHttpUrl
      file.fileId = styleData.fileId
      file.id = styleData.id
      initFileList.push(file)
    }
    return initFileList
  }

  delStyle = indexId => {
    const {index, field} = this.props
    field.remove(`styleImage${indexId}`)
    field.remove(`styleSalePrice${indexId}`)
    field.remove(`styleTitle${indexId}`)
    field.remove(`styleMarketPrice${indexId}`)
    field.remove(`styleStock${indexId}`)
    this.props.delStyle(index)
  }


  render () {
    const {__loading, styleData, init} = this.props
    const {indexId} = styleData
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      limit: 1,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    return (
      <div style={styles.formBackground}>
        <FormItem label="选择款式图片：" {...formItemLayout} extra={styleImageTips}>
          <ImageUpload className="uploader" {...uploadConfig} {...init(`styleImage${indexId}`, {
            rules: [{required: true, message: '请选择图片'}],
            valueName: 'fileList',
            initValue: this.createInitFileList(styleData),
            getValueFromEvent: this.formatUploadValue
          })}/>
        </FormItem>
        <FormItem label="款式名称：" {...formItemLayout}>
          <Input placeholder="请输入款式名称" {...init(`styleTitle${indexId}`, {
            rules: [{required: true, message: '请输入款式名称'}],
            initValue: styleData.title ? styleData.title : '',
          })}/>
        </FormItem>
        <FormItem label="销售价格：" {...formItemLayout}>
          <Input placeholder="请输入销售价格" {...init(`styleSalePrice${indexId}`, {
            rules: [{required: true, message: '请输入销售价格'}],
            initValue: styleData.salePrice ? styleData.salePrice/100 : '',
          })}/>
        </FormItem>
        <FormItem label="市场价格：" {...formItemLayout}>
          <Input placeholder="请输入市场价格" {...init(`styleMarketPrice${indexId}`, {
            rules: [{required: true, message: '请输入市场价格'}],
            initValue: styleData.marketPrice ? styleData.marketPrice/100 : '',
          })}/>
        </FormItem>
        <FormItem label="库存量：" {...formItemLayout}>
          <Input placeholder="请输入库存量" {...init(`styleStock${indexId}`, {
            rules: [{required: true, message: '请输入库存量'}],
            initValue: styleData.stock ? styleData.stock : '',
          })}/>
        </FormItem>
        <FormItem label=" " {...formItemLayout}>
          <Button shape="warning" onClick={() => this.delStyle(indexId)} style={styles.buttonSpace} loading={__loading}>
            删除该款式
          </Button>
        </FormItem>
      </div>
    )
  }
}
