import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import FileInput from './FileInput';
import LoadingSpinner from './LoadingSpinner';
import { pathOr } from 'rambda';
import moment from "moment";

class NewRunTemplate extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      file: null,
    }
  }

  render() {
    const { onCancel, onConfirm, creatingTestRun } = this.props;
    return [
    <Formik
      initialValues={{ name: moment().format("TR_yyyyMMDD_HHmmss") }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => {
        const { file } = this.state;
        onConfirm(values.name, file);
      }}>
      {props => (
        <form onSubmit={props.handleSubmit} style={{position: "relative"}}>
            {creatingTestRun ? <LoadingSpinner /> : null}
            <div className="run-template-inputs-container">
              <TextField className="run-template-input" name="name" type="text" label="Run name" fullWidth
                margin="normal"
                variant="outlined"
                onChange={props.handleChange}
                error={props.touched.name && props.errors.name}
                helperText={props.errors.name}
                value={props.values.name}
              />
              <div className="upload-section">
                <div className="upload-label-main">Select binary file</div>
                <div className="upload-label-secondary">select the binary file that you want to be tested</div>
                <FileInput onChange={(file) => this.setState({ file })} />
              </div>
            </div>
            <div className="footer-buttons-container">
              <Button variant="contained" className="modal-button" onClick={onCancel} disableElevation>Cancel</Button>
              <Button ref={this.confirmBtn} type="submit"
                variant="contained"
                color="primary"
                className="modal-button"
                disabled={!props.isValid || !this.state.file}
                disableElevation
              >Confirm</Button>
            </div>
        </form>
      )}
    </Formik>
    ]
  }
}

function mapStateToProps(state) {
  return {
    creatingTestRun: pathOr(false, ["testRuns", "creating"], state)
  }
}

export default connect(mapStateToProps, null)(NewRunTemplate);