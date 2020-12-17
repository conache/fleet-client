import React from 'react';

const RunCardWidget = (props) => {
  const {title, IconClass} = props;

  return <div className="run-card-widget">
    <div className="run-card-widget-title-line">
      <IconClass className="run-card-widget-icon" />
      <div className="run-card-widget-title">{title}:</div>
    </div>
    <div className="run-card-widget-content">{props.children}</div>
  </div>
}

export default RunCardWidget;