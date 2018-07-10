import React, {Fragment} from 'react'
import IceTitle from '@icedesign/title'
import {Button, Pagination, Table, Input, Feedback, Select,Form,Field} from '@icedesign/base'

const Toast = Feedback.toast
const {Option} = Select
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class ShopTypeListManage extends React.Component {

  static displayName = 'ShopTypeListManage'

  constructor (props) {
    super(props)
    this.state = {
      shopTypeList: [...props.shopTypeList],
    }
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      shopTypeList:[...nextProps.shopTypeList]
    })
  }

  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value)
    }
  })

  submitType = () => {
    this.field.validate((error, values) => {
      error || console.log(values)
    })
  }

  clearForm = () => {
    this.field.reset()
  }

  onEditShopTypeName = (value, index) => {
    const newShopTypeList = [...this.state.shopTypeList]
    newShopTypeList[index].title = value
    this.setState({shopTypeList: newShopTypeList})
  }

  onEditShopType = (value,index) => {
    const newShopTypeList = [...this.state.shopTypeList]
    newShopTypeList[index].type = value
    this.setState({shopTypeList: newShopTypeList})
  }

  onEdit = data => {
    console.log(data)
  }

  onDel = id => {
    console.log(id)
  }


  render () {
    const {__loading} = this.props
    const {shopTypeList} = this.state
    const init = this.field.init
    return (
      <Fragment>
        <IceTitle text="添加店铺类目" decoration/>
        <Form direction="ver" field={this.field} size="large">
          <FormItem label="输入类目名称：" {...formItemLayout}>
            <Input size="large" placeholder="填写店铺类目名称" {...init('shopTypeName',{
              rules: [{
                required: true,
                message: '请填写店铺类目名称'
              }]
            })}/>
          </FormItem>
          <FormItem label="选择具体类目：" {...formItemLayout}>
            <Select placeholder="选择具体类目" style={styles.input} {...init('shopTypeValue',{
              rules: [{
                required: true,
                message: '请选择具体类目'
              }]
            })}>
              <Option value="1">美食类</Option>
              <Option value="2">健康运动类</Option>
              <Option value="3">周边旅游类</Option>
              <Option value="4">其他类</Option>
            </Select>
          </FormItem>
          <FormItem label=" " {...formItemLayout}>
            <Button style={styles.buttonSpace} type="primary" size="large" onClick={this.submitType}>提交</Button>
          </FormItem>
        </Form>
        <IceTitle text="店铺类型列表" decoration/>
        <Table isLoading={__loading} dataSource={shopTypeList} style={styles.accountList}>
          <Table.Column title="类型名称" dataIndex="title" cell={(value, index, record) => {
            return (<Input value={value} onChange={(value) => this.onEditShopTypeName(value, index)}/>)
          }}/>
          <Table.Column title="具体类目" dataIndex="type" cell={(value, index, record) => {
            return (
              <Select placeholder="选择具体类目" style={styles.input} value={value} onChange={value=>this.onEditShopType(value,index)}>
                <Option value="1">美食类</Option>
                <Option value="2">健康运动类</Option>
                <Option value="3">周边旅游类</Option>
                <Option value="4">其他类</Option>
              </Select>
            )
          }}/>
          <Table.Column title="创建时间" dataIndex="ctime"/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button type="primary" style={styles.buttonSpace} onClick={() => this.onEdit(record)}>更新</Button>
                <Button shape="warning" style={styles.buttonSpace} onClick={() => this.onDel(record.id)}>删除</Button>
              </Fragment>
            )
          }}/>
        </Table>
      </Fragment>
    )
  }
}

const styles = {
  input: {
    width: '100%'
  },
  formItem: {
    marginBottom: '20px',
    alignItems: 'center'
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  buttonSpace: {
    margin: '0 3px',
  }
}
