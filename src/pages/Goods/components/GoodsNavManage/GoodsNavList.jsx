import React, {Fragment} from 'react'
import { Input, Button,Table} from '@icedesign/base'


export default class GoodsNavList extends React.Component {

  static displayName = 'GoodsNavList'

  constructor (props) {
    super(props)
    this.state = {
      goodsNavList:[...props.goodsNavList]
    }
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      goodsNavList:[...nextProps.goodsNavList]
    })
  }

  onEditGoodsNavTitle = (value,index) => {
    const newGoodsNavList = [...this.state.goodsNavList]
    newGoodsNavList[index].title = value
    this.setState({goodsNavList:newGoodsNavList})
  }


  render () {
    const {goodsNavList} = this.state
    const {__loading} = this.props
    return (
      <Table dataSource={goodsNavList} isLoading={__loading}>
        <Table.Column title="导航名称" dataIndex="title" cell={(value,index,record)=>{
          return (<Input disabled={record.isDefault === 1} value={value} onChange={value=>this.onEditGoodsNavTitle(value,index)}/>)
        }}/>
        <Table.Column title="创建时间" dataIndex="ctime"/>
        <Table.Column align="center" title="操作" cell={(value,index,record)=>{
          return (
            <Fragment>
              <Button disabled={record.isDefault === 1} style={styles.buttonSpace} type="primary">更新</Button>
              <Button disabled={record.isDefault === 1} style={styles.buttonSpace} shape="warning">删除</Button>
            </Fragment>
          )
        }}/>
      </Table>
    )
  }
}

const styles = {
  buttonSpace:{
    margin:'3px'
  }
}
