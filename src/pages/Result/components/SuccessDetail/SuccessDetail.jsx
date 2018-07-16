import React, {Component} from 'react'
import IceContainer from '@icedesign/container'
import {Button, Step} from '@icedesign/base'

export default class SuccessDetail extends Component {
  static displayName = 'SuccessDetail'

  static propTypes = {}

  static defaultProps = {}

  constructor (props) {
    super(props)
  }

  backToGoodsPage = ()=>{
    window.location.replace('#/goods')
  }

  render () {
    return (
      <div className="success-detail" style={styles.successDetail}>
        <IceContainer style={styles.container}>
          <div className="success-detail-head" style={styles.successDetailHead}>
            <img
              src="https://img.alicdn.com/tfs/TB1ya6gh0zJ8KJjSspkXXbF7VXa-156-156.png"
              style={styles.img}
              alt=""
            />
            <h3 className="title" style={styles.title}>
              提交成功
            </h3>
          </div>
          <div className="buttons" style={styles.buttons}>
            <Button onClick={this.backToGoodsPage} type="primary" style={styles.btn}>
              返回商品管理页面
            </Button>
          </div>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  container: {
    padding: '80px 40px',
  },
  btn: {
    marginRight: '6px',
  },
  buttons:{
    margin:'50px 0',
  },
  successDetail: {
    textAlign: 'center',
  },
  successDetailHead: {
    position: 'relative',
  },
  img: {
    Width: '40px',
    height: '40px',
  },
  title: {
    fontSize:'25px',
    margin: 10,
    fontWeight: 'bold',
  },
  summary: {
    marginBottom: '40px',
    fontSize: '14px',
    color: '#666',
  },
  nextStep: {
    margin: '80px 0',
  },
}
