import React, {Fragment} from 'react'
import { Button, Table,  Icon} from '@icedesign/base'

export default class HomeList extends React.Component {

  static displayName = 'HomeList'

  constructor (props) {
    super(props)
  }

  onEdit = index =>{
    this.props.setHomeDetailAndGoEdit(index)
  }

  onDel = id =>{
    this.props.delHomeContent(id)
  }

  render () {
    const {homeList,__loading} = this.props
    return (
      <Table dataSource={homeList} isLoading={__loading}>
        <Table.Column title="主标题" dataIndex="title"/>
        <Table.Column title="副标题" dataIndex="subTitle"/>
        <Table.Column title="商品详情" cell={(value,index,record)=>{
          return (
            <div>
              {
                record.goodsInfo.map(item=>{
                  return (
                    <div key={item.goodsBaseId} style={styles.goodsDetailWrap}>
                      <img style={styles.goodsImage} src={item.goodsInfo.fileInfo.compressHttpUrl}/>
                      <p style={styles.goodsTitle}>{item.goodsInfo.title}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        }}/>
        <Table.Column align="center" title="操作" cell={(value,index,record)=>{
          return (
            <Fragment>
              <Button onClick={()=>this.onEdit(index)} style={styles.buttonSpace} type="primary">修改</Button>
              <Button onClick={()=>this.onDel(record.id)} style={styles.buttonSpace} shape="warning">删除</Button>
            </Fragment>
          )
        }}/>
      </Table>
    )
  }
}

const styles = {
  buttonSpace: {
    margin: '3px',
  },
  goodsDetailWrap:{
    display:'flex',
    margin:'10px 0',
    alignItems:'center',
  },
  goodsImage:{
    flexShrink:'0',
    width:'50px',
  },
  goodsTitle:{
    fontSize:'12px',
    marginLeft:'10px',
  }
}
