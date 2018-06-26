import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class Test extends Component {
  static displayName = 'Test';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="test-page">
        <AuthorityTable />
      </div>
    );
  }
}
