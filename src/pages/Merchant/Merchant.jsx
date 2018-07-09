import React, {Fragment} from 'react'
import { Feedback,Pagination } from '@icedesign/base'
import DataBinder from '@icedesign/data-binder'
import IceContainer from '@icedesign/container'
import IceTitle from '@icedesign/title'
import MerchantForm from './components/MerchantForm'
import MerchantList from './components/MerchantList'
import DOMAIN from "../../domain"
import {addMerchant,editMerchant,delMerchant} from '@/service'

const Toast = Feedback.toast

@DataBinder({
  merchantList : {
    url:`${DOMAIN}/admin/merchant/lists`,
    params:{
      page:1,
      size:10,
    },
    responseFormatter:(responseHandler,res,originResponse)=>{
      const formatResponse = {
        status: originResponse.code === 200 ? 'SUCCESS':'ERROR',
        data:res
      }
      responseHandler(formatResponse,originResponse)
    },
    defaultBindingData:{
      lists:[],
      count:0,
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
      editId:'',
    }
  }

  componentDidMount () {
    this.getMerchantList()
  }

  //添加商家
  addMerchant = async (data,clear) => {
    const res = await addMerchant({data}).catch(()=>false)
    if(res) {
      Toast.success('添加成功')
      clear()
      this.getMerchantList()
    }
  }

  //修改商家
  editMerchant = async data => {
    data.id = this.state.editId
    const res = await editMerchant({data}).catch(()=>false)
    if(res) {
      this.backFromEdit()
      Toast.success('修改成功')
      this.getMerchantList()
    }
  }

  //删除商家
  delMerchant = async id => {
    const res = await delMerchant({params:{id}}).catch(()=>false)
    if(res) {
      Toast.success('删除成功')
      this.getMerchantList()
    }
  }

  //获取商家详情并进行编辑
  getMerchantThenEdit = (id,index) => {
    const {merchantList} = this.props.bindingData
    this.setState({
      isEdit:true,
      editId:id,
      merchantDetail:{...merchantList.lists[index]},
    })
  }

  //从编辑返回
  backFromEdit = () => {
    this.setState({isEdit:false})
  }

  getMerchantList = (page = 1,size = 10) => {
    this.props.updateBindingData('merchantList',{params:{page,size}})
  }

  render () {
    const {isEdit,size,merchantDetail} = this.state
    const {merchantList} = this.props.bindingData
    const {count} = merchantList
    const {__loading} = merchantList
    return (
      <Fragment>
        <IceContainer>
          {isEdit ?
            <div>
              <IceTitle text="修改商家" decoration/>
              <MerchantForm type="edit" merchantDetail={merchantDetail} backFromEdit={this.backFromEdit} onSubmitInfo={this.editMerchant}/>
            </div>
            :
            <Fragment>
              <IceTitle text="添加新商家" decoration/>
              <MerchantForm type="add" onSubmitInfo={this.addMerchant}/>
              <IceTitle text="商家列表" decoration/>
              <MerchantList getMerchantThenEdit={this.getMerchantThenEdit} merchantList={merchantList.lists} __loading={__loading} delMerchant={this.delMerchant}/>
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
    margin: '25px auto 70px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}
