import React, {Fragment} from 'react'
import {Input, Button, Table, Pagination, Form, Field, Icon} from '@icedesign/base'

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
    console.log(current)
  }

  onEdit = id => {
    this.props.getGoodsDetailAndGoEdit(id)
  }

  onSearch = () => {

  }

  onClear = () => {

  }

  render () {
    const init = this.field.init
    const {size} = this.state
    const {__loading, goodsList} = this.props
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Input style={styles.input} placeholder="搜索商品名称" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon type="search"/>搜索</Button>
            <Button style={styles.buttonSpace} onClick={this.onClear}><Icon type="refresh"/>清空</Button>
          </FormItem>
        </Form>
        <Table dataSource={goodsList} isLoading={__loading}>
          <Table.Column width={90} align="center" title="商品编号" dataIndex="id"/>
          <Table.Column width={300} title="商品基本信息" cell={(value, index, record) => {
            return (
              <div style={styles.goodsInfoWrap}>
                <img src={record.goodsInfo.fileInfo.compressHttpUrl} style={styles.tableImage}/>
                <p style={styles.goodsTitle}>{record.goodsInfo.title}</p>
              </div>
            )
          }}/>
          <Table.Column align="center" width={90} title="团购价格" cell={(value, index, record) => {
            return (<div>{record.goodsPrice.groupPrice/100}</div>)
          }}/>
          <Table.Column  width={150} title="销售方式" cell={(value, index, record) => {
            return (<div>{record.goodsMode.saleMethodName}({record.goodsMode.typeName})</div>)
          }}/>
          <Table.Column align="center" width={90} title="商品状态" cell={(value, index, record) => {
            return (<div>{record.goodsStatus.name}</div>)
          }}/>
          <Table.Column width={150} title="款式" cell={(value, index, record) => {
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
          <Table.Column width={230} title="款式价格" cell={(value, index, record) => {
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
          <Table.Column width={230} title="商品时间" dataIndex="goodsTime" cell={(value, index, record) => {
            return (
              <div style={styles.goodsStyleWrap}>
                <p style={{fontSize: '12px'}}>{`上架时间:${record.time.putawayTime}`}</p>
                <p style={{fontSize: '12px'}}>{`下架时间:${record.time.soldOutTime}`}</p>
                <p style={{fontSize: '12px'}}>{`秒杀开始时间:${record.time.goodsSeckillStartTime || '无'}`}</p>
                <p style={{fontSize: '12px'}}>{`卡券开始时间:${record.time.cardStartTime}`}</p>
                <p style={{fontSize: '12px'}}>{`卡券结束时间:${record.time.cardEndTime}`}</p>
              </div>
            )
          }}/>
          <Table.Column width={100} align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button onClick={()=>{this.onEdit(record.id)}} size="small" style={styles.buttonSpace} type="primary">修改</Button>
                <Button size="small" style={styles.buttonSpace}>菊花码</Button>
                <Button size="small" style={styles.buttonSpace} shape="warning">删除</Button>
              </Fragment>
            )
          }}/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={1000}
                      pageSize={size}
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
