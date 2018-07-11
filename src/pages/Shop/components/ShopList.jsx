import React, {Fragment} from 'react'
import {Button, Pagination, Table,Select,Input,Icon,Form,Field} from '@icedesign/base'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
}

export default class ShopList extends React.Component {

  static displayName = 'ShopList'

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      size:10,
      searchTitle:'',
      searchType:'',
    }
  }

  field = new Field(this, {
    onChange: (name, value) => this.field.setValue(name, value)
  })

  onPaginationChange = (current, event) => {
    const {getShopList} = this.props
    const {size,searchTitle,searchType} = this.state
    this.setState({current})
    getShopList(current,size,searchTitle,searchType)
  }

  //格式化店铺类型选择列表
  formatTypeList = shopTypeList => {
    return shopTypeList.map(type => {
      return {
        label: type.title,
        value: String(type.id),
      }
    })
  }

  onSearch = () => {
    const {getShopList} = this.props
    const {searchTitle,searchType} = this.field.getValues()
    this.setState({current:1,searchTitle,searchType})
    //getShopList(1,10,searchTitle,searchType)
  }

  onClear = () => {
    const {getShopList} = this.props
    this.field.reset()
    this.setState({current:1,searchTitle:'',searchType:''})
    //getShopList()
  }




  render () {
    const init = this.field.init
    const {current,size} = this.state
    const {shopTypeList,count} = this.props
    return (
      <Fragment>
        <Form direction="hoz" field={this.field} size="medium">
          <FormItem>
            <Select style={styles.input} placeholder="选择店铺所属二级类型" dataSource={this.formatTypeList(shopTypeList)} {...init('searchType')}/>
          </FormItem>
          <FormItem>
            <Input style={styles.input} placeholder="搜索关键字" {...init('searchTitle')}/>
          </FormItem>
          <FormItem>
            <Button style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon type="search"/>搜索</Button>
            <Button style={styles.buttonSpace} onClick={this.onClear}><Icon type="refresh"/>清空</Button>
          </FormItem>
        </Form>
        <Table>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
          <Table.Column title="店铺分类" dataIndex="shopType"/>
          <Table.Column title="店铺轮播图" dataIndex="fileId"/>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
          <Table.Column title="店铺名称" dataIndex="shopTitle"/>
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
  input:{
    width:'300px',
  },
  searchAction:{
    marginBottom:'16px',
  },
  buttonSpace: {
    margin:'0 3px'
  }
}


