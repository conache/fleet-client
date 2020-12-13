import React from 'react';
import ProgressBarDot, { ProgressDotState } from "./ProgressBarDot";
import LineSeparator, { LineSeparatorState } from "./LineSeparator";
import {RUN_STATES} from "../../constants";

const barStates = [
  RUN_STATES.INITIATED,
  RUN_STATES.INITIATED_DONE,
  RUN_STATES.FILE_UPLOAD,
  RUN_STATES.FILE_UPLOAD_DONE,
  RUN_STATES.PROVISION_FS,
  RUN_STATES.PROVISION_FS_DONE,
  RUN_STATES.ASSEMBLE_FILE,
  RUN_STATES.ASSEMBLE_FILE_DONE,
  RUN_STATES.EVALUATIONG,
  RUN_STATES.EVALUATION_DONE,
  RUN_STATES.FINISHED
];

const progressDotLabel = {
  [RUN_STATES.INITIATED]: {
    [ProgressDotState.LOADING]: "Creating run",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Created",
    [ProgressDotState.ERROR]: "Created",
  },
  [RUN_STATES.FILE_UPLOAD]: {
    [ProgressDotState.LOADING]: "Uploading file",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Files uploaded",
    [ProgressDotState.ERROR]: "Uploading file",
  },
  [RUN_STATES.PROVISION_FS]: {
    [ProgressDotState.LOADING]: "Provisioning storage infrastructure",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Storage infrastructure ready",
    [ProgressDotState.ERROR]: "Provisioning storage infrastructure",
  },
  [RUN_STATES.ASSEMBLE_FILE]: {
    [ProgressDotState.LOADING]: "Deploying file in storage",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Files deployed in storage",
    [ProgressDotState.ERROR]: "Deploying file in storage",
  },
  [RUN_STATES.EVALUATIONG]: {
    [ProgressDotState.LOADING]: "Evaluating with River",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Evaluated",
    [ProgressDotState.ERROR]: "Evaluating with River",
  },
  [RUN_STATES.FINISHED]: {
    [ProgressDotState.LOADING]: "",
    [ProgressDotState.INACTIVE]: null,
    [ProgressDotState.SUCCESS]: "Evaluation finished",
    [ProgressDotState.ERROR]: "Evaluation finished",
  },
}

function getProgressDotState(currentBarState, dotIndex, validStateIndex) {
  const isFinalStateIndex = (stateIndex) => {
    return stateIndex === barStates.length - 1;
  }

  if (currentBarState !== RUN_STATES.ERROR) {
    if (dotIndex === validStateIndex) {
      return isFinalStateIndex(dotIndex) ? ProgressDotState.SUCCESS : ProgressDotState.LOADING;
    } else {
      return dotIndex < validStateIndex ? ProgressDotState.SUCCESS : ProgressDotState.INACTIVE
    }
  }

  if (dotIndex === validStateIndex && isFinalStateIndex(dotIndex) ) {
    return ProgressDotState.ERROR;
  }

  if (dotIndex < validStateIndex) {
    return ProgressDotState.SUCCESS;
  } 
  
  if (dotIndex === validStateIndex) {
    return validStateIndex % 2 !== 0 ?  ProgressDotState.SUCCESS : ProgressDotState.ERROR;
  }

  if (dotIndex > validStateIndex) {
    return (validStateIndex % 2 !== 0 && dotIndex === validStateIndex + 1) ? ProgressDotState.ERROR : ProgressDotState.INACTIVE;
  }
}

const ProgressBar = (props) => {
  const {currentState, lastValidState} = props;
  let validState = currentState === RUN_STATES.ERROR ? lastValidState : currentState;

  return <div className="progress-bar">
    {barStates.map((state, currStateIndex) => {
      const validStateIndex = barStates.indexOf(validState)
      
      // Progress bar dot
      if (currStateIndex % 2 === 0) {
        const progressDotState = getProgressDotState(currentState, currStateIndex, validStateIndex);
        return <ProgressBarDot state={progressDotState} label={progressDotLabel[state][progressDotState]} />
      }

      // line separator
      if (currStateIndex % 2 !== 0) {
        const nextProgressDotIndex = currStateIndex + 1;
        const nextProgressDotState = getProgressDotState(currentState, nextProgressDotIndex, validStateIndex);
        let separatorState = LineSeparatorState.INACTIVE;
        
        if (currStateIndex === validStateIndex && nextProgressDotState === ProgressDotState.INACTIVE) {
          separatorState = LineSeparatorState.LOADING;
        } else if (nextProgressDotState !== ProgressDotState.INACTIVE) {
          separatorState = LineSeparatorState.SUCCESS
        }

        return <LineSeparator state={separatorState}/>
      }

      return null;
    })}
  </div>
}

export default ProgressBar;