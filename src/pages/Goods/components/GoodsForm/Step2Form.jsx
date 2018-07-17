import React, {Fragment} from 'react'
import {Form, Input, Button, Field, Select} from '@icedesign/base'
import DOMAIN from '@/domain'
import StyleForm from './StyleForm'
import './StepForm.scss'

const FormItem = Form.Item
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
const GoodsPurchaseTips = (
  <div style={styles.tipsContent}>填0代表不限量</div>
)
const GoodsGroupNum = [
  {label: '2人', value: '2'},
  {label: '3人', value: '3'},
  {label: '4人', value: '4'},
  {label: '5人', value: '5'},
  {label: '6人', value: '6'},
  {label: '7人', value: '7'},
  {label: '8人', value: '8'},
]
const goodsGroupWaitTime = [
  {label: '1小时', value: '1'},
  {label: '2小时', value: '2'},
  {label: '4小时', value: '4'},
  {label: '8小时', value: '8'},
  {label: '12小时', value: '12'},
  {label: '24小时', value: '24'},
]

export default class Step2Form extends React.Component {

  static displayName = 'Step2Form'

  constructor (props) {
    super(props)
    this.state = {
      count: props.step2Data.goodsStyle ? props.step2Data.goodsStyle.length : 0,
      styleList: props.step2Data.goodsStyle ?
        this.formatGoodsStyle(props.step2Data.goodsStyle) :
        [],
    }
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


  formatGoodsStyle = goodsStyle => {
    return goodsStyle.map((goodsStyleData, index) => {
      return {
        ...goodsStyleData,
        indexId: index + 1,
      }
    })
  }

  addNewStyle = () => {
    const newStyleList = [...this.state.styleList, {indexId: this.state.count + 1}]
    this.setState({styleList: newStyleList, count: this.state.count + 1})
  }

  delStyle = index => {
    const newStyleList = [...this.state.styleList]
    newStyleList.splice(index, 1)
    this.setState({styleList: newStyleList})
  }

  nextStep = () => {
    const {onReportData} = this.props
    this.field.validate((error, values) => {
      if (!error) {
        onReportData(this.formatReportData(values), 1)
      }
    })
  }

  preStep = () => {
    this.props.preStep()
  }

  //格式化提交的数据
  formatReportData = values => {
    return {
      goodsUnit: values.goodsUnit,
      goodsPurchase: values.goodsPurchase,
      goodsGroupNum: values.goodsGroupNum,
      goodsGroupWaitTime: values.goodsGroupWaitTime,
      goodsGroupPrice: values.goodsGroupPrice,
      goodsStyle: JSON.stringify(this.formatReportGoodsStyle(values))
    }
  }

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  //格式化提交样式列表
  formatReportGoodsStyle = values => {
    const {styleList} = this.state
    const goodsStyle = []
    const indexIds = styleList.map(goodStyle => goodStyle.indexId)
    indexIds.forEach((indexId, index) => {
      const formatGoodsStyle = {}
      formatGoodsStyle.id = styleList[index].id || 0
      formatGoodsStyle.fileId = values[`styleImage${indexId}`][0].response ? values[`styleImage${indexId}`][0].response.id : values[`styleImage${indexId}`][0].fileId
      formatGoodsStyle.title = values[`styleTitle${indexId}`]
      formatGoodsStyle.salePrice = values[`styleSalePrice${indexId}`] * 100
      formatGoodsStyle.marketPrice = values[`styleMarketPrice${indexId}`] * 100
      formatGoodsStyle.stock = values[`styleStock${indexId}`]
      formatGoodsStyle.compressHttpUrl = values[`styleImage${indexId}`][0].response ?  values[`styleImage${indexId}`][0].response.imgURL : values[`styleImage${indexId}`][0].imgURL
      goodsStyle.push(formatGoodsStyle)
    })
    return goodsStyle
  }

  render () {
    const init = this.field.init
    const {step2Data, step1Data, __loading,type} = this.props
    const {styleList} = this.state
    return (
      <Form Form direction="ver" field={this.field} size="large">
        <FormItem label="商品单位：" {...formItemLayout}>
          <Input placeholder="请输入商品单位" {...init('goodsUnit', {
            rules: [{required: true, message: '请输入商品单位'}],
            initValue: step2Data ? step2Data.goodsUnit : '',
          })}/>
        </FormItem>
        <FormItem label="商品限购数量：" {...formItemLayout} extra={GoodsPurchaseTips}>
          <Input placeholder="请输入商品限购数量" {...init('goodsPurchase', {
            rules: [{required: true, message: '请输入商品价格单位'}],
            initValue: step2Data ? step2Data.goodsPurchase : '',
          })}/>
        </FormItem>
        {
          Number(step1Data.goodsSaleMethod) === 2 ? (
            <Fragment>
              <FormItem label="成团人数：" {...formItemLayout}>
                <Select style={styles.input} dataSource={GoodsGroupNum}
                        placeholder="请选择成团人数" {...init('goodsGroupNum', {
                  rules: [{required: true, message: '请选择成团人数'}],
                  initValue: step2Data ? String(step2Data.goodsGroupNum) : '',
                })}/>
              </FormItem>
              <FormItem label="拼团持续时间：" {...formItemLayout}>
                <Select style={styles.input} dataSource={goodsGroupWaitTime}
                        placeholder="请选择拼团持续时间" {...init('goodsGroupWaitTime', {
                  rules: [{required: true, message: '请选择拼团持续时间'}],
                  initValue: step2Data ? String(step2Data.goodsGroupWaitTime) : '',
                })}/>
              </FormItem>
              <FormItem label="拼团价格：" {...formItemLayout}>
                <Input placeholder="请输入拼团价格" {...init('goodsGroupPrice', {
                  rules: [{required: true, message: '请输入拼团价格'}],
                  initValue: step2Data ? step2Data.goodsGroupPrice : '',
                })}/>
              </FormItem>
            </Fragment>
          ) : null
        }
        {
          styleList.map((styleData, index) => (
            <StyleForm
              __loading={__loading}
              key={styleData.indexId}
              index={index}
              styleData={styleData}
              delStyle={this.delStyle}
              init={init}
              field={this.field}
            />
          ))
        }
        <FormItem label=" " {...formItemLayout}>
          <Button onClick={this.addNewStyle} style={styles.buttonSpace} size="large" loading={__loading}>
            新增款式
          </Button>
        </FormItem>
        <FormItem  {...formItemLayout} style={styles.nextFormItem}>
          <Button onClick={this.preStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            上一步
          </Button>
          <Button onClick={this.nextStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            下一步
          </Button>
          {type === 'edit' && (<Button onClick={this.backFromEdit} style={styles.buttonSpace} size="large">返回</Button>)}
        </FormItem>
      </Form>
    )

  }
}
