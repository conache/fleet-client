import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import FileInput from './FileInput';
import { createTestRun } from "../../reducers/testRuns.reducer";


class NewRunTemplate extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      file: null,
    }
    this.confirmBtn = React.createRef()
  }

  render() {
    const { onCancel, onConfirm } = this.props;
    return <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => {
        const { file } = this.state;
        this.confirmBtn.current.disabled = true;
        this.props.createTestRun(
          {
            name: values.name
          }, {
          name: file.name,
          size: file.size,
          maxChunkSize: 1000 * 1000 * 1 // 1mb 
        },
          file
        );
        onConfirm();
      }}>
      {props => (
        <form onSubmit={props.handleSubmit}>
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
          <div className="footer-buttons-container">
            <Button variant="contained" className="modal-button" onClick={onCancel} disableElevation>Cancel</Button>
            <Button ref={this.confirmBtn} type="submit"
              variant="contained"
              color="primary"
              className="modal-button"
              disabled={(props.touched && props.errors.name) || !props.dirty || !this.state.file}
              disableElevation
            >Confirm</Button>
          </div>
        </form>
      )}
    </Formik>
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createTestRun }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRunTemplate);