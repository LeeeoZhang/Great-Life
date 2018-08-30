import React, {Component, Fragment} from 'react'
import { Feedback } from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import ShopRankForm from './ShopRankForm/ShopRankForm'
import ShopRankList from './ShopRankList/ShopRankList'
import axios from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast

@DataBinder({
  updateRankType: {
    url: `${DOMAIN}/admin/config/changeShopRank`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
  addShopSort: {
    url: `${DOMAIN}/admin/shop/addShopRank`,
    method:'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      console.log(res,originResponse)
      responseHandler(formatResponse, originResponse)
    },
  },
  ShopSortList:{
    url: `${DOMAIN}/admin/shop/listsShopRank`,
    method:'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData:{
      lists:[],
    }
  },
  editShopSort:{
    url: `${DOMAIN}/admin/shop/editShopRank`,
    method:'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
  delShopSort:{
    url: `${DOMAIN}/admin/shop/delShopRank`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
})
export default class ShopRankConfig extends Component {

  static displayName = 'ShopRankConfig'

  state = {}

  componentDidMount(){
    this.getShopSortList()
  }

  updateRankType  = value => {
    this.props.updateBindingData('updateRankType',{
      params:{status:value.rankType},
      success:()=>{
        Toast.success('更新成功')
        this.props.getConfigData()
      }
    })
  }

  addShopSort = (data,clear) => {
    this.props.updateBindingData('addShopSort',{
      data,
      success:()=>{
        Toast.success('添加成功')
        clear()
        this.getShopSortList()
      }
    })
  }

  editShopSort = data => {
    this.props.updateBindingData('editShopSort',{
      data,
      success:()=>{
        Toast.success('编辑成功')
        this.getShopSortList()
      }
    })
  }

  delShopSort = id => {
    this.props.updateBindingData('delShopSort',{
      params:{id},
      success:()=>{
        Toast.success('删除成功')
        this.getShopSortList()
      }
    })
  }

  getShopSortList = () => {
    this.props.updateBindingData('ShopSortList')
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {shopRankConfig} = this.props
    const {ShopSortList} = this.props.bindingData

    return (
      <Fragment>
        <ShopRankForm
          __loading={__loading}
          shopRankConfig={shopRankConfig}
          updateRankType={this.updateRankType}
          addShopSort={this.addShopSort}
        />
        <ShopRankList
          ShopSortList={ShopSortList.lists}
          editShopSort={this.editShopSort}
          delShopSort={this.delShopSort}
        />
      </Fragment>
    )
  }

}
