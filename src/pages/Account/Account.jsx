import React from 'react'
import { Feedback } from '@icedesign/base'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'
import IceTitle from '@icedesign/title'
import AccountForm from './components/AccountForm'
import AccountList from './components/AccountList'
import './Account.scss'
import { addNewAccount,editAccount,delAccount } from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast

@DataBinder({
  accountList:{
    url:`${DOMAIN}/admin/account/lists`,
    method:'get',
    data:{
      page:1,
      size:100,
    },
    responseFormatter:(responseHandler,res,originResponse)=>{
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS':'ERROR',
        data:res
      }
      responseHandler(formatResponse,originResponse)
    },
    defaultBindingData:{
      lists:[],
      count:0,
    }
  }
})
export default class Account extends React.Component {
  static displayName = 'Account'

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.updateAccountList()
  }
  //新增账号
  addAccount = async (data,clear) => {
    const res = await addNewAccount({
      method:'post',
      data:{username:data.accountName,password:data.accountPassword}
    }).catch(()=>false)
    if(res) {
      Toast.success('添加成功')
      clear()
      this.updateAccountList()
    }
  }
  //删除账号
  delAccount = async id => {
    const res = await delAccount({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.updateAccountList()
    }
  }
  //更新账号
  onUpdate = async (data) => {
    const res = await editAccount({
      method:'post',
      data:{id:data.id,password:data.password,status:data.isActive}
    }).catch(()=>false)
    if(res) {
      Toast.success('修改成功')
      this.updateAccountList()
    }
  }

  updateAccountList  = ()=>{
    this.props.updateBindingData('accountList')
  }


  render () {
    const {accountList} = this.props.bindingData
    const {__loading,lists} = accountList
    return (
      <div className="account-page">
        <IceContainer>
          <IceTitle text="添加新账号" decoration/>
          <AccountForm __loading={__loading} addAccount={this.addAccount}/>
          <IceTitle text="账号列表" decoration/>
          <AccountList accountList={lists} __loading={__loading} onUpdate={this.onUpdate} delAccount={this.delAccount}/>
        </IceContainer>
      </div>
    )
  }
}
