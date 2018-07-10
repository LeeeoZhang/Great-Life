import React,{Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import ShopForm from './components/ShopForm'
import ShopList from './components/ShopList'
import ShopTypeListManage from './components/ShopTypeListManage'
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
  shopTypeList: {
    url:`${DOMAIN}/admin/shop/listsFootType`,
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
        {title:'测试商家5',id:'5'},
      ],
    },
  },
})
export default class Shop extends React.Component {

  static displayName = 'Shop'

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.getShopTypeList()
  }

  addShop = (data) => {
    console.log(data)
  }

  //获取店铺类型列表
  getShopTypeList = () => {
    this.props.updateBindingData('shopTypeList')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {merchantList,shopTypeList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="shopType" tab="店铺分类">
            <ShopTypeListManage shopTypeList={shopTypeList.lists} __loading={__loading}/>
          </TabPane>
          <TabPane key="shopList" tab="店铺列表">
            <ShopList/>
          </TabPane>
          <TabPane key="shopForm" tab="添加店铺">
            <ShopForm __loading={__loading} type="add" onSubmitInfo={this.addShop} shopTypeList={shopTypeList.lists} merchantList={merchantList.lists}/>
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
