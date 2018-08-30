import React,{Component,Fragment} from 'react'
import { Input, Button, Select,Table } from '@icedesign/base'
import DeleteBalloon from '@/components/DeleteBalloon'

const {Combobox} = Select

export default class ShopRankList extends Component {

  static displayName = 'ShopRankList'

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {
      ShopSortList:[],
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({ShopSortList:nextProps.ShopSortList})
  }

  onShopSortChange = (value,index) =>{
    const newShopSortlList = [...this.state.ShopSortList]
    newShopSortlList[index].sort = value
    this.setState({ShopSortList:newShopSortlList})
  }

  onEdit = index => {
    const {ShopSortList} = this.state
    this.props.editShopSort(ShopSortList[index])
  }

  onDel = id => {
    this.props.delShopSort(id)
  }

  render(){
    const {ShopSortList} = this.state
    const deleteButton = (
      <Button style={styles.buttonSpace} size="small" shape="warning">删除</Button>
    )
    return (
      <div style={{marginTop:'30px'}}>
        <Table dataSource={ShopSortList}>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
          <Table.Column title="排序标识" dataIndex="sort" cell={(value,index,record)=>{
            return (
              <Input value={value} onChange={value=>this.onShopSortChange(value,index)}/>
            )
          }}/>
          <Table.Column align="center" title="操作" cell={(value,index,record)=>{
            return (
              <Fragment>
                <Button style={styles.buttonSpace} size="small" type="primary" onClick={()=>this.onEdit(index)}>编辑</Button>
                <DeleteBalloon
                  trigger={deleteButton}
                  confirmDelete={()=>this.onDel(record.id)}
                />
              </Fragment>
            )
          }}/>
        </Table>
      </div>
    )
  }
}

const styles = {
  buttonSpace: {
    margin: '0 3px'
  },
}
