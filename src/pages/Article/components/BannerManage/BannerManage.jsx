import React, {Fragment} from 'react'
import IceTitle from '@icedesign/title'
import DataBinder from '@icedesign/data-binder'
import BannerList from './BannerList'
import BannerForm from './BannerForm'

@DataBinder({
  bannerList: {
    defaultBindingData: {
      lists: [
        {
          title: '测试banner',
          imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
          path: 'pages/11',
          id: 1
        },
        {
          title: '测试banner',
          imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
          path: 'pages/11',
          id: 2
        },
        {
          title: '测试banner',
          imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
          path: 'pages/11',
          id: 3
        },
        {
          title: '测试banner',
          imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
          path: 'pages/11',
          id: 4
        },
        {
          title: '测试banner',
          imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
          path: 'pages/11',
          id: 5
        },
      ],
    },
  },
  bannerDetail: {
    defaultBindingData: {
      title: '测试banner',
      imgUrl: 'http://ltplus.zmtlm.cn/uploads/20180623/d46dc30be86413e785b9e2260cfeec55.jpeg',
      path: 'pages/11',
      id: 1,
    }
  }
})
export default class BannerManage extends React.Component {

  static displayName = 'BannerManage'

  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      editId: '',
    }
  }

  //TODO:请求一次首页数据
  componentDidMount () {
    console.log('头图管理加载')
  }

  //获取头图详情回填，并打开修改页面
  getBannerDetail = id => {
    this.setState({isEdit: true, editId: id})
  }

  //确认添加头图
  addNewBanner = info => {
    console.log(info)
  }

  //确认编辑头图
  editBanner = info => {
    console.log(info)
  }

  //删除头图
  delBanner = id => {
    console.log(id)
  }

  //从编辑页返回
  //TODO：请求一次首页数据
  backFromEdit = () => {
    this.setState({isEdit:false,editId:''})
  }

  render () {
    const {bannerList, bannerDetail} = this.props.bindingData
    const {__loading, lists} = bannerList
    const {isEdit} = this.state
    return (
      <Fragment>
        {isEdit ?
          <BannerForm __loading={__loading} type="edit" onSubmitInfo={this.editBanner} bannerDetail={bannerDetail} backFromEdit={this.backFromEdit}/> :
          <Fragment>
            <IceTitle text="添加新头图" decoration/>
            <BannerForm __loading={__loading} type="add" onSubmitInfo={this.addNewBanner}/>
            <IceTitle text="头图列表" decoration/>
            <BannerList __loading={__loading} bannerList={lists} getBannerDetail={this.getBannerDetail}
                        delBanner={this.delBanner}/>
          </Fragment>
        }
      </Fragment>
    )
  }
}

