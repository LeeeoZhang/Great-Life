import React , {Fragment}from 'react'
import { Button,Table } from "@icedesign/base"


export default class ArticleList extends React.Component {

  static displayName = 'ArticleList'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {__loading} = this.props

    return (
      <Fragment>
        <Table>

        </Table>
      </Fragment>
    )
  }

}
