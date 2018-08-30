import React,{Component,Fragment} from 'react'
import { Tab } from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import DOMAIN from '@/domain'
import axios from '@/service'
import ShopRankConfig from './ShopRankConfig/ShopRankConfig'

const TabPane = Tab.TabPane

@DataBinder({
  configData: {
    url: `${DOMAIN}/admin/config/getAllConfig`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: {
        1:{},
      },
    },
  },
})
export default class ConfigCenter extends Component {

  static displayName = 'ConfigCenter'

  componentDidMount(){
    this.getConfigData()
  }

  getConfigData = () => {
    this.props.updateBindingData('configData')
  }

  render(){
    const { configData } = this.props.bindingData

    return (
      <IceContainer>
        <Tab>
          <TabPane key="1" tab="店铺排行榜">
            <ShopRankConfig
              shopRankConfig={configData.lists['1']}
              getConfigData={this.getConfigData}
            />
          </TabPane>
        </Tab>
      </IceContainer>
    )
  }

}
