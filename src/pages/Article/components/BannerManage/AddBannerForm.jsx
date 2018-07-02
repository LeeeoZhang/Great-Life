import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field, Grid} from '@icedesign/base'
import './AddBannerForm.scss'


const {Row, Col} = Grid
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
      fileId: '',
    }
  }

  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  onAddNewBanner = () => {
    this.field.validate((error, values) => {
      error || console.log(this.formatUploadInfo(values))
    })
  }

  //格式化上传组件的响应
  formatUploadResponse = (res) => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  //格式化上传组件的值
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  //格式化上传信息
  formatUploadInfo = values => {
    return {
      title:values.bannerTitle,
      path:values.bannerPath,
      id:values.bannerFile[0].response.id
    }
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
      withCredentials: true,
      formatter: this.formatUploadResponse,
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

          <FormItem label="选择图片：" {...formItemLayout}>
            <ImageUpload {...uploadConfig} {...init('bannerFile',
              {rules: [{required: true, message: '请选择图片'}], valueName: 'fileList', getValueFromEvent: this.formatUploadValue})}
                         className="uploader"/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button type="primary" size="large" loading={__loading} onClick={this.onAddNewBanner}>提交</Button>
          </FormItem>
        </Form>
      </Fragment>
    )
  }
}

const styles = {
  formItem: {
    marginBottom: '20px',
  },
  formLabel: {
    height: '40px',
    lineHeight: '40px',
    textAlign: 'right',
    paddingRight: '8px',
    color: '#666666',
  }
}

