import React,{Component} from 'react'
import { Balloon,Button } from "@icedesign/base";


export default class DeleteBalloon extends Component {

  static displayName = 'DeleteBalloon'

  constructor (props) {
    super(props)
    this.state = {
      isVisible:false,
    }
  }

  onHide = type =>{
    if(type === 1) {
      this.props.confirmDelete()
    }
    this.setState({isVisible:false})
  }

  onVisible = visible => {
    this.setState({isVisible:visible})
  }

  render(){
    const trigger = this.props.trigger
    const balloonContent = (
      <div>
        <div style={styles.contentTitle}>确认删除？</div>
        <Button
          style={styles.buttonSpace}
          size="small"
          type="normal"
          shape="warning"
          onClick={()=>this.onHide(1)}
        >
          确认
        </Button>
        <Button
          id="cancelBtn"
          size="small"
          onClick={()=>this.onHide(0)}
        >
          关闭
        </Button>
      </div>
    )

    return (
      <Balloon
        trigger={trigger}
        triggerType="click"
        visible={this.state.isVisible}
        onVisibleChange={this.onVisible}
      >
        {balloonContent}
      </Balloon>
    )
  }
}

const styles = {
  contentTitle: {
    padding: '5px 0 15px',
  },
  buttonSpace: {
    marginRight: '5px'
  }
}
