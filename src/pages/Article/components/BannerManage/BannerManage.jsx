import React , {Fragment}from 'react'
import IceTitle from '@icedesign/title'
import DataBinder from '@icedesign/data-binder'
import AddBannerForm from './AddBannerForm'
import BannerList from './BannerList'

@DataBinder({
  bannerList:{
    defaultBindingData:{
      lists:[],
    },
  }
})
export default class BannerManage extends React.Component {

  static displayName = 'BannerManage'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {bannerList} = this.props.bindingData
    const {__loading,lists} = bannerList
    return (
      <Fragment>
        <IceTitle text="添加新头图" decoration/>
        <AddBannerForm __loading={__loading}/>
        <IceTitle text="头图列表" decoration/>
        <BannerList __loading={__loading} bannerList={lists}/>
      </Fragment>
    )
  }
}

