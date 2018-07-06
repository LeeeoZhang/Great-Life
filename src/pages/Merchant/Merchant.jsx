import React, {Fragment} from 'react'
import { Feedback } from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import IceTitle from '@icedesign/title'
import MerchantForm from "./components/MerchantForm"

@DataBinder({
  merchantList : {

  }
})
export default class Merchant extends React.Component {

  static displayName = 'Merchant'

  constructor (props) {
    super(props)
    this.state = {
      isEdit : false,
    }
  }

  render () {
    const {merchantList} = this.props.bindingData
    const {__loading} = merchantList
    return (
      <Fragment>
        <IceContainer>
          <IceTitle text="添加新商家" decoration/>
          <MerchantForm/>
          <IceTitle text="商家列表" decoration/>
        </IceContainer>
      </Fragment>
    )
  }
}
