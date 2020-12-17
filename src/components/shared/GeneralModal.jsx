import React, { memo } from 'react';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const GeneralModal = memo((props) => {
  const { name, showModal, closeModalFct, children, title } = props;

  return (
    <Modal aria-labelledby={name} open={showModal} onClose={closeModalFct} className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <CloseIcon onClick={closeModalFct} style={{ cursor: 'pointer' }} />
          </div>
          <div className="modal-body">{children}</div>
        </div>
    </Modal>
  )
});

export default GeneralModal;
