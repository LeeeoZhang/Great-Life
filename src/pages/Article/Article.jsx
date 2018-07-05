import React from 'react'
import {Tab} from '@icedesign/base'
import IceContainer from '@icedesign/container'
import BannerManage from './components/BannerManage'
import NavManage from './components/NavManage'
import ArticleManage from './components/ArticleManage'

const TabPane = Tab.TabPane
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
            <TabPane key="banner" tab="轮播头图管理">
              <BannerManage/>
            </TabPane>
            <TabPane key="nav" tab="文章导航管理">
              <NavManage/>
            </TabPane>
            <TabPane key="content" tab="文章编辑">
              <ArticleManage/>
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    )
  }
}
