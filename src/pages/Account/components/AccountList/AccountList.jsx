import React, {Fragment} from 'react'
import { Table, Button,Input } from '@icedesign/base'

export default class AccountList extends React.Component {

  static displayName = 'AccountList'

  constructor (props) {
    super(props)
    this.state = {}
  }



  render () {
    const {accountList,__loading} = this.props
    return (
      <Table dataSource={accountList} isLoading={__loading} style={styles.accountList}>
        <Table.Column title="账号" dataIndex="userName" cell={(value,index,record)=>{
          return (<Input defaultValue={value}/>)
        }}/>
        <Table.Column title="密码" dataIndex="password" cell={(value,index,record)=>{
          return <div>{value}</div>
        }}/>
        <Table.Column title="状态" dataIndex="isActive" cell={(value,index,record)=>{
          return <div>{value}</div>
        }}/>
        <Table.Column align="center" title="操作" dataIndex="isActive" cell={(value,index,record)=>{
          return (<Button>更新</Button>)
        }}/>
      </Table>
    )
  }
}

const styles = {
  accountList:{
    marginBottom:50,
  },
}
