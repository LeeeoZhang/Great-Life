import React, {Fragment} from 'react'
import IceTitle from '@icedesign/title'
import GoodsNavForm from './GoodsNavForm'
import GoodsNavList from './GoodsNavList'

export default class GoodsNavManage extends React.Component {

  static displayName = 'GoodsNavManage'

  constructor (props) {
    super(props)
    this.state = {}
  }


  render(){
    const {__loading,goodsNavList,onSubmitInfo,editGoodsNav,delGoodsNav} = this.props
    return (
      <Fragment>
        <IceTitle decoration text="添加商品导航"/>
         <GoodsNavForm __loading={__loading} onSubmitInfo={onSubmitInfo}/>
        <IceTitle decoration text="商品导航列表"/>
        <GoodsNavList __loading={__loading}
                      goodsNavList={goodsNavList}
                      editGoodsNav={editGoodsNav}
                      delGoodsNav={delGoodsNav}
        />
      </Fragment>
    )
  }
}
