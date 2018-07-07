import React,{Fragment} from 'react'
import {Table, Button, Balloon} from '@icedesign/base'

//详情弹窗，展示小程序路径和菊花码
const PopDetail = props =>(
  <Fragment>
    <h4>小程序路径：{props.detail.path}</h4>
    <hr/>
    <h4>小程序二维码：</h4>
    <img style={styles.qrcode} src={props.detail.qrCode} alt="qrcode"/>
  </Fragment>
)

export default class MerchantList extends React.Component {

  static displayName = 'MerchantList'

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {merchantList,__loading} = this.props
    return (
      <Fragment>
        <Table isLoading={__loading} style={styles.bannerList} dataSource={merchantList}>
          <Table.Column align="center" title="商家编号" dataIndex="id"/>
          <Table.Column title="商家名称" dataIndex="title"/>
          <Table.Column title="商家地址" dataIndex="address"/>
          <Table.Column title="商家图片" dataIndex="imgUrl" cell={(value,index,record)=>{
            return (<img src={value} style={styles.imageDetail}/>)
          }}/>
          <Table.Column align="center" title="商家地址" cell={(value,index,record)=>{
            return (
              <Fragment>
                <Button size="small" style={styles.buttonSpace} type="primary">修改</Button>
                <Balloon
                  trigger={<Button size="small" style={styles.actionBtn}>详情</Button>}
                  align="lt"
                  alignment="edge"
                  triggerType="click"
                  style={styles.detailBalloon}
                >
                  <PopDetail detail={record}/>
                </Balloon>
                <Button size="small" style={styles.buttonSpace} shape="warning">删除</Button>
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
    width:'80px',
  },
  qrcode:{
    width:'200px'
  },
  buttonSpace: {
    margin: '3px',
  },
  detailBalloon :{
    width:'250px',
  }
}
