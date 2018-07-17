import React, {Fragment} from 'react'
import {Feedback} from "@icedesign/base"
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import HomeList from './components/HomeList'
import HomeForm from './components/HomeForm'
import IceTitle from '@icedesign/title'
import {addHomeContent, editHomeContent,delHomeContent} from '@/service'
import DOMAIN from '@/domain'

const Toast = Feedback.toast

@DataBinder({
  homeList: {
    url: `${DOMAIN}/admin/nav_index/lists`,
    responseFormatter: (responseHandler, res, originResponse) => {
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS' : 'ERROR',
        data: res
      }
      responseHandler(formatResponse, originResponse)
    },
    defaultBindingData: {
      lists: [
        {
          "id": 3,
          "title": "测试需删除",
          "subTitle": "等待删除",
          "goodsInfo": [
            {
              "goodsBaseId": 4,
              "goodsInfo": {
                "title": "餐予者|59.9元世界杯看球套餐",
                "fileInfo": {
                  "fileId": "30",
                  "compressHttpUrl": "http://jccs.topsunep.com"
                }
              }
            },
            {
              "goodsBaseId": 5,
              "goodsInfo": {
                "title": "印象音乐餐厅|19.9元超值双人套餐",
                "fileInfo": {
                  "fileId": "30",
                  "compressHttpUrl": "http://jccs.topsunep.com"
                }
              }
            }
          ]
        },
      ],
    },
  }
})
export default class HomeRepair extends React.Component {

  static displayName = 'HomeRepair'

  constructor (props) {
    super(props)
    this.state = {
      isHomeContentEdit: false,
      homeDetail: null,
      homeContentEditId: null,
    }
  }

  componentDidMount () {
    this.getHomeList()
  }

  //添加首页内容
  addHomeContent = async (data, clear) => {
    const res = await addHomeContent({data}).catch(() => false)
    if (res) {
      Toast.success('添加成功')
      this.getHomeList()
      clear()
    }
  }

  //编辑首页内容
  editHomeContent = async data => {
    data.id = this.state.homeContentEditId
    const res = await editHomeContent({data}).catch(() => false)
    if (res) {
      this.backFromEdit()
      Toast.success('修改成功')
      this.getHomeList()
    }
  }

  //删除首页内容
  delHomeContent = async id => {
    const res = await delHomeContent({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getHomeList()
    }
  }

  setHomeDetailAndGoEdit = index => {
    const {homeList} = this.props.bindingData
    const homeDetail = {
      title: homeList.lists[index].title,
      subTitle: homeList.lists[index].subTitle,
      goodsIds: homeList.lists[index].goodsInfo.map(item => item.goodsBaseId),
      goodsList: homeList.lists[index].goodsInfo.map(item => {
        return {
          label: item.goodsInfo.title,
          value: item.goodsBaseId,
        }
      })
    }
    this.setState({
      isHomeContentEdit: true,
      homeDetail,
      homeContentEditId: homeList.lists[index].id,
    })
  }

  //获取首页内容列表
  getHomeList = () => {
    this.props.updateBindingData('homeList')
  }

  backFromEdit = () => {
    this.setState({
      isHomeContentEdit: false,
      homeDetail: null,
      homeContentEditId: null,
    })
  }

  render () {
    const __loading = this.props.bindingData.__loading
    const {homeList} = this.props.bindingData
    const {isHomeContentEdit, homeDetail} = this.state
    return (
      <IceContainer>
        {
          isHomeContentEdit ?
            <HomeForm backFromEdit={this.backFromEdit} homeDetail={homeDetail} __loading={__loading} type="edit"
                      onSubmitInfo={this.editHomeContent}/> :
            (
              <Fragment>
                <IceTitle text="装修" decoration/>
                <HomeForm __loading={__loading} type="add" onSubmitInfo={this.addHomeContent}/>
                <IceTitle text="首页装修列表" decoration/>
                <HomeList setHomeDetailAndGoEdit={this.setHomeDetailAndGoEdit}
                          delHomeContent={this.delHomeContent}
                          __loading={__loading}
                          homeList={homeList.lists}/>
              </Fragment>
            )
        }
      </IceContainer>
    )
  }
}
