import React, {Fragment} from 'react'
import {Tab, Feedback} from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import HomeList from './components/HomeList'
import HomeForm from './components/HomeForm'
import HomeBannerForm from './components/HomeBannerForm'
import HomeBannerList from './components/HomeBannerList'
import IceTitle from '@icedesign/title'
import {
  addHomeContent,
  editHomeContent,
  delHomeContent,
  addHomeBanner,
  delHomeBanner,
  editHomeBanner
} from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast
const TabPane = Tab.TabPane

@DataBinder({
  homeList: {
    url: `${DOMAIN}/admin/nav_index/lists`,
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
  homeBannerList: {
    url: `${DOMAIN}/admin/nav_index/listsCarouselImg`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
  },
})
export default class HomeRepair extends React.Component {

  static displayName = 'HomeRepair'

  constructor (props) {
    super(props)
    this.state = {
      isHomeContentEdit: false,
      homeDetail: null,
      homeContentEditId: null,
      bannerDetail:null,
      bannerEditId:'',
      isHomeBannerEdit:false,
    }
  }

  componentDidMount () {
    this.getHomeList()
    this.getHomeBannerList()
  }

  //添加首页内容
  addHomeContent = async (data, clear) => {
    const res = await addHomeContent({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getHomeList()
      clear()
    }
  }

  //编辑首页内容
  editHomeContent = async data => {
    data.id = this.state.homeContentEditId
    const res = await editHomeContent({data}).catch(() => false)
    if (res) {
      this.backFromEdit()
      Toast.success('修改成功')
      this.getHomeList()
    }
  }

  //删除首页内容
  delHomeContent = async id => {
    const res = await delHomeContent({params: {id}}).catch(() => false)
    if (res) {
      Toast.success('删除成功')
      this.getHomeList()
    }
  }

  //添加首页轮播图
  addHomeBanner = async (data, clear) => {
    const res = await addHomeBanner({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getHomeBannerList()
      clear()
    }
  }

  //修改轮播图
  editHomeBanner = async data => {
    const {bannerEditId} = this.state
    data.id = bannerEditId
    const res = await editHomeBanner({data}).catch(()=>false)
    if(res) {
      this.backFromEdit()
      Toast.success('修改成功')
      this.getHomeBannerList()
    }
  }

  //删除首页轮播图
  delHomeBanner = async id=>{
    const res = await delHomeBanner({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getHomeBannerList()
    }
  }

  //设置编辑id和轮播图详情并跳转编辑
  setBannerDetailAndGoEdit = (id,index) => {
    const {homeBannerList} = this.props.bindingData
    this.setState({
      bannerEditId:id,
      bannerDetail:homeBannerList.lists[index],
      isHomeBannerEdit:true,
    })
  }

  setHomeDetailAndGoEdit = index => {
    const {homeList} = this.props.bindingData
    const homeDetail = {
      title: homeList.lists[index].title,
      subTitle: homeList.lists[index].subTitle,
      goodsIds: homeList.lists[index].goodsInfo.map(item => item.goodsBaseId),
      goodsList: homeList.lists[index].goodsInfo.map(item => {
        return {
          label: item.goodsInfo.title,
          value: item.goodsBaseId,
        }
      })
    }
    this.setState({
      isHomeContentEdit: true,
      homeDetail,
      homeContentEditId: homeList.lists[index].id,
    })
  }

  //获取首页内容列表
  getHomeList = () => {
    this.props.updateBindingData('homeList')
  }

  //获取首页轮播图列表
  getHomeBannerList = () => {
    this.props.updateBindingData('homeBannerList')
  }

  backFromEdit = () => {
    this.setState({
      isHomeContentEdit: false,
      homeDetail: null,
      homeContentEditId: null,
      bannerDetail:null,
      bannerEditId:'',
      isHomeBannerEdit:false,
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {homeList, homeBannerList} = this.props.bindingData
    const {isHomeContentEdit, homeDetail,isHomeBannerEdit,bannerDetail} = this.state
    return (
      <IceContainer>
        <Tab>
          <TabPane key="homeBanner" tab="首页轮播图">
            {isHomeBannerEdit ?
              <HomeBannerForm backFromEdit={this.backFromEdit} bannerDetail={bannerDetail} __loading={__loading} type="edit" onSubmitInfo={this.editHomeBanner}/> :
              (
                <Fragment>
                  <IceTitle text="首页轮播图添加" decoration/>
                  <HomeBannerForm __loading={__loading} type="add" onSubmitInfo={this.addHomeBanner}/>
                  <IceTitle text="首页轮播图列表" decoration/>
                  <HomeBannerList
                    homeBannerList={homeBannerList.lists}
                    __loading={__loading}
                    delHomeBanner={this.delHomeBanner}
                    setBannerDetailAndGoEdit={this.setBannerDetailAndGoEdit}
                  />
                </Fragment>
              )
            }
          </TabPane>
          <TabPane key="homeContent" tab="首页内容">
            {
              isHomeContentEdit ?
                <HomeForm backFromEdit={this.backFromEdit} homeDetail={homeDetail} __loading={__loading} type="edit"
                          onSubmitInfo={this.editHomeContent}/> :
                (
                  <Fragment>
                    <IceTitle text="首页内容添加" decoration/>
                    <HomeForm __loading={__loading} type="add" onSubmitInfo={this.addHomeContent}/>
                    <IceTitle text="首页装修列表" decoration/>
                    <HomeList setHomeDetailAndGoEdit={this.setHomeDetailAndGoEdit}
                              delHomeContent={this.delHomeContent}
                              __loading={__loading}
                              homeList={homeList.lists}/>
                  </Fragment>
                )
            }
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }
}
