import React, {Fragment} from 'react'
import { Feedback,Pagination } from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import IceTitle from '@icedesign/title'
import MerchantForm from './components/MerchantForm'
import MerchantList from './components/MerchantList'

@DataBinder({
  merchantList : {
    defaultBindingData:{
      lists:[
        {id:1,title:'测试商家',address:'湖南省长沙市天心区文源街道中南林业科技大学',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:2,title:'测试商家',address:'湖南省长沙市天心区文源街道中南林业科技大学',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:3,title:'测试商家',address:'湖南省长沙市天心区文源街道中南林业科技大学',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:4,title:'测试商家',address:'湖南省长沙市天心区文源街道中南林业科技大学',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:5,title:'测试商家',address:'湖南省长沙市天心区文源街道中南林业科技大学',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:6,title:'测试商家',address:'湖南省长沙市天心区文源街道',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:7,title:'测试商家',address:'湖南省长沙市天心区文源街道',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:8,title:'测试商家',address:'湖南省长沙市天心区文源街道',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:9,title:'测试商家',address:'湖南省长沙市天心区文源街道',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
        {id:10,title:'测试商家',address:'湖南省长沙市天心区文源街道',imgUrl:'http://ltplus.zmtlm.cn/uploads/20180623/96f2b47702af036ded82c0ab190c0b6f.jpeg'},
      ],
      count:100
    }
  }
})
export default class Merchant extends React.Component {

  static displayName = 'Merchant'

  constructor (props) {
    super(props)
    this.state = {
      isEdit : false,
      size:10,
      merchantDetail:null,
    }
  }

  //添加商家
  addMerchant = async (data,clear) => {
    console.log(data)
  }

  //修改商家
  editMerchant = async data => {

  }

  //获取商家详情并进行编辑
  getMerchantThenEdit = async id => {

  }

  //从编辑返回
  backFromEdit = () => {
    this.setState({isEdit:false})
  }

  render () {
    const {isEdit,size} = this.state
    const {merchantList} = this.props.bindingData
    const {count} = merchantList
    const {__loading} = merchantList
    return (
      <Fragment>
        <IceContainer>
          {isEdit ?
            <MerchantForm type="edit" backFromEdit={this.backFromEdit} onSubmitInfo={this.editMerchant}/>:
            <Fragment>
              <IceTitle text="添加新商家" decoration/>
              <MerchantForm type="add" onSubmitInfo={this.addMerchant}/>
              <IceTitle text="商家列表" decoration/>
              <MerchantList getMerchantThenEdit={this.getMerchantThenEdit} merchantList={merchantList.lists} __loading={__loading}/>
              <div style={styles.paginationWrap}>
                <Pagination onChange={this.onPaginationChange}
                            showJump={false}
                            shape="arrow-only"
                            total={count}
                            pageSize={size}
                />
              </div>
            </Fragment>
          }
        </IceContainer>
      </Fragment>
    )
  }
}

const styles = {
  paginationWrap: {
    margin: '25px auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}
