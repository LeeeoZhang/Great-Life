import React, {Fragment, Component} from 'react'
import {Button, Table, Icon} from '@icedesign/base'
import DeleteBalloon from '@/components/DeleteBalloon'

const jumpType = {
  1: '不跳转',
  2: '跳转到商品详情',
  3: '跳转到商品聚合页',
}

export default class HomeBannerList extends Component {

  static displayName = 'HomeBannerList'

  constructor (props) {
    super(props)
  }

  onDel = id => {
    this.props.delHomeBanner(id)
  }

  onEdit = (id, index) => {
    this.props.setBannerDetailAndGoEdit(id, index)
  }

  render () {
    const {homeBannerList, __loading} = this.props
    const deleteButton = (
      <Button style={styles.buttonSpace} shape="warning">删除</Button>
    )
    return (
      <Table dataSource={homeBannerList} isLoading={__loading}>
        <Table.Column align="center" title="轮播图编号" dataIndex="id"/>
        <Table.Column align="center" title="跳转类型" dataIndex="jumpType" cell={value => (
          <div>{jumpType[value]}</div>
        )}/>
        <Table.Column title="轮播图详情" cell={(value, index, record) => (
          <img style={styles.tableImage} src={record.bannerInfo.compressHttpUrl}/>
        )}/>
        <Table.Column align="center" title="创建时间" dataIndex="ctime"/>
        <Table.Column align="center" title="操作" cell={(value, index, record) => {
          return (
            <Fragment>
              <Button onClick={()=>this.onEdit(record.id,index)} style={styles.buttonSpace} type="primary">修改</Button>
              <DeleteBalloon
                trigger={deleteButton}
                confirmDelete={() => this.onDel(record.id)}
              />
            </Fragment>
          )
        }}/>
      </Table>
    )
  }
}

const styles = {
  tableImage: {
    width: '150px',
  },
  buttonSpace: {
    margin: '3px'
  }
}
