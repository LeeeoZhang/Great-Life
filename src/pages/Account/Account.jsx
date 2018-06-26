import React, {Component} from 'react'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'
import IceTitle from '@icedesign/title'
import AccountForm from './components/AccountForm'
import AccountList from './components/AccountList'
import './Account.scss'

@DataBinder({
  accountList:{
    defaultBindingData:{
      lists:[
        {userName:'王胜1号',password:1234567,isActive:0},
        {userName:'王胜2号',password:1234567,isActive:1},
        {userName:'王胜3号',password:1234567,isActive:0},
        {userName:'王胜4号',password:1234567,isActive:1},
        {userName:'王胜5号',password:1234567,isActive:0},
      ],
    }
  }
})
export default class Account extends Component {
  static displayName = 'Account'

  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
  }

  addAccount = async (data) => {
    console.log(data)
  }

  onUpdate = async (data) => {
    console.log(data)
  }

  render () {
    const {accountList} = this.props.bindingData
    const {__loading,lists} = accountList
    return (
      <div className="account-page">
        <IceContainer loading={__loading}>
          <IceTitle text="添加新账号" decoration/>
          <AccountForm __loading={__loading} addAccount={this.addAccount}/>
          <IceTitle text="账号列表" decoration/>
          <AccountList accountList={lists} __loading={__loading} onUpdate={this.onUpdate}/>
        </IceContainer>
      </div>
    )
  }
}
