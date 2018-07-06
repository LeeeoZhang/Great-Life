import React, {Fragment} from 'react'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import {Grid, Input, Button, Feedback,Select} from "@icedesign/base"
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import {uploadArticleIMG} from '@/service'

const {Row, Col} = Grid
const {Option} = Select
const Toast = Feedback.toast

export default class ArticleForm extends React.Component {

  static displayName = 'ArticleForm'

  constructor (props) {
    super(props)
    this.state = {
      articleInfo:{
        title:props.articleDetail ? props.articleDetail.title : '',
        author:props.articleDetail ? props.articleDetail.author : '',
        desc:props.articleDetail ? props.articleDetail.desc : '',
        navId:props.articleDetail ? String(props.articleDetail.navId) : '',
      },
      articleHTML:props.articleDetail ? props.articleDetail.content : '',
    }
  }

  //把组件内的数据报告至父组件
  submitInfo = () => {
    const {articleHTML} = this.state
    const {onSubmitInfo} = this.props
    this.refs.form.validateAll((error, values) => {
      if (!articleHTML) {
        Toast.error('请编辑文章详情')
      } else {
        error || onSubmitInfo(values,articleHTML)
      }
    })
  }

  //当编辑器发生变化时的处理函数，参数是HTML字符串
  onEditorChange = htmlStr => {
    this.setState({articleHTML: htmlStr})
  }

  //当编辑器插入图片时的上传处理函数
  onEditorUpload = async param => {
    //填充formData
    const fd = new FormData()
    fd.append('file', param.file)
    //上传文章图片
    const res = await uploadArticleIMG({
      method: 'post',
      data: fd,
      //https://github.com/margox/braft-editor
      //原生ajax的进度事件，调用参数中的进度事件
      onUploadProgress: event => param.progress(event.loaded / event.total * 100)
    }).catch(() => false)
    if (res) {
      param.success({
        url: res.data.httpUrl,
        id: res.data.id,
      })
    }
  }

  //检查编辑器插入的多媒体是否符合要求，返回true/false
  validEditorFile = file => {
    return true
  }

  //从修改文章返回
  backFromEdit = () => {
    this.props.backFromEdit()
  }

  clearForm = ()=>{
    this.setState({
      articleInfo:{
        title:'',
        author: '',
        desc:'',
        navId:'',
      },
      articleHTML:'',
    })
  }

  //打开导航选择是请求导航列表
  openNavSelector = () =>{
    console.log('打开')
  }

  formatNavList = navList => {
   return navList.map(item=>{
      return {
        label:item.title,
        value:String(item.id),
      }
    })
  }

  render () {
    const {__loading,articleDetail,type,navList} = this.props
    const {articleInfo} = this.state
    const editorConfig = {
      contentFormat: 'html',
      initialContent:articleDetail ? articleDetail.content: '',
      onHTMLChange: this.onEditorChange,
      media: {
        uploadFn: this.onEditorUpload,
        validateFn: this.validEditorFile,
      }
    }
    return (
      <IceFormBinderWrapper value={articleInfo} ref="form">
        <Fragment>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>文章标题：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="title" required message="请输入文章标题">
                <Input size="large" placeholder="填写文章标题" style={styles.input}/>
              </IceFormBinder>
              <IceFormError name="title"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>作者：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="author" required message="请输入文章作者">
                <Input size="large" placeholder="填写文章作者" style={styles.input}/>
              </IceFormBinder>
              <IceFormError name="author"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel} align="top">文章描述：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="desc" required message="请输入文章描述">
                <Input size="large" maxLength={32} hasLimitHint placeholder="字数在32以内" style={styles.input} multiple/>
              </IceFormBinder>
              <IceFormError name="desc"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel} align="top">添加至：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="navId" required message="请选择需添加至的导航">
                <Select dataSource={this.formatNavList(navList)} onOpen={this.openNavSelector}/>
              </IceFormBinder>
              <IceFormError name="desc"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col>
              <div style={styles.editorWrap}>
                <BraftEditor {...editorConfig} ref={instance => this.editor = instance}/>
              </div>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col offset="1">
              <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading} onClick={this.submitInfo}>
                {type === 'edit' ? '确认修改':'确认添加'}
              </Button>
              {type === 'edit' ? <Button style={styles.buttonSpace} size="large" onClick={this.backFromEdit}>返回</Button> : null}
            </Col>
          </Row>
        </Fragment>
      </IceFormBinderWrapper>
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
  editorWrap: {
    border: '1px solid #DCDEE3',
    borderRadius: '5px',
  },
  buttonSpace: {
    margin:'0 3px',
  }
}






