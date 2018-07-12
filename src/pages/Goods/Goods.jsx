import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import GoodsNavManage from './components/GoodsNavManage/GoodsNavManage'
import DOMAIN from '@/domain'
import {delGoodsNav} from '@/service'

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
})
export default class Goods extends React.Component {

  static displayName = 'Goods'

  constructor (props) {
    super(props)
  }

  componentDidMount(){
    this.getGoodsNavList()
  }

  //添加导航
  addNav = (data,clear) => {
    console.log(data)
  }


  getGoodsNavList = ()=>{
    this.props.updateBindingData('goodsNavList')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {goodsNavList} = this.props.bindingData
    return (
      <IceContainer>
        <Tab>
          <TabPane key="goodsNav" tab="商品导航栏管理">
            <GoodsNavManage
              onSubmitInfo={this.addNav}
              __loading={__loading}
              goodsNavList={goodsNavList.lists}
              getGoodsNavList={this.getGoodsNavList}
            />
          </TabPane>
          <TabPane key="goodsForm" tab="添加商品">

          </TabPane>
          <TabPane key="goodsList" tab="商品列表">

          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
