import React, { memo } from 'react';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const GeneralModal = memo((props) => {
  const { name, showModal, closeModalFct, children, title } = props;

  return (
    <Modal className="modal" aria-labelledby={name} open={showModal} onClose={closeModalFct}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...props}
    >
      <Fade in={showModal}>
       <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <CloseIcon onClick={closeModalFct} style={{ cursor: 'pointer' }} />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </Fade>
    </Modal>
  )
});

export default GeneralModal;
