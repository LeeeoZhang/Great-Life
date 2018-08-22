import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'
import DOMAIN from '@/domain'


@DataBinder({
  balanceList:{
    url:`${DOMAIN}/admin/shop/settlementLists`,
    responseFormatter:(responseHandler,res,originResponse)=>{
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS':'ERROR',
        data:res
      }
      responseHandler(formatResponse,originResponse)
    },
    defaultBindingData:{
      lists:[],
      count:0,
    },
  }
})
export default class BalanceCenter extends Component {

  static displayName = 'BalanceCenter'

  constructor () {
    super()
    this.state = {}
  }

  render(){
    return (
      <IceContainer>

      </IceContainer>
    )
  }

}
