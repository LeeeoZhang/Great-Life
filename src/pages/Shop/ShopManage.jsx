import React,{Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import ShopForm from './components/ShopForm'
import DOMAIN from '@/domain'

const TabPane = Tab.TabPane

@DataBinder({
  shopList: {
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
    },
  },
  typeList: {
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
    },
  },
})
export default class ShopManage extends React.Component {

  static displayName = 'ShopManage'

  constructor (props) {
    super(props)
  }

  render () {
    const __loading = this.props.bindingData.__loading
    return (
      <IceContainer>
        <Tab>
          <TabPane key="shopForm" tab="添加店铺">
            <ShopForm __loading={__loading}/>
          </TabPane>
          <TabPane key="shopList" tab="店铺列表">

          </TabPane>
          <TabPane key="shopType" tab="店铺分类">

          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
