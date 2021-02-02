import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import {login} from "../../reducers/user.reducer";
import { Formik, Form } from 'formik';
import Logo from '../shared/Logo';
import { pathOr } from 'rambda';
import { USER_STATUS } from '../../constants';
import LoadingSpinner from '../shared/LoadingSpinner';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string().required('This field is required') 
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Invalid password.')
});

class LoginForm extends React.Component {
  render() {
    const {login, authenticating} = this.props;

    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3} style={{maxWidth: "400px", position: "relative",}}>
        {authenticating && <LoadingSpinner />}
        <div className="side-nav-container">
          <Logo />
        </div>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={login}
          validationSchema={DisplayingErrorMessagesSchema}
        >
          {props => {
            const { handleSubmit, handleChange, touched, errors } = props;
            return <Form style={{padding: "24px", textAlign: "center",}}>
              <TextField 
                type="email"
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onSubmit={handleSubmit} 
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
                onSubmit={handleSubmit} 
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained" color="primary" style={{width: "100%", marginTop: "36px",}}>Login</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }
}

function mapStateToProps(state) {
  return {
    authenticating: pathOr(false, ["user", "status"], state) === USER_STATUS.REQUESTING_AUTH,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);