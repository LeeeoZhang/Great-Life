import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router'
import './Layout.scss';

export default class BlankLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} className="ice-blank-layout">
        {this.props.children}
      </Layout>
    );
  }
}
