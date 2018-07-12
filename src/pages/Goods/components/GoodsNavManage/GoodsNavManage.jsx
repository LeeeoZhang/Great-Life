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


  onSubmitInfo = (data,clear) => {
    this.props.onSubmitInfo(data,clear)
  }

  render(){
    const {__loading,goodsNavList} = this.props
    return (
      <Fragment>
        <IceTitle decoration text="添加商品导航"/>
         <GoodsNavForm __loading={__loading} onSubmitInfo={this.onSubmitInfo}/>
        <IceTitle decoration text="商品导航列表"/>
        <GoodsNavList __loading={__loading} goodsNavList={goodsNavList}/>
      </Fragment>
    )
  }
}
