import React , {Fragment}from 'react'
import { Pagination } from "@icedesign/base"
import IceTitle from '@icedesign/title'
import AddNavForm from './AddNavForm'
import NavList from './NavList'
import DataBinder from '@icedesign/data-binder'

@DataBinder( {
  navList : {
    defaultBindingData:{
      lists:[
        {title:'测试导航1',createTime:'2018-09-09',id:1,},
        {title:'测试导航2',createTime:'2018-09-09',id:2,},
        {title:'测试导航3',createTime:'2018-09-09',id:3,},
        {title:'测试导航4',createTime:'2018-09-09',id:4,},
        {title:'测试导航5',createTime:'2018-09-09',id:5,},
      ],
    },
  }
})
export default class NavManage extends React.Component {

  static displayName = 'NavManage'

  constructor (props) {
    super(props)
    this.state = {}
  }


  render () {
    const {navList} = this.props.bindingData
    const {__loading,lists} = navList

    return (
      <Fragment>
        <IceTitle text="添加新导航" decoration/>
        <AddNavForm __loading={__loading}/>
        <IceTitle text="导航列表" decoration/>
        <NavList __loading={__loading} navList={lists}/>
      </Fragment>
    )
  }
}
