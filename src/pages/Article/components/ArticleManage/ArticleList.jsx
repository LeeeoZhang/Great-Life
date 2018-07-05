import React, {Fragment} from 'react'
import {Button, Table, Pagination,Balloon} from "@icedesign/base"

//详情弹窗，展示小程序路径和菊花码
const PopDetail = props =>(
  <Fragment>
    <h4>小程序路径：{props.articleDetail.path}</h4>
    <hr/>
    <h4>小程序二维码：</h4>
    <img style={styles.qrcode} src={props.articleDetail.qrCode} alt="qrcode"/>
  </Fragment>
)

export default class ArticleList extends React.Component {

  static displayName = 'ArticleList'

  constructor (props) {
    super(props)
    this.state = {
      //每页条数
      size: 10,
      articleDetail:{
        qrCode:'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
        path:'pages/article',
      },
    }
  }

  //翻页
  onPaginationChange = (current, event) => {
    const {size} = this.state
    const {updateArticleList} = this.props
    updateArticleList({page: current, size})
  }

  //点击更新文章，通知获取文章详情进行回填
  onUpdate = id => {
    const {getArticleDetail} = this.props
    getArticleDetail(id)
  }

  //点击删除文章
  onDel = async id => {
    console.log(id)
  }

  //点击文章详情,获取小程序路径和二维码
  getPathAndQrCode = async id => {
    console.log(id)
  }

  render () {
    const {__loading, articleList, count} = this.props
    const {size,articleDetail} = this.state
    return (
      <Fragment>
        <Table isLoading={__loading} dataSource={articleList}>
          <Table.Column title="文章标题" dataIndex="title"/>
          <Table.Column title="作者" dataIndex="auth"/>
          <Table.Column title="创建时间" dataIndex="createTime"/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => (
            <Fragment>
              <Button size="small" onClick={()=>this.onUpdate(record.id)} type="primary" style={styles.actionBtn}>修改</Button>
              <Balloon
                trigger={<Button size="small" onClick={()=>this.getPathAndQrCode(record.id)} style={styles.actionBtn}>详情</Button>}
                align="lt"
                alignment="edge"
                triggerType="click"
                style={styles.detailBalloon}
              >
                <PopDetail articleDetail={articleDetail}/>
              </Balloon>
              <Button size="small" onClick={()=>this.onDel(record.id)} shape="warning" style={styles.actionBtn}>删除</Button>
            </Fragment>
          )}/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={count}
                      pageSize={size}
          />
        </div>
      </Fragment>
    )
  }
}

const styles = {
  actionBtn: {
    margin: '3px',
  },
  paginationWrap: {
    margin: '25px auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  qrcode:{
    width:'200px'
  },
  detailBalloon :{
    width:'250px',
  }
}
