import React, {Fragment, Component} from 'react'
import {Table, Grid, Button, Icon} from '@icedesign/base'

const styles = {
  templateContent: {
    fontSize: '12px',
    margin: '5px 0',
  },
  actionWrap: {
    marginBottom: '20px'
  }
}
const {Row, Col} = Grid

const TemplateList = props => {

  const {__loading, templateList, openEditForm, refresh} = props

  return (
    <Fragment>
      <Row style={styles.actionWrap}>
        <Col offset={1}>
          <Button type="primary" size="large" onClick={refresh}><Icon type="refresh"/>刷新模板</Button>
        </Col>
      </Row>
      <Table isLoading={__loading} dataSource={templateList}>
        <Table.Column width={200} align="center" title="模板名称" dataIndex="title"/>
        <Table.Column align="center" title="模板编号" dataIndex="templateId"/>
        <Table.Column align="center" title="模板字段" dataIndex="content" cell={value => {
          return (
            value.map((item, index) => <div key={index} style={styles.templateContent}>{item}</div>)
          )
        }}/>
        <Table.Column align="center" title="操作" cell={(value, index, record) => {
          return (
            <a onClick={() => openEditForm(record.id, record.content)} href="javascript:void(0);">发送该模板消息</a>)
        }}/>
      </Table>
    </Fragment>
  )

}

export default TemplateList
