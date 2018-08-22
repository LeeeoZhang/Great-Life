import React, {Component, Fragment} from 'react'
import {
  Tab,
  Feedback,
  Button,
  Form,
  Field,
  Select,
  Input,
  Icon,
  DatePicker,
  Table,
  Pagination,
} from "@icedesign/base"

export default class BalanceList extends Component {

  static displayName = 'BalanceList'

  constructor () {
    super()
    this.state = {}
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  render () {
    const init = this.field.init
    const {__loading} = this.props

    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select
              style={styles.select}
              placeholder="搜索类型"
              {...init('searchType')}
            >
              <Select.Option value="1">按商家名称</Select.Option>
              <Select.Option value="2">按商品名称</Select.Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="输入搜索内容" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button
              loading={__loading}
              style={styles.buttonSpace}
              type="primary"
              onClick={this.onSearch}
            >
              <Icon type="search"/>
              搜索
            </Button>
            <Button
              loading={__loading}
              style={styles.buttonSpace}
              onClick={this.onClear}
            >
              <Icon type="refresh"/>
              清空
            </Button>
          </FormItem>
        </Form>
      </Fragment>
    )
  }
}

const styles = {
  paginationWrap: {
    margin: '25px auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  select: {
    width: '200px',
  },
  timePick: {
    width: '150px',
  },
  input: {
    width: '200px',
  },
  searchAction: {
    marginBottom: '16px',
  },
  buttonSpace: {
    margin: '3px'
  },
  carouselImgWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  carouselImg: {
    width: '50px'
  },
  goodsInfo: {
    display: 'flex',
    alignItems: 'center',
  },
}
