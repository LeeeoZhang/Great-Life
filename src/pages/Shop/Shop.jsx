import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import ShopForm from './components/ShopForm'
import ShopList from './components/ShopList'
import ShopTypeListManage from './components/ShopTypeListManage'
import DOMAIN from '@/domain'
import {addShopType, editShopType, delShopType, addShop, getShopDetail, editShop, delShop} from '@/service'

const TabPane = Tab.TabPane
const Toast = Feedback.toast
@DataBinder({
  shopList: {
    url: `${DOMAIN}/admin/shop/lists`,
    params: {
      page: 1,
      size: 10,
      title: '',
      secondType: '',
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
      count: 0,
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
})
export default class Shop extends React.Component {

  static displayName = 'Shop'

  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      shopDetail: null,
      editId: '',
      current: 1,
      size: 10,
      title: '',
      secondType: '',
    }
  }

  componentDidMount () {
    this.getShopTypeList()
  }

  //添加店铺
  addShop = async (data, clear) => {
    data.mapInfo = JSON.stringify(data.mapInfo)
    data.shopCarousel = null
    data.logoImg = null
    const res = await addShop({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getShopList()
      clear()
    }
  }

  //编辑店铺
  editShop = async data => {
    data.mapInfo = JSON.stringify(data.mapInfo)
    data.shopCarousel = null
    data.logoImg = null
    data.id = this.state.editId
    const res = await editShop({data}).catch(() => false)
    if (res) {
      this.backFromEdit()
      Toast.success('编辑成功')
      this.getShopList()
    }
    console.log(data)
  }

  //删除店铺
  delShop = async id => {
    const res = await delShop({params: {id}}).catch(() => false)
    if (res) {
      Toast.success('删除成功')
      this.getShopList()
    }
    console.log(id)
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

  //获取店铺详情，并跳转到编辑店铺
  getShopDetailAndGoEdit = async id => {
    this.setState({editId: id})
    const res = await getShopDetail({params: {id}}).catch(() => false)
    if (res) {
      this.setState({
        isEdit: true,
        shopDetail: res.data,
      })
    }
  }

  //翻页
  paging = current => {
    this.setState({current}, () => {
      this.getShopList()
    })
  }

  //TODO:测试翻页的几种情况
  //TODO:1.翻页过程中进行搜索应该返回到第一页；2.查询后翻页应携带查询数据进行翻页；3.查询或翻页过程中进行增删改操作后，应在当前查询翻页条件下重新请求数据
  //查询
  searching = (searchTitle, searchType) => {
    this.setState({title: searchTitle, secondType: searchType, size: 10, current: 1}, () => {
      this.getShopList()
    })
  }

  //重置查询
  resetSearch = () => {
    this.setState({
      current: 1,
      size: 10,
      title: '',
      secondType: '',
    }, () => {
      this.getShopList()
    })
  }

  //从编辑返回
  backFromEdit = () => {
    this.setState({isEdit: false})
  }

  //获取店铺类型列表
  getShopTypeList = () => {
    this.props.updateBindingData('shopTypeList')
  }

  //获取店铺列表
  getShopList = () => {
    const {current, size, title, secondType} = this.state
    this.props.updateBindingData('shopList', {
      params: {
        page: current, size, title, secondType
      }
    })
  }

  render () {
    const {isEdit, shopDetail, current} = this.state
    const __loading = this.props.bindingData.__loading
    const {shopTypeList, shopList} = this.props.bindingData
    return (
      <IceContainer>
        {isEdit ?
          <ShopForm
            type="edit"
            __loading={__loading}
            backFromEdit={this.backFromEdit}
            shopTypeList={shopTypeList.lists}
            shopDetail={shopDetail}
            onSubmitInfo={this.editShop}
          /> :
          <Tab>
            <TabPane key="shopList" tab="店铺列表">
              <ShopList
                __loading={__loading}
                shopTypeList={shopTypeList.lists}
                shopList={shopList.lists}
                count={shopList.count}
                delShop={this.delShop}
                getShopList={this.getShopList}
                getShopDetailAndGoEdit={this.getShopDetailAndGoEdit}
                paging={this.paging}
                searching={this.searching}
                current={current}
                resetSearch={this.resetSearch}
              />
            </TabPane>
            <TabPane key="shopForm" tab="添加店铺">
              <ShopForm
                __loading={__loading}
                type="add"
                onSubmitInfo={this.addShop}
                shopTypeList={shopTypeList.lists}
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
        }
      </IceContainer>
    )
  }
}
