import React, {Fragment} from 'react'
import { Feedback } from '@icedesign/base'
import IceTitle from '@icedesign/title'
import DataBinder from '@icedesign/data-binder'
import BannerList from './BannerList'
import BannerForm from './BannerForm'
import DOMAIN from '@/domain'
import {addBanner,delBanner,editBanner} from '@/service'

const Toast = Feedback.toast

@DataBinder({
  bannerList: {
    url:`${DOMAIN}/admin/article/listsCarousel`,
    responseFormatter:(responseHandler,res,originResponse)=>{
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS':'ERROR',
        data:res
      }
      responseHandler(formatResponse,originResponse)
    },
    defaultBindingData: {
      lists: [],
    },
  },
})
export default class BannerManage extends React.Component {

  static displayName = 'BannerManage'

  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      editId: '',
      bannerDetail:null,
    }
  }

  componentDidMount () {
    this.getBannerList()
  }

  //获取头图详情回填，并打开修改页面
  getBannerDetail = (index,id) => {
    const {bannerList} = this.props.bindingData
    const { lists } = bannerList
    this.setState({
      isEdit: true,
      editId: id,
      bannerDetail:{...lists[index]},
    })
  }

  //确认添加头图
  addNewBanner = async (data,clear) => {
    const res = await addBanner({data}).catch(()=>false)
    if(res) {
      Toast.success('添加成功')
      //清空表单
      clear()
      this.getBannerList()
    }
  }

  //确认编辑头图
  editBanner = async info => {
    const {editId} = this.state
    const data = {...info,id:editId}
    const res = await editBanner({data}).catch(()=>false)
    if(res) {
      Toast.success('修改成功')
      this.backFromEdit()
    }
  }

  //删除头图
  delBanner = async id => {
    const res = await delBanner({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getBannerList()
    }
  }

  //从编辑页返回
  backFromEdit = () => {
    this.setState({isEdit:false,editId:'',bannerDetail:null})
    this.getBannerList()
  }

  //获取头图列表
  getBannerList () {
    this.props.updateBindingData('bannerList')
  }

  render () {
    const {bannerList} = this.props.bindingData
    const {__loading, lists} = bannerList
    const {isEdit,bannerDetail} = this.state
    return (
      <Fragment>
        {isEdit ?
          <BannerForm __loading={__loading} type="edit" onSubmitInfo={this.editBanner} bannerDetail={bannerDetail} backFromEdit={this.backFromEdit}/> :
          <Fragment>
            <IceTitle text="添加新头图" decoration/>
            <BannerForm __loading={__loading} type="add" onSubmitInfo={this.addNewBanner}/>
            <IceTitle text="头图列表" decoration/>
            <BannerList __loading={__loading}
                        bannerList={lists}
                        getBannerDetail={this.getBannerDetail}
                        delBanner={this.delBanner}
            />
          </Fragment>
        }
      </Fragment>
    )
  }
}

