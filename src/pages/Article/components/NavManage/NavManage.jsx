import React , {Fragment}from 'react'
import { Pagination,Feedback } from "@icedesign/base"
import IceTitle from '@icedesign/title'
import AddNavForm from './AddNavForm'
import NavList from './NavList'
import DataBinder from '@icedesign/data-binder'
import {addNav,delNav,editNav} from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast

@DataBinder( {
  navList : {
    url:`${DOMAIN}/admin/article/listsType`,
    responseFormatter:(responseHandler,res,originResponse)=>{
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS':'ERROR',
        data:res
      }
      responseHandler(formatResponse,originResponse)
    },
    defaultBindingData:{
      lists:[],
    },
  }
})
export default class NavManage extends React.Component {

  static displayName = 'NavManage'

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getNavList()
  }

  //修改导航
  editNav = async data => {
    const res = await editNav({data}).catch(()=>false)
    if(res) {
      Toast.success('修改成功')
      this.getNavList()
    }
  }

  //删除导航
  delNav = async id => {
    const res = await delNav({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getNavList()
    }
  }

  //添加导航
  addNav = async (data,clear) => {
    const res = await addNav({data:{title:data.navTitle}}).catch(()=>false)
    if(res) {
      Toast.success('添加成功')
      clear()
      this.getNavList()
    }
  }


  getNavList = () => {
    this.props.updateBindingData('navList')
  }

  render () {
    const {navList} = this.props.bindingData
    const {__loading,lists} = navList

    return (
      <Fragment>
        <IceTitle text="添加新导航" decoration/>
        <AddNavForm __loading={__loading} addNav={this.addNav}/>
        <IceTitle text="导航列表" decoration/>
        <NavList __loading={__loading} navList={lists} delNav={this.delNav} editNav={this.editNav}/>
      </Fragment>
    )
  }
}
