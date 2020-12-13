import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const InactiveDot = () => {
  return <div className="progress-dot inactive"></div>
}

const LoadingDot = () => {
  return <div className="progress-dot loading"></div>
}

const SuccessDot = () => {
  return <div className="progress-dot success">
    <DoneIcon className="icon" />
  </div>
}

const ErrorDot = () => {
  return <div className="progress-dot error">
    <CloseIcon className="icon"/>
  </div>
}

function getDotComponentByState(state) {
  switch (state) {
    case ProgressDotState.INACTIVE:
      return <InactiveDot />
    case ProgressDotState.LOADING:
      return <LoadingDot />
    case ProgressDotState.SUCCESS:
      return <SuccessDot />
    case ProgressDotState.ERROR:
      return <ErrorDot />
    default:
      return <InactiveDot />
  }
}

const ProgressBarDot = (props) => {
  const {state, label} = props;

  return <div className="progress-dot-container">
    {getDotComponentByState(state)}
    <div className={"progress-dot-label " + (state === ProgressDotState.LOADING ? "pulsating" : "")}>{label}</div>
  </div>
}

export const ProgressDotState = {
  INACTIVE: "inactive",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error"
}

export default ProgressBarDot;