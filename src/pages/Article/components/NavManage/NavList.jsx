import React, {Fragment} from 'react'
import {Table, Button, Input} from '@icedesign/base'
import DeleteBalloon from '@/components/DeleteBalloon'


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

  onEditNav = index => {
    this.props.editNav(this.state.navList[index])
  }

  onDelNav = id => {
    this.props.delNav(id)
  }

  render () {
    const {__loading} = this.props
    const {navList} = this.state
    const deleteButton = (
      <Button shape="warning" style={styles.actionButton}>删除</Button>
    )
    return (
      <Fragment>
        <Table dataSource={navList} loading={__loading}>
          <Table.Column title="导航名称" dataIndex="title" cell={(value, index, record) => {
            return (<Input value={value} onChange={(value) => this.onChangeNav(value, index)}/>)
          }}/>
          <Table.Column title="创建时间" dataIndex="ctime"/>
          <Table.Column align="center" title="操作" cell={(value, index, record) => {
            return (
              <Fragment>
                <Button type="primary" style={styles.actionButton} onClick={() => this.onEditNav(index)}>修改</Button>
                <DeleteBalloon
                  trigger={deleteButton}
                  confirmDelete={() => this.onDelNav(record.id)}
                />
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
