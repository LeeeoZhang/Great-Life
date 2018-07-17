import React, {Fragment} from 'react'
import {Button, Input, Icon, Select, Form, Field,Upload} from '@icedesign/base'
import DOMAIN from '@/domain'
import { TwitterPicker } from 'react-color'
import './HomeBannerForm.scss'
import {getSimpleGoodsList} from '@/service'

const { Combobox } = Select
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
const JumpData = [
  {label:'不跳转',value:'1'},
  {label:'跳转到商品详情',value:'2'},
  {label:'跳转到商品聚合页',value:'3'},
]

export default class HomeBannerForm extends React.Component {

  static displayName = 'HomeBannerForm'

  constructor (props) {
    super(props)
    this.state = {
      jumpType:null,
      goodsData:[],
      color:'',
    }
  }

  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value)
      if(name === 'jumpType') {
        this.setState({jumpType:value})
      }
    }
  })

  //格式化上传图片res的格式
  formatUploadResponse = res => {
    return {
      code: res.code === 200 ? '0' : '1',
      imgURL: res.data ? res.data.httpUrl : '',
      fileURL: res.data ? res.data.httpUrl : '',
      downloadURL: res.data ? res.data.httpUrl : '',
      id: res.data ? res.data.id : ''
    }
  }

  //格式化上传图片的回调结果格式
  formatUploadValue = info => {
    if (info.fileList && info.fileList.length > 0) {
      return info.fileList
    }
    return []
  }

  onInputComboBox = value => {
    if(this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout( async () => {
      const res = await getSimpleGoodsList({params:{title:value}}).catch(()=>false)
      if(res) {
        const formatData = res.data.lists.map(item=>{
          return {
            label:item.title,
            value:String(item.id),
          }
        })
        this.setState({goodsData:formatData})
      }
    },500)
    this.field.setValue('jumpGoodsId', value)
  }

  submitInfo = () => {
    const {onSubmitInfo} = this.props
    this.field.validate((error, values) => {
      error || onSubmitInfo(this.formatSubmitInfo(values), this.clearForm)
    })
  }

  clearForm = ()=>{

  }

  createInitFileList = bannerDetail => {
    const initFileList = []
    const file = {}
    if (merchantDetail) {
      file.name = file.fileName = 'file'
      file.status = 'done'
      file.downloadURL = file.fileURL = file.imgURL = bannerDetail.imgUrl
      file.id = bannerDetail.fileId
      initFileList.push(file)
    }
    return initFileList
  }

  onColorPickerChange = (color,event) => {
    this.setState({color:color.hex})
  }

  formatSubmitInfo = values => {
    return {
      ...values,
      bannerId:values.bannerImg[0].response ? values.bannerImg[0].response.id : values.bannerImg[0].id,
      bannerImg:null,
    }
  }

  render () {
    const init =this.field.init
    const {goodsData,jumpType,color} = this.state
    const {__loading,type} = this.props
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      limit: 1,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="选择轮播图片：" {...formItemLayout}>
          <ImageUpload className="uploader" {...uploadConfig} {...init('bannerImg', {
            rules: [{required: true, message: '请选择图片'}],
            valueName: 'fileList',
            //initValue: this.createInitFileList(merchantDetail),
            getValueFromEvent: this.formatUploadValue
          })}/>
        </FormItem>
        <FormItem label="轮播图跳转：" {...formItemLayout}>
          <Select dataSource={JumpData} style={styles.select} {...init('jumpType',{
            rules: [{required: true, message: '请选择轮播图跳转详情'}],
            //initValue: this.createInitFileList(merchantDetail),
          })}/>
        </FormItem>
        {
          Number(jumpType) === 2 ?
            (
              <FormItem label="选择需要跳转的商品：" {...formItemLayout}>
                <Combobox
                  hasClear
                  onInputUpdate={this.onInputComboBox}
                  fillProps="label"
                  style={styles.comboBox}
                  filterLocal={false}
                  placeholder="选择需要跳转的商品"
                  dataSource={goodsData}
                  {...init('jumpGoodsId',{
                    rules: [{required: true, message: '选择需要跳转的商品'}],
                    //initValue: homeDetail ? homeDetail.goodsIds : null,
                  })}
                />
              </FormItem>
            ):null
        }
        {
          Number(jumpType) === 3 ?
            (
              <div>
                <FormItem label="聚合页标题：" {...formItemLayout}>
                  <Input placeholder="请输入聚合页标题" {...init('aggregatePageTitle', {
                    rules: [{required: true, message: '请输入聚合页标题'}],
                    //initValue: merchantDetail ? merchantDetail.address : '',
                  })}/>
                </FormItem>
                <FormItem label="聚合页头图：" {...formItemLayout}>
                  <ImageUpload className="uploader" {...uploadConfig} {...init('aggregatePageImg', {
                    rules: [{required: true, message: '请选择图片'}],
                    valueName: 'fileList',
                    //initValue: this.createInitFileList(merchantDetail),
                    getValueFromEvent: this.formatUploadValue
                  })}/>
                </FormItem>
                <FormItem label="聚合页主题色：" {...formItemLayout}>
                  <TwitterPicker color={color} triangle="hide" onChange={this.onColorPickerChange}/>
                </FormItem>
                <FormItem label="选择聚合页展示商品：" {...formItemLayout}>
                  <Combobox
                    onInputUpdate={this.onInputComboBox}
                    multiple
                    fillProps="label"
                    style={styles.comboBox}
                    filterLocal={false}
                    placeholder="请选择聚合页展示商品"
                    dataSource={goodsData}
                    {...init('goodsIds',{
                      rules: [{required: true, message: '请选择聚合页展示商品'}],
                      //initValue: homeDetail ? homeDetail.goodsIds : null,
                    })}
                  />
                </FormItem>
              </div>
            ):null
        }
        <FormItem label=" "  {...formItemLayout}>
          <Button style={styles.buttonSpace} type="primary" size="large" loading={__loading} onClick={this.submitInfo}>
            {type === 'edit' ? '确认修改' : '新增'}
          </Button>
          {type === 'edit' ? <Button style={styles.buttonSpace} onClick={this.backFromEdit}>返回</Button> : null}
        </FormItem>
      </Form>
    )
  }
}

const styles = {
  comboBox:{
    width:'100%',
  },
  select:{
    width:'100%',
  },
  buttonSpace: {
    margin: '3px',
  },
}
