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
    this.state = {}
  }

  field = new Field(this, {
    //onChange修改
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  createInitFileList = merchantDetail => {
    const initFileList = []
    const file = {}
    if(merchantDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = merchantDetail.imgUrl
      file.id = merchantDetail.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  render () {
    const {__loading, merchantDetail} = this.props
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
            initValue: merchantDetail ? merchantDetail.area : '',
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
      </Form>
    )
  }
}

const styles = {
  cascaderSelectWidth: {
    width: '300px'
  }
}
