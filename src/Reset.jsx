import React, { Component } from 'react';

export default class Reset extends Component {
  render() {
    return (
      <button onClick={this.props.reset}><p className="result">Reset</p></button>
    );
  }
}
