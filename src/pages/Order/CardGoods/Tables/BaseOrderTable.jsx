import React, {Fragment} from 'react'
import {
  Tab,
  Feedback,
  Button,
  Form,
  Field,
  Select,
  Input,
  Icon,
  DatePicker,
  Table,
  Pagination,
} from "@icedesign/base"

const FormItem = Form.Item
const {RangePicker} = DatePicker

export default class BaseOrderTable extends React.Component {

  static displayName = 'BaseOrderTable'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onSearch = () => {
    const searchValues = this.field.getValues()
    const searchCondition = {
      title: searchValues.searchTitle,
      timeType: searchValues.timeType,
      startTime: searchValues.time ? searchValues.time[0] : '',
      endTime: searchValues.time ? searchValues.time[1] : '',
    }
    this.props.searching(searchCondition)
  }

  onPaginationChange = current => {
    this.props.onPagination(current)
  }

  onClear = () => {
    this.props.clear()
    this.field.reset()
  }

  formatTimePicker = (data, dataStr) => dataStr


  onCheckOrderDetail = (id) => {
    this.props.getOrderDetail(id)
  }

  render () {
    const init = this.field.init
    const {__loading, orderList, count, size, current, tabId} = this.props
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select
              style={styles.timeTypeSelect}
              placeholder="选择时间类型"
              {...init('timeType')}
            >
              <Select.Option value="1">按支付时间</Select.Option>
              {/*<Select.Option disabled={tabId !== '1'} value="2">按发货时间</Select.Option>*/}
              <Select.Option disabled={tabId !== '3'} value="3">按退款时间</Select.Option>
            </Select>
          </FormItem>
          <FormItem>
            <RangePicker
              showTime
              {...init('time', {
                getValueFromEvent: this.formatTimePicker
              })}
            />
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="搜索店铺名称" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button loading={__loading} style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon
              type="search"/>搜索</Button>
            <Button loading={__loading} style={styles.buttonSpace} onClick={this.onClear}><Icon
              type="refresh"/>清空</Button>
            <Button loading={__loading} style={styles.buttonSpace}><Icon type="download"/>导出订单</Button>
          </FormItem>
        </Form>
        <Table dataSource={orderList} isLoading={__loading}>
          <Table.Column title="交易单号" dataIndex="orderNum"/>
          <Table.Column title="商品信息" width={300} cell={(value, index, record) => {
            return (
              <div style={styles.goodsInfo}>
                <img src={record.fileInfo.compressHttpUrl} style={{width: 100, marginRight: 10}}/>
                <span>{record.goodsTitle}</span>
              </div>
            )
          }}/>
          <Table.Column title="款式" dataIndex="goodsStyleTitle"/>
          <Table.Column title="用户昵称" dataIndex="nickname"/>
          <Table.Column title="状态" align="center" cell={(value, index, record) => {
            const status = {
              1: {0: '未消费', 1: '已消费', 2: '已过期'},
              2: {0: '未发货', 1: '未发货', 2: '已过期'},
            }
            const isRefund = record.orderPayStatus === 2
            return isRefund ? (<span>已退款</span>) : (<span>{status[record.orderType][record.orderSataus]}</span>)
          }}/>
          <Table.Column title="订单数量" align="center" dataIndex="orderQuantity"/>
          <Table.Column title="订单单价" align="center" dataIndex="orderSalePrice"/>
          <Table.Column title="支付金额" align="center" dataIndex="payPrice"/>
          <Table.Column title="支付时间" dataIndex="payTime"/>
          {
            tabId === '1' ? (<Table.Column title="消费时间" dataIndex="payTime"/>) : null
          }
          {
            tabId === '3' ? (<Table.Column title="退款时间" dataIndex="payTime"/>) : null
          }
          <Table.Column title="操作" align="center" cell={(value, index, record) => {
            return (
              <a href="javascript:void (0);" onClick={() => this.onCheckOrderDetail(record.id)}>查看详情</a>
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
  timeTypeSelect: {
    width: '150px',
  },
  timePick: {
    width: '150px',
  },
  input: {
    width: '200px',
  },
  searchAction: {
    marginBottom: '16px',
  },
  buttonSpace: {
    margin: '3px'
  },
  carouselImgWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  carouselImg: {
    width: '50px'
  },
  goodsInfo: {
    display: 'flex',
    alignItems: 'center',
  },
}
