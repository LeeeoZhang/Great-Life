import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import './HeatMap.scss'
import qq from 'qq'

export default class HeatMap extends Component {

  static displayName = 'HeatMap'

  state = {}

  componentDidMount () {
    this.map = new qq.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: new qq.maps.LatLng(39.921984, 116.418261)
    })
  }

  componentWillReceiveProps(nextProps){
    const {mapDataList} = nextProps
    if(mapDataList.length !== 0) {
      const firstData = mapDataList[0]
      //设置地图中心
      this.map.panTo(new qq.maps.LatLng(firstData.lat,firstData.lng))
      //设置热力图
      const heatMap = new QQMapPlugin.HeatmapOverlay(this.map,{
        //点半径，设置为1即可
        "radius": 1,
        //热力图最大透明度
        "maxOpacity": 0.8,
        //是否在每一屏都开启重新计算，如果为true则每一屏都会有一个红点
        "useLocalExtrema": true,
        //设置大小字段
        "valueField": 'saleNum'
      })
      heatMap.setData({
        max:100,
        data:mapDataList,
      })
    }
  }

  render () {
    return (
      <IceContainer>
        <h4 style={styles.title}>店铺热力图</h4>
        <div id="map">

        </div>
      </IceContainer>
    )
  }

}

const styles = {
  title: {
    margin: '0 0 10px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
}
