import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from "../../ducks/user";
import { pathOr } from 'rambda';

const LoginForm = (props) => {
  const { history } = props;
  console.log("---Login form props:", props, "User", !!props.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
    }),
    onSubmit: (userLoginDetails) => {
      props.login(userLoginDetails)
    }
  })
  return <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    style={{ marginTop: '15%' }}
  >
    <Paper elevation={3}>
      <form onSubmit={formik.handleSubmit}>
        <TextField name="email" type="text"
          label="Email"
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          // error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
          value={formik.values.email}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          // error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
      </Button>
      </form>
    </Paper>
  </Grid>
}

function mapStateToProps(state) {
  return {
    user: pathOr(false, ['user'], state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);