import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import DataBinder from '@icedesign/data-binder'

import SearchForm from './SearchForm'
import DataCard from './DataCard'

import axios from '@/service'
import DOMAIN from '@/domain'


@DataBinder({
  baseData: {
    url: `${DOMAIN}/admin/statis/baseDataLists`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      numInfo: {},
      percentageInfo: {},
    },
  }
})
export default class DataCenter extends Component {

  static displayName = 'DataCenter'

  constructor () {
    super()
    this.state = {
      searchType: '0',
      time: [],
    }
  }

  searching = ({searchType, time}) => {
    console.log(searchType, time)
    this.setState({
      searchType, time
    },()=>{
      this.getData()
    })
  }

  clear = () => {
    this.setState({
      searchType: '0',
      time: [],
    })
  }

  getData = () => {
    const {time, searchType} = this.state
    this.props.updateBindingData('baseData', {
      params: {
        searchType,
        startTime: time[0],
        endTime: time[1],
      }
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {numInfo, percentageInfo} = this.props.bindingData.baseData
    const {searchType} = this.state

    return (
      <IceContainer>
        <SearchForm
          __loading={__loading}
          searching={this.searching}
          clear={this.clear}
        />
        {
          searchType !== '0' && (
            <DataCard
              numInfo={numInfo}
              percentageInfo={percentageInfo}
              searchType={searchType}
            />
          )
        }
      </IceContainer>
    )
  }
}
