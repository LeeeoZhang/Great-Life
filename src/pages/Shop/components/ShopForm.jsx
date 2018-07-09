import React ,{Fragment} from 'react'
import {Input, Button, Upload, Form, Field,Select} from '@icedesign/base'
import './ShopForm.scss'
import DOMAIN from '@/domain'

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
const styles = {
  buttonSpace:{
    margin:'0 3px'
  },
  tipsContent: {
    margin:'5px 0',
    fontSize:'12px',
  },
  input: {
    width: '100%'
  },
}
export default class ShopForm extends React.Component {

  static displayName = 'ShopForm'

  constructor (props) {
    super(props)
    this.stata = {}
  }

  field = new Field(this,{
    onChange: (name, value) => this.field.setValue(name, value)
  })

  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  createInitFileList = bannerDetail => {
    const initFileList = []
    const file = {}
    if(bannerDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = bannerDetail.imgUrl
      file.id = bannerDetail.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  render () {
    const {__loading,shopDetail} = this.props
    const init = this.field.init
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }

    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="店铺名称：" {...formItemLayout}>
          <Input placeholder="请输入店铺名称" {...init('shopTitle', {
            rules: [{required: true, message: '请输入店铺名称'}],
            initValue: shopDetail ? shopDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="选择关联商家：" {...formItemLayout}>
          <Select style={styles.input} placeholder="请选择关联商家" {...init('connectMerchant', {
            rules: [{required: true, message: '请选择关联商家'}],
            initValue: shopDetail ? shopDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="店铺名称扩展：" {...formItemLayout}>
          <Input placeholder="请输入店铺名称" {...init('shopTitleExtend', {
            initValue: shopDetail ? shopDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="选择轮播图片：" {...formItemLayout}>
          <ImageUpload className="uploader" {...uploadConfig} {...init('shopCarousel', {
            rules: [{required: true, message: '请选择图片'}],
            valueName: 'fileList',
            initValue: this.createInitFileList(shopDetail),
            getValueFromEvent: this.formatUploadValue
          })}/>
        </FormItem>
      </Form>
    )
  }


}
