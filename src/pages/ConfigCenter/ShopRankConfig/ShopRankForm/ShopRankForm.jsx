import React, {Component, Fragment} from 'react'
import {Form, Field, Input, Button, Select} from '@icedesign/base'
import {getSimpleShopList} from "@/service"

const FormItem = Form.Item
const Option = Select.Option
const {Combobox} = Select
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

const styles = {
  selectInput: {
    width: '300px',
  },
  buttonSpace: {
    margin: '0 3px'
  },
  comboBox: {
    width: '100%',
  },
  tipsContent: {
    margin: '5px 0',
    fontSize: '12px',
  },
}

const sortTips = (
  <div style={styles.tipsContent}>输入排序数字，范围为0-255，数字越大，排序越靠前，</div>
)
const shopSelectTips = (
  <div style={styles.tipsContent}>在下拉列表中选中店铺才会生效</div>
)

export default class ShopRankForm extends Component {

  static defaultProps = {
    shopRankConfig: {},
  }

  static displayName = 'ShopRankForm'

  state = {
    simpleShopData: [],
  }

  rankTypeField = new Field(this, {
    onChange: (name, value) => this.rankTypeField.setValue(name, value)
  })

  shopSortField = new Field(this, {
    onChange: (name, value) => this.shopSortField.setValue(name, value)
  })

  onUpdateRankType = () => {
    this.rankTypeField.validate((error, values) => {
      error || this.props.updateRankType(values)
    })
  }

  onShopSelectComboBoxInput = value => {
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(async () => {
      const res = await getSimpleShopList({params: {title: value}}).catch(() => false)
      if (res) {
        const formatData = res.data.lists.map(item => {
          return {
            label: item.title,
            value: String(item.id),
          }
        })
        this.setState({simpleShopData: formatData})
      }
    }, 500)
    this.shopSortField.setValue('shopId', value)
  }

  onAddShopSort = () => {
    this.shopSortField.validate((error, values) => {
      error || this.props.addShopSort(values, this.resetShopSortField)
    })
  }

  resetShopSortField = () => {
    this.shopSortField.reset(true)
    this.setState({simpleShopData: []})
  }

  render () {
    const rankTypeInit = this.rankTypeField.init
    const shopSortInit = this.shopSortField.init
    const {__loading, shopRankConfig} = this.props
    const {simpleShopData} = this.state
    return (
      <Fragment>
        <Form direction="ver" field={this.rankTypeField} size="large">
          <FormItem label="排序规则：" {...formItemLayout}>
            <Select
              style={styles.selectInput}
              {...rankTypeInit('rankType', {
                rules: [{required: true, message: '选择一个排序规则'}],
                initValue: shopRankConfig.status === undefined ? undefined : String(shopRankConfig.status)
              })}
            >
              <Option value="0">默认排序</Option>
              <Option value="1">手动指定排序</Option>
            </Select>
          </FormItem>
          <FormItem label=" "  {...formItemLayout}>
            <Button style={styles.buttonSpace}
                    type="primary" size="large"
                    loading={__loading}
                    onClick={this.onUpdateRankType}
            >
              更新
            </Button>
          </FormItem>
        </Form>
        {
          shopRankConfig.status === 1 &&
          (<Form direction="ver" field={this.shopSortField} size="large">
            <FormItem label="选择店铺：" {...formItemLayout} extra={shopSelectTips}>
              <Combobox
                onInputUpdate={this.onShopSelectComboBoxInput}
                fillProps="label"
                style={styles.comboBox}
                filterLocal={false}
                placeholder="输入店铺名称进行搜索"
                dataSource={simpleShopData}
                {...shopSortInit('shopId', {
                  rules: [{required: true, message: '请选择一个店铺'}],
                })}
              />
            </FormItem>
            <FormItem label="排序标识" {...formItemLayout} extra={sortTips}>
              <Input placeholder="请输入排序标识" {...shopSortInit('sort', {
                rules: [{required: true, message: '请输入排序标识'}],
              })}/>
            </FormItem>
            <FormItem label=" "  {...formItemLayout}>
              <Button style={styles.buttonSpace}
                      type="primary" size="large"
                      loading={__loading}
                      onClick={this.onAddShopSort}
              >
                添加
              </Button>
            </FormItem>
          </Form>)
        }
      </Fragment>
    )
  }

}
