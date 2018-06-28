import React , {Fragment}from 'react'
import {Input, Grid, Button,Upload} from '@icedesign/base'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import './AddBannerForm.scss'
const {Row,Col} = Grid
const {ImageUpload} = Upload

export default class AddBannerForm extends React.Component {

  static displayName = 'AddBannerForm'

  constructor (props) {
    super(props)
    this.state = {
      formData:{
        bannerName:'',
        bannerPath:'',
        bannerList: {
          file:null,
          fileList:[]
        },
      }
    }
  }

  componentWillReceiveProps(nextProps){

  }


  onAddNewBanner = () =>{
    this.refs.form.validateAll((error,values)=> {
      error || console.log(values)
    })
  }



  render () {
    const {__loading} = this.props
    const {formData} = this.state
    const uploadConfig = {
      action:'',
      limit:1,
      accept:'image/png, image/jpg, image/jpeg',
      listType:"picture-card",
    }
    return (
      <Fragment>
        <IceFormBinderWrapper ref="form" value={formData}>
          <Fragment>
            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.formLabel}>图片标题:&nbsp;&nbsp;</Col>
              <Col s="12" l="10">
                <IceFormBinder name="bannerName" required message="请输入图片标题">
                  <Input size="large" placeholder="填写图片标题" style={styles.input}/>
                </IceFormBinder>
                <IceFormError name="bannerName"/>
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.formLabel}>小程序路径:&nbsp;&nbsp;</Col>
              <Col s="12" l="10">
                <IceFormBinder name="bannerPath" >
                  <Input size="large" placeholder="例如：pages/pageName" style={styles.input}/>
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.formLabel}>选择图片:&nbsp;&nbsp;</Col>
              <Col s="12" l="10">
                <IceFormBinder name="bannerList" required message="请选择图片">
                  <ImageUpload {...uploadConfig} className="uploader"/>
                </IceFormBinder>
                <Row>
                  <Col>
                    <IceFormError name="bannerList"/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col offset="3">
                <Button type="primary" size="large" loading={__loading} onClick={this.onAddNewBanner}>提交</Button>
              </Col>
            </Row>
          </Fragment>
        </IceFormBinderWrapper>
      </Fragment>
    )
  }
}

const styles = {
  input: {
    width: '100%'
  },
  formItem: {
    marginBottom: '20px',
    alignItems: 'center'
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  uploader:{
    margin:0,
  }
}
