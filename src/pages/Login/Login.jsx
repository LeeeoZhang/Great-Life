import React, { Component } from 'react';
import Login1 from './components/Login1';

export default class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login-page">
        <Login1 />
      </div>
    );
  }
}
