import React, {Fragment} from 'react'
import {Form, Input, Button, Field, Select, Grid, DatePicker, moment} from '@icedesign/base'

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
const goodsOrderCloseTime = [
  {label: '10分钟', value: '10'},
  {label: '15分钟', value: '15'},
  {label: '30分钟', value: '30'},
  {label: '60分钟', value: '60'},
]

export default class Step4Form extends React.Component {

  static displayName = 'Step4Form'

  constructor (props) {
    super(props)
    this.state = {}
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onComplete = () => {
    const {onReportData} = this.props
    this.field.validate((error, values) => {
      if (!error) {
        onReportData(values, 3)
      }
    })
  }

  formatTimePicker = (data, dataStr) => {
    console.log(data, dataStr)
    return dataStr
  }

  preStep = () => {
    this.props.preStep()
  }

  backFromEdit = () => {
    this.props.backFromEdit()
  }

  render () {
    const init = this.field.init
    const {step1Data, step4Data, __loading,type} = this.props
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="商品上架时间：" {...formItemLayout}>
          <DatePicker showTime  {...init('goodsPutawayTime', {
            rules: [{required: true, message: '请选择商品上架时间'}],
            initValue: step4Data.goodsPutawayTime ? step4Data.goodsPutawayTime : '',
            getValueFromEvent: this.formatTimePicker,
          })}/>
        </FormItem>
        {
          step1Data.goodsSaleMethod === '3' ? (
            <FormItem label="秒杀开始时间：" {...formItemLayout}>
              <DatePicker showTime  {...init('goodsSeckillStartTime', {
                rules: [{required: true, message: '请选择秒杀开始时间'}],
                initValue: step4Data.goodsSeckillStartTime ? step4Data.goodsSeckillStartTime : '',
                getValueFromEvent: this.formatTimePicker,
              })}/>
            </FormItem>
          ) : null
        }
        {
          step1Data.goodsType === '1' ? (
            <Fragment>
              <FormItem label="卡券开始时间：" {...formItemLayout}>
                <DatePicker showTime  {...init('goodsCardStartTime', {
                  rules: [{required: true, message: '请选择卡券开始时间'}],
                  initValue: step4Data.goodsCardStartTime ? step4Data.goodsCardStartTime : '',
                  getValueFromEvent: this.formatTimePicker,
                })}/>
              </FormItem>
              <FormItem label="卡券结束时间：" {...formItemLayout}>
                <DatePicker showTime  {...init('goodsCardEndTime', {
                  rules: [{required: true, message: '请选择卡券结束时间'}],
                  initValue: step4Data.goodsCardEndTime ? step4Data.goodsCardEndTime : '',
                  getValueFromEvent: this.formatTimePicker,
                })}/>
              </FormItem>
            </Fragment>
          ) : null
        }
        <FormItem label="商品下架时间：" {...formItemLayout}>
          <DatePicker showTime  {...init('goodsSoldOutTime', {
            rules: [{required: true, message: '请选择商品上架时间'}],
            initValue: step4Data.goodsSoldOutTime ? step4Data.goodsSoldOutTime : '',
            getValueFromEvent: this.formatTimePicker,
          })}/>
        </FormItem>
        <FormItem label="订单关闭时间：" {...formItemLayout}>
          <Select style={styles.input} dataSource={goodsOrderCloseTime}
                  placeholder="请选择订单关闭时间" {...init('goodsOrderCloseTime', {
            rules: [{required: true, message: '请选择订单关闭时间'}],
            initValue: step4Data.goodsOrderCloseTime ? String(step4Data.goodsOrderCloseTime) : '',
          })}/>
        </FormItem>
        <FormItem  {...formItemLayout} style={styles.nextFormItem}>
          <Button onClick={this.preStep} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            上一步
          </Button>
          <Button onClick={this.onComplete} style={styles.buttonSpace} type="primary" size="large" loading={__loading}>
            完成
          </Button>
          {type === 'edit' && (<Button onClick={this.backFromEdit} style={styles.buttonSpace} size="large">返回</Button>)}
        </FormItem>
      </Form>
    )
  }

}
