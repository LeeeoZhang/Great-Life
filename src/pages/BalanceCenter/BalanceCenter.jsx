import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'
import DOMAIN from '@/domain'
import BalanceList from './BalanceList'
import axios from '@/service'


@DataBinder({
  balanceList: {
    url: `${DOMAIN}/admin/shop/settlementLists`,
    method:'post',
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
      count: 0,
    },
  }
})
export default class BalanceCenter extends Component {

  static displayName = 'BalanceCenter'

  constructor () {
    super()
    this.state = {
      size: 20,
      current: 1,
      searchType: '',
      searchTitle: '',
    }
  }

  componentDidMount(){
    this.getBalanceList()
  }

  onPagination = current => {
    this.setState({current},()=>{
      this.getBalanceList()
    })
  }

  searching = ({searchTitle,searchType}) => {
    this.setState({
      searchTitle,searchType
    },()=>{
      this.getBalanceList()
    })
  }

  clear = () => {
    this.setState({
      current: 1,
      searchType: '',
      searchTitle: '',
    },()=>{
      this.getBalanceList()
    })
  }

  getBalanceList = () => {
    const {current,searchType,searchTitle,size} = this.state
    this.props.updateBindingData('balanceList', {
      data: {
        page: current, size, searchType,searchTitle
      }
    })
  }

  render () {
    const {balanceList} = this.props.bindingData
    const __loading = this.props.bindingData.__loading
    const {size, current} = this.state
    return (
      <IceContainer>
        <BalanceList
          searching={this.searching}
          clear={this.clear}
          onPagination={this.onPagination}
          __loading={__loading}
          balanceList={balanceList.lists}
          count={balanceList.count}
          size={size}
          current={current}
        />
      </IceContainer>
    )
  }

}
