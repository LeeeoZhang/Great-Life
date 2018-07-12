import React, {Fragment} from 'react'
import {Input, Button, Table, Pagination,Form,Field,Icon} from '@icedesign/base'

const FormItem = Form.Item

export default class GoodsList extends React.Component {

  static displayName = 'GoodsList'

  constructor (props) {
    super(props)
    this.state = {
      size:10,
    }
  }

  field = new Field(this,{
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = (current) => {
    console.log(current)
  }

  onSearch = ()=>{

  }

  onClear = ()=> {

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
          <Table.Column align="center" title="商品编号" dataIndex="goodsId"/>
          <Table.Column title="商品信息" cell={(value, index, record) => {
            return (
              <div style={styles.goodsInfoWrap}>
                <img src={record.goodsImageUrl}/>
              </div>
            )
          }}/>
          <Table.Column title="商品类型" dataIndex="goodsType"/>
          <Table.Column title="商品状态" dataIndex="goodsStatus"/>
          <Table.Column title="款式名称" dataIndex="styleName"/>
          <Table.Column title="款式价格" dataIndex="stylePrize"/>
          <Table.Column title="款式订单" dataIndex="styleOrder"/>
          <Table.Column title="商品时间" dataIndex="goodsTime"/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button size="small" style={styles.buttonSpace} type="primary">修改</Button>
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
  buttonSpace: {
    margin: '3px',
  },
  paginationWrap: {
    margin: '25px auto 70px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input:{
    width:'300px',
  },
}
