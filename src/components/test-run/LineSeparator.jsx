import React from 'react'

const LineSeparator = (props) => {
  const {state} = props;

  return <div className={"line-separator " + (state || LineSeparatorState.INACTIVE)}></div>
}

export const LineSeparatorState = {
  INACTIVE: "inactive",
  LOADING: "loading",
  SUCCESS: "success"
}

export default LineSeparator;