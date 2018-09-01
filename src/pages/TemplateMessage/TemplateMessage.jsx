import React, {Fragment, Component} from 'react'
import { Feedback} from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'

import TemplateList from './TemplateList'
import TemplateForm from './TemplateForm'

import axios from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast

@DataBinder({
  templateList: {
    url: `${DOMAIN}/admin/template/lists`,
    method: 'get',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
    },
  },
  userList: {
    url: `${DOMAIN}/admin/template/sendUser`,
    method: 'get',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
    },
  },
  refresh: {
    url: `${DOMAIN}/admin/template/flushLists`,
    method: 'get',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
  sendTemplateMessage:{
    url: `${DOMAIN}/admin/template/send`,
    method: 'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
})
export default class TemplateMessage extends Component {

  static displayName = 'TemplateMessage'

  state = {
    templateId: null,
    contentList: [],
  }

  componentDidMount () {
    this.getTemplateList()
  }

  getTemplateList () {
    this.props.updateBindingData('templateList')
  }

  getUserList (cb) {
    this.props.updateBindingData('userList', {
      success: () => {
        cb && cb()
      }
    })
  }

  refresh = () => {
    this.props.updateBindingData('refresh', {
      success: () => {
        this.getTemplateList()
      }
    })
  }

  openEditForm = (templateId, contentList) => {
    this.getUserList(() => {
      this.setState({templateId, contentList})
    })
  }

  sendTemplateMessage = (data,clear) => {
    this.props.updateBindingData('sendTemplateMessage',{
      data,
      success:()=>{
        clear()
        Toast.success('发送成功')
      }
    })
  }

  back = () => {
    this.setState({
      templateId: null,
      contentList: [],
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {templateList, userList} = this.props.bindingData
    const {templateId, contentList} = this.state

    return (
      <IceContainer>
        {
          templateId === null ?
            (
              <TemplateList
                __loading={__loading}
                templateList={templateList.lists}
                openEditForm={this.openEditForm}
                refresh={this.refresh}
              />
            ) :
            (
              <TemplateForm
                back={this.back}
                contentList={contentList}
                templateId={templateId}
                userList={userList.lists}
                sendTemplateMessage={this.sendTemplateMessage}
              />
            )
        }
      </IceContainer>
    )

  }

}
