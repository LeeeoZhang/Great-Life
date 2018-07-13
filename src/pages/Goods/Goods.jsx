import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import GoodsNavManage from './components/GoodsNavManage/GoodsNavManage'
import GoodsList from './components/GoodsList/GoodsList'
import GoodsForm from './components/GoodsForm/GoodsForm'
import DOMAIN from '@/domain'
import {delGoodsNav, addGoodsNav, editGoodsNav} from '@/service'

const TabPane = Tab.TabPane
const Toast = Feedback.toast

@DataBinder({
  goodsNavList: {
    url: `${DOMAIN}/admin/goods/listsNav`,
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
  shopIdList: {
    url:`${DOMAIN}/admin/shop/simpleLists`,
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
  goodsList: {
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
export default class Goods extends React.Component {

  static displayName = 'Goods'

  constructor (props) {
    super(props)
    this.state = {
      step1Data: {},
      step2Data: {
        goodsStyle:[
          {
            "id": 1,
            "salePrice": 200,
            "marketPrice": 2000,
            "title": "情侣餐",
            "stock": 100,
            "fileId": 35,
            "compressHttpUrl": "http://jccs.topsunep.com/uploads/compress/20180711/e2f6ee763e242eb647833d20d9830ae2.jpg"
          },
          {
            "id": 2,
            "salePrice": 400,
            "marketPrice": 4000,
            "title": "三人餐餐",
            "stock": 100,
            "fileId": 34,
            "compressHttpUrl": "http://jccs.topsunep.com/uploads/compress/20180711/771b13decb0177759ac62249f5985104.png"
          }
        ],
      },
      step3Data: {},
      step4Data: {},
    }
  }

  componentDidMount () {
    this.getGoodsNavList()
    this.getShopIdList()
  }

  //添加商品导航
  addGoodsNav = async (data, clear) => {
    const res = await addGoodsNav({data: {title: data.navTitle}}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getGoodsNavList()
      clear()
    }
  }

  //修改商品导航
  editGoodsNav = async data => {
    const res = await editGoodsNav({data}).catch(() => false)
    if (res) {
      Toast.success('修改成功')
      this.getGoodsNavList()
    }
  }

  //删除商品导航
  delGoodsNav = async id => {
    const res = await delGoodsNav({params: {id}}).catch(() => false)
    if (res) {
      Toast.success('删除成功')
      this.getGoodsNavList()
    }
  }

  //发送第一步数据，记录返回的id
  postStep1Data = async data => {
    console.log(data)
  }

  //获取店铺导航栏列表
  getGoodsNavList = () => {
    this.props.updateBindingData('goodsNavList')
  }

  //获取店铺id列表
  getShopIdList = () => {
    this.props.updateBindingData('shopIdList')
  }

  render () {
    const {step1Data,step2Data,step3Data,step4Data} = this.state
    const __loading = this.props.bindingData.__loading
    const {goodsNavList, goodsList, shopIdList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="goodsForm" tab="添加商品">
            <GoodsForm
              goodsNavList={goodsNavList.lists}
              shopIdList={shopIdList.lists}
              __loading={__loading}
              postStep1Data={this.postStep1Data}
              step1Data={step1Data}
              step2Data={step2Data}
              step3Data={step3Data}
              step4Data={step4Data}
            />
          </TabPane>
          <TabPane key="goodsList" tab="商品列表">
            <GoodsList __loading={__loading} goodsList={goodsList.lists}/>
          </TabPane>
          <TabPane key="goodsNav" tab="商品导航栏管理">
            <GoodsNavManage
              onSubmitInfo={this.addGoodsNav}
              __loading={__loading}
              goodsNavList={goodsNavList.lists}
              getGoodsNavList={this.getGoodsNavList}
              editGoodsNav={this.editGoodsNav}
              delGoodsNav={this.delGoodsNav}
            />
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
