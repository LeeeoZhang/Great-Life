import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import ShopForm from './components/ShopForm'
import ShopList from './components/ShopList'
import ShopTypeListManage from './components/ShopTypeListManage'
import DOMAIN from '@/domain'
import {addShopType, editShopType, delShopType, addShop} from '@/service'

const TabPane = Tab.TabPane
const Toast = Feedback.toast
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
    url: `${DOMAIN}/admin/shop/listsFootType`,
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
    url: `${DOMAIN}/admin/merchant/lists`,
    params: {
      page: 1,
      size: 1000,
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [
        {title: '测试商家1', id: '1'},
        {title: '测试商家2', id: '2'},
        {title: '测试商家3', id: '3'},
        {title: '测试商家4', id: '4'},
        {title: '测试商家5', id: '5'},
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
    this.getMerchantList()
  }

  //添加店铺
  addShop = async (data, clear) => {
    data.mapInfo = JSON.stringify(data.mapInfo)
    data.shopCarousel = null
    const res = await addShop({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      clear()
    }
  }

  //添加店铺类型
  addShopType = async (data, clear) => {
    const res = await addShopType({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getShopTypeList()
      clear()
    }
  }

  //编辑店铺类型
  editShopType = async data => {
    const res = await editShopType({data}).catch(() => false)
    if (res) {
      Toast.success('修改成功')
      this.getShopTypeList()
    }
  }

  //删除店铺类型
  delShopType = async id => {
    const res = await delShopType({params: {id}}).catch(() => false)
    if (res) {
      Toast.success('删除成功')
      this.getShopTypeList()
    }
  }

  //获取店铺类型列表
  getShopTypeList = () => {
    this.props.updateBindingData('shopTypeList')
  }

  //获取商家列表
  getMerchantList = () => {
    this.props.updateBindingData('merchantList')
  }

  //获取店铺列表
  getShopList = (page = 1, size = 10, title = '', type = '') => {
    this.props.updateBindingData('shopList', {
      data: {
        page, size, title, type
      }
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {merchantList, shopTypeList, shopList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="shopList" tab="店铺列表">
            <ShopList
              __loading={__loading}
              shopTypeList={shopTypeList.lists}
              shopList={shopList.lists}
              count={shopList.count}
              getShopList={this.getShopList}
            />
          </TabPane>
          <TabPane key="shopForm" tab="添加店铺">
            <ShopForm
              __loading={__loading}
              type="add"
              onSubmitInfo={this.addShop}
              shopTypeList={shopTypeList.lists}
              merchantList={merchantList.lists}
            />
          </TabPane>
          <TabPane key="shopType" tab="店铺分类">
            <ShopTypeListManage
              shopTypeList={shopTypeList.lists}
              __loading={__loading}
              onSubmitInfo={this.addShopType}
              editShopType={this.editShopType}
              delShopType={this.delShopType}
            />
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
