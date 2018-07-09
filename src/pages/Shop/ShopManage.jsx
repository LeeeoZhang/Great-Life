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
      lists: [
        {title:'川菜',id:'1'},
        {title:'外国菜',id:'2'},
        {title:'不知道什么菜',id:'3'},
        {title:'香菜',id:'4'},
      ],
    },
  },
  merchantList: {
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [
        {title:'测试商家1',id:'1'},
        {title:'测试商家2',id:'2'},
        {title:'测试商家3',id:'3'},
        {title:'测试商家4',id:'4'},
        {title:'测试商家5',id:'5s'},
      ],
    },
  },
})
export default class ShopManage extends React.Component {

  static displayName = 'ShopManage'

  constructor (props) {
    super(props)
  }

  addShop = (data) => {
    console.log(data)
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {typeList,merchantList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="shopForm" tab="添加店铺">
            <ShopForm __loading={__loading} type="add" onSubmitInfo={this.addShop} typeList={typeList.lists} merchantList={merchantList.lists}/>
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
