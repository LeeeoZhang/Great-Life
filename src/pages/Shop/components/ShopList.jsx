import React, {Fragment} from 'react'
import {Button, Pagination, Table, Grid,Select,Input,Icon} from '@icedesign/base'

const {Row, Col} = Grid

export default class ShopList extends React.Component {

  static displayName = 'ShopList'

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      size:10,
    }
  }

  onPaginationChange = (current, event) => {
    this.setState({current})
  }

  render () {
    const {current,size} = this.state
    return (
      <Fragment>
        <Row style={styles.searchAction}>
          <Col xxs="5" s="5" l="5">
            <Select style={styles.input} placeholder="选择搜索的店铺类型"/>
          </Col>
          <Col>
            <Input style={styles.input} placeholder="搜索关键字"/>
          </Col>
          <Col>
            <Button type="primary"><Icon type="search"/>搜索</Button>
          </Col>
        </Row>
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
                      total={1000}
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
    width:'90%',
  },
  searchAction:{
    marginBottom:'16px',
  }
}


