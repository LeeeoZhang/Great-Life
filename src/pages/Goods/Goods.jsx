import React, {Fragment} from 'react'
import DataBinder from '@icedesign/data-binder'
import {Tab, Feedback} from "@icedesign/base"
import IceContainer from '@icedesign/container'
import GoodsNavManage from './components/GoodsNavManage/GoodsNavManage'
import GoodsList from './components/GoodsList/GoodsList'
import GoodsForm from './components/GoodsForm/GoodsForm'
import DOMAIN from '@/domain'
import {
  delGoodsNav, addGoodsNav, editGoodsNav, addGoods, editGoods, getGoodsDetail, delGoods,saleOutGoods
} from '@/service'

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
    url: `${DOMAIN}/admin/shop/simpleLists`,
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
    url: `${DOMAIN}/admin/goods/lists`,
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
  postStep1Data: {
    url: `${DOMAIN}/admin/goods/add`,
    method: 'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      id: null,
    },
  },
})
export default class Goods extends React.Component {

  static displayName = 'Goods'

  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      step: 0,
      step1Data: {},
      step2Data: {},
      step3Data: {},
      step4Data: {},
      stepFormId: '',
    }
  }

  componentDidMount () {
    this.getGoodsNavList()
    this.getShopIdList()
    this.getGoodsList()
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

  //新增时发送第一步数据，记录返回的id
  postStep1Data = async data => {
    const {stepFormId} = this.state
    if(stepFormId) {
      this.postOtherStepData(data,0)
    } else {
      const res = await addGoods({data}).catch(() => false)
      if (res) {
        this.setState({stepFormId: res.data.id})
        this.nextStep()
      }
    }
  }

  //新增时发送其他步骤数据/修改时也通过这个函数发送数据
  postOtherStepData = async (data, step) => {
    const {stepFormId} = this.state
    data.id = stepFormId
    data.step = step + 1
    //发送编辑请求
    const res = await editGoods({data}).catch(() => false)
    if (res) {
      if (step !== 3) {
        this.nextStep()
      } else {
        window.location.replace('#/result/success')
      }
    }
  }

  //记录每一步数据
  onReportData = (data, step) => {
    const {isEdit} = this.state
    if (!isEdit) {
      switch (step) {
        case 0:
          this.setState({step1Data: {...data}})
          this.postStep1Data(data)
          break
        case 1:
        case 2:
        case 3:
          this.setState({[`step${step + 1}Data`]: {...data}})
          this.postOtherStepData(data, step)
          break
      }
    } else {
      this.postOtherStepData(data, step)
    }
  }

  //删除商品
  delGoods = async id => {
    const res = await delGoods({params: {id}}).catch(() => false)
    if (res) {
      Toast.success('删除成功')
      this.getGoodsList()
    }
  }

  //下架商品
  saleOutGoods = async id=>{
    const res = await saleOutGoods({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('下架成功')
      this.getGoodsList()
    }
  }

  //获取店铺导航栏列表
  getGoodsNavList = () => {
    this.props.updateBindingData('goodsNavList')
  }

  //获取店铺id列表
  getShopIdList = () => {
    this.props.updateBindingData('shopIdList')
  }

  //获取商品列表
  getGoodsList = () => {
    this.props.updateBindingData('goodsList')
  }

  //获取商品详情并跳转到修改
  getGoodsDetailAndGoEdit = async id => {
    this.setState({stepFormId: id})
    const res = await getGoodsDetail({params: {id}}).catch(() => false)
    if (res) {
      this.setState({
        step1Data: {...res.data.firstStep},
        step2Data: {...res.data.secondStep},
        step3Data: {...res.data.thirdStep},
        step4Data: {...res.data.fourStep},
        isEdit: true,
      })
    }
  }

  backFromEdit = () => {
    this.setState({
      isEdit: false,
      step: 0,
      step1Data: {},
      step2Data: {},
      step3Data: {},
      step4Data: {},
      stepFormId: '',
    })
    this.getGoodsList()
  }

  nextStep = () => {
    this.setState({step: this.state.step + 1})
  }

  //返回上一步先获取上一步的数据
  preStep = async () => {
    //这个step是从0开始的
    const {stepFormId, step} = this.state
    const res = await getGoodsDetail({params: {id: stepFormId, step}}).catch(() => false)
    if (res) {
      this.setState({
        [`step${step}Data`]: {...res.data},
        step: step - 1
      })
    }
  }

  render () {
    const {step1Data, step2Data, step3Data, step4Data, step, isEdit} = this.state
    const __loading = this.props.bindingData.__loading
    const {goodsNavList, goodsList, shopIdList} = this.props.bindingData
    return (
      <IceContainer>
        {isEdit ?
          (<GoodsForm
            type="edit"
            goodsNavList={goodsNavList.lists}
            shopIdList={shopIdList.lists}
            __loading={__loading}
            postStep1Data={this.postStep1Data}
            step={step}
            step1Data={step1Data}
            step2Data={step2Data}
            step3Data={step3Data}
            step4Data={step4Data}
            nextStep={this.nextStep}
            preStep={this.preStep}
            onReportData={this.onReportData}
            backFromEdit={this.backFromEdit}
          />) :
          (<Tab>
            <TabPane key="goodsList" tab="商品列表">
              <GoodsList
                __loading={__loading}
                goodsList={goodsList.lists}
                getGoodsDetailAndGoEdit={this.getGoodsDetailAndGoEdit}
                delGoods={this.delGoods}
                saleOutGoods={this.saleOutGoods}
              />
            </TabPane>
            <TabPane key="goodsForm" tab="添加商品">
              <GoodsForm
                type="add"
                goodsNavList={goodsNavList.lists}
                shopIdList={shopIdList.lists}
                __loading={__loading}
                postStep1Data={this.postStep1Data}
                step={step}
                step1Data={step1Data}
                step2Data={step2Data}
                step3Data={step3Data}
                step4Data={step4Data}
                nextStep={this.nextStep}
                preStep={this.preStep}
                onReportData={this.onReportData}
              />
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
          </Tab>)
        }
      </IceContainer>
    )
  }
}
