import React, {Fragment} from 'react'
import {Button, Input, Icon, Select, Form, Field} from '@icedesign/base'
import {getSimpleGoodsList} from '@/service'

const FormItem = Form.Item
const { Combobox } = Select
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class HomeForm extends React.Component {

  static displayName = 'HomeForm'

  constructor (props) {
    super(props)
    this.state = {
      goodsData:props.homeDetail ? props.homeDetail.goodsList : [],
    }
  }

  field = new Field(this,{
    onChange: (name, value) => {
      console.log(name,value)
      this.field.setValue(name, value)
    }
  })

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
  }

  submitInfo = ()=>{
    this.field.validate((error,values)=>{
      error || this.props.onSubmitInfo(values,this.clearForm)
    })
  }

  backFromEdit = ()=>{
    this.props.backFromEdit()
  }

  clearForm = ()=>{
    this.field.reset()
  }

  render () {
    const init = this.field.init
    const {goodsData} = this.state
    const {type,__loading,homeDetail} = this.props
    return (
      <Form direction="ver" field={this.field} size="large">
        <FormItem label="主标题：" {...formItemLayout}>
          <Input placeholder="请输入主标题" {...init('title',{
            rules: [{required: true, message: '请输入主标题'}],
            initValue: homeDetail ? homeDetail.title : '',
          })}/>
        </FormItem>
        <FormItem label="副标题：" {...formItemLayout}>
          <Input placeholder="请输入副标题" {...init('subTitle',{
            rules: [{required: true, message: '请输入副标题'}],
            initValue: homeDetail ? homeDetail.subTitle : '',
          })}/>
        </FormItem>
        <FormItem label="选择商品：" {...formItemLayout}>
          <Combobox
            onInputUpdate={this.onInputComboBox}
            multiple
            fillProps="label"
            style={styles.comboBox}
            filterLocal={false}
            placeholder="请输入商品名称"
            dataSource={goodsData}
            {...init('goodsIds',{
              rules: [{required: true, message: '请选择商品'}],
              initValue: homeDetail ? homeDetail.goodsIds : null,
            })}
          />
        </FormItem>
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
  buttonSpace: {
    margin: '3px',
  },
}
