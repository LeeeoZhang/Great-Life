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
import DOMAIN from '@/domain'

const FormItem = Form.Item

export default class BalanceList extends Component {

  static displayName = 'BalanceList'

  constructor () {
    super()
    this.state = {
      searchType:'',
      searchTitle:'',
    }
  }

  field = new Field(this, {
    onChange: (name, value) => {
      this.field.setValue(name, value)
      this.setState({[name]:value})
    }
  })

  onPaginationChange = current => {
    this.props.onPagination(current)
  }

  onSearch = () => {
    this.props.searching(this.field.getValues())
  }

  onClear = ()=>{
    this.props.clear()
    this.field.reset(true)
    this.setState({
      searchType:'',
      searchTitle:'',
    })
  }

  render () {
    const init = this.field.init
    const {__loading, balanceList, count,size,current} = this.props
    const {searchType,searchTitle} = this.state
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select
              defaultValue={undefined}
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
            <Button
              style={{position:'relative'}}
              loading={__loading}
            >
              <Icon type="download"/>
              下载Excel表格
              <a
                download
                href={`${DOMAIN}/admin/shop/exportSettlement?searchType=${searchType}&searchTitle=${searchTitle}`}
                style={styles.downloadAlien}
              />
            </Button>
          </FormItem>
        </Form>
        <Table dataSource={balanceList} isLoading={__loading}>
          <Table.Column title="商家名称" dataIndex="shopTitle"/>
          <Table.Column title="商品名称" dataIndex="goodsTitle"/>
          <Table.Column title="销量" dataIndex="orderInfo.saleOrderNum"/>
          <Table.Column title="销量额(元)" dataIndex="orderInfo.salePrice"/>
          <Table.Column title="核销数" dataIndex="orderInfo.verifyNum"/>
          <Table.Column title="核销总额(元)" dataIndex="orderInfo.verifyPrice"/>
          <Table.Column title="退款数" dataIndex="orderInfo.refundNum"/>
          <Table.Column title="退款总额(元)" dataIndex="orderInfo.refundPrice"/>
          <Table.Column title="过期数" dataIndex="orderInfo.expireNum"/>
          <Table.Column title="过期总额(元)" dataIndex="orderInfo.expirePrice"/>
        </Table>
        <div style={styles.paginationWrap}>
          <Pagination onChange={this.onPaginationChange}
                      showJump={false}
                      shape="arrow-only"
                      total={count}
                      pageSize={size}
                      current={current}
          />
        </div>
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
    width: '300px',
  },
  timePick: {
    width: '150px',
  },
  input: {
    width: '300px',
  },
  searchAction: {
    marginBottom: '16px',
  },
  buttonSpace: {
    margin: '3px',
    position:'relative',
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
  downloadAlien:{
    display:'block',
    width:'100%',
    height:'100%',
    position:'absolute',
    left:0,
    top:0,
  }
}
