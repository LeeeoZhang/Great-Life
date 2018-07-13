import React, {Fragment} from 'react'
import {Form, Input, Button, Field, Select, Upload} from '@icedesign/base'
import DOMAIN from '@/domain'
import './StepForm.scss'

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
  nextFormItem: {
    justifyContent: 'flex-end'
  }
}
const shopKeyWordTips = (
  <div style={styles.tipsContent}>用$隔开，作为搜索时的关键字</div>
)
const goodsSaleMethod = [
  {label: '基本商品', value: '1'},
  {label: '拼团商品', value: '2'},
  {label: '秒杀商品', value: '3'},
]
const goodsType = [
  {label: '核销商品', value: '1'},
  {label: '物流商品', value: '2'},
]

export default class Step1Form extends React.Component {

  static displayName = 'Step1Form'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })


  //格式化商品导航选择框
  formatGoodsNavList = goodsNavList => {
    return goodsNavList.map(nav => {
      return {
        label: nav.title,
        value: String(nav.id),
      }
    })
  }

  //格式化店铺ID选择列表
  formatShopIdList = shopIdList => {
    return shopIdList.map(shopId => {
      return {
        label: shopId.title,
        value: String(shopId.id),
      }
    })
  }

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


  createInitFileList = step1Data => {

  }

  nextStep = () => {
    this.props.nextStep()
    // this.field.validate((error,values)=>{
    //   if(!error) {
    //     console.log(values)
    //     this.props.nextStep()
    //   }
    // })
  }

  //格式化提交的数据
  formatSubmitData = values => {

  }

  render () {
    const init = this.field.init
    const {goodsNavList, step1Data, __loading, shopIdList} = this.props
    const uploadConfig = {
      action: `${DOMAIN}/admin/file/upload`,
      accept: 'image/png, image/jpg, image/jpeg',
      listType: "picture-card",
      withCredentials: true,
      formatter: this.formatUploadResponse,
    }
    return (
      <Form Form direction="ver" field={this.field} size="large">
        <FormItem label="选择商品所在导航：" {...formItemLayout}>
          <Select style={styles.input} dataSource={this.formatGoodsNavList(goodsNavList)}
                  placeholder="请选择商品所在导航" {...init('goodsNavId', {
            rules: [{required: true, message: '请选择商品所在导航'}],
            initValue: Object.keys(step1Data).length > 0 ? String(step1Data.goodsNavId) : '',
          })}/>
        </FormItem>
        <FormItem label="商品销售方式：" {...formItemLayout}>
          <Select style={styles.input} dataSource={goodsSaleMethod}
                  placeholder="请选择商品销售方式" {...init('goodsSaleMethod', {
            rules: [{required: true, message: '请选择商品销售方式'}],
            initValue: Object.keys(step1Data).length > 0  ? String(step1Data.goodsSaleMethod) : '',
          })}/>
        </FormItem>
        <FormItem label="商品类型：" {...formItemLayout}>
          <Select style={styles.input} dataSource={goodsType}
                  placeholder="请选择商品类型" {...init('goodsType', {
            rules: [{required: true, message: '请选择商品类型'}],
            initValue: Object.keys(step1Data).length > 0  ? String(step1Data.goodsType) : '',
          })}/>
        </FormItem>
        <FormItem label="店铺ID：" {...formItemLayout}>
          <Select style={styles.input} dataSource={this.formatShopIdList(shopIdList)}
                  placeholder="请输入店铺ID" {...init('shopId', {
            rules: [{required: true, message: '请输入店铺ID'}],
            initValue: Object.keys(step1Data).length > 0  ? String(step1Data.shopId) : '',
          })}/>
        </FormItem>
        <FormItem label="商品名称：" {...formItemLayout}>
          <Input placeholder="请输入商品名称" {...init('goodsTitle', {
            rules: [{required: true, message: '请输入商品名称'}],
            initValue: Object.keys(step1Data).length > 0  ? step1Data.goodsTitle : '',
          })}/>
        </FormItem>
        <FormItem label="商品关键字：" {...formItemLayout} extra={shopKeyWordTips}>
          <Input placeholder="请输入商品关键字" {...init('goodsKeyword', {
            rules: [{required: true, message: '请输入商品关键字'}],
            initValue: Object.keys(step1Data).length > 0  ? step1Data.goodsKeyword : '',
          })}/>
        </FormItem>
        <FormItem label="商品描述：" {...formItemLayout}>
          <Input maxLength={32} hasLimitHint multiple placeholder="请输入商品描述" {...init('goodsDesc', {
            rules: [{required: true, message: '请输入商品描述'}],
            initValue: Object.keys(step1Data).length > 0  ? step1Data.goodsDesc : '',
          })}/>
        </FormItem>
        <FormItem label="选择商品轮播图片：" {...formItemLayout}>
          <ImageUpload className="uploader" {...uploadConfig} {...init('goodsCarousel', {
            rules: [{required: true, message: '请选择图片'}],
            valueName: 'fileList',
            initValue: this.createInitFileList(step1Data),
            getValueFromEvent: this.formatUploadValue
          })}/>
        </FormItem>
        <FormItem  {...formItemLayout} style={styles.nextFormItem}>
          <Button onClick={this.nextStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            下一步
          </Button>
        </FormItem>
      </Form>
    )

  }
}

