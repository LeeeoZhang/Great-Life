import React , {Fragment}from 'react'
import { Tab } from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import IceTitle from '@icedesign/title'
import AddArticleForm from './AddArticleForm'
import ArticleList from './ArticleList'
import NavManage from "../NavManage"

const tabConfig = [
    {title: '添加文章', key: 'addArticleForm', content: AddArticleForm},
    {title: '文章列表', key: 'articleList', content: ArticleList},
]
const TabPane = Tab.TabPane

@DataBinder({
  articleList:{

  }
})
export default class ArticleManage extends React.Component {

  static displayName = 'NavManage'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {articleList} = this.props.bindingData
    const {__loading} = articleList
    return (
      <Fragment>
        <Tab type="wrapped">
          {tabConfig.map(config=>(
            <TabPane key={config.key} tab={config.title}>
              {typeof config.content ==='string' ? config.content : <config.content/>}
            </TabPane>
          ))}
        </Tab>
      </Fragment>
    )
  }
}
