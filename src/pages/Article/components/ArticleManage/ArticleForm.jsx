import React, {Fragment} from 'react'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import {Grid, Input, Button, Feedback, Select} from "@icedesign/base"
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import {uploadArticleIMG} from '@/service'
import FormatImageUpload from './FormatImageUpload'

const {Row, Col} = Grid
const Toast = Feedback.toast

export default class ArticleForm extends React.Component {

  static displayName = 'ArticleForm'

  constructor (props) {
    super(props)
    this.state = {
      articleInfo: {
        title: props.articleDetail ? props.articleDetail.title : '',
        author: props.articleDetail ? props.articleDetail.author : '',
        desc: props.articleDetail ? props.articleDetail.desc : '',
        navId: props.articleDetail ? String(props.articleDetail.type) : '',
        id: props.articleDetail ? props.articleDetail.id : '',
        articleImage: this.createArticleImageInitFileList(props.articleDetail),
        bigArticleImage: this.createBigArticleImageInitFileList(props.articleDetail),
      },
      articleHTML: props.articleDetail ? props.articleDetail.content : '',
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
        error || onSubmitInfo(this.formatSubmitInfo(values, articleHTML), this.clearForm)
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
        url: res.data.ext === 'gif' ? res.data.httpUrl : res.data.compressHttpUrl,
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

  createArticleImageInitFileList = articleDetail => {
    const initFileList = []
    const file = {}
    console.log(articleDetail)
    if (articleDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = articleDetail.fileInfo.compressHttpUrl
      file.id = articleDetail.fileInfo.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  createBigArticleImageInitFileList = articleDetail => {
    const initFileList = []
    const file = {}
    console.log(articleDetail)
    if (articleDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = articleDetail.bigFileInfo.compressHttpUrl
      file.id = articleDetail.bigFileInfo.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  clearForm = () => {
    this.editor.clear()
    this.setState({
      articleInfo: {
        title: '',
        author: '',
        desc: '',
        navId: '',
        articleImage:[],
      },
      articleHTML: '',
    })
  }

  //打开导航选择是请求导航列表
  openNavSelector = () => {
    this.props.getNavList()
  }

  formatNavList = navList => {
    return navList.map(item => {
      return {
        label: item.title,
        value: String(item.id),
      }
    })
  }

  //格式化提交数据
  formatSubmitInfo = (values, articleHTML) => {
    console.log(values)
    return {
      title: values.title,
      author: values.author,
      desc: values.desc,
      type: values.navId,
      content: articleHTML,
      fileId:values.articleImage[0].response ? values.articleImage[0].response.id:values.articleImage[0].id,
      bigFileId:values.bigArticleImage[0].response ? values.bigArticleImage[0].response.id:values.bigArticleImage[0].id,
    }
  }


  render () {
    const {__loading, type, navList} = this.props
    const {articleInfo, articleHTML} = this.state
    const editorConfig = {
      contentFormat: 'html',
      initialContent: articleHTML,
      contentId: articleInfo.id,
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
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>文章封面(290*220)：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="articleImage" required message="请选择文章封面" valueFormatter={info=>{
                  if (info.fileList && info.fileList.length > 0) {
                    return info.fileList
                  }
                  return []
              }}>
                <FormatImageUpload/>
              </IceFormBinder>
              <IceFormError name="articleImage"/>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>文章大图(690*320)：</Col>
            <Col s="12" l="10">
              <IceFormBinder name="bigArticleImage" required message="请选择文章大图" valueFormatter={info=>{
                if (info.fileList && info.fileList.length > 0) {
                  return info.fileList
                }
                return []
              }}>
                <FormatImageUpload/>
              </IceFormBinder>
              <IceFormError name="bigArticleImage"/>
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
                <Select style={styles.input} dataSource={this.formatNavList(navList)} onOpen={this.openNavSelector}/>
              </IceFormBinder>
              <IceFormError name="navId"/>
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
              <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading}
                      onClick={this.submitInfo}>
                {type === 'edit' ? '确认修改' : '确认添加'}
              </Button>
              {type === 'edit' ?
                <Button style={styles.buttonSpace} size="large" onClick={this.backFromEdit}>返回</Button> : null}
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
    margin: '0 3px',
  }
}






