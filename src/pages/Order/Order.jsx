import React, {Fragment} from 'react'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import LogisticsGoods from './LogisticsGoods/LogisticsGoods'
import CardGoods from './CardGoods/CardGoods'
import RefundFail from './RefundFail/RefundFail'
import Grouping from './Grouping/Grouping'

const TabPane = Tab.TabPane
const Toast = Feedback.toast

export default class Order extends React.Component {

  static displayName = 'Order'

  render(){
    return (
      <IceContainer>
        <Tab>
          <TabPane key="1" tab="核销商品">
            <CardGoods/>
          </TabPane>
          <TabPane key="2" tab="物流商品">
            <LogisticsGoods/>
          </TabPane>
          <TabPane key="3" tab="退款失败">
            <RefundFail/>
          </TabPane>
          <TabPane key="4" tab="拼团中">
            <Grouping/>
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }

}
