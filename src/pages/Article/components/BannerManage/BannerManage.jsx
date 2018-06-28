import React , {Fragment}from 'react'
import IceTitle from '@icedesign/title'
import AddBannerForm from './AddBannerForm'

export default class BannerManage extends React.Component {

  static displayName = 'BannerManage'

  constructor (props) {
    super(props)
    this.state = {}
  }


  render () {
    return (
      <Fragment>
        <IceTitle text="添加新头图" decoration/>
        <AddBannerForm/>
        <IceTitle text="头图列表" decoration/>
      </Fragment>
    )
  }
}
