import React, {Fragment} from 'react'
import { Table, Button,Input,Radio } from '@icedesign/base'

const RadioGroup = Radio.Group
const statusList = [
  {label:'活跃',value:1},
  {label:'禁用',value:0},
]

export default class AccountList extends React.Component {

  static displayName = 'AccountList'

  constructor (props) {
    super(props)
    this.state = {
      accountList:[...props.accountList]
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      accountList:[...nextProps.accountList]
    })
  }

  //修改密码
  onPasswordChange = (value,index) => {
    const newList = [...this.state.accountList]
    newList[index].password = value
    this.setState({accountList:newList})
  }

  //修改状态
  onStatusChange = (value,index) => {
    const newList = [...this.state.accountList]
    newList[index].isActive = value
    this.setState({accountList:newList})
  }

  onUpdate = (index) => {
    this.props.onUpdate(this.state.accountList[index])
  }

  onDel = (id) => {
    this.props.delAccount(id)
  }

  render () {
    const {__loading} = this.props
    const {accountList} = this.state
    return (
      <Table dataSource={accountList} isLoading={__loading} style={styles.accountList}>
        <Table.Column title="账号" dataIndex="username" cell={(value,index,record)=>{
          return (<div>{value}</div>)
        }}/>
        <Table.Column title="密码" dataIndex="password" cell={(value,index,record)=>{
          return (<Input htmlType="password" value={value} onChange={value=>{this.onPasswordChange(value,index)}}/>)
        }}/>
        <Table.Column title="状态" dataIndex="isActive" cell={(value,index,record)=>{
          return (<RadioGroup dataSource={statusList} shape="button" value={+value} onChange={value=>{this.onStatusChange(value,index)}}/>)
        }}/>
        <Table.Column align="center" title="操作"  cell={(value,index,record)=>{
          return (
            <Fragment>
              <Button type="primary" loading={__loading} onClick={()=> this.onUpdate(index)} style={styles.actionButton}>更新</Button>
              <Button shape="warning" loading={__loading} onClick={()=> this.onDel(record.id)} style={styles.actionButton}>删除</Button>
            </Fragment>
          )
        }}/>
      </Table>
    )
  }
}

const styles = {
  accountList:{
    marginBottom:50,
  },
  actionButton: {
    margin:'0 5px'
  }
}
