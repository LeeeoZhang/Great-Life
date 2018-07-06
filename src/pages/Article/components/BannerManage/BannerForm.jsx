import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field} from '@icedesign/base'
import './BannerForm.scss'
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
  }
}

const tipsContent = (
  <div style={styles.tipsContent}>如需点击图片跳转到文章，则需填写小程序路径，如：pages/xxx?id=xx,id为文章编号</div>
)


export default class BannerForm extends React.Component {

  static displayName = 'BannerForm'

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

  submitInfo = () => {
    const {onSubmitInfo} = this.props
    this.field.validate((error, values) => {
      error || onSubmitInfo(this.formatUploadInfo(values),this.clearForm)
    })
  }

  //格式化图片上传组件的响应
  formatUploadResponse = (res) => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  //格式化图片上传组件的值
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  //格式化提交信息
  formatUploadInfo = values => {
    return {
      title: values.bannerTitle,
      path: values.bannerPath,
      fileId: values.bannerFile[0].response ? values.bannerFile[0].response.id : values.bannerFile[0].id,
    }
  }

  //生成初始的fileList
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

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  clearForm = () =>{
    this.field.reset()
  }

  render () {
    const {__loading, type, bannerDetail} = this.props
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
      <Fragment>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label="图片标题：" {...formItemLayout}>
            <Input placeholder="请输入图片标题" {...init('bannerTitle', {
              rules: [{required: true, message: '请输入图片标题'}],
              initValue: bannerDetail ? bannerDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="小程序路径：" {...formItemLayout} extra={tipsContent}>
            <Input placeholder="形如：pages/*" {...init('bannerPath',{
              initValue: bannerDetail ? bannerDetail.path : '',
            })}/>
          </FormItem>
          <FormItem label="选择图片：" {...formItemLayout}>
            <ImageUpload className="uploader" {...uploadConfig} {...init('bannerFile', {
                rules: [{required: true, message: '请选择图片'}],
                valueName: 'fileList',
                initValue: this.createInitFileList(bannerDetail),
                getValueFromEvent: this.formatUploadValue
              })}/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading} onClick={this.submitInfo}>
              {type === 'edit' ? '确认修改' : '新增'}
            </Button>
            {type === 'edit' ? <Button style={styles.buttonSpace} onClick={this.backFromEdit}>返回</Button>:null}
          </FormItem>
        </Form>
      </Fragment>
    )
  }
}

