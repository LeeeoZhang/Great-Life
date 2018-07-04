import React , {Fragment}from 'react'
import { Tab } from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import AddArticleForm from './AddArticleForm'
import ArticleList from './ArticleList'
import NavManage from "../NavManage"

const TabPane = Tab.TabPane

@DataBinder({
  articleList:{
    defaultBindingData:{
      lists:[
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:1},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:2},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:3},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:4},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:5},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:6},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:7},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:8},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:9},
        {title:'测试文章1',createTime:'2018年10月31日',auth:'xxx',id:10},
      ],
      count:100,
    },
  },
  articleDetail:{
    defaultBindingData:{

    },
  },
})
export default class ArticleManage extends React.Component {

  static displayName = 'NavManage'

  constructor (props) {
    super(props)
    this.state = {}
  }

  //更新翻页
  updateArticleList = (paginationInfo) => {
    console.log(paginationInfo)
  }

  //获取文章详情进行回填更新
  getArticleDetail = (id) =>{
    console.log(id)
  }

  render () {
    const {articleList} = this.props.bindingData
    const {__loading,lists,count} = articleList
    return (
      <Fragment>
        <Tab type="wrapped">
          <TabPane key="addArticleForm" tab="添加文章">
            <AddArticleForm __loading={__loading}/>
          </TabPane>
          <TabPane key="articleList" tab="文章列表">
            <ArticleList
              articleList={lists}
              __loading={__loading}
              updateArticleList={this.updateArticleList}
              getArticleDetail={this.getArticleDetail}
              count={count}
            />
          </TabPane>
        </Tab>
      </Fragment>
    )
  }
}
