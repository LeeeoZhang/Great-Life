import React, {Fragment} from 'react'
import {Table, Button} from '@icedesign/base'

export default class BannerList extends React.Component {

  static displayName = 'BannerList'

  constructor (props) {
    super(props)
    this.state = {}
  }

  //点击修改按钮
  onEdit = id => {
    this.props.getBannerDetail(id)
  }

  //点击删除按钮
  onDel = id => {
    this.props.delBanner(id)
  }

  render () {
    const {__loading,bannerList} = this.props
    return (
      <Fragment>
        <Table dataSource={bannerList} isLoading={__loading} style={styles.bannerList}>
          <Table.Column title="图片标题" dataIndex="title" cell={(value,index,record)=>{
            return (<div>{value}</div>)
          }}/>
          <Table.Column title="小程序路径" dataIndex="path" cell={(value,index,record)=>{
            return (<div>{value}</div>)
          }}/>
          <Table.Column title="图片详情" dataIndex="imgUrl" cell={(value,index,record)=>{
            return (<img src={value} style={styles.imageDetail}/>)
          }}/>
          <Table.Column align="center" title="操作"  cell={(value,index,record)=>{
            return (
              <Fragment>
                <Button style={styles.actionBtn} type="primary" loading={__loading} onClick={()=> this.onEdit(record.id)}>修改</Button>
                <Button style={styles.actionBtn} shape="warning" loading={__loading} onClick={()=> this.onDel(record.id)}>删除</Button>
              </Fragment>
            )
          }}/>
        </Table>
      </Fragment>
    )
  }
}

const styles = {
  bannerList:{
    marginBottom:'30px',
  },
  imageDetail: {
    width:'100px',
  },
  actionBtn: {
    margin: '3px',
  },
}

