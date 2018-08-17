import React, {Fragment} from 'react'
import {Input, Button, Upload, Form, Field, Select, Feedback, Radio} from '@icedesign/base'
import MapModal from './MapModal'
import {getSimpleArticleList,getSimpleVerifyList} from '@/service'

import './ShopForm.scss'
import DOMAIN from '@/domain'

const FormItem = Form.Item
const {ImageUpload} = Upload
const Toast = Feedback.toast
const {Group: RadioGroup} = Radio
const { Combobox } = Select
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
  comboBox:{
    width:'100%',
  },
  verifyLabel:{
    display:'flex',
    alignItems:'center',
  },
  verifyAvatar:{
    width:'20px',
    height:'20px',
    borderRadius:'50%',
    marginRight:'5px',
  }
}
const shopKeyWordTips = (
  <div style={styles.tipsContent}>用$隔开，作为搜索时的关键字，同时也会在店铺搜索中作为标签展示</div>
)
const carouselTips = (
  <div style={styles.tipsContent}>第一张轮播图将作为店铺列表的展示图片，建议大小：750*490(满足该比例即可)</div>
)
const recommendRadio = [
  {value: '0', label: '否'},
  {value: '1', label: '是'},
]


export default class ShopForm extends React.Component {

  static displayName = 'ShopForm'

  constructor (props) {
    super(props)
    this.state = {
      isMapModalShow: false,
      mapInfo: props.shopDetail ? props.shopDetail.mapInfo : null,
      articleData:this.createInitArticleData(props.shopDetail),
      verifyData:this.createInitVerifyData(props.shopDetail),
      managerData:this.createInitManagerData(props.shopDetail),
    }
  }

  //提交表单信息
  submitInfo = () => {
    const {onSubmitInfo} = this.props
    this.field.validate((error, values) => {
      if (!error) {
        if (this.checkMapInfo()) {
          onSubmitInfo(this.formatUploadInfo(values), this.clearForm)
        } else {
          Toast.error('请选取店铺位置')
        }
      }
    })
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  //格式化上传图片的值
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  //格式化上传图片的服务器响应
  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? String(res.data.id) : ''
    }
  }

  //初始化一个图片列表
  createInitFileList = shopDetail => {
    const initFileList = []
    if (shopDetail) {
      for (let i = 0; i < shopDetail.fileInfo.length; i++) {
        const file = {}
        file.name = file.fileName = 'file'
        file.status = 'done'
        file.downloadURL = file.fileURL = file.imgURL = shopDetail.fileInfo[i].compressHttpUrl
        file.id = shopDetail.fileInfo[i].id
        initFileList.push(file)
      }
    }
    return initFileList
  }

  createInitLogoFileList = shopDetail => {
    const initFileList = []
    const file = {}
    console.log(shopDetail)
    if (shopDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = shopDetail.logoInfo.compressHttpUrl
      file.id = shopDetail.logoInfo.id
      initFileList.push(file)
    }
    return initFileList
  }

  /***combobox相关**/
  onArticleInputComboBox = value => {
    if(this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout( async () => {
      const res = await getSimpleArticleList({params:{title:value}}).catch(()=>false)
      if(res) {
        const formatData = res.data.lists.map(item=>{
          return {
            label:item.title,
            value:String(item.id),
          }
        })
        this.setState({articleData:formatData})
      }
    },500)
    this.field.setValue('articleId', value)
  }

  onVerifyInputComboBox = value => {
    if(this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout( async () => {
      const res = await getSimpleVerifyList({params:{nickname:value}}).catch(()=>false)
      if(res) {
        const formatData = res.data.lists.map(item=>{
          return {
            label:(
              <div style={styles.verifyLabel}>
                <img style={styles.verifyAvatar} src={item.headimg}/>
                <span>{item.nickname}</span>
              </div>
            ),
            value:String(item.id),
          }
        })
        this.setState({verifyData:formatData})
      }
    },500)
  }

  onManagerInputComboBox = value => {
    if(this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout( async () => {
      const res = await getSimpleVerifyList({params:{nickname:value}}).catch(()=>false)
      if(res) {
        const formatData = res.data.lists.map(item=>{
          return {
            label:(
              <div style={styles.verifyLabel}>
                <img style={styles.verifyAvatar} src={item.headimg}/>
                <span>{item.nickname}</span>
              </div>
            ),
            value:String(item.id),
          }
        })
        this.setState({managerData:formatData})
      }
    },500)
  }

  createInitArticleData = shopDetail => {
    if(shopDetail) {
      return [
        {label:shopDetail.articleInfo.title,value:String(shopDetail.articleInfo.id)}
      ]
    } else {
      return []
    }
  }

  createInitVerifyData = shopDetail => {
    if(shopDetail) {
      return shopDetail.verifyUserInfo.map(item=>{
        return {
          label:(
            <div style={styles.verifyLabel}>
              <img style={styles.verifyAvatar} src={item.headimg}/>
              <span>{item.nickname}</span>
            </div>
          ),
          value:String(item.id),
        }
      })
    } else {
      return []
    }
  }

  createInitManagerData =  shopDetail => {
    if(shopDetail) {
      return shopDetail.managerUserInfo.map(item=>{
        return {
          label:(
            <div style={styles.verifyLabel}>
              <img style={styles.verifyAvatar} src={item.headimg}/>
              <span>{item.nickname}</span>
            </div>
          ),
          value:String(item.id),
        }
      })
    } else {
      return []
    }
  }
  /****************/

  //格式化提交的表单信息
  formatUploadInfo = values => {
    return {
      ...values,
      fileId: values.shopCarousel.map(file => {
        return file.response ? file.response.id : file.id
      }),
      logoId:values.logoImg[0].response ?  values.logoImg[0].response.id : values.logoImg[0].id,
      mapInfo: this.state.mapInfo,
    }
  }

  //格式化店铺类型选择列表
  formatTypeList = shopTypeList => {
    return shopTypeList.map(type => {
      return {
        label: type.title,
        value: type.id,
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
    this.setState({mapInfo: {...mapInfo}})
    console.log(mapInfo)
  }

  //检查mapInfo是否完整
  checkMapInfo = () => {
    const {mapInfo} = this.state
    if (mapInfo) {
      const {areaId, areaStr, lat, lng} = mapInfo
      return (areaId && areaStr && lat && lng)
    } else {
      return false
    }
  }

  clearForm = () => {
    this.field.reset()
    this.setState({mapInfo: null})
  }

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  render () {
    const {isMapModalShow, mapInfo,articleData,verifyData,managerData} = this.state
    const {__loading, shopDetail, type, shopTypeList} = this.props
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
                  <div>地址：{mapInfo.areaStr + mapInfo.address}</div>
                </FormItem>
              ) : null
          }
          <FormItem label="店铺名称：" {...formItemLayout}>
            <Input placeholder="请输入店铺名称" {...init('shopTitle', {
              rules: [{required: true, message: '请输入店铺名称'}],
              initValue: shopDetail ? shopDetail.shopTitle : '',
            })}/>
          </FormItem>
          <FormItem label="人均消费：" {...formItemLayout}>
            <Input placeholder="请输入人均消费" {...init('consumptionPerson', {
              rules: [{required: true, message: '请输入人均消费'}],
              initValue: shopDetail ? shopDetail.consumptionPerson : '',
            })}/>
          </FormItem>
          <FormItem label="店铺二级分类：" {...formItemLayout}>
            <Select style={styles.input} dataSource={this.formatTypeList(shopTypeList)}
                    placeholder="请选择店铺二级分类" {...init('shopType', {
              rules: [{required: true, message: '请选择店铺二级分类'}],
              initValue: shopDetail ? String(shopDetail.shopType) : '',
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
          <FormItem label="选择店铺Logo：" {...formItemLayout}>
            <ImageUpload limit={1} className="uploader" {...uploadConfig} {...init('logoImg', {
              rules: [{required: true, message: '请选择logo'}],
              valueName: 'fileList',
              initValue: this.createInitLogoFileList(shopDetail),
              getValueFromEvent: this.formatUploadValue
            })}/>
          </FormItem>
          <FormItem label="关键字描述：" {...formItemLayout} extra={shopKeyWordTips}>
            <Input placeholder="请输入关键字描述" {...init('shopKeyWord', {
              rules: [{required: true, message: '请输入关键字描述'}],
              initValue: shopDetail ? shopDetail.shopKeyWord : '',
            })}/>
          </FormItem>
          <FormItem label="店铺主要描述：" {...formItemLayout}>
            <Input maxLength={20} hasLimitHint multiple placeholder="请输入店铺主要描述" {...init('shopDesc', {
              rules: [{required: true, message: '请输入店铺主要描述'}],
              initValue: shopDetail ? shopDetail.shopDesc : '',
            })}/>
          </FormItem>
          <FormItem label="选择关联文章：" {...formItemLayout}>
            <Combobox
              onInputUpdate={this.onArticleInputComboBox}
              fillProps="label"
              style={styles.comboBox}
              filterLocal={false}
              placeholder="请输入文章名称"
              dataSource={articleData}
              {...init('articleId',{
                initValue: shopDetail ? shopDetail.articleInfo.id : null,
              })}
            />
          </FormItem>
          <FormItem label="选择核销员：" {...formItemLayout}>
            <Combobox
              onInputUpdate={this.onVerifyInputComboBox}
              multiple
              fillProps="label"
              style={styles.comboBox}
              filterLocal={false}
              placeholder="请输入核销员昵称"
              dataSource={verifyData}
              {...init('verifyIds',{
                initValue: shopDetail ? shopDetail.verifyUserInfo.map(info=>info.id) : null,
              })}
            />
          </FormItem>
          <FormItem label="选择管理员：" {...formItemLayout}>
            <Combobox
              onInputUpdate={this.onManagerInputComboBox}
              multiple
              fillProps="label"
              style={styles.comboBox}
              filterLocal={false}
              placeholder="请输入管理员昵称"
              dataSource={managerData}
              {...init('managerIds',{
                initValue: shopDetail ? shopDetail.managerUserInfo.map(info=>info.id) : null,
              })}
            />
          </FormItem>
          <FormItem label="店家微信ID：" {...formItemLayout}>
            <Input placeholder="请输入店家微信ID" {...init('wxId', {
              rules: [{required: true, message: '请输入店家微信ID'}],
              initValue: shopDetail ? shopDetail.wxId : '',
            })}/>
          </FormItem>
          <FormItem label="联系电话：" {...formItemLayout}>
            <Input placeholder="请输入联系电话" {...init('shopTel', {
              rules: [{required: true, message: '请输入联系电话'}],
              initValue: shopDetail ? shopDetail.shopTel : '',
            })}/>
          </FormItem>
          <FormItem label="营业时间：" {...formItemLayout}>
            <Input placeholder="请输入营业时间" {...init('businessHours', {
              rules: [{required: true, message: '请输入营业时间'}],
              initValue: shopDetail ? shopDetail.businessHours : '',
            })}/>
          </FormItem>
          <FormItem label="是否是好店推荐：" {...formItemLayout}>
            <RadioGroup dataSource={recommendRadio}  {...init('isRecommend', {
              rules: [{required: true, message: '请输入营业时间'}],
              initValue: shopDetail ? String(shopDetail.isRecommend) : '',
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
          shopDetail={shopDetail}
        />
      </Fragment>
    )
  }


}
