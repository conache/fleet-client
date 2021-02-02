import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { signUp } from "../../reducers/user.reducer";
import { Formik, Form } from 'formik';
import Logo from "../shared/Logo";
import { pathOr } from 'rambda';
import { USER_STATUS } from '../../constants';
import LoadingSpinner from "../shared/LoadingSpinner";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'This value is too short')
    .max(50, 'This value is too long')
    .required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string().required('This field is required') 
    .min(8, 'The password should contain minimum 8 chars.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'The password should contain at least one letter and one digit.')
});

class SignUpForm extends React.Component {
  render() {
    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3} style={{ maxWidth: "400px", position: "relative"}}>
        {this.props.signingUp && <LoadingSpinner />}
        <div className="side-nav-container"><Logo /></div>
        <Formik
          validateOnBlur
          initialValues={{
            name: "",
            company: "",
            email: "",
            password: ""
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={this.props.signUp} >
          {props => {
            const { handleChange, handleBlur, touched, errors } = props;
            return <Form style={{ padding: "24px", textAlign: "center", }}>
              <TextField type="text"
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField type="text" name="company" label="Company (optional)" fullWidth margin="normal" onChange={handleChange} />
              <TextField 
                type="email"
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                onChange={handleChange} 
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained" color="primary" style={{ width: "100%", marginTop: "36px", }}>Sign Up</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }
}

function mapStateToProps(state) {
  return {
    signingUp: pathOr(false, ["user", "status"], state) === USER_STATUS.REQUESTING_CREATE
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);