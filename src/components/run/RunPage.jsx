import React from 'react';

export default class RunPage extends React.Component {
  render() {
    const {runId} = this.props;

    return <div>run page {runId}</div>
  }
}