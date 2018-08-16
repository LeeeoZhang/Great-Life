import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback, Dialog} from "@icedesign/base"
import DOMAIN from '@/domain'
import {getOrderDetail} from "@/service"

import BaseOrderTable from './Tables/BaseOrderTable'
import BaseInfoPanel from './ModalPanel/BaseInfoPanel'
import GoodsInfoPanel from './ModalPanel/GoodsInfoPanel'
import AddressInfoPanel from './ModalPanel/AddressInfoPanel'
import RefundPanel from './ModalPanel/RefundPanel'

const TabPane = Tab.TabPane
const TabList = [
  {tab: '全部进账', key: '-1'},
  {tab: '待消费', key: '0'},
  {tab: '已消费', key: '1'},
  {tab: '已过期', key: '2'},
  {tab: '已退款', key: '3'},
]

@DataBinder({
  orderRecord: {
    url: `${DOMAIN}/admin/order/lists`,
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
  orderDetail: {
    url: `${DOMAIN}/admin/order/detail`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      baseInfo: {
        orderType:1,
        orderStatus:0,
        orderPayStatus:1,
      },
      goodsInfo: {
        fileInfo:{},
      },
      additionalInfo: {},
    },
  },
})
export default class CardGoods extends React.Component {

  static displayName = 'CardGoods'

  constructor (props) {
    super(props)
    this.state = {
      tabId: '-1',
      orderType: 1,
      current: 1,
      size: 20,
      title: '',
      startTime: '',
      endTime: '',
      timeType: '',
    }
  }

  componentDidMount () {
    this.getOrderRecord()
  }

  //翻页
  onPagination = current => {
    this.setState({current}, () => {
      this.getOrderRecord()
    })
  }

  //搜索
  searching = ({title, timeType, startTime, endTime}) => {
    this.setState({title, timeType, startTime, endTime, current: 1}, () => {
      this.getOrderRecord()
    })
  }

  //改变tab
  changeTab = key => {
    this.setState({
      tabId: key,
      current: 1,
      size: 20,
      title: '',
      startTime: '',
      endTime: '',
      timeType: '',
    }, () => {
      this.getOrderRecord()
    })
  }

  //关闭订单详情弹窗
  closeDetailModal = () => {
    this.setState({isDetailModalShow: false})
  }

  //打开订单详情弹窗
  openDetailModal = () => {
    this.setState({isDetailModalShow: true})
  }

  //获取订单列表
  getOrderRecord = () => {
    const {tabId, orderType, current, title, startTime, endTime, timeType} = this.state
    this.props.updateBindingData('orderRecord', {
      params: {
        orderType,
        orderStatus: tabId,
        page: current,
        size: 20,
        title,
        startTime,
        endTime,
        timeType,
      }
    })
  }

  //获取订单详情
  getOrderDetail = id => {
    this.props.updateBindingData('orderDetail', {
      params:{id},
      success:()=>{
        this.openDetailModal()
      }
    })
  }

  //清空按钮
  clear = () => {
    this.setState({
      current: 1,
      size: 20,
      title: '',
      startTime: '',
      endTime: '',
      timeType: '',
    }, () => {
      this.getOrderRecord()
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {orderRecord,orderDetail} = this.props.bindingData
    const {baseInfo,goodsInfo,additionalInfo} = orderDetail
    const {size, current, tabId, isDetailModalShow} = this.state

    return (
      <Fragment>
        <Tab onChange={this.changeTab}>
          {
            TabList.map(tabInfo => {
              return (
                <TabPane tab={tabInfo.tab} key={tabInfo.key}>
                  <BaseOrderTable
                    __loading={__loading}
                    orderList={orderRecord.lists}
                    count={orderRecord.count}
                    size={size}
                    current={current}
                    onPagination={this.onPagination}
                    searching={this.searching}
                    clear={this.clear}
                    tabId={tabId}
                    getOrderDetail={this.getOrderDetail}
                  />
                </TabPane>
              )
            })
          }
        </Tab>
        <Dialog
          visible={isDetailModalShow}
          title="订单详情"
          onClose={this.closeDetailModal}
          onCancel={this.closeDetailModal}
        >
          <div style={styles.detailWrap}>
            <BaseInfoPanel baseInfo={baseInfo} tabId={tabId}/>
            <GoodsInfoPanel goodsInfo={goodsInfo}/>
            {
              tabId === '3' || tabId === '2' ? null : (<AddressInfoPanel additionalInfo={additionalInfo}/>)
            }
            <RefundPanel tabId={tabId}/>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

const styles = {
  detailWrap: {
    width: '1000px',
  }
}
