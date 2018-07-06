import React, {Fragment} from 'react'
import {Tab} from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import ArticleList from './ArticleList'
import NavManage from '../NavManage'
import ArticleForm from './ArticleForm'

const TabPane = Tab.TabPane

@DataBinder({
  articleList: {
    defaultBindingData: {
      lists: [
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 1},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 2},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 3},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 4},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 5},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 6},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 7},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 8},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 9},
        {title: '测试文章1', createTime: '2018年10月31日', auth: 'xxx', id: 10},
      ],
      count: 100,
    },
  },
  navList : {
    defaultBindingData:{
      lists:[
        {title:'测试导航1',createTime:'2018-09-09',id:1,},
        {title:'测试导航2',createTime:'2018-09-09',id:2,},
        {title:'测试导航3',createTime:'2018-09-09',id:3,},
        {title:'测试导航4',createTime:'2018-09-09',id:4,},
        {title:'测试导航5',createTime:'2018-09-09',id:5,},
      ],
    },
  },
  articleDetail: {
    defaultBindingData: {
      content: '',
      title: '测试标题',
      author: '张宁',
      desc: 'yoyo',
      navId:1,
    },
  },
})
export default class ArticleManage extends React.Component {

  static displayName = 'NavManage'

  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      editId: '',
    }
  }

  componentDidMount () {
    console.log('挂载了')
  }

  //添加文章
  addArticle = (info, htmlStr) => {
    console.log(info, htmlStr)
  }

  //编辑文章
  editArticle = (info, htmlStr) => {
    console.log(info, htmlStr)
  }

  delArticle = id => {
    console.log(id)
  }

  //更新翻页
  updateArticleList = (paginationInfo) => {
    console.log(paginationInfo)
  }

  //获取文章详情进行回填更新，并打开编辑页面
  getArticleDetail = id => {
    console.log(id)
    this.setState({isEdit: true, editId: id})
  }

  //从编辑文章处返回并重新获取第一页数据
  backFromEdit = () => {
    this.setState({isEdit: false})
    //窗口回滚
    window.scrollTo(0, 0)
  }

  render () {
    const {articleList,navList,articleDetail} = this.props.bindingData
    const {count} = articleList
    const __loading = this.props.bindingData.__loading
    const {isEdit} = this.state
    return (
      <Fragment>
        {isEdit ?
          <ArticleForm __loading={__loading}
                       backFromEdit={this.backFromEdit}
                       onSubmitInfo={this.editArticle}
                       articleDetail={articleDetail}
                       type="edit"
                       navList={navList.lists}
          /> :
          <Tab type="wrapped">
            <TabPane key="addArticleForm" tab="添加文章">
              <ArticleForm __loading={__loading} type="add" onSubmitInfo={this.addArticle} navList={navList.lists}/>
            </TabPane>
            <TabPane key="articleList" tab="文章列表">
              <ArticleList
                articleList={articleList.lists}
                __loading={__loading}
                updateArticleList={this.updateArticleList}
                getArticleDetail={this.getArticleDetail}
                count={count}
                delArticle={this.delArticle}
              />
            </TabPane>
          </Tab>
        }
      </Fragment>
    )
  }
}
