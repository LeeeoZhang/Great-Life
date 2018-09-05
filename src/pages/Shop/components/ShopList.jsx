import React, {Fragment} from 'react'
import {Button, Pagination, Table, Select, Input, Icon, Form, Field,Balloon} from '@icedesign/base'
import DeleteBalloon from '@/components/DeleteBalloon'

const FormItem = Form.Item

const PopDetail = props => {
  return (
    <Fragment>
      <h4>小程序路径：{`pages/ShopDetail?id=${props.shopDetail.id}`}</h4>
      <hr/>
      <h4>小程序二维码：</h4>
      <img style={styles.qrcode} src={props.shopDetail.qrcodeInfo.httpUrl} alt="qrcode"/>
    </Fragment>
  )
}

export default class ShopList extends React.Component {

  static displayName = 'ShopList'

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    const {getShopList} = this.props
    getShopList()
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = (current, event) => {
    this.props.paging(current)
  }

  //格式化店铺类型选择列表
  formatTypeList = shopTypeList => {
    return shopTypeList.map(type => {
      return {
        label: type.title,
        value: String(type.id),
      }
    })
  }

  onEdit = id => {
    this.props.getShopDetailAndGoEdit(id)
  }

  onDel = id => {
    this.props.delShop(id)
  }

  onSearch = () => {
    const {searchTitle,searchSecondType} = this.field.getValues()
    this.props.searching(searchTitle,searchSecondType)
  }

  onClear = () => {
    this.props.resetSearch()
    this.field.reset(true)
  }

  render () {
    const init = this.field.init
    const {size} = this.state
    const {shopTypeList,count,shopList,__loading,current} = this.props
    const deleteButton = (
      <Button style={styles.buttonSpace} size="small" shape="warning">删除</Button>
    )
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select
              style={styles.input}
              placeholder="选择店铺所属二级类型"
              dataSource={this.formatTypeList(shopTypeList)}
              {...init('searchSecondType')}
            />
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="搜索店铺名称" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon type="search"/>搜索</Button>
            <Button style={styles.buttonSpace} onClick={this.onClear}><Icon type="refresh"/>清空</Button>
          </FormItem>
        </Form>
        <Table dataSource={shopList} isloading={__loading}>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
          <Table.Column title="店铺分类" dataIndex="shopTypeTitle"/>
          <Table.Column title="店铺图片" dataIndex="fileInfo" cell={value=>{
            return (
              <div style={styles.carouselImgWrap}>
                {(<img style={styles.carouselImg} src={value.compressHttpUrl} key={value.id}/>)}
              </div>
            )
          }}/>
          <Table.Column title="店铺联系电话" dataIndex="shopTel"/>
          <Table.Column title="店铺详细地址" dataIndex="mapInfo" cell={value=>{
            return (<div title={value.areaStr+value.address} style={styles.overflowEllipsis}>{value.areaStr+value.address}</div>)
          }}/>
          <Table.Column title="店铺logo" align="center" dataIndex="connectMerchantTitle" cell={(value,index,record)=>{
            return (<img style={styles.logo} src={record.logoInfo.compressHttpUrl}/>)
          }}/>
          <Table.Column title="营业时间" dataIndex="businessHours"/>
          <Table.Column title="关联文章" dataIndex="articleTitle" cell={value=>{
            return (<div title={value} style={styles.overflowEllipsis}>{value}</div>)
          }}/>
          <Table.Column title="核销员" cell={(value,index,record)=>{
            return record.verifyUserInfo.map(info => {
              return (
                <div style={styles.verifyLabel}>
                  <img style={styles.verifyAvatar} src={info.headimg}/>
                  <span>{info.nickname}</span>
                </div>
              )
            })
          }}/>
          <Table.Column title="管理员" cell={(value,index,record)=>{
            return record.managerUserInfo.map(info => {
              return (
                <div style={styles.verifyLabel}>
                  <img style={styles.verifyAvatar} src={info.headimg}/>
                  <span>{info.nickname}</span>
                </div>
              )
            })
          }}/>
          <Table.Column title="商品数量" dataIndex="goodsNum"/>
          <Table.Column title="创建时间" dataIndex="ctime"/>
          <Table.Column align="center" title="操作" cell={(value,index,record)=> {
            return (
              <Fragment>
                <Button style={styles.buttonSpace} size="small" type="primary" onClick={()=>this.onEdit(record.id)}>编辑</Button>
                <Balloon
                  trigger={<Button size="small" style={styles.buttonSpace}>二维码</Button>}
                  align="lt"
                  alignment="edge"
                  triggerType="click"
                  style={styles.detailBalloon}
                >
                  <PopDetail shopDetail={record}/>
                </Balloon>
                <DeleteBalloon
                  trigger={deleteButton}
                  confirmDelete={()=>this.onDel(record.id)}
                />
              </Fragment>
            )
          }}/>
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
  paginationWrap: {
    margin: '25px auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input:{
    width:'300px',
  },
  searchAction:{
    marginBottom:'16px',
  },
  buttonSpace: {
    margin:'3px'
  },
  carouselImgWrap:{
    display:'flex',
    flexWrap:'wrap',
    alignItems:'center'
  },
  carouselImg:{
    width:'50px'
  },
  logo: {
    width:'50px',
    height:'50px',
    borderRadius:'50%',
  },
  verifyLabel:{
    display:'flex',
    alignItems:'center',
    fontSize:'12px',
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
  },
  verifyAvatar:{
    width:'20px',
    height:'20px',
    borderRadius:'50%',
    marginRight:'5px',
    flexShrink:0,
  },
  overflowEllipsis: {
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
  },
  qrcode:{
    width:'150px'
  },
  detailBalloon :{
    width:'250px',
  },
}


