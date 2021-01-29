import React from 'react';
import { Button } from '@material-ui/core';

export const ConfrimationPopup = ({ icon, text, btnLabel, onBtnClick }) => {
  return <div className="confirmation-popup">
    {icon}
    <div className="confirmation-popup--text">{text}</div>
    <Button className="confirmation-popup--btn" 
            variant="outlined"
            color="primary"
            disableElevation
            onClick={onBtnClick}>
              {btnLabel}
            </Button>
  </div>
}