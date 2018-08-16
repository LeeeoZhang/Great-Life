import React, {Fragment} from 'react'
import {Dialog, Grid, Input, Button, CascaderSelect, Feedback} from '@icedesign/base'
import AreaData from '@/AreaData'
import qq from 'qq'

const styles = {
  mapSize: {
    width: '980px',
    height: '400px'
  },
  input: {
    width: '90%'
  },
  userAction: {
    margin: '20px 0'
  },
}
const {Row, Col} = Grid
const Toast = Feedback.toast

export default class MapModal extends React.Component {

  static displayName = 'MapModal'

  constructor (props) {
    super(props)
    this.state = {
      areaStr: '',
      areaId: '',
      address: '',
    }
  }

  //弹窗打开动画结束回调
  afterModalOpen = () => {
    const center = new qq.maps.LatLng(39.916527, 116.397128)
    this.map = new qq.maps.Map(document.getElementById('map-ct'), {
      center,
      zoom: 17,
      draggable: false,
      disableDoubleClickZoom: false
    })
  }

  //弹窗关闭动画结束回调
  afterModalClose = () => {
    this.map = null
    this.result = null
    this.marker = null
    this.setState({
      areaStr: '',
      areaId: '',
      address: '',
    })
  }

  getLocation = () => {
    const {areaStr, address} = this.state
    const geocoder = new qq.maps.Geocoder({
      complete: (result) => {
        console.log(result)
        this.result = result
        this.map.setCenter(result.detail.location)
        if(!this.marker) {
          this.marker = new qq.maps.Marker({
            map: this.map,
            position: result.detail.location,
            animation: qq.maps.MarkerAnimation.BOUNCE,
          })
        } else {
          this.marker.setPosition(result.detail.location)
        }
      }
    })
    geocoder.getLocation(areaStr + address)
  }

  //每次选择选择地区和输入详细地址时，都重置result，需用户重新定位
  //格式化选择地区的value格式
  formatAreaSelectValue = (value, data, extra) => {
    let areaStr = ''
    //当清空选择时不存在extra
    extra && extra.selectedPath.forEach(path => areaStr += path.label)
    this.setState({areaStr, areaId: String(value)})
    this.result = null
    return value
  }

  //输入详细地址
  inputAddress = value => {
    this.result = null
    this.setState({address: value})
  }

  submitMapInfo = () => {
    const {areaId, areaStr, address} = this.state
    if (!areaId) {
      Toast.error('请选择省市区')
    } else if (!this.result) {
      Toast.error('请定位地址')
    } else {
      this.props.submitMapInfo({
        areaId,
        areaStr,
        address,
        //纬度
        lat: this.result.detail.location.getLat(),
        //经度
        lng: this.result.detail.location.getLng(),
      })
      this.props.closeMapModal()
    }
  }

  render () {
    const {isMapModalShow, closeMapModal} = this.props
    const {areaId, address} = this.state
    return (
      <Dialog
        visible={isMapModalShow}
        onCancel={closeMapModal}
        onClose={closeMapModal}
        title="选取店铺位置"
        afterOpen={this.afterModalOpen}
        afterClose={this.afterModalClose}
        onOk={this.submitMapInfo}
      >
        <Row style={styles.userAction}>
          <Col xxs="5" s="5" l="5">
            <CascaderSelect hasClear style={styles.input} dataSource={AreaData} onChange={this.formatAreaSelectValue}
                            value={areaId}/>
          </Col>
          <Col xxs="5" s="5" l="5">
            <Input style={styles.input} placeholder="输入详细地址" onChange={this.inputAddress} value={address}/>
          </Col>
          <Col xxs="5" s="5" l="5">
            <Button type="primary" onClick={this.getLocation}>定位</Button>
          </Col>
        </Row>
        <div id="map-ct" style={styles.mapSize}/>
      </Dialog>
    )
  }
}


