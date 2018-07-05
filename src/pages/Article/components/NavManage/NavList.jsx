import React, {Fragment} from 'react'
import {Table, Button, Input} from '@icedesign/base'


export default class NavList extends React.Component {

  static displayName = 'NavList'

  constructor (props) {
    super(props)
    this.state = {
      navList: [...props.navList]
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      navList: [...nextProps.navList]
    })
  }

  onChangeNav = (value, index) => {
    const newList = [...this.state.navList]
    newList[index].title = value
    this.setState({navList: newList})
  }

  onUpdate = index => {
    this.props.onUpdate(this.state.navList[index])
  }

  onDel = id => {
    console.log(id)
  }

  render () {
    const {__loading} = this.props
    const {navList} = this.state
    return (
      <Fragment>
        <Table dataSource={navList} loading={__loading}>
          <Table.Column title="导航名称" dataIndex="title" cell={(value, index, record) => {
            return (<Input value={value} onChange={(value) => this.onChangeNav(value, index)}/>)
          }}/>
          <Table.Column title="创建时间" dataIndex="createTime"/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button type="primary" style={styles.actionButton} onClick={() => this.onUpdate(index)}>修改</Button>
                <Button shape="warning" style={styles.actionButton} onClick={() => this.onDel(record.id)}>删除</Button>
              </Fragment>
            )
          }}/>
        </Table>
      </Fragment>
    )
  }
}

const styles = {
  actionButton: {
    margin: '0 5px'
  }
}
