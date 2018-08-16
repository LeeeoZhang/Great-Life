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
import DataBinder from '@icedesign/data-binder'
import {getOrderDetail} from "@/service"
import DOMAIN from '@/domain'

const FormItem = Form.Item
const {RangePicker} = DatePicker

@DataBinder({
  groupingList: {
    url: `${DOMAIN}/admin/order/groupingLists`,
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
export default class Grouping extends React.Component {

  static displayName = 'Grouping'

  constructor (props) {
    super(props)
    this.state = {
      size: 20,
      current: 1,
      title: '',
      startTime: '',
      endTime: '',
    }
  }

  componentDidMount () {
    this.getGroupingOrderRecord()
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = current => {
    this.setState({current}, () => {
      this.getGroupingOrderRecord()
    })
  }

  onSearch = () => {
    const searchValues = this.field.getValues()
    this.setState({
      title: searchValues.searchTitle || '',
      current: 1,
      startTime: searchValues.time ? searchValues.time[0] : '',
      endTime: searchValues.time ? searchValues.time[1] : '',
    }, () => {
      this.getGroupingOrderRecord()
    })
  }

  onClear = () => {
    this.field.reset()
    this.setState({
      current: 1,
      title: '',
      startTime: '',
      endTime: '',
    }, () => {
      this.getGroupingOrderRecord()
    })
  }

  //获取退款失败订单列表
  getGroupingOrderRecord = () => {
    const {current, title, startTime, endTime, size} = this.state
    this.props.updateBindingData('groupingList', {
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

  render () {
    const init = this.field.init
    const __loading = this.props.bindingData.__loading
    const {groupingList} = this.props.bindingData
    const {size, current} = this.state
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
        <Table dataSource={groupingList.lists} isLoading={__loading}>
          <Table.Column title="团长" cell={(value, index, record)=>{
            return (<span>{record.userInfo.nickname}</span>)
          }}/>
          <Table.Column title="过期时间" dataIndex="expireTime"/>
          <Table.Column title="成团人数" align="center" cell={(value,index,record)=>{
            return (<span>{record.needNum + record.alreadyNum}</span>)
          }}/>
          <Table.Column title="已参团人数" align="center" dataIndex="alreadyNum"/>
          <Table.Column title="商品名称" dataIndex="goodsTitle"/>
          <Table.Column title="款式" dataIndex="goodsStyleTitle"/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={groupingList.count}
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
