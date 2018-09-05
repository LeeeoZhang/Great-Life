import React, {Fragment} from 'react'
import {Button, Table, Pagination,Balloon,Search,Grid} from "@icedesign/base"
import DeleteBalloon from '@/components/DeleteBalloon'

//详情弹窗，展示小程序路径和菊花码
const PopDetail = props => (
  <Fragment>
    <h4>小程序路径：xxx</h4>
    <hr/>
    <h4>小程序二维码：</h4>
    <img style={styles.qrcode} src={props.articleDetail.qrcode} alt="qrcode"/>
  </Fragment>
)
const {Row,Col} = Grid

export default class ArticleList extends React.Component {

  static displayName = 'ArticleList'

  constructor (props) {
    super(props)
    this.state = {
      //每页条数
      size: 10,
      //受控分页器
      current:1,
    }
  }

  //翻页
  onPaginationChange = (current, event) => {
    const {size} = this.state
    const {updateArticleList} = this.props
    this.setState({current})
    updateArticleList({page: current, size})
  }

  //点击更新文章，通知获取文章详情进行回填
  onUpdate = id => {
    this.props.getArticleDetail(id)
  }

  //点击删除文章
  onDel = id => {
    this.props.delArticle(id)
  }

  //搜索
  onSearch = (data) => {
    const {key} = data
    this.setState({current:1})
    this.props.searchArticle(key)
  }

  render () {
    const {__loading, articleList, count} = this.props
    const {size,current} = this.state
    const deleteButton = (
      <Button size="small" shape="warning" style={styles.actionBtn}>删除</Button>
    )
    return (
      <Fragment>
        <Row style={styles.searchInput}>
          <Col s="12" l="10">
            <Search autoWidth placeholder="输入文章名称进行搜索" onChange={this.onSearchInputChange} onSearch={this.onSearch}/>
          </Col>
        </Row>
        <Table isLoading={__loading} dataSource={articleList}>
          <Table.Column title="编号" align="center" dataIndex="id" width={60}/>
          <Table.Column title="文章标题" dataIndex="title" width={300}/>
          <Table.Column title="文章封面" width={110} cell={(value,index,record)=>{
            return (
              <img src={record.fileInfo.compressHttpUrl} style={styles.tableImage}/>
            )
          }}/>
          <Table.Column title="文章大图" width={110} cell={(value,index,record)=>{
            return (
              <img src={record.bigFileInfo.compressHttpUrl} style={styles.tableImage}/>
            )
          }}/>
          <Table.Column title="作者" align="center" dataIndex="author"/>
          <Table.Column title="关联文章" dataIndex="shopInfo" cell={value=>{
            return value.map(info=>(<div style={{margin:'5px 0'}}>{info.title}</div>))
          }}/>
          <Table.Column title="创建时间" dataIndex="ctime"/>
          <Table.Column width={100} align="center" title="操作" cell={(value, index, record) => (
            <Fragment>
              <Button size="small" onClick={()=>this.onUpdate(record.id)} type="primary" style={styles.actionBtn}>修改</Button>
              <Balloon
                trigger={<Button size="small" style={styles.actionBtn}>详情</Button>}
                align="lt"
                alignment="edge"
                triggerType="click"
                style={styles.detailBalloon}
              >
                <PopDetail articleDetail={record}/>
              </Balloon>
              <DeleteBalloon
                trigger={deleteButton}
                confirmDelete={()=>this.onDel(record.id)}
              />
            </Fragment>
          )}/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={count}
                      pageSize={size}
                      current={current}
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
    width:'150px'
  },
  detailBalloon :{
    width:'250px',
  },
  searchInput : {
    marginBottom:'20px',
  },
  tableImage:{
    width:'80px',
  },

}
