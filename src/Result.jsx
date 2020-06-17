import React, { Component } from 'react';
import './Result.css';

export default class Result extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'result': 'hidden'}>
        <h2>Winner: {this.props.winner}</h2>
      </div>
    );
  }
}
