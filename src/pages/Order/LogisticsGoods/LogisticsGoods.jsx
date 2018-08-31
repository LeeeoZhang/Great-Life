import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback, Dialog} from "@icedesign/base"
import DOMAIN from '@/domain'
import {getOrderDetail,updateOrderBaseInfo,updateOrderExpressInfo,refund} from "@/service"
import BaseOrderTable from './Tables/BaseOrderTable'
import BaseInfoPanel from './ModalPanel/BaseInfoPanel'
import GoodsInfoPanel from './ModalPanel/GoodsInfoPanel'
import AddressInfoPanel from './ModalPanel/AddressInfoPanel'
import RefundPanel from './ModalPanel/RefundPanel'

const TabPane = Tab.TabPane
const Toast = Feedback.toast
const TabList = [
  {tab: '全部进账', key: '-1'},
  {tab: '待发货', key: '0'},
  {tab: '已发货', key: '1'},
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
      refundInfo:null,
    },
  },
})
export default class LogisticsGoods extends React.Component {

  static displayName = 'LogisticsGoods'

  constructor (props) {
    super(props)
    this.state = {
      tabId: '-1',
      orderType: 2,
      current: 1,
      size: 20,
      title: '',
      startTime: '',
      endTime: '',
      timeType: '',
      isDetailModalShow: false,
      orderId:'',
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

  //退款
  refund = async refundDesc => {
    const {orderId} = this.state
    const res = await refund({data:{refundDesc, orderId}}).catch(()=>false)
    if(res) {
      Toast.success('退款成功')
    }
  }

  //改变tab
  changeTab = key => {
    this.setState({
      tabId: key,
      current: 1,
      title: '',
      startTime: '',
      endTime: '',
      timeType: key === '3' ? 2 : (key === '1' ?  3 : ''),
    }, () => {
      this.getOrderRecord()
    })
  }

  //获取订单列表
  getOrderRecord = () => {
    const {tabId, orderType, current, title, startTime, endTime, timeType,size} = this.state
    this.props.updateBindingData('orderRecord', {
      params: {
        orderType,
        orderStatus: tabId,
        page: current,
        size,
        title,
        startTime,
        endTime,
        timeType,
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

  //关闭订单详情弹窗
  closeDetailModal = () => {
    this.setState({isDetailModalShow: false})
  }

  //打开订单详情弹窗
  openDetailModal = () => {
    this.setState({isDetailModalShow: true})
  }

  //获取订单详情
  getOrderDetail = id => {
    this.setState({orderId:id})
    this.props.updateBindingData('orderDetail', {
      params:{id},
      success:()=>{
        this.openDetailModal()
      }
    })
  }

  updateAddressInfo = async data => {
    const {orderId} = this.state
    data.orderBaseId = orderId
    const res = await updateOrderBaseInfo({data}).catch(()=>false)
    if(res) {
      Toast.success('更新成功')
      this.getOrderDetail(orderId)
    }
  }

  updateExpressInfo = async data => {
    const {orderId} = this.state
    data.orderBaseId = orderId
    const res = await updateOrderExpressInfo({data}).catch(()=>false)
    if(res) {
      Toast.success('更新成功')
      this.getOrderDetail(orderId)
    }
  }

  isNotShowAddressPanel = () => {
    const {orderDetail} = this.props.bindingData
    const {baseInfo} = orderDetail
    return baseInfo.orderPayStatus === 2
  }

  isNotShowRefundPanel = () =>{
    const {orderDetail} = this.props.bindingData
    const {baseInfo} = orderDetail
    return  baseInfo.orderStatus === 1 || baseInfo.orderStatus === 2
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {orderRecord,orderDetail} = this.props.bindingData
    const {baseInfo,goodsInfo,additionalInfo,refundInfo} = orderDetail
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
          shouldUpdatePosition={true}
        >
          <div style={styles.detailWrap}>
            <BaseInfoPanel baseInfo={baseInfo} tabId={tabId}/>
            <GoodsInfoPanel goodsInfo={goodsInfo}/>
            {
              this.isNotShowAddressPanel() ? null : (<AddressInfoPanel
                                        updateAddressInfo={this.updateAddressInfo}
                                        updateExpressInfo={this.updateExpressInfo}
                                        additionalInfo={additionalInfo}
                                      />)
            }
            {this.isNotShowRefundPanel() ? null : (<RefundPanel refundInfo={refundInfo} refund={this.refund}/>)}
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
