import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field, CascaderSelect} from '@icedesign/base'
import AreaData from '@/AreaData'
import DOMAIN from '@/domain'
import './MerchantForm.scss'

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
    this.state = {
      areaStr: props.merchantDetail ? props.merchantDetail.area: '',
    }
  }

  field = new Field(this, {
    //onChange修改
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })
  submitInfo = () => {
    const {onSubmitInfo} = this.props
    this.field.validate((error, values) => {
      error || onSubmitInfo(this.formatUploadInfo(values), this.clearForm)
    })
  }

  //格式化选择地区的value格式
  formatAreaSelectValue = (value, data, extra) => {
    let areaStr = ''
    //当清空选择时不存在extra
    extra && extra.selectedPath.forEach(path => areaStr += path.label)
    this.setState({areaStr})
    return value

  }

  //格式化上传图片res的格式
  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  //格式化上传图片的回调结果格式
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  createInitFileList = merchantDetail => {
    const initFileList = []
    const file = {}
    if (merchantDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = merchantDetail.imgUrl
      file.id = merchantDetail.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  //格式化提交的数据
  formatUploadInfo = values => {
    const {areaStr} = this.state
    return {
      title: values.merchantTitle,
      area: areaStr,
      areaId: values.merchantArea,
      fileId: values.merchantImg[0].response ? values.merchantImg[0].response.id : values.merchantImg[0].id,
      address: values.merchantAreaDetail,
    }
  }

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  clearForm = () => {
    this.field.reset()
  }

  render () {
    const {__loading, merchantDetail, type} = this.props
    const init = this.field.init
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      limit: 1,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="商家名称：" {...formItemLayout}>
          <Input placeholder="请输入商家名称" {...init('merchantTitle', {
            rules: [{required: true, message: '请输入商家名称'}],
            initValue: merchantDetail ? merchantDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="商家所在省市区/县：" {...formItemLayout}>
          <CascaderSelect hasClear style={styles.cascaderSelectWidth} dataSource={AreaData}
                          placeholder="请选择商家所在省市区/县" {...init('merchantArea', {
            rules: [{required: true, message: '请选择商家所在省市区'}],
            initValue: merchantDetail ? String(merchantDetail.areaId) : '0',
            getValueFromEvent: this.formatAreaSelectValue
          })}/>
        </FormItem>
        <FormItem label="商家详细地址：" {...formItemLayout}>
          <Input multiple placeholder="请输入商家详细地址" {...init('merchantAreaDetail', {
            rules: [{required: true, message: '请输入商家详细地址'}],
            initValue: merchantDetail ? merchantDetail.address : '',
          })}/>
        </FormItem>
        <FormItem label="选择商家图片：" {...formItemLayout}>
          <ImageUpload className="uploader" {...uploadConfig} {...init('merchantImg', {
            rules: [{required: true, message: '请选择图片'}],
            valueName: 'fileList',
            initValue: this.createInitFileList(merchantDetail),
            getValueFromEvent: this.formatUploadValue
          })}/>
        </FormItem>
        <FormItem label=" "  {...formItemLayout}>
          <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading} onClick={this.submitInfo}>
            {type === 'edit' ? '确认修改' : '新增'}
          </Button>
          {type === 'edit' ? <Button style={styles.buttonSpace} onClick={this.backFromEdit}>返回</Button> : null}
        </FormItem>
      </Form>
    )
  }
}

const styles = {
  cascaderSelectWidth: {
    width: '300px'
  },
  buttonSpace: {
    margin: '0 3px',
  },
}
