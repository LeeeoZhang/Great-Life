import React, {Fragment} from 'react'
import {Table, Button} from '@icedesign/base'

export default class BannerList extends React.Component {

  static displayName = 'BannerList'

  constructor (props) {
    super(props)
    this.state = {
      bannerList:[...props.bannerList]
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      bannerList:[...nextProps.bannerList]
    })
  }

  onEdit = (id) => {

  }

  render () {
    const {bannerList} = this.state
    const {__loading} = this.props
    return (
      <Fragment>
        <Table dataSource={bannerList} isLoading={__loading} style={styles.bannerList}>
          <Table.Column title="图片标题" dataIndex="title" cell={(value,index,record)=>{
            return (<div>{value}</div>)
          }}/>
          <Table.Column title="小程序路径" dataIndex="path" cell={(value,index,record)=>{
            return (<div>{value}</div>)
          }}/>
          <Table.Column title="图片详情" dataIndex="path" cell={(value,index,record)=>{
            return (<img src={value} style={styles.imageDetail}/>)
          }}/>
          <Table.Column align="center" title="操作"  cell={(value,index,record)=>{
            return (<Button loading={__loading} onClick={()=> this.onEdit(record.id)}>修改</Button>)
          }}/>
        </Table>
      </Fragment>
    )
  }
}

const styles = {
  bannerList:{
    marginBottom:'30px',
  },
  imageDetail: {
    width:'100px',
    height:'50px',
  }
}

