import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field, Select} from '@icedesign/base'
import MapModal from './MapModal'

import './ShopForm.scss'
import DOMAIN from '@/domain'

const FormItem = Form.Item
const {ImageUpload} = Upload
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}
const styles = {
  buttonSpace: {
    margin: '0 3px'
  },
  tipsContent: {
    margin: '5px 0',
    fontSize: '12px',
  },
  input: {
    width: '100%'
  },

}
const shopKeyWordTips = (
  <div style={styles.tipsContent}>用$隔开，作为搜索时的关键字</div>
)
const carouselTips = (
  <div style={styles.tipsContent}>第一张轮播图将作为店铺列表的展示图片</div>
)
export default class ShopForm extends React.Component {

  static displayName = 'ShopForm'

  constructor (props) {
    super(props)
    this.state = {
      isMapModalShow: false,
      mapInfo: null,
    }
  }

  submitInfo = () => {
    const {onSubmitInfo} = this.props
    this.field.validate((error, values) => {
      error || onSubmitInfo(this.formatUploadInfo(values), this.clearForm)
    })
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  createInitFileList = bannerDetail => {
    const initFileList = []
    const file = {}
    if (bannerDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = bannerDetail.imgUrl
      file.id = bannerDetail.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  formatUploadInfo = values => {
    return values
  }

  formatTypeList = typeList => {
    return typeList.map(type => {
      return {
        label: type.title,
        value: type.id,
      }
    })
  }

  formatMerchantList = merchantList => {
    return merchantList.map(merchant => {
      return {
        label: merchant.title,
        value: merchant.id,
      }
    })
  }

  //打开地图弹窗
  openMapModal = () => {
    this.setState({isMapModalShow: true})
  }

  //关闭地图弹窗
  closeMapModal = () => {
    this.setState({isMapModalShow: false})
  }

  //获取地图弹窗的选取的信息
  submitMapInfo = (mapInfo) => {
    this.setState({mapInfo:{...mapInfo}})
    console.log(mapInfo)
  }

  //检查mapInfo是否完整
  checkMapInfo = () => {
    const {mapInfo}  = this.state
    if(mapInfo) {
      const {areaId, areaStr, address, lat, lng} = mapInfo
      return (areaId && areaStr && address && lat && lng)
    } else {
      return false
    }
  }

  clearForm = () => {
    this.field.reset()
  }

  render () {
    const {isMapModalShow, mapInfo} = this.state
    const {__loading, shopDetail, type, typeList, merchantList} = this.props
    const init = this.field.init
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }

    return (
      <Fragment>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label=" " {...formItemLayout}>
            <Button type="primary" onClick={this.openMapModal}>选取店铺位置信息</Button>
          </FormItem>
          {
            this.checkMapInfo() ?
            (
              <FormItem label=" " {...formItemLayout}>
                <div>地址：{mapInfo.areaStr+mapInfo.address}</div>
              </FormItem>
            ):null
          }
          <FormItem label="店铺名称：" {...formItemLayout}>
            <Input placeholder="请输入店铺名称" {...init('shopTitle', {
              rules: [{required: true, message: '请输入店铺名称'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="店铺分类：" {...formItemLayout}>
            <Select style={styles.input} dataSource={this.formatTypeList(typeList)}
                    placeholder="请选择店铺分类" {...init('shopType', {
              rules: [{required: true, message: '请选择店铺分类'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="选择关联商家：" {...formItemLayout}>
            <Select style={styles.input} dataSource={this.formatMerchantList(merchantList)}
                    placeholder="请选择关联商家" {...init('connectMerchant', {
              rules: [{required: true, message: '请选择关联商家'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="菜品分类名称：" {...formItemLayout}>
            <Input placeholder="请输入店铺名称" {...init('mealType', {
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="店铺名称扩展：" {...formItemLayout}>
            <Input placeholder="请输入店铺名称" {...init('shopTitleExtend', {
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="选择轮播图片：" {...formItemLayout} extra={carouselTips}>
            <ImageUpload className="uploader" {...uploadConfig} {...init('shopCarousel', {
              rules: [{required: true, message: '请选择图片'}],
              valueName: 'fileList',
              initValue: this.createInitFileList(shopDetail),
              getValueFromEvent: this.formatUploadValue
            })}/>
          </FormItem>
          <FormItem label="关键字描述：" {...formItemLayout} extra={shopKeyWordTips}>
            <Input placeholder="请输入关键字描述" {...init('shopKeyWord', {
              rules: [{required: true, message: '请输入关键字描述'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="店铺主要描述：" {...formItemLayout}>
            <Input maxLength={32} hasLimitHint multiple placeholder="请输入店铺主要描述" {...init('shopDesc', {
              rules: [{required: true, message: '请输入店铺主要描述'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="联系电话：" {...formItemLayout}>
            <Input placeholder="请输入联系电话" {...init('shopTel', {
              rules: [{required: true, message: '请输入联系电话'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label="营业时间：" {...formItemLayout}>
            <Input placeholder="请输入营业时间" {...init('businessHours', {
              rules: [{required: true, message: '请输入营业时间'}],
              initValue: shopDetail ? shopDetail.title : '',
            })}/>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading}
                    onClick={this.submitInfo}>
              {type === 'edit' ? '确认修改' : '确认新增'}
            </Button>
            {type === 'edit' ? <Button style={styles.buttonSpace} onClick={this.backFromEdit}>返回</Button> : null}
          </FormItem>
        </Form>
        <MapModal
          isMapModalShow={isMapModalShow}
          closeMapModal={this.closeMapModal}
          submitMapInfo={this.submitMapInfo}
        />
      </Fragment>
    )
  }


}
