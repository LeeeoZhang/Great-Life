import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field} from '@icedesign/base'
import './AddBannerForm.scss'

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

export default class AddBannerForm extends React.Component {

  static displayName = 'AddBannerForm'

  constructor (props) {
    super(props)
    this.state = {
      fileId:'',
    }
  }

  field = new Field(this, {
    deepReset: true,
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  onAddNewBanner = () => {
    this.field.validate((error, values) => {
      console.log(error, values)
    })
  }

  onFileUpload = info => {
    console.log(info)
    if(info.file.status === 'uploading') console.log('上传中')
    if(info.file.status === 'error') console.log('上传出错')
    if(info.file.status === 'done') console.log('上传成功')
    if(info.fileList && info.fileList.length > 0) {
      //上传成功后从info.file里获取服务器响应的图片id
      //this.setState({fileId:info.file.response})
      return info.fileList
    }
    return []
  }


  render () {
    const {__loading} = this.props
    const init = this.field.init
    //上传配置
    const uploadConfig = {
      action: '//ltplus.zmtlm.cn/admin/welfare/upload',
      limit: 1,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials:true,
    }
    return (
      <Fragment>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label="图片标题：" {...formItemLayout}>
            <Input placeholder="请输入图片标题" {...init('bannerTitle', {rules: [{required: true, message: '请输入图片标题'}]})}/>
          </FormItem>
          <FormItem label="小程序路径：" {...formItemLayout}>
            <Input placeholder="例如：pages/**" {...init('bannerPath')}/>
          </FormItem>
          <FormItem label="请选择图片：" {...formItemLayout}>
            <ImageUpload {...uploadConfig} {...init('bannerList', {
              rules: [{required: true, message: '请选择图片'}],
            })} className="uploader"/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button type="primary" size="large" loading={__loading} onClick={this.onAddNewBanner}>提交</Button>
          </FormItem>
        </Form>
      </Fragment>
    )
  }
}

