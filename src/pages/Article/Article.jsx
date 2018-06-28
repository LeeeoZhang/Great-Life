import React from 'react'
import {Tab} from '@icedesign/base'
import IceContainer from '@icedesign/container'
import BannerManage from './components/BannerManage'

const TabPane = Tab.TabPane
const tabConfigs = [
  {title: '轮播头图管理', key: 'banner', content: BannerManage},
  {title: '文章导航管理', key: 'nav', content: '文章导航'},
  {title: '文章编辑', key: 'content', content: '文章编辑'},
]

export default class Article extends React.Component {
  static displayName = 'Article'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="article-page">
        <IceContainer>
          <Tab>
            {tabConfigs.map(config => (
              <TabPane key={config.key} tab={config.title}>
                {typeof config.content ==='string' ? config.content : <config.content/>}
              </TabPane>
            ))}
          </Tab>
        </IceContainer>
      </div>
    )
  }
}
