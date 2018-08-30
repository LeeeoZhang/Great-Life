import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import './KeyData.scss'

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
}

const KeyData = props => {
  const {todayInfo,yesterdayInfo,beforedayInfo} = props
  return (
    <IceContainer>
      <h4 style={styles.title}>关键指标</h4>
      <div className="key-data-wrap">
        <div className="data-item">
          <div className="data">&nbsp;</div>
          <div className="data">今天</div>
          <div className="data">昨天</div>
          <div className="data">前天</div>
        </div>
        <div className="data-item">
          <div className="data">订单数</div>
          <div className="data today">{todayInfo.totalOrderNum}</div>
          <div className="data">{yesterdayInfo.totalOrderNum}</div>
          <div className="data">{beforedayInfo.totalOrderNum}</div>
        </div>
        <div className="data-item">
          <div className="data">成交商品数</div>
          <div className="data today">{todayInfo.totalGoodsNum}</div>
          <div className="data">{yesterdayInfo.totalGoodsNum}</div>
          <div className="data">{beforedayInfo.totalGoodsNum}</div>
        </div>
        <div className="data-item">
          <div className="data">成交额(元)</div>
          <div className="data today">{todayInfo.totalPayPrice}</div>
          <div className="data">{yesterdayInfo.totalPayPrice}</div>
          <div className="data">{beforedayInfo.totalPayPrice}</div>
        </div>
        <div className="data-item">
          <div className="data">新用户数</div>
          <div className="data today">{todayInfo.visitUvNew}</div>
          <div className="data">{yesterdayInfo.visitUvNew}</div>
          <div className="data">{beforedayInfo.visitUvNew}</div>
        </div>
        <div className="data-item">
          <div className="data">打开次数</div>
          <div className="data today">{todayInfo.sessionCnt}</div>
          <div className="data">{yesterdayInfo.sessionCnt}</div>
          <div className="data">{beforedayInfo.sessionCnt}</div>
        </div>
        <div className="data-item">
          <div className="data">访问次数</div>
          <div className="data today">{todayInfo.visitPv}</div>
          <div className="data">{yesterdayInfo.visitPv}</div>
          <div className="data">{beforedayInfo.visitPv}</div>
        </div>
        <div className="data-item">
          <div className="data">访问人数</div>
          <div className="data today">{todayInfo.visitUv}</div>
          <div className="data">{yesterdayInfo.visitUv}</div>
          <div className="data">{beforedayInfo.visitUv}</div>
        </div>
        <div className="data-item">
          <div className="data">平均在线时长(秒)</div>
          <div className="data today">{todayInfo.stayTimeUv}</div>
          <div className="data">{yesterdayInfo.stayTimeUv}</div>
          <div className="data">{beforedayInfo.stayTimeUv}</div>
        </div>
      </div>
    </IceContainer>
  )
}


export default KeyData
