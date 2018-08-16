import React, {Fragment}  from 'react'
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
import DataBinder from '@icedesign/data-binder'
import {getOrderDetail} from "@/service"
import DOMAIN from '@/domain'

const FormItem = Form.Item
const {RangePicker} = DatePicker

@DataBinder({
  refundFailList:{
    url: `${DOMAIN}/admin/order/refundLists`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      count: 0,
      lists: [],
    },
  },
})
export default class RefundFail extends React.Component {

  static displayName = 'RefundFail'

  constructor (props) {
    super(props)
    this.state = {
      size:20,
      current:1,
      title:'',
      startTime:'',
      endTime:'',
    }
  }

  componentDidMount(){
    this.getRefundFailOrderRecord()
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = current => {
    this.setState({current}, () => {
      this.getRefundFailOrderRecord()
    })
  }

  onSearch = () => {
    const searchValues = this.field.getValues()
    this.setState({
      title:searchValues.searchTitle || '',
      current:1,
      startTime: searchValues.time ? searchValues.time[0] : '',
      endTime: searchValues.time ? searchValues.time[1] : '',
    }, () => {
      this.getRefundFailOrderRecord()
    })
  }

  onClear = () => {
    this.field.reset()
    this.setState({
      current:1,
      title:'',
      startTime:'',
      endTime:'',
    },()=>{
      this.getRefundFailOrderRecord()
    })
  }

  //获取退款失败订单列表
  getRefundFailOrderRecord = () => {
    const { current, title, startTime, endTime,size} = this.state
    this.props.updateBindingData('refundFailList', {
      params: {
        page: current,
        size,
        title,
        startTime,
        endTime,
      }
    })
  }

  formatTimePicker = (data, dataStr) => dataStr

  render(){
    const init = this.field.init
    const __loading = this.props.bindingData.__loading
    const {refundFailList} = this.props.bindingData
    const {size,current} = this.state
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <RangePicker
              showTime
              {...init('time', {
                getValueFromEvent: this.formatTimePicker
              })}
            />
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="搜索商品名称" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button loading={__loading} style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon
              type="search"/>搜索</Button>
            <Button loading={__loading} style={styles.buttonSpace} onClick={this.onClear}><Icon
              type="refresh"/>清空</Button>
            <Button loading={__loading} style={styles.buttonSpace}><Icon type="download"/>导出订单</Button>
          </FormItem>
        </Form>
        <Table dataSource={refundFailList.lists} isLoading={__loading}>
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
          <Table.Column title="订单数量" align="center" dataIndex="orderQuantity"/>
          <Table.Column title="订单单价" align="center" dataIndex="orderSalePrice"/>
          <Table.Column title="支付金额" align="center" dataIndex="payPrice"/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={refundFailList.count}
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
