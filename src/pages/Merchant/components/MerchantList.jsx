import React, {Fragment} from 'react'
import {Table, Button, Balloon} from '@icedesign/base'

//详情弹窗，展示小程序路径和菊花码
const PopDetail = props => (
  <Fragment>
    <p>小程序路径：xx</p>
    <hr/>
    <p>小程序二维码：</p>
    <img style={styles.qrcode} src={props.detail.codeUrl} alt="qrcode"/>
  </Fragment>
)

export default class MerchantList extends React.Component {

  static displayName = 'MerchantList'

  constructor () {
    super()
    this.state = {}
  }

  onEdit = (id, index) => {
    this.props.getMerchantThenEdit(id, index)
  }

  onDel = id => {
    this.props.delMerchant(id)
  }

  render () {
    const {merchantList, __loading} = this.props
    return (
      <Fragment>
        <Table isLoading={__loading} style={styles.bannerList} dataSource={merchantList}>
          <Table.Column align="center" title="商家编号" dataIndex="id"/>
          <Table.Column title="商家名称" dataIndex="title"/>
          <Table.Column title="商家地址" cell={(value, index, record) => {
            return (<div>{record.area + record.address}</div>)
          }}/>
          <Table.Column title="商家图片" dataIndex="imgUrl" cell={(value, index, record) => {
            return (<img src={value} style={styles.imageDetail}/>)
          }}/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button size="small" onClick={() => {
                  this.onEdit(record.id, index)
                }} style={styles.buttonSpace} type="primary">修改</Button>
                <Balloon
                  trigger={<Button size="small" style={styles.actionBtn}>详情</Button>}
                  align="lt"
                  alignment="edge"
                  triggerType="click"
                  style={styles.detailBalloon}
                >
                  <PopDetail detail={record}/>
                </Balloon>
                <Button size="small" style={styles.buttonSpace} shape="warning" onClick={() => {
                  this.onDel(record.id)
                }}>删除</Button>
              </Fragment>
            )
          }}/>
        </Table>
      </Fragment>
    )
  }

}

const styles = {
  bannerList: {
    marginBottom: '30px',
  },
  imageDetail: {
    width: '50px',
  },
  qrcode: {
    width: '150px'
  },
  buttonSpace: {
    margin: '3px',
  },
  detailBalloon: {
    width: '200px',
  }
}
