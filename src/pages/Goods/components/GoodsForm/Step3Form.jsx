import React, {Fragment} from 'react'
import {Form, Input, Button, Field, Select, Grid, Feedback} from '@icedesign/base'
import IceTitle from '@icedesign/title'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import {uploadArticleIMG} from '@/service'


const {Row, Col} = Grid
const Toast = Feedback.toast

export default class Step3Form extends React.Component {

  static displayName = 'Step3Form'

  constructor (props) {
    super(props)
    this.state = {
      noteHTMLStr: '',
      detailHTMLStr: '',
    }
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
        url: res.data.compressHttpUrl,
        id: res.data.id,
      })
    }
  }

  //检查编辑器插入的多媒体是否符合要求，返回true/false
  validEditorFile = file => {
    return true
  }

  onNoteEditorChange = noteHTMLStr => {
    this.setState({noteHTMLStr})
  }

  onDetailEditorChange = detailHTMLStr => {
    this.setState({detailHTMLStr})
  }

  preStep = () => {
    this.props.preStep()
  }


  nextStep = () => {
    const {noteHTMLStr, detailHTMLStr} = this.state
    const {onReportData} = this.props
    if (!noteHTMLStr || !detailHTMLStr) {
      Toast.error('请正确填写商品详情和购买须知')
    } else {
      onReportData({
        goodsBuyNotes: noteHTMLStr,
        goodsDetail: detailHTMLStr,
      }, 2)
    }
  }

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  render () {
    const {step3Data, __loading,type} = this.props
    const noteEditorConfig = {
      contentFormat: 'html',
      initialContent: step3Data.goodsBuyNotes || '',
      contentId: step3Data.detailId,
      onHTMLChange: this.onNoteEditorChange,
      media: {
        uploadFn: this.onEditorUpload,
        validateFn: this.validEditorFile,
      }
    }
    const detailEditorConfig = {
      contentFormat: 'html',
      initialContent: step3Data.goodsDetail || '',
      contentId: step3Data.detailId,
      onHTMLChange: this.onDetailEditorChange,
      media: {
        uploadFn: this.onEditorUpload,
        validateFn: this.validEditorFile,
      }
    }
    return (
      <div>
        <IceTitle text="购买须知" decoration/>
        <Row style={styles.formItem}>
          <Col>
            <div style={styles.editorWrap}>
              <BraftEditor {...noteEditorConfig} ref={instance => this.noteEditor = instance}/>
            </div>
          </Col>
        </Row>
        <IceTitle text="商品详情" decoration/>
        <Row style={styles.formItem}>
          <Col>
            <div style={styles.editorWrap}>
              <BraftEditor {...detailEditorConfig} ref={instance => this.detailEditor = instance}/>
            </div>
          </Col>
        </Row>
        <div style={styles.nextFormItem}>
          <Button onClick={this.preStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            上一步
          </Button>
          <Button onClick={this.nextStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            下一步
          </Button>
          {type === 'edit' && (<Button onClick={this.backFromEdit} style={styles.buttonSpace} size="large">返回</Button>)}
        </div>
      </div>
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
  },
  nextFormItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}
