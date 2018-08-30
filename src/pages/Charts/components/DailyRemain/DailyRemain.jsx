import React, {Component, Fragment} from 'react'
import IceContainer from '@icedesign/container'
import './DailyRemain.scss'

const styles = {
  title: {
    margin: '0 0 10px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
}


const DailyRemain = props => {

  function formatRemainList () {
    const {remainList} = props
    const formatData = []
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        formatData.push(['日期', '新增用户', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'])
        continue
      }
      const data = []
      for (let j = 0; j < 8; j++) {
        if (j >= 2) {
          if (i - j >= 0) {
            data[j] = remainList[i - 1].item[j - 2] ? `${remainList[i - 1].item[j - 2].percentage}%` : '0%'
            continue
          }
        }
        if (j === 0) {
          data[j] = remainList[i - 1].date
          continue
        }
        if (j === 1) {
          data[j] = remainList[i - 1].assignUser
          continue
        }
        data[j] = ''
      }
      formatData.push(data)
    }
    return formatData
  }

  const colors = ['#096dd9','#1890ff','#40a9ff','#69c0ff','#91d5ff','#bae7ff']

  return (
    <IceContainer>
      <h4 style={styles.title}>近7日留存率</h4>
      <div className="remain-data-wrap">
        {
          formatRemainList().map((row, index) => {
            return (
              <div className="data-row">
                {
                  index === 0 && row.map(item => <div className="data header">{item}</div>)
                }
                {
                  index !== 0 && row.map((item, index) => {
                    return (
                      <div
                        className={`data ${index === 0 ? '' : 'content'}`}
                        style={{
                          background:index >= 2 && item && colors[index-2],
                          color:index >= 2 && '#fff'
                        }}
                      >
                        {item}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </IceContainer>
  )
}

export default DailyRemain
