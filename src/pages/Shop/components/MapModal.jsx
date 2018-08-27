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
    margin: '20px 0',
  },
  poiInfo: {
    margin: '0 5px',
  }
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
      keyWord: '',
      address: '',
      lat: '',
      lng: '',
    }
  }

  //弹窗打开动画结束回调
  afterModalOpen = () => {
    const center = new qq.maps.LatLng(39.916527, 116.397128)
    this.map = new qq.maps.Map(document.getElementById('map-ct'), {
      center,
      zoom: 17,
    })
    this.infoWin = new qq.maps.InfoWindow({map: this.map})
    //点击地图生成一个坐标点
    qq.maps.event.addListener(this.map, 'click', event => {
      //清除当前地图上的所有坐标点
      this.singleMarker && this.singleMarker.setMap(null)
      //地址逆解析实例
      const geocoder = new qq.maps.Geocoder({
        complete: res => {
          //设置标记
          this.singleMarker = new qq.maps.Marker({
            position: res.detail.location,
            map: this.map,
          })
          //打开标记详情窗口并记录详情
          const openInfoWin = () => {
            this.infoWin.open()
            this.infoWin.setContent('<div style="width:280px;height:100px;">' + res.detail.address + '</div>')
            this.infoWin.setPosition(res.detail.location)
            this.setState({
              address: res.detail.address,
              //纬度
              lat: res.detail.location.getLat(),
              //经度
              lng: res.detail.location.getLng(),
            })
          }
          openInfoWin()
          //点击标记时打开详情窗口
          qq.maps.event.addListener(this.singleMarker, 'click', () => {
            openInfoWin()
          })
        }
      })
      geocoder.getAddress(event.latLng)
    })
    this.markers = []
  }

  //弹窗关闭动画结束回调
  afterModalClose = () => {
    this.map = null
    this.markers = null
    this.infoWin = null
    this.singleMarker = null
    this.setState({
      areaStr: '',
      areaId: '',
      keyWord: '',
      address: '',
      lat: '',
      lng: '',
    })
  }

  getLocation = () => {
    const {areaStr, keyWord} = this.state
    if(!keyWord) {
      Toast.error('请输入搜索关键字')
      return
    }
    //清空地图上所有标记点
    this.clearMarkers()
    this.singleMarker && this.singleMarker.setMap(null)
    const searchService = new qq.maps.SearchService({
      complete: result => {
        const pois = result.detail.pois
        const latlngBounds = new qq.maps.LatLngBounds()
        try {
          pois.forEach((poi, index) => {
            latlngBounds.extend(poi.latLng)
            const marker = new qq.maps.Marker({map: this.map})
            marker.setPosition(poi.latLng)
            marker.setTitle(index + 1)
            this.markers.push(marker)
            qq.maps.event.addListener(marker, 'click', () => {
              this.infoWin.open()
              this.infoWin.setContent('<div style="width:280px;height:100px;">' + 'POI的ID为：' +
                poi.id + '，POI的名称为：' + poi.name + '，POI的地址为：' + poi.address + '，POI的类型为：' + poi.type + '</div>')
              this.infoWin.setPosition(poi.latLng)
              this.setState({
                address: poi.address,
                lat: poi.latLng.getLat(),
                lng: poi.latLng.getLng(),
              })
            })
          })
          this.map.fitBounds(latlngBounds)
        } catch(e) {
          Toast.error('意外错误，请重试')
        }
      }
    })
    searchService.setLocation(areaStr)
    //设置搜索页码
    searchService.setPageIndex(0)
    //设置每页的结果数
    searchService.setPageCapacity(50)
    searchService.search(keyWord)
  }

  //清除地图标记
  clearMarkers = () => {
    let marker
    while (marker = this.markers.pop()) {
      marker.setMap(null)
    }
  }

  //格式化选择地区的value格式
  formatAreaSelectValue = (value, data, extra) => {
    let areaStr = ''
    //当清空选择时不存在extra
    extra && extra.selectedPath.forEach(path => areaStr += path.label)
    this.setState({areaStr, areaId: String(value)})
    return value
  }

  //输入keyWord
  inputKeyWord = value => {
    this.setState({keyWord: value})
  }

  //输入address
  inputAddress = value => {
    this.setState({address: value})
  }

  submitMapInfo = () => {
    const {areaId, areaStr,lat,lng,address} = this.state
    if (!areaId) {
      Toast.error('请选择省市区')
    } else if (!lng || !lat) {
      Toast.error('请定位一个地址')
    } else {
      this.props.submitMapInfo({
        areaId,
        areaStr,
        address: address,
        //纬度
        lat: lat,
        //经度
        lng: lng,
      })
      this.props.closeMapModal()
    }
  }

  render () {
    const {isMapModalShow, closeMapModal} = this.props
    const {areaId, keyWord, address, poi, lat, lng} = this.state
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
            <CascaderSelect hasClear
                            style={styles.input}
                            dataSource={AreaData}
                            onChange={this.formatAreaSelectValue}
                            value={areaId}
                            placeholder="选择省市区"
            />
          </Col>
          <Col xxs="5" s="5" l="5">
            <Input style={styles.input} placeholder="输入搜索关键字" onChange={this.inputKeyWord} value={keyWord}/>
          </Col>
          <Col xxs="5" s="5" l="5">
            <Button type="primary" onClick={this.getLocation}>搜索</Button>
          </Col>
        </Row>
        <Row style={styles.userAction}>
          <Col>
            <span>地址：</span><Input style={styles.poiInfo} value={address} onChange={this.inputAddress}/>
            <span>经度：</span><Input readOnly style={styles.poiInfo} value={lng}/>
            <span>纬度：</span><Input readOnly style={styles.poiInfo} value={lat}/>
          </Col>
        </Row>
        <div id="map-ct" style={styles.mapSize}/>
      </Dialog>
    )
  }
}


