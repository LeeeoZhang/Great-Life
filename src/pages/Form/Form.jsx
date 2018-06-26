import React, { Component } from 'react';
import UserForm from './components/UserForm';

export default class Form extends Component {
  static displayName = 'Form';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="form-page">
        <UserForm />
      </div>
    );
  }
}
