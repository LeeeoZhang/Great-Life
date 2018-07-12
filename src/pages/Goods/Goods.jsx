import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import GoodsNavManage from './components/GoodsNavManage/GoodsNavManage'
import GoodsList from './components/GoodsList/GoodsList'
import GoodsForm from './components/GoodsForm/GoodsForm'
import DOMAIN from '@/domain'
import {delGoodsNav,addGoodsNav,editGoodsNav} from '@/service'

const TabPane = Tab.TabPane
const Toast = Feedback.toast

@DataBinder({
  goodsNavList : {
    url:`${DOMAIN}/admin/goods/listsNav`,
    method:'get',
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
  goodsList:{
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
  }

  componentDidMount(){
    this.getGoodsNavList()
  }

  //添加商品导航
  addGoodsNav = async (data,clear) => {
    const res = await addGoodsNav({data:{title:data.navTitle}}).catch(()=>false)
    if (res) {
      Toast.success('添加成功')
      this.getGoodsNavList()
      clear()
    }
  }

  //修改商品导航
  editGoodsNav = async data => {
    const res = await editGoodsNav({data}).catch(()=>false)
    if(res) {
      Toast.success('修改成功')
      this.getGoodsNavList()
    }
  }

  //删除商品导航
  delGoodsNav = async id => {
    const res = await delGoodsNav({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getGoodsNavList()
    }
  }

  getGoodsNavList = ()=>{
    this.props.updateBindingData('goodsNavList')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {goodsNavList,goodsList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="goodsForm" tab="添加商品">
            <GoodsForm goodsNavList={goodsNavList.lists} __loading={__loading}/>
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
