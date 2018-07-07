import React, {Fragment} from 'react'
import {Tab, Feedback} from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import ArticleList from './ArticleList'
import NavManage from '../NavManage'
import ArticleForm from './ArticleForm'
import DOMAIN from '@/domain'
import {addArticle, editArticle,getArticleDetail,delArticle} from '@/service'

const TabPane = Tab.TabPane
const Toast = Feedback.toast

@DataBinder({
  articleList: {
    url: `${DOMAIN}/admin/article/lists`,
    params: {
      page: 1,
      size: 10,
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      data: [],
      count: 0,
    },
  },
  navList: {
    url: `${DOMAIN}/admin/article/listsType`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [],
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
      articleDetail:null,
    }
  }

  componentDidMount () {
    this.getArticleList()
  }


  //添加文章
  addArticle = async (data, clear) => {
    const res = await addArticle({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      clear()
      this.getArticleList()
    }
  }

  //编辑文章
  editArticle = async (data) => {
    data.id = this.state.editId
    const res = await editArticle({data}).catch(()=>false)
    if(res) {
      Toast.success('修改成功')
      this.backFromEdit()
    }
  }

  //删除文章
  delArticle = async id => {
    const res = await delArticle({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getArticleList()
    }
  }

  //更新翻页
  //@param paginationInfo {page,size}
  updateArticleList = ({page, size}) => {
    this.getArticleList(page, size)
  }

  //获取文章详情进行回填更新，并打开编辑页面
  getArticleDetail = async id => {
    this.setState({editId: id})
    this.props.updateBindingData('navList')
    const res  = await getArticleDetail({params:{id}}).catch(()=>false)
    if(res) {
      this.setState({articleDetail:res.data,isEdit:true})
    }
  }

  //从编辑文章处返回并重新获取第一页数据
  backFromEdit = () => {
    this.getArticleList()
    this.setState({isEdit: false})
    //窗口回滚
    window.scrollTo(0, 0)
  }

  getArticleList = (page = 1, size = 10) => {
    this.props.updateBindingData('articleList', {params: {page, size}})
  }

  getNavList = () => {
    this.props.updateBindingData('navList')
  }

  render () {
    const {articleList, navList} = this.props.bindingData
    const {count} = articleList
    const __loading = this.props.bindingData.__loading
    const {isEdit,articleDetail} = this.state
    return (
      <Fragment>
        {isEdit ?
          <ArticleForm __loading={__loading}
                       backFromEdit={this.backFromEdit}
                       onSubmitInfo={this.editArticle}
                       articleDetail={articleDetail}
                       type="edit"
                       navList={navList.lists}
                       getNavList={this.getNavList}
          /> :
          <Tab type="wrapped">
            <TabPane key="articleList" tab="文章列表">
              <ArticleList
                articleList={articleList.data}
                __loading={__loading}
                updateArticleList={this.updateArticleList}
                getArticleDetail={this.getArticleDetail}
                count={count}
                delArticle={this.delArticle}
              />
            </TabPane>
            <TabPane key="addArticleForm" tab="添加文章">
              <ArticleForm __loading={__loading} type="add" onSubmitInfo={this.addArticle} navList={navList.lists}
                           getNavList={this.getNavList}/>
            </TabPane>
          </Tab>
        }
      </Fragment>
    )
  }
}
