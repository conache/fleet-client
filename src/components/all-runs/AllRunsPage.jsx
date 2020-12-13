import React from 'react'
import { RUN_STATES } from '../../constants'
import ProgressBar from "../test-run/ProgressBar"

export default class AllRunsPage extends React.Component {
  render() {
    return [
      <ProgressBar className="progress-bar" currentState={RUN_STATES.ERROR} lastValidState={RUN_STATES.EVALUATIONG}/>
    ]
  }
}
