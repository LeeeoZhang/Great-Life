import React, {Fragment} from 'react'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder'
import {Grid, Input, Button, Feedback} from "@icedesign/base"
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

import {uploadArticleIMG} from '@/service'

const {Row, Col} = Grid
const Toast = Feedback.toast

export default class AddArticleForm extends React.Component {

  static displayName = 'AddArticleForm'

  constructor (props) {
    super(props)
    this.state = {
      //文章信息
      articleInfo: {
        title: '',   //标题
        author: '',  //作者
        desc: '',    //描述
      },
      articleHTML: '',
    }
  }

  onSubmitNewArticle = () => {
    this.refs.form.validateAll((error, value) => {
      if (!this.state.articleHTML) Toast.error('编辑文章详情')
      error || console.log(value)
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

  //检查编辑器插入的多媒体是否复合要求，返回true/false
  validEditorFile = file => {
    return true
  }

  render () {
    const {articleInfo} = this.state
    const {__loading} = this.props
    const editorConfig = {
      contentFormat: 'html',
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
            <Col>
              <div style={styles.editorWrap}>
                <BraftEditor {...editorConfig} ref={instance => this.editor = instance}/>
              </div>
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col offset="1">
              <Button type="primary" size="large" loading={__loading} onClick={this.onSubmitNewArticle}>提交</Button>
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
  }
}
