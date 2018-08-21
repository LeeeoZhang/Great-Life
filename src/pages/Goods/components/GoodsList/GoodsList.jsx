import React, {Fragment} from 'react'
import {Input, Button, Table, Pagination, Form, Field, Icon,Select} from '@icedesign/base'
import DeleteBalloon from '@/components/DeleteBalloon'

const FormItem = Form.Item

export default class GoodsList extends React.Component {

  static displayName = 'GoodsList'

  constructor (props) {
    super(props)
    this.state = {
      size: 10,
    }
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = (current) => {
    this.props.onChangePage(current)
  }

  onEdit = id => {
    this.props.getGoodsDetailAndGoEdit(id)
  }

  onDel = id => {
    this.props.delGoods(id)
  }

  onSaleOut = id => {
    this.props.saleOutGoods(id)
  }

  onSearch = () => {
    this.props.searching(this.field.getValues())
  }

  onClear = () => {
    this.props.resetSearch()
    this.field.reset()
  }

  render () {
    const init = this.field.init
    const {size} = this.state
    const {__loading, goodsList,count,current} = this.props
    const deleteButton = (
      <Button size="small" style={styles.buttonSpace} shape="warning">删除</Button>
    )
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select
              style={styles.timeTypeSelect}
              placeholder="商品状态"
              {...init('status')}
            >
              <Select.Option value="1">上架</Select.Option>
              <Select.Option value="2">下架</Select.Option>
              <Select.Option value="3">待上架</Select.Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="搜索商品名称" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon type="search"/>搜索</Button>
            <Button style={styles.buttonSpace} onClick={this.onClear}><Icon type="refresh"/>清空</Button>
          </FormItem>
        </Form>
        <Table dataSource={goodsList} isLoading={__loading}>
          <Table.Column width={50} align="center" title="编号" dataIndex="id"/>
          <Table.Column width={200} title="商品基本信息" cell={(value, index, record) => {
            return (
              <div style={styles.goodsInfoWrap}>
                <img src={record.goodsInfo.fileInfo.compressHttpUrl} style={styles.tableImage}/>
                <p style={styles.goodsTitle}>{record.goodsInfo.title}</p>
              </div>
            )
          }}/>
          <Table.Column align="center" width={50} title="团购价格" cell={(value, index, record) => {
            return (<div>{record.goodsPrice.groupPrice/100}</div>)
          }}/>
          <Table.Column  width={80} title="销售方式" cell={(value, index, record) => {
            return (
              <div>
                <div>{record.goodsMode.saleMethodName}</div>
                <div>({record.goodsMode.typeName})</div>
              </div>
            )
          }}/>
          <Table.Column align="center" width={50} title="状态" cell={(value, index, record) => {
            return (<div>{record.goodsStatus.name}</div>)
          }}/>
          <Table.Column align="center" width={100} title="款式" cell={(value, index, record) => {
            return (
              <div style={styles.goodsStyleWrap}>
                {record.goodsStyle.map((item, index) => (
                  <div key={index}>
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            )
          }}/>
          <Table.Column width={180} title="款式销售详情" cell={(value, index, record) => {
            return (
              <div style={styles.goodsStyleWrap}>
                {record.goodsStyle.map((item, index) => (
                  <div key={index}>
                    <p style={{fontSize: '12px'}}>{`已支付:${item.orderInfo.already} 已关闭:${item.orderInfo.close} 已创建:${item.orderInfo.create}`}</p>
                    <p style={{fontSize: '12px'}}>{`已过期:${item.orderInfo.expire} 已退款:${item.orderInfo.refund} 已核销:${item.orderInfo.verify}`}</p>
                  </div>
                ))}
              </div>
            )
          }}/>
          <Table.Column width={180} title="款式价格" cell={(value, index, record) => {
            return (
              <div style={styles.goodsStyleWrap}>
                {record.goodsStyle.map((item, index) => (
                  <div key={index}>
                    <p style={{fontSize: '12px'}}>{`市场价:${item.marketPrice/100} 销售价:${item.salePrice/100} 库存:${item.stock}`}</p>
                  </div>
                ))}
              </div>
            )
          }}/>
          <Table.Column width={170} title="商品时间" dataIndex="goodsTime" cell={(value, index, record) => {
            return (
              <div style={styles.goodsStyleWrap}>
                <p style={{fontSize: '12px'}}>{`上架时间:${record.time.putawayTime}`}</p>
                <p style={{fontSize: '12px'}}>{`下架时间:${record.time.soldOutTime}`}</p>
                <p style={{fontSize: '12px'}}>{`秒杀开始时间:${record.time.seckillStartTime || '无'}`}</p>
                <p style={{fontSize: '12px'}}>{`卡券开始时间:${record.time.cardStartTime}`}</p>
                <p style={{fontSize: '12px'}}>{`卡券结束时间:${record.time.cardEndTime}`}</p>
              </div>
            )
          }}/>
          <Table.Column width={100} align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                {/*disabled={Number(record.status) !== 0}*/}
                <Button disabled={Number(record.status) === 2} onClick={()=>this.onEdit(record.id)} size="small" style={styles.buttonSpace} type="primary">修改</Button>
                <Button size="small" style={styles.buttonSpace}>二维码</Button>
                <Button onClick={()=>this.onSaleOut(record.id)} disabled={Number(record.status) !== 1} size="small" style={styles.buttonSpace} type="primary">下架</Button>
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
  goodsInfoWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  goodsStyleWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableImage: {
    flexShrink: '0',
    width: '100px',
  },
  goodsTitle: {
    marginLeft: '10px',
  },
  buttonSpace: {
    margin: '3px',
  },
  paginationWrap: {
    margin: '25px auto 70px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    width: '300px',
  },
}
