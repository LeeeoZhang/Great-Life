

/*
* 使upload组件拥有FormBinder的标准api
* 对upload组件进行一层包装
*/

import React, {Fragment} from 'react'
import {Upload} from "@icedesign/base"
import DOMAIN from '@/domain'
import './AricleForm.scss'

const {ImageUpload} = Upload

export default class FormatImageUpload extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fileList:props.value,
    }
  }

  //https://alibaba.github.io/ice/component/formbinder#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E
  componentWillReceiveProps(nextProps) {
    // 注意在上层 FormBinder 更新 value 之后，将组件内部 value 更新
    this.setState({
      fileList: nextProps.value,
    })
  }

  onChange = info =>{
   this.props.onChange && this.props.onChange(info)
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

  render(){
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      limit: 1,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    const {fileList} = this.state
    return (
      <ImageUpload onChange={this.onChange} class="uploader" fileList={fileList} {...uploadConfig} style={{width:'100%'}}/>
    )
  }
}


