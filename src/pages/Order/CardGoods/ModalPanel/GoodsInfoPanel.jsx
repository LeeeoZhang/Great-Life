import React from 'react'
import Panel from '@icedesign/panel'
import { Table } from "@icedesign/base"

const styles = {
  rowSpace: {
    marginBottom: '10px',
  },
  panelMargin:{
    marginBottom: '10px'
  },
  goodsInfo: {
    display: 'flex',
    alignItems: 'center',
  },
}

const GoodsInfoPanel = props =>{
  const {goodsInfo} = props
  const formatGoodsInfo = [goodsInfo]
  return (
    <Panel style={styles.panelMargin}>
      <Panel.Header>
        商品信息
      </Panel.Header>
      <Panel.Body>
        <Table dataSource={formatGoodsInfo}>
          <Table.Column width={500} title="商品名称" cell={(value, index, record)=>{
            return (
              <div style={styles.goodsInfo}>
                <img src={record.fileInfo.compressHttpUrl} style={{width: 50, marginRight: 10}}/>
                <span>{record.goodsTitle}</span>
              </div>
            )
          }}/>
          <Table.Column title="商品款式" dataIndex="goodsStyleTitle"/>
          <Table.Column title="购买数量" align="center" dataIndex="orderQuantity"/>
          <Table.Column title="实付金额" align="center" dataIndex="payPrice"/>
        </Table>
      </Panel.Body>
    </Panel>
  )
}

export default GoodsInfoPanel
