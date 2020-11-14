import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import {login} from "../../reducers/user.reducer";
import { Formik, Form } from 'formik';

class LoginForm extends React.Component {
  render() {
    const {login} = this.props;

    return <Grid container direction="column" justify="center" alignItems="center"
      style={{ marginTop: '15%' }}>
      <Paper elevation={3}>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={login} >
          {props => {
            const { handleChange } = props;
            return <Form>
              <h2>Login</h2>
              <TextField type="email" name="email" label="Email" fullWidth margin="normal"
                onChange={handleChange} />
              <TextField name="password" type="password" label="Password" fullWidth margin="normal"
                onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary">Login</Button>
            </Form>
          }}
        </Formik>
      </Paper>
    </Grid>
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginForm);