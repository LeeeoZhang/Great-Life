import React , {Fragment}from 'react'
import { Pagination } from "@icedesign/base"
import IceTitle from '@icedesign/title'
import DataBinder from '@icedesign/data-binder'
import AddBannerForm from './AddBannerForm'
import BannerList from './BannerList'



@DataBinder({
  bannerList:{
    defaultBindingData:{
      lists:[],
      count:30,
    },
  }
})
export default class BannerManage extends React.Component {

  static displayName = 'BannerManage'

  constructor (props) {
    super(props)
    this.state = {
      page:1,
      size:20,
    }
  }

  onPaginationChange = (current,event) => {
    console.log(current)
  }

  render () {
    const {bannerList} = this.props.bindingData
    const {__loading,lists,count} = bannerList
    const {size} = this.state
    return (
      <Fragment>
        <IceTitle text="添加新头图" decoration/>
        <AddBannerForm __loading={__loading}/>
        <IceTitle text="头图列表" decoration/>
        <BannerList __loading={__loading} bannerList={lists}/>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange} showJump={false} shape="arrow-only" total={count} pageSize={size}/>
        </div>
      </Fragment>
    )
  }
}

const styles = {
  paginationWrap: {
    display:'flex',
    justifyContent:'flex-end',
  }
}
